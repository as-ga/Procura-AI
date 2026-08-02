import { Router } from "express";
import { create, get, success } from "./payment.controller";

const router = Router();

router.post("/", create);
router.get("/:id", get);
router.patch("/:id/success", success);

export default router;
