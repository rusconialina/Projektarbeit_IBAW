import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
  } catch (e) {
    console.error(e);
  }
}
