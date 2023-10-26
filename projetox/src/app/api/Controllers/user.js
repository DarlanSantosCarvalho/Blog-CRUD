import { database } from "../db.js";

export const getUsers = (req, res) => {
  const queryUsers = "SELECT * FROM usuarios";

  database.query(queryUsers, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};
