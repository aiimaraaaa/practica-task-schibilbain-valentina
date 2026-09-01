import { body, param } from "express-validator";
import { TagModel } from "../../models/tag.model.js";

export const createTagValidation = [
  body("name")
    .notEmpty()
    .withMessage("El nombre de la etiqueta es obligatorio")
    .isLength({ max: 50 })
    .withMessage("El nombre no puede superar los 50 caracteres")
    .custom(async (name) => {
      const tag = await TagModel.findOne({ where: { name } });
      if (tag) {
        throw new Error("Ya existe una etiqueta con ese nombre");
      }
      return true;
    }),
];

export const updateTagValidation = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El ID debe ser un número entero positivo")
    .custom(async (id) => {
      const tag = await TagModel.findByPk(id);
      if (!tag) {
        throw new Error("Etiqueta no encontrada");
      }
      return true;
    }),

  body("name")
    .optional()
    .notEmpty()
    .withMessage("El nombre no puede estar vacío")
    .isLength({ max: 50 })
    .withMessage("El nombre no puede superar los 50 caracteres")
    .custom(async (name, { req }) => {
      const tag = await TagModel.findOne({ where: { name } });
      if (tag && tag.id !== parseInt(req.params.id)) {
        throw new Error("Ya existe otra etiqueta con ese nombre");
      }
      return true;
    }),
];
