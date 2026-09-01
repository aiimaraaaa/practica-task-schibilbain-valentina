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

export const updateProfile = async (req, res) => {
  try {
    const validatedDataBody = matchedData(req, { locations: ["body"] });
    const { id } = matchedData(req, { locations: ["params"] });

    const profileExist = await ProfileModel.findByPk(id);

    if (!profileExist) {
      return res.status(404).json({ message: "Perfil no encontrado" });
    }

    await profileExist.update(validatedDataBody);

    return res.status(200).json({
      message: "Perfil actualizado exitosamente",
      profile: profileExist,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const profileExist = await ProfileModel.findByPk(id);

    if (!profileExist) {
      return res.status(404).json({ message: "Perfil no encontrado" });
    }

    await profileExist.destroy();

    return res.status(200).json({ message: "Perfil eliminado exitosamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
