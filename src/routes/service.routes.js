import { Router } from "express";
import validateSchema from "../middlewares/validationSchema.middlewares.js";
import {
  createService,
  deleteService,
  getAllServices,
  serviceById,
  serviceByUserId,
  updateService,
} from "../controllers/service.controllers.js";
import { createServiceSchema } from "../schemas/service.schemas.js";

const serviceRouter = Router();

serviceRouter.post(
  "/service",
  validateSchema(createServiceSchema),
  createService
);
serviceRouter.get("/home", getAllServices);
serviceRouter.get("/service/:id", serviceById);
serviceRouter.put("/service/:id", updateService);
serviceRouter.delete("/service/:id", deleteService);
serviceRouter.get("/users/:id", serviceByUserId);

export default serviceRouter;
