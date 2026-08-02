import { Router } from "express";
import * as procurementController from "./procurement.controller";

const router = Router();

router.post("/", procurementController.create);
router.get("/:id", procurementController.get);
router.patch("/:id/approve", procurementController.approve);

export default router;
