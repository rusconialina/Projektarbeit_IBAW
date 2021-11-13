import mongoose from "mongoose";
import Book from "../models/book.mjs";

export async function getBook(id) {
  return Book.findOne({
    _id: mongoose.Types.ObjectId(id),
  });
}

export async function getBooks() {
  return Book.find();
}

export async function createBook(payload) {
  return Book.create(payload);
}

export async function updateBook(id, payload) {
  return Book.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) }, payload, {
    new: true,
  });
}

export async function removeBook(id) {
  return Book.deleteOne({ _id: mongoose.Types.ObjectId(id) });
}
