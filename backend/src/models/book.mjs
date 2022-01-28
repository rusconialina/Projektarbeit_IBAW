import mongoose from "mongoose";
const { Schema } = mongoose;

const bookSchema = new Schema({
  titel: {
    // Titel
    type: String,
    required: true,
  },
  volume: { type: Number }, // Band-Nr.
  autor: String, // Autor
  genre: String, // Genre
  date: Date,  // Rückgabedatum
  rate: String, //Bewertung
});

export default mongoose.model("book", bookSchema, "book");
