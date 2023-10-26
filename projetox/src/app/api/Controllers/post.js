import { database } from "../db.js";

export const getPosts = (req, res) => {
  const queryPosts = "SELECT * FROM posts";

  database.query(queryPosts, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};