import { TaskModel } from "../models/task.model.js";
import { UserModel } from "../models/user.model.js";

export const crearTask = async (req, res) => {
  try {
    const { title, description, isComplete, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "El userId es obligatorio" });
    }

    const user = await UserModel.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Título y descripción son obligatorios" });
    }

    const existingTask = await TaskModel.findOne({ where: { title } });
    if (existingTask) {
      return res
        .status(400)
        .json({ message: "Ya existe una tarea con ese título" });
    }

    const task = await TaskModel.create({
      title,
      description,
      isComplete: isComplete || false,
      userId,
    });

    return res.status(201).json({ message: "Tarea creada", task });
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
    const { id } = req.params;
    const { title, description, isComplete } = req.body;

    const task = await TaskModel.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    if (title && title !== task.title) {
      const existingTask = await TaskModel.findOne({ where: { title } });
      if (existingTask) {
        return res
          .status(400)
          .json({ message: "Ya existe otra tarea con ese título" });
      }
    }

    await task.update({ title, description, isComplete });
    return res.status(200).json({ message: "Tarea actualizada", task });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await TaskModel.findByPk(id);

    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    await task.destroy();
    return res.status(200).json({ message: "Tarea eliminada" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
