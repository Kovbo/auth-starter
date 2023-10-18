import {
  createTask,
  deleteTask,
  editTask,
  getAllTasks,
  getTask,
} from "../controllers/tasksController";

const express = require("express");
const tasksRouter = express.Router();

tasksRouter.get("/api/v1/tasks", getAllTasks);
tasksRouter.get("/api/v1/tasks/:id", getTask);

tasksRouter.post("/api/v1/tasks", createTask);
tasksRouter.post("/api/v1/tasks/:id", editTask);
tasksRouter.delete("/api/v1/tasks/:id", deleteTask);

export { tasksRouter };
