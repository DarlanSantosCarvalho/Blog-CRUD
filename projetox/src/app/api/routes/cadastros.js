import express from "express";
import { postCadastro } from "../Controllers/cadastro.js";

const router = express.Router();

router.post("/Cadastro", postCadastro);

export default router;
