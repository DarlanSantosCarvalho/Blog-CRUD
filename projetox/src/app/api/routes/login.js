import express from "express";
import { postLogin } from "../Controllers/login.js";
import { getLogin } from "../Controllers/login.js";

const router = express.Router();

router.post("/login", postLogin);
router.get("/", getLogin)


export default router;
