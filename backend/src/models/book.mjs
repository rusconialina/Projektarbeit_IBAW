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

  ownership: { type: String }, // ausgeliehen/gekauft

  date_listed: {
    // Erfassungsdatum (Timestamp)
    type: Date,
  },

  date_purchase: {
    // Kauf-/Ausleihdatum
    type: Date,
  },

  rate: {
    // Bewertung
    type: Number,
  },
});

export default mongoose.model("book", bookSchema, "book");
