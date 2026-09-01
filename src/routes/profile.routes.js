import { Router } from "express";
import {
  createProfile,
  getProfiles,
  updateProfile,
  deleteProfile,
} from "../controllers/profile.controller.js";
import { validate } from "../middlewares/validate.js";
import {
  createProfileValidation,
  updateProfileValidation,
} from "../middlewares/validations/profile.validation.js";

export const profileRouter = Router();

profileRouter.post(
  "/profiles",
  createProfileValidation,
  validate,
  createProfile,
);
profileRouter.get("/profiles", getProfiles);
profileRouter.put(
  "/profiles/:id",
  updateProfileValidation,
  validate,
  updateProfile,
);
profileRouter.delete("/profiles/:id", deleteProfile);
