import { Router } from "express";
import validateSchema from "../middlewares/validationSchema.middlewares.js";
import {
  getContract,
  postContract,
  updateContract,
} from "../controllers/contracts.controllers.js";

const contractRouter = Router();

contractRouter.post("/contract/:id", postContract);
contractRouter.get("/contract/:id", getContract);
contractRouter.put("/contract/:id", updateContract);

export default contractRouter;
