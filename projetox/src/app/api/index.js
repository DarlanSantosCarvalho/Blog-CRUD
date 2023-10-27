import express from "express";
import cors from "cors";
import usersRoutes from "../api/routes/users.js";
import postsRoutes from "../api/routes/posts.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/users", usersRoutes);

app.get("/posts", postsRoutes);
app.post("/posts", postsRoutes);

app.listen(8080, console.log("Ouvindo na porta 8080"));
