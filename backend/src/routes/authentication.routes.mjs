import express from "express";
import {checkLogin} from "../services/authentication.service.mjs";

const router = express.Router();

router.post("/login", checkLogin);


export default router;