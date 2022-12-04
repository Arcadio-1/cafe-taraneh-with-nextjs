import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { varifiypassword } from "../../../lib/hashHelper";
import { getClient } from "../helper";

export default NextAuth({
  session: {
    jwt: true,
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await getClient("users");
        if (!client) {
          throw new Error("خطا در اتصال به سرور");
        }

        const emailString = String(credentials.email).toLowerCase();
        const emailRegex = RegExp(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        const isEmailValid = emailRegex.test(emailString);
        if (!isEmailValid) {
          throw new Error("ایمیل وارد شده صحیح نیست");
        }

        const userCollection = client.db().collection("userList");
        const user = await userCollection.findOne({
          email: emailString,
        });
        if (!user) {
          throw new Error("حساب کاربری شما یافت نشد!");
        }

        const passwordRegex = RegExp(
          /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
        );
        const isPasswordValid = passwordRegex.test(credentials.password);
        if (!isPasswordValid) {
          throw new Error("پسورد وارد شده صحیح نیست");
        }
        const isPasswordCreact = await varifiypassword(
          credentials.password,
          user.password
        );
        if (!isPasswordCreact) {
          throw new Error("پسورد وارد شده صحیح نیست");
        }
        client.close();
        return { email: user.email, name: user.name };
      },
    }),
  ],
});