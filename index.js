import "dotenv/config"
import express from "express";
import indexRoutes from "./routes/index.routes.js";
import usersRoutes from "./routes/users.routes.js";
import loginRoutes from "./routes/login.routes.js";

const app = express();
const port = 5000;

app.use(express.json());
app.use(indexRoutes);
app.use(usersRoutes);
app.use(loginRoutes);

app.listen(port, console.log("http://localhost:" + port));