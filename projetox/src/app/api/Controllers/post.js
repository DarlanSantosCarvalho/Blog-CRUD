import { text } from "stream/consumers";
import { database } from "../db.js";

export const getPosts = (req, res) => {
  const queryPosts = "SELECT * FROM posts";

  database.query(queryPosts, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

export const postPosts = (req, res) => {
  const tituloPost = req.body.tituloPost;
  const textoPost = req.body.textoPost;
  const nomeUsuario = req.body.nomeUsuario;
  const email = req.body.email;
  const nome = req.body.nome;

  try {
    // Verifique se o usuário já existe
    database.query(
      "SELECT idUsuario FROM usuarios WHERE nomeUsuario = ?",
      [nomeUsuario],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({ error: "Erro ao verificar o usuário" });
        } else {
          if (results.length > 0) {
            // O usuário já existe, use o ID do usuário existente para inserir o post
            const idUsuario = results[0].idUsuario;
            database.query(
              "INSERT INTO posts (idUsuario, tituloPost, textoPost) VALUES (?, ?, ?)",
              [idUsuario, tituloPost, textoPost]
            );
          } else {
            // O usuário não existe, insira o usuário primeiro
            database.query(
              "INSERT INTO usuarios (nome, email, nomeUsuario) VALUES (?,?,?)",
              [nome, nomeUsuario, email],
              (userInsertError, userInsertResults) => {
                if (userInsertError) {
                  console.log(userInsertError);
                  res.status(500).json({ error: "Erro ao inserir o usuário" });
                } else {
                  const idUsuario = userInsertResults.insertId;
                  // Use o ID do usuário recém-inserido para inserir o post
                  database.query(
                    "INSERT INTO posts (idUsuario, tituloPost, textoPost) VALUES (?, ?, ?)",
                    [idUsuario, tituloPost, textoPost]
                  );
                }
              }
            );
          }
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao processar a solicitação" });
  }
};
