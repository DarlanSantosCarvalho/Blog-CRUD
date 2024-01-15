import { database } from "../db.js";

export const getUsers = (req, res) => {
  const queryUsers =
    "SELECT nomeUsuario, email, nome, sobrenome, idade, profissao, Biografia, nacionalidade FROM usuarios";

  database.query(queryUsers, (err, data) => {
    if (err) {
      return res.json(err);
    } else if (data.length === 0) {
      return res.json({ Status: "Não existem usuários cadastrados" });
    } else {
      return res.json({ Status: "Success", data });
    }
  });
};
