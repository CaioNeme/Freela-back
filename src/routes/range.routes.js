import { Router } from "express";
import { getRange } from "../controllers/range.controllers.js";

const rangeRouter = Router();

rangeRouter.get("/range", getRange);

export default rangeRouter;
