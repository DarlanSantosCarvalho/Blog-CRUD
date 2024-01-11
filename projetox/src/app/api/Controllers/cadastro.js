import { database } from "../db.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

export const postCadastro = (req, res) => {
  const nome = req.body.nome;
  const nomeUsuario = req.body.nomeUsuario;
  const email = req.body.email;
  const senha = req.body.senha;
  const idade = 10;
  const profissao = "Estudante";
  const Biografia = "Sou estudante e tenho 10 anos";

  try {
    database.query(
      "SELECT nomeUsuario, email FROM usuarios WHERE nomeUsuario = ? OR email = ?",
      [nomeUsuario, email],
      (error, results) => {
        if (error) {
          console.log(error);
        } else if (results.length > 0) {
          console.log("O usuário já tem cadastro existente");
          return res.json({ Status: "Error" });
        } else {
          bcrypt.hash(senha, saltRounds, (err, senhaCriptografada) => {
            if (err) {
              console.log(err);
            } else {
              database.query(
                "INSERT INTO usuarios (nome, email, nomeUsuario, senha, idade, profissao, biografia) VALUES (?,?,?,?,?,?,?)",
                [
                  nome,
                  email,
                  nomeUsuario,
                  senhaCriptografada,
                  idade,
                  profissao,
                  Biografia,
                ]
              );
              console.log("O cadastro foi efetuado com sucesso");
              return res.json({ Status: "Success" });
            }
          });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ Error: "Internal Server Error" });
  }
};
