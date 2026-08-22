import { Router } from "express";
import { createTag, getTags } from "../controllers/tag.controller.js";

export const tagRouter = Router();

tagRouter.post("/tags", createTag);
tagRouter.get("/tags", getTags);
