import { response } from "express";
import { database } from "../db.js";

export const postPostagem = (req, res) => {
  const tituloPost = req.body.tituloPost;
  const textoPost = req.body.textoPost;
  const nomeUsuario = req.body.nomeUsuario;

  try {
    database.query("SELECT idUsuario FROM usuarios WHERE nomeUsuario = ?", [
      nomeUsuario,
    ]);
    if (response) {
      database.query(
        "INSERT INTO posts (idUsuario, tituloPost, textoPost) VALUES (?,?,?)",
        [tituloPost, textoPost]
      );
      return res.json({ Status: "Success" });
    } else {
      return res.json({ Error: "Error" });
    }
  } catch (error) {
    return res.json({ Error: "Erro no sistema" });
  }
};

export const getPosts = (req, res) => {
  const queryPosts = "SELECT * FROM posts";

  database.query(queryPosts, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};
