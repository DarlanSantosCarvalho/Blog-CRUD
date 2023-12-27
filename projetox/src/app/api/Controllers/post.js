import { database } from "../db.js";
import jwt from "jsonwebtoken";

export const postPostagem = (req, res) => {
  const tituloPost = req.body.tituloPost;
  const textoPost = req.body.textoPost;
  const token = req.cookies.token;

  if (!token) {
    return res.json({ Error: "Você não está autenticado" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json({ Error: "Algo errado no Token" });
      } else {
        req.username = decoded.username;

        // Consulta para obter o idUsuario
        database.query(
          "SELECT idUsuario FROM usuarios WHERE nomeUsuario = ?",
          [req.username],
          (error, response) => {
            if (error) {
              console.error("Erro na consulta SQL:", error);
              return res.json({ Error: "Erro ao executar a consulta SQL" });
            }

            if (response && response.length > 0) {
              const idUser = response[0].idUsuario;

              // Inserir postagem no banco de dados
              database.query(
                "INSERT INTO posts (idUsuario, tituloPost, textoPost) VALUES (?,?,?)",
                [idUser, tituloPost, textoPost],
                (insertError, insertResponse) => {
                  if (insertError) {
                    console.error("Erro na inserção SQL:", insertError);
                    return res.json({
                      Error: "Erro ao inserir a postagem no banco de dados",
                    });
                  }

                  console.log("Postagem inserida com sucesso");
                  // Resto do código, se necessário...
                  return res.json({ Status: "Success" });
                }
              );
            } else {
              return res.json({ Error: "Usuário não encontrado" });
            }
          }
        );
      }
    });
  }
};

export const getPosts = (req, res) => {
  const queryPosts = "SELECT * FROM posts";

  database.query(queryPosts, (err, data) => {
    if (err) {
      return res.json({ Status: "Error", err });
    } else {
      return res.json(data);
    }
  });
};
