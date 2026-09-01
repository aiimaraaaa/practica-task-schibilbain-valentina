import { body, param } from "express-validator";
import { ProfileModel } from "../../models/profile.model.js";
import { UserModel } from "../../models/user.model.js";

export const createProfileValidation = [
  body("bio")
    .optional()
    .isLength({ max: 255 })
    .withMessage("La biografía no puede superar los 255 caracteres"),

  body("avatar")
    .optional()
    .isLength({ max: 255 })
    .withMessage("La URL del avatar no puede superar los 255 caracteres"),

  body("userId")
    .notEmpty()
    .withMessage("El userId es obligatorio")
    .isInt({ min: 1 })
    .withMessage("userId debe ser un número entero positivo")
    .custom(async (userId) => {
      const user = await UserModel.findByPk(userId);
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      const profile = await ProfileModel.findOne({ where: { userId } });
      if (profile) {
        throw new Error("Este usuario ya tiene un perfil");
      }
      return true;
    }),
];

export const updateProfileValidation = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El ID debe ser un número entero positivo")
    .custom(async (id) => {
      const profile = await ProfileModel.findByPk(id);
      if (!profile) {
        throw new Error("Perfil no encontrado");
      }
      return true;
    }),

  body("bio")
    .optional()
    .isLength({ max: 255 })
    .withMessage("La biografía no puede superar los 255 caracteres"),

  body("avatar")
    .optional()
    .isLength({ max: 255 })
    .withMessage("La URL del avatar no puede superar los 255 caracteres"),

  body("userId")
    .optional()
    .isInt({ min: 1 })
    .withMessage("userId debe ser un número entero positivo")
    .custom(async (userId) => {
      const user = await UserModel.findByPk(userId);
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      return true;
    }),
];
