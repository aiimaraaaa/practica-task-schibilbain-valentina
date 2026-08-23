import { Router } from "express";
import {
  createProfile,
  getProfiles,
} from "../controllers/profile.controller.js";
import { validate } from "../middlewares/validate.js";
import { createProfileValidation } from "../middlewares/validations/profile.validation.js";

export const profileRouter = Router();

profileRouter.post(
  "/profiles",
  createProfileValidation,
  validate,
  createProfile,
);
profileRouter.get("/profiles", getProfiles);
