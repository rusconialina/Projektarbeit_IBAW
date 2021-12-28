import mongoose from "mongoose";
const { Schema } = mongoose;

const bookSchema = new Schema({
  titel: {
    // Titel
    type: String,
    required: true,
  },

  volume: { type: Number }, // Band-Nr.

  autors: [String], // Autoren

  genres: [String], // Keywords

  date: {
    // Rückgabedatum
    type: Date,
  },

  rate: {
    // Bewertung
    type: Number,
  },
});

export default mongoose.model("book", bookSchema, "book");
