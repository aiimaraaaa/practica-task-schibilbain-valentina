import { body, param } from "express-validator";
import { TaskModel } from "../../models/task.model.js";
import { UserModel } from "../../models/user.model.js";

export const createTaskValidation = [
  body("title")
    .notEmpty()
    .withMessage("El título es obligatorio")
    .isLength({ max: 100 })
    .withMessage("El título no puede superar los 100 caracteres")
    .custom(async (title) => {
      const task = await TaskModel.findOne({ where: { title } });
      if (task) {
        throw new Error("Ya existe una tarea con ese título");
      }
      return true;
    }),

  body("description")
    .notEmpty()
    .withMessage("La descripción es obligatoria")
    .isLength({ max: 100 })
    .withMessage("La descripción no puede superar los 100 caracteres"),

  body("isComplete")
    .optional()
    .isBoolean()
    .withMessage("isComplete debe ser un valor booleano"),

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
      return true;
    }),
];

export const updateTaskValidation = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El ID debe ser un número entero positivo")
    .custom(async (id) => {
      const task = await TaskModel.findByPk(id);
      if (!task) {
        throw new Error("Tarea no encontrada");
      }
      return true;
    }),

  body("title")
    .optional()
    .notEmpty()
    .withMessage("El título no puede estar vacío")
    .isLength({ max: 100 })
    .withMessage("El título no puede superar los 100 caracteres")
    .custom(async (title, { req }) => {
      const task = await TaskModel.findOne({ where: { title } });
      if (task && task.id !== parseInt(req.params.id)) {
        throw new Error("Ya existe otra tarea con ese título");
      }
      return true;
    }),

  body("description")
    .optional()
    .notEmpty()
    .withMessage("La descripción no puede estar vacía")
    .isLength({ max: 100 })
    .withMessage("La descripción no puede superar los 100 caracteres"),

  body("isComplete")
    .optional()
    .isBoolean()
    .withMessage("isComplete debe ser un valor booleano"),

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
