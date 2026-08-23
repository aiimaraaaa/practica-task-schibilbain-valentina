import { body } from "express-validator";
import { UserModel } from "../../models/user.model.js";
import { TaskModel } from "../../models/task.model.js";

export const createUserValidation = [
  body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ max: 100 })
    .withMessage("El nombre no puede superar los 100 caracteres"),

  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("El email debe ser válido")
    .isLength({ max: 100 })
    .withMessage("El email no puede superar los 100 caracteres")
    .custom(async (email) => {
      const user = await UserModel.findOne({ where: { email } });
      if (user) {
        throw new Error("El email ya está registrado");
      }
      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 6, max: 100 })
    .withMessage("La contraseña debe tener entre 6 y 100 caracteres"),
];

export const updateUserValidation = [
  body("name")
    .optional()
    .notEmpty()
    .withMessage("El nombre no puede estar vacío")
    .isLength({ max: 100 })
    .withMessage("El nombre no puede superar los 100 caracteres"),

  body("email")
    .optional()
    .isEmail()
    .withMessage("El email debe ser válido")
    .isLength({ max: 100 })
    .withMessage("El email no puede superar los 100 caracteres")
    .custom(async (email, { req }) => {
      const user = await UserModel.findOne({ where: { email } });
      if (user && user.id !== parseInt(req.params.id)) {
        throw new Error("El email ya está registrado por otro usuario");
      }
      return true;
    }),

  body("password")
    .optional()
    .isLength({ min: 6, max: 100 })
    .withMessage("La contraseña debe tener entre 6 y 100 caracteres"),
];

export const idUserValidation = [
  body("id")
    .isInt({ min: 1 })
    .withMessage("El ID debe ser un número entero positivo")
    .custom(async (id) => {
      const user = await UserModel.findByPk(id);
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      return true;
    }),
];
