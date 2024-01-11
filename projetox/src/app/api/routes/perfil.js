import { getProfile } from "../Controllers/perfil.js";
import express, { Router } from "express";

const router = express.Router()

router.get("/Usuarios/:nomeUsuario", getProfile);

export default router;
