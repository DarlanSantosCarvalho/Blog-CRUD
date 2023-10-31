import express from "express";
import { postLogin } from "../Controllers/login.js";

const router = express.Router();

router.post("/login", postLogin);

export default router;
