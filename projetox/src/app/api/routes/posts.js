import express, { Router } from "express"
import { getPosts, postPosts } from "../Controllers/post.js";

const router = express.Router()

router.get("/posts", getPosts)

router.post("/posts", postPosts)

export default router;