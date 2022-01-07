import express from "express";
import {
  get,
  list,
  create,
  update,
  remove,
} from "../controllers/book.controller.mjs";

const router = express.Router();



router.get("/book/:id", get);
router.get("/book", list);
router.post("/book", create);
router.put("/book/:id", update);
router.delete("/book/:id", remove);

export default router;
