import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "../controllers/task.controller.js";
import { validate } from "../middlewares/validate.js";
import {
  createTaskValidation,
  updateTaskValidation,
} from "../middlewares/validations/task.validation.js";

export const taskRouter = Router();

taskRouter.post("/tasks", createTaskValidation, validate, createTask);
taskRouter.get("/tasks", getAllTasks);
taskRouter.get("/tasks/:id", getTaskById);
taskRouter.put("/tasks/:id", updateTaskValidation, validate, updateTask);
taskRouter.delete("/tasks/:id", deleteTask);
