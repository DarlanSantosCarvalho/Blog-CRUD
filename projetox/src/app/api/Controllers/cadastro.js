import { database } from "../db.js";

export const postCadastro = (req, res) => {
  const nome = req.body.nome;
  const nomeUsuario = req.body.nomeUsuario;
  const email = req.body.email;
  const senha = req.body.senha;

  try {
    database.query(
      "SELECT nomeUsuario, email FROM usuarios WHERE nomeUsuario = ? OR email = ?",
      [nomeUsuario, email],
      (error, results) => {
        if (results.length > 0) {
          console.log("O usuário já tem cadastro existente");
          return res.json({ Status: "Error" });
        } else {
          database.query(
            "INSERT INTO usuarios (nome, email, nomeUsuario, senha) VALUES (?,?,?,?)",
            [nome, email, nomeUsuario, senha]
          );
          console.log("O cadastro foi efetuado com sucesso");
          return res.json({ Status: "Success" });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ Error: "Internal Server Error" });
  }
};
