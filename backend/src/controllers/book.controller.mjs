import {
  updateBook,
  createBook,
  getBooks,
  getBook,
  removeBook,
} from "../services/book.service.mjs";

export const get = async (req, res) => {
  // get book (one)
  try {
    const book = await getBook(req.params.id);
    res.send(book);
  } catch (err) {
    console.log("Upps.. Es ist ein Fehler aufgetreten.", err);
    next();
  }
};

export const list = async (req, res) => {
  // get book list (all)
  try {
    const books = await getBooks();
    res.send(books);
  } catch (err) {
    res.send(err);
    console.error(err);
    next();
  }
};

export const create = async (req, res) => {
  // create book
  try {
    const book = await createBook(req.body);
    res.send(article);
  } catch (err) {
    res.send(err);
    console.error(err);
    next();
  }
};

export const update = async (req, res) => {
  // update book
  try {
    const result = await updateBook(req.params.id, req.body);
    res.send(result);
  } catch (err) {
    res.send(err);
    console.error(err);
    next();
  }
};

export const remove = async (req, res) => {
  // remove book
  try {
    res.send(await removeBook(req.params.id));
  } catch (err) {
    res.send(err);
    console.error(err);
    next();
  }
};
