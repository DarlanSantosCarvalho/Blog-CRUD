import { database } from "../db.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

export const postCadastro = (req, res) => {
  const nome = req.body.nome;
  const nomeUsuario = req.body.nomeUsuario;
  const email = req.body.email;
  const senha = req.body.senha; // Don't convert it to a string here

  // Hash the password
  bcrypt.hash(senha, saltRounds, (err, hash) => {
    if (err) {
      return res.json({ Error: "Erro em criptografar senha" });
    }

    // Now you can use the 'hash' value inside this callback
    try {
      database.query(
        "SELECT nomeUsuario, email FROM usuarios WHERE nomeUsuario = ? AND email = ?",
        [nomeUsuario, email],
        (error, results) => {
          if (results.length > 0) {
            console.log("O usuário já tem cadastro existente");
            return res.json({ Status: "Error" });
          } else {
            database.query(
              "INSERT INTO usuarios (nome, email, nomeUsuario, senha) VALUES (?,?,?,?)",
              [nome, email, nomeUsuario, hash] // Use the hashed password
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
  });
};
