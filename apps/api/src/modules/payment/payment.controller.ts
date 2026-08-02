import { asyncHandler } from "@/utils/asyncHandler";
import { ApiError, ApiResponse } from "@/utils/apiHandler";
import { getProcurement } from "@/modules/procurement/procurement.service";

import { createPaymentSchema } from "./payment.schema";
import { createPravaSession } from "./payment.service";

import { createReceipt } from "@/modules/receipt/receipt.service";
import { getPayment, savePayment } from "./payment.service";

const create = asyncHandler(async (req, res) => {
  const { procurementId } = createPaymentSchema.parse(req.body);
  if (!procurementId) throw new ApiError(400, "Procurement ID is required.");

  const procurement = await getProcurement(procurementId);

  if (procurement.status !== "APPROVED") {
    throw new ApiError(400, "Procurement must be approved before payment.");
  }

  const payment = await createPravaSession(
    procurement.id,
    procurement.bundle.totalCost
  );

  if (!payment) throw new ApiError(500, "Failed to create payment session.");
  return res
    .status(201)
    .json(
      new ApiResponse(201, "Payment session created successfully.", payment)
    );
});

const get = asyncHandler(async (req, res) => {
  const { id } = req.params as { id: string };

  const payment = await getPayment(id);

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Payment session retrieved successfully.", payment)
    );
});

const success = asyncHandler(async (req, res) => {
  const { id } = req.params as { id: string };

  const payment = await getPayment(id);

  if (payment.status === "SUCCESS") {
    throw new ApiError(400, "Payment already completed.");
  }

  payment.status = "SUCCESS";
  payment.updatedAt = new Date().toISOString();

  await savePayment(payment);

  const receipt = await createReceipt(
    payment.id,
    payment.procurementId,
    payment.amount
  );

  return res.status(200).json(
    new ApiResponse(200, "Payment completed successfully.", {
      payment,
      receipt,
    })
  );
});

export { create, get, success };
