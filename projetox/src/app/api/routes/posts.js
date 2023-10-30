import express, { Router } from "express"
import { getPosts } from "../Controllers/post.js";

const router = express.Router()

router.get("/posts", getPosts)

export default router;