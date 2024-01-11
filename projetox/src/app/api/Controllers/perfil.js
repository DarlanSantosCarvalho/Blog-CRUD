import { database } from "../db.js";

export const getProfile = (req, res) => {
    const nomeUsuario = req.params.nomeUsuario;
    database.query(
      "SELECT * FROM usuarios WHERE nomeUsuario = ?",
      [nomeUsuario], 
      (err, result) => {
        if (err) {
            return res.json({Status: "Error", Message: "Não foi possível realizar a procura"})
      }else if(result.length > 0){
        return res.json({Status: "Success", Message: result})
      }else{
        return res.json({Status: "Error", Message: "O usuário não existe"})
      }
    }
    );
  };
  