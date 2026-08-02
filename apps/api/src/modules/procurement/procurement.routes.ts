import { Router } from "express";
import * as procurementController from "./procurement.controller";

const router = Router();

router.post("/", procurementController.create);

export default router;
