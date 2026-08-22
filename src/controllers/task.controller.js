import { TaskModel } from "../models/task.model.js";

export const crearTask = async (req, res) => {
  try {
    const { title, description, isComplete } = req.body;

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
    });

    return res.status(201).json({ message: "Tarea creada exitosamente", task });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.findAll();
    return res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await TaskModel.findByPk(id);

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

    // Si se actualiza el título, verificar unicidad
    if (title && title !== task.title) {
      const existingTask = await TaskModel.findOne({ where: { title } });
      if (existingTask) {
        return res
          .status(400)
          .json({ message: "Ya existe otra tarea con ese título" });
      }
    }

    await task.update({ title, description, isComplete });
    return res
      .status(200)
      .json({ message: "Tarea actualizada exitosamente", task });
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
    return res.status(200).json({ message: "Tarea eliminada exitosamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
