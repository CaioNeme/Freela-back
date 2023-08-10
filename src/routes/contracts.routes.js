import { Router } from "express";
import validateSchema from "../middlewares/validationSchema.middlewares.js";
import {
  getContract,
  postContract,
} from "../controllers/contracts.controllers.js";

const contractRouter = Router();

contractRouter.post("/contract/:id", postContract);
contractRouter.get("/contract/:id", getContract);

export default contractRouter;
