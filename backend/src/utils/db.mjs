import mongoose from "mongoose";
import dotenv from "dotenv";
import ".../.env"

dotenv.config();

export default function connect() {
  try {
    mongoose.connect('mongodb+srv://ibaw:Y12AyGPaltP8EEMK@bibliothek.ujnx7.mongodb.net/test', {
      useNewUrlParser: true,
    });
  } catch (e) {
    console.error(e);
  }
}
