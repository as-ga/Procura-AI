import { createProcurementSchema } from "./procurement.schema";
import { createProcurement } from "./procurement.service";

import { asyncHandler } from "@/utils/asyncHandler";
import { ApiResponse } from "@/utils/apiHandler";

const create = asyncHandler(async (req, res) => {
  const { prompt } = createProcurementSchema.parse(req.body);

  const plan = await createProcurement(prompt);

  return res
    .status(201)
    .json(
      new ApiResponse(201, "Procurement plan generated successfully.", plan)
    );
});

export { create };
