import { Router } from "express";
import validateSchema from "../middlewares/validationSchema.middlewares.js";
import {
  getContract,
  postContract,
  updateContract,
} from "../controllers/contracts.controllers.js";
import {
  contractPutSchema,
  contractSchema,
} from "../schemas/contracts.schemas.js";

const contractRouter = Router();

contractRouter.post(
  "/contract/:id",
  validateSchema(contractSchema),
  postContract
);
contractRouter.put(
  "/contract/:id",
  validateSchema(contractPutSchema),
  updateContract
);
contractRouter.get("/contract", getContract);

export default contractRouter;
