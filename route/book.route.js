import express from "express";
import { getBook } from "../controller/book.controller.js";

const bookrouter = express.Router();

router.get("/book", getBook);

export default bookrouter;
