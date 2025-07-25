import mongoose from "mongoose";

export async function connect() {
  if (!process.env.MONGO_URL) return;
  try {
    mongoose.connect(process.env.MONGO_URL);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("mongo connected successfully...");
    });

    connection.on("error", (err) => {
      console.log("mongodb connection error" + err);
      process.exit();
    });
  } catch (error) {
    console.log(error);
    console.log("Something went wrong");
  }
}
