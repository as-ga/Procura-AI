import { Router } from "express";
import procurementRoutes from "@/modules/procurement/procurement.routes";
import paymentRoutes from "@/modules/payment/payment.routes";
import receiptRoutes from "@/modules/receipt/receipt.routes";

const router = Router();

router.use("/procurements", procurementRoutes);
router.use("/payments", paymentRoutes);
router.use("/receipts", receiptRoutes);

export default router;
