import { Router } from "express";
import { create, success } from "./payment.controller";

const router = Router();

router.post("/", create);
router.patch("/:id/success", success);

export default router;
