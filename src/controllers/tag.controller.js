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

export const updateTag = async (req, res) => {
  try {
    const validatedDataBody = matchedData(req, { locations: ["body"] });
    const { id } = matchedData(req, { locations: ["params"] });

    const tagExist = await TagModel.findByPk(id);

    if (!tagExist) {
      return res.status(404).json({ message: "Etiqueta no encontrada" });
    }

    await tagExist.update(validatedDataBody);

    return res.status(200).json({
      message: "Etiqueta actualizada exitosamente",
      tag: tagExist,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;

    const tagExist = await TagModel.findByPk(id);

    if (!tagExist) {
      return res.status(404).json({ message: "Etiqueta no encontrada" });
    }

    await tagExist.destroy();

    return res.status(200).json({ message: "Etiqueta eliminada exitosamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
