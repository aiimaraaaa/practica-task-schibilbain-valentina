import { Router } from "express";
import { createTag, getTags } from "../controllers/tag.controller.js";
import { validate } from "../middlewares/validate.js";
import { createTagValidation } from "../middlewares/validations/tag.validation.js";

export const tagRouter = Router();

tagRouter.post("/tags", createTagValidation, validate, createTag);
tagRouter.get("/tags", getTags);
