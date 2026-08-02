import { Router } from "express";
import { create } from "./payment.controller";

const router = Router();

router.post("/", create);

export default router;
