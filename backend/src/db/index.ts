import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { MONGO_URI } from "~/constants";

export default function CONNECT_MONGO_DB() {
  try {
    mongoose.set("strictQuery", true);
    mongoose
      .connect(MONGO_URI)
      .then(() => {
        console.log("Connected to mongodb");
      })
      .catch((err) => {
        console.log("Error while connecting to mongodb", err);
        process.exit(1);
      });
  } catch (err) {
    console.log("Error while connecting to DB", err);
    process.exit(1);

  }
}