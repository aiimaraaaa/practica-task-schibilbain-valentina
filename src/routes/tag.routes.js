import { Router } from "express";
import {
  createTag,
  getTags,
  updateTag,
  deleteTag,
} from "../controllers/tag.controller.js";
import { validate } from "../middlewares/validate.js";
import {
  createTagValidation,
  updateTagValidation,
} from "../middlewares/validations/tag.validation.js";

export const tagRouter = Router();

tagRouter.post("/tags", createTagValidation, validate, createTag);
tagRouter.get("/tags", getTags);
tagRouter.put("/tags/:id", updateTagValidation, validate, updateTag);
tagRouter.delete("/tags/:id", deleteTag);
