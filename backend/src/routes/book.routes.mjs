import express from "express";
import {
  get,
  list,
  create,
  update,
  remove,
} from "../controllers/book.controller.mjs";

const router = express.Router();

router.get("/:id", get);
router.get("/", list);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;
