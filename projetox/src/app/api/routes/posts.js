import express, { Router } from "express";
import { getPosts, postPostagem } from "../Controllers/post.js";

const router = express.Router();

router.get("/posts", getPosts);

router.post("/postagem", postPostagem);

export default router;
