import { Router } from "express";
import {
  crearTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

export const taskRouter = Router();

taskRouter.post("/tasks", crearTask);
taskRouter.get("/tasks", getAllTasks);
taskRouter.get("/tasks/:id", getTaskById);
taskRouter.put("/tasks/:id", updateTask);
taskRouter.delete("/tasks/:id", deleteTask);
