import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import FormItem from "../ui/FormItem/FormItem";
import KeyIcon from "../ui/Icons/KeyIcon";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { uiAction } from "../../store/ui/uiSlice";
import LoadingSpinner from "../ui/LoadingSpiner/loadingSpiner";
import useInputValidation from "./validation/UseInputValidation";
import MailIcon from "../ui/Icons/MailIcon";
import { signIn } from "next-auth/react";
import ShowIcon from "../ui/Icons/ShowIcon";
import HideIcon from "../ui/Icons/HideIcon";

const LoginForm = () => {
  const router = useRouter();
  const notif = useSelector((state) => state.ui.userActionNotif);
  const dispatchNotif = useDispatch();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const {
    value: emailValue,
    isValid: isEmailValid,
    errorStatus: emailError,
    inputBlurHandler: emailBlurHandler,
    inputChangeHandler: emailChangeHandler,
    reset: emailResetHandler,
  } = useInputValidation((value) => {
    const emailString = String(value).toLowerCase();
    const regex = RegExp(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    const isValid = regex.test(emailString);
    return isValid;
  });
  const {
    value: passwordValue,
    isValid: isPasswordValid,
    errorStatus: passwordError,
    inputBlurHandler: passwordBlurHandler,
    inputChangeHandler: passwordChangeHandler,
    reset: passwordResetHandler,
  } = useInputValidation((value) => {
    const regex = RegExp(/^(?=.{6,}$)/);
    const isValid = regex.test(value);
    return isValid;
  });
  useEffect(() => {
    if (notif.status === "success" || notif.status === "error") {
      const notifReset = setTimeout(() => {
        dispatchNotif(
          uiAction.setNotif({
            status: "null",
            title: "null",
            message: "null",
          })
        );
      }, 3000);
      return () => {
        clearTimeout(notifReset);
      };
    }
  }, [notif, dispatchNotif]);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      emailBlurHandler();
      passwordBlurHandler();
      if (!isPasswordValid || !isEmailValid) {
        throw new Error("???????????? ???????? ?????? ???????? ????????");
      }
      dispatchNotif(
        uiAction.setNotif({
          status: "loading",
          title: "Loading",
          message: "???????? ?????? ????????",
        })
      );
      const request = await signIn("credentials", {
        redirect: false,
        email: emailValue,
        password: passwordValue,
      });
      if (!request.ok) {
        throw new Error(request.error);
      }
      if (!request.error) {
        router.push("/");
      }
      dispatchNotif(
        uiAction.setNotif({
          status: "success",
          title: "Success",
          message: "???? ???????????? ???????? ????????",
        })
      );
    } catch (error) {
      dispatchNotif(
        uiAction.setNotif({
          status: "error",
          title: "Error",
          message: error.message,
        })
      );
    }
  };
  return (
    <div className="account-login">
      {/* <h1 className="account-login-title">???????????? ???????? ???? ???????? ????????</h1> */}

      <form className="Form">
        <FormItem
          onBlur={emailBlurHandler}
          onChange={emailChangeHandler}
          value={emailValue}
          isValid={isEmailValid}
          error={emailError}
          label="??????????"
          htmlId="email"
          inputType="email"
          errorMsg={" ?????????? ???????? ?????? ???????? ??????????????"}
        >
          <MailIcon />
        </FormItem>
        <FormItem
          onChange={passwordChangeHandler}
          value={passwordValue}
          onBlur={passwordBlurHandler}
          isValid={isPasswordValid}
          error={passwordError}
          errorMsg={" ?????????? ???????? ?????? ???????? ??????????????"}
          label="?????? ????????"
          inputType={`${isShowPassword ? "text" : "password"}`}
          htmlId="password"
        >
          <KeyIcon />
        </FormItem>
        <div className="FormItem-showPassword">
          <div className="FormItem-showPassword-checker">
            <label
              htmlFor="cheaker"
              className="FormItem-showPassword-checker-label"
            >
              <input
                onChange={() => {
                  setIsShowPassword((prev) => (prev = !prev));
                }}
                id="cheaker"
                type="checkbox"
              />
              <div className="checker-label-slider round"></div>
            </label>
          </div>
          {!isShowPassword && (
            <label htmlFor="cheaker">
              <ShowIcon />
            </label>
          )}
          {isShowPassword && (
            <label htmlFor="cheaker">
              <HideIcon />
            </label>
          )}
        </div>

        <div className="Form-action">
          <button onClick={submitHandler} className="Form-action-submit">
            ????????
          </button>
        </div>
        <div className="Form-link"></div>
      </form>
      {notif && notif.status === "loading" && (
        <LoadingSpinner text={"???????? ?????? ????????"} />
      )}
      {notif && notif.status === "error" && (
        <LoadingSpinner text={notif.message} type={"warning"} />
      )}
      {notif && notif.status === "success" && (
        <LoadingSpinner text={"???? ???????????? ???????? ????????"} />
      )}
      <div className="account-login-forgetPassword">
        <Link href="/forgetpass">?????????????? ?????? ????????</Link>
      </div>
    </div>
  );
};

export default LoginForm;
