import { asyncHandler } from "@/utils/asyncHandler";
import { ApiError, ApiResponse } from "@/utils/apiHandler";
import { getProcurement } from "@/modules/procurement/procurement.service";

import { createPaymentSchema } from "./payment.schema";
import { createPravaSession } from "./payment.service";

const create = asyncHandler(async (req, res) => {
  const { procurementId } = createPaymentSchema.parse(req.body);

  const procurement = await getProcurement(procurementId);

  if (procurement.status !== "APPROVED") {
    throw new ApiError(400, "Procurement must be approved before payment.");
  }

  const payment = await createPravaSession(
    procurement.id,
    procurement.bundle.totalCost
  );

  return res
    .status(201)
    .json(
      new ApiResponse(201, "Payment session created successfully.", payment)
    );
});

export { create };
