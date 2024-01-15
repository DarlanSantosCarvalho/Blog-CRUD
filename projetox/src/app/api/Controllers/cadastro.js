import { database } from "../db.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

export const postCadastro = (req, res) => {
  const nome = req.body.nome;
  const sobrenome = req.body.sobrenome;
  const nomeUsuario = req.body.nomeUsuario;
  const email = req.body.email;
  const senha = req.body.senha;
  const idade = req.body.idade;
  const profissao = req.body.profissao;
  const nacionalidade = req.body.nacionalidade;
  const Biografia = req.body.biografia;

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
                "INSERT INTO usuarios (nomeUsuario, email, nome, sobrenome, idade, profissao, biografia, nacionalidade, senha) VALUES (?,?,?,?,?,?,?,?,?)",
                [
                  nomeUsuario,
                  email,
                  nome,
                  sobrenome,
                  idade,
                  profissao,
                  Biografia,
                  nacionalidade,
                  senhaCriptografada,
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
