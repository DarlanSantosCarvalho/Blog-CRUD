import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import usersRoutes from "../api/routes/users.js";
import postsRoutes from "../api/routes/posts.js";
import cadastroRoutes from "../api/routes/cadastros.js";
import loginRoutes from "../api/routes/login.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/users", usersRoutes);

app.get("/posts", postsRoutes);

app.post("/postagem", postsRoutes);

app.post("/cadastro", cadastroRoutes);

app.post("/login", loginRoutes);

app.get("/", loginRoutes, (req, res) => {
  return res.json({ Status: "Success", username: req.username });
});

app.listen(8080, console.log("Ouvindo na porta 8080"));
