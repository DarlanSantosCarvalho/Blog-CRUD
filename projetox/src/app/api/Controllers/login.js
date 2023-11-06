import { database } from "../db.js";
import jwt from "jsonwebtoken";

export const postLogin = (req, res) => {
  const nomeUsuario = req.body.nomeUsuario;
  const senha = req.body.senha;
  const textoPost = req.body.textoPost
  const tituloPost = req.body.tituloPost

  try {
    database.query(
      "SELECT nomeUsuario, senha FROM usuarios WHERE nomeUsuario = ?",
      [nomeUsuario],
      (error, results) => {
        if (error) {
          console.error(error);
          return res.json({ Error: "Não foi possível verificar o login" });
        }
        if (results.length > 0) {
          const usuario = results[0];
          if (usuario.senha === senha) {
            const name = results[0].name;
            const token = jwt.sign({ name }, "jwt-secret-key", {
              expiresIn: "1d",
            });
            res.cookie("token", token);
            return res.json({ Status: "Login efetuado" });
          } else {
            return res.json({ Status: "Senha errada" });
          }
        } else {
          return res.json({ Status: "Usuário não encontrado" });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ Error: "Internal Server Error" });
  }
};
