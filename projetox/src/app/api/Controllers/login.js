import { database } from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const postLogin = (req, res) => {
  const nomeUsuario = req.body.nomeUsuario;
  const senha = req.body.senha;

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
          // Utilize bcrypt.compare para verificar a senha
          bcrypt.compare(senha, usuario.senha, (err, passwordMatch) => {
            if (err) {
              console.error(err);
              return res.json({ Error: "Erro ao verificar a senha" });
            }
            if (passwordMatch) {
              const username = results[0].nomeUsuario;
              const token = jwt.sign({ username }, "jwt-secret-key", {
                expiresIn: "1d",
              });
              res.cookie("token", token);
              return res.json({
                Status: "Login efetuado",
                username: results[0].nomeUsuario,
              });
            } else {
              return res.json({ Status: "Senha incorreta" });
            }
          });
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

export const getLogin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "Você não está autenticado" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json({ Error: "Algo errado no Token" });
      } else {
        req.username = decoded.username;
        next();
      }
    });
  }
};
