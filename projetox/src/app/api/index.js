import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import usersRoutes from "../api/routes/users.js";
import postsRoutes from "../api/routes/posts.js";
import cadastroRoutes from "../api/routes/cadastros.js";
import loginRoutes from "../api/routes/login.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/users", usersRoutes);
app.get("/posts", postsRoutes);
app.post("/cadastro", cadastroRoutes);
app.post("/login", loginRoutes)

app.listen(8080, console.log("Ouvindo na porta 8080"));
