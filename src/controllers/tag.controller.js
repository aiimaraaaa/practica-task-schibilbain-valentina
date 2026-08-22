import { TagModel } from "../models/tag.model.js";
import { TaskModel } from "../models/task.model.js";

export const createTag = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ message: "El nombre de la etiqueta es obligatorio" });
    }

    const tag = await TagModel.create({ name });
    return res.status(201).json({ message: "Etiqueta creada", tag });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getTags = async (req, res) => {
  try {
    const tags = await TagModel.findAll({
      include: [
        {
          model: TaskModel,
          as: "tareas",
          attributes: ["id", "title"],
        },
      ],
    });
    return res.status(200).json(tags);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
