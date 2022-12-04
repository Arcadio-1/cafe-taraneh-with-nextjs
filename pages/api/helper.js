import { MongoClient } from "mongodb";

export const getClient = async (databaseName) => {
  try {
    const client = await MongoClient.connect(
      `${process.env.REACT_APP_MONGODB}${databaseName}?retryWrites=true&w=majority`
    );
    // const client = await mongoClient.connect(
    //   `${process.env.REACT_APP_MONGODB}${databaseName}?retryWrites=true&w=majority`
    // );
    // console.log(mongoClient.isConnected());
    return client;
  } catch (error) {
    throw new Error("خطا در برقراری ارتباط");
  }
};