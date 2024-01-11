import { getProfile } from "../Controllers/perfil.js";
import express, { Router } from "express";

const router = express.Router()

router.get("/Perfil/:nomeUsuario", getProfile);

export default router;
