import { Router } from "express";
import loginRouter from "./login.routes.js";
import serviceRouter from "./service.routes.js";
import contractRouter from "./contracts.routes.js";

const router = Router();

router.use(loginRouter);
router.use(serviceRouter);
router.use(contractRouter);

export default router;
