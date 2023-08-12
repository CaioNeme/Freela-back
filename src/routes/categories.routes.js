import { Router } from "express";
import { getCategories } from "../controllers/categories.controllers.js";

const categoriesRouter = Router();

categoriesRouter.get("/categories", getCategories);

export default categoriesRouter;
