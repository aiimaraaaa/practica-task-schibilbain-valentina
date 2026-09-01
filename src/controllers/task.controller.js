import { matchedData } from "express-validator";
import { TaskModel } from "../models/task.model.js";
import { UserModel } from "../models/user.model.js";

export const createTask = async (req, res) => {
  try {
    const validatedData = matchedData(req);
    const task = await TaskModel.create(validatedData);
    return res.status(201).json({
      message: "Tarea creada exitosamente",
      task,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.findAll({
      include: [
        {
          model: UserModel,
          as: "usuario",
          attributes: ["id", "name", "email"],
        },
      ],
    });
    return res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await TaskModel.findByPk(id, {
      include: [
        {
          model: UserModel,
          as: "usuario",
          attributes: ["id", "name", "email"],
        },
      ],
    });
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    return res.status(200).json(task);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const validatedDataBody = matchedData(req, { locations: ["body"] });
    const { id } = matchedData(req, { locations: ["params"] });

    const taskExist = await TaskModel.findByPk(id);

    if (!taskExist) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    await taskExist.update(validatedDataBody);

    return res.status(200).json({
      message: "Tarea actualizada exitosamente",
      task: taskExist,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const taskExist = await TaskModel.findByPk(id);

    if (!taskExist) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    await taskExist.destroy();

    return res.status(200).json({ message: "Tarea eliminada exitosamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
