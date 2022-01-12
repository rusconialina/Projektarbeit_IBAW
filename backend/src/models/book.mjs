import mongoose from "mongoose";
const { Schema } = mongoose;

const bookSchema = new Schema({
  titel: {
    // Titel
    type: String,
    required: true,
  },

  volume: { type: Number }, // Band-Nr.

  autor: String, // Autoren

  genre: String, // Keywords

  date: Date,  // Rückgabedatum

  rate: Number, //Bewertung
});

export default mongoose.model("book", bookSchema, "book");
