import mongoose from "mongoose";
const { Schema } = mongoose;

const bookSchema = new Schema({
  titel: {
    // Titel
    type: String,
    required: true,
  },

  volume: { type: Number }, // Band-Nr.
  season: { type: Number }, // Staffel
  universe: { type: String }, // Band-Reihe

  autors: [String], // Autoren

  genres: [String], // Keywords

  date_published: { type: Date }, // Erscheinungsdatum

  publisher: { type: String }, // Verlag

  media: { type: String }, // Art (Kindle Digital, Buch physisch)
  art: { type: String }, // Buchtyp

  ownership: { type: String }, // ausgeliehen/gekauft

  leseprobe: {
    type: Boolean,
    default: false,
  },
  read: {
    // gelesen?
    type: Boolean,
    default: false,
  },

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
  note: {
    // Bemerkung
    type: String,
  },
});

export default mongoose.model("book", bookSchema, "book");
