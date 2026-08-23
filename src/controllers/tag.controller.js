import { matchedData } from "express-validator";
import { TagModel } from "../models/tag.model.js";
import { TaskModel } from "../models/task.model.js";

export const createTag = async (req, res) => {
  try {
    const validatedData = matchedData(req);
    const tag = await TagModel.create(validatedData);
    return res.status(201).json({
      message: "Etiqueta creada exitosamente",
      tag,
    });
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
