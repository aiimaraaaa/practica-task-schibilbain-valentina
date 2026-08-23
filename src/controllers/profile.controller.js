import { matchedData } from "express-validator";
import { ProfileModel } from "../models/profile.model.js";
import { UserModel } from "../models/user.model.js";

export const createProfile = async (req, res) => {
  try {
    const validatedData = matchedData(req);
    const profile = await ProfileModel.create(validatedData);
    return res.status(201).json({
      message: "Perfil creado exitosamente",
      profile,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getProfiles = async (req, res) => {
  try {
    const profiles = await ProfileModel.findAll({
      include: [
        {
          model: UserModel,
          as: "usuario",
          attributes: ["id", "name", "email"],
        },
      ],
    });
    return res.status(200).json(profiles);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
