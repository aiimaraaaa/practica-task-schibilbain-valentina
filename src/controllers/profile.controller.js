import { ProfileModel } from "../models/profile.model.js";
import { UserModel } from "../models/user.model.js";

export const createProfile = async (req, res) => {
  try {
    const { bio, avatar, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "El userId es obligatorio" });
    }

    const user = await UserModel.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const profile = await ProfileModel.create({ bio, avatar, userId });
    return res.status(201).json({ message: "Perfil creado", profile });
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
