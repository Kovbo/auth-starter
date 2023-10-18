import express from "express";
import { tasksRouter } from "./router/tasksRouter";
import { authRouter } from "./router/authRouter";
const app = express();
require("dotenv").config();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authRouter);
app.use(tasksRouter);

app.listen(4000);
