import { matchedData } from "express-validator";
import { UserModel } from "../models/user.model.js";
import { TaskModel } from "../models/task.model.js";

export const createUser = async (req, res) => {
  try {
    const validatedData = matchedData(req);
    const user = await UserModel.create(validatedData);
    return res.status(201).json({
      message: "Usuario creado exitosamente",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll({
      attributes: { exclude: ["password"] },
      include: [
        {
          model: TaskModel,
          as: "tareas",
          attributes: ["id", "title", "description", "isComplete"],
        },
      ],
    });
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findByPk(id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: TaskModel,
          as: "tareas",
          attributes: ["id", "title", "description", "isComplete"],
        },
      ],
    });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const validatedDataBody = matchedData(req, { locations: ["body"] });
    const { id } = matchedData(req, { locations: ["params"] });

    const userExist = await UserModel.findByPk(id);

    if (!userExist) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await userExist.update(validatedDataBody);

    return res.status(200).json({
      message: "Usuario actualizado exitosamente",
      user: {
        id: userExist.id,
        name: userExist.name,
        email: userExist.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const userExist = await UserModel.findByPk(id);

    if (!userExist) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await userExist.destroy();

    return res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
