import { Router } from "express";
import loginRouter from "./login.routes.js";
import serviceRouter from "./service.routes.js";

const router = Router();

router.use(loginRouter);
router.use(serviceRouter);

export default router;
