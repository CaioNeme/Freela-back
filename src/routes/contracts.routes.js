import { Router } from "express";
import validateSchema from "../middlewares/validationSchema.middlewares.js";
import { postContract } from "../controllers/contracts.controllers.js";

const contractRouter = Router();

contractRouter.post("/contract/:id", postContract);

export default contractRouter;
