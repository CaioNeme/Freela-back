import { Router } from "express";
import loginRouter from "./login.routes.js";
import serviceRouter from "./service.routes.js";
import contractRouter from "./contracts.routes.js";
import categoriesRouter from "./categories.routes.js";
import rangeRouter from "./range.routes.js";

const router = Router();

router.use(loginRouter);
router.use(serviceRouter);
router.use(contractRouter);
router.use(categoriesRouter);
router.use(rangeRouter);

export default router;
