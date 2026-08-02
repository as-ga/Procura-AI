import { ApiResponse, ApiError } from "@/utils/apiHandler";
import { asyncHandler } from "@/utils/asyncHandler";
import { createProcurementSchema } from "./procurement.schema";
import {
  createProcurement,
  getProcurement,
  updateProcurement,
} from "./procurement.service";

const create = asyncHandler(async (req, res) => {
  const { prompt } = createProcurementSchema.parse(req.body);

  const plan = await createProcurement(prompt);

  return res
    .status(201)
    .json(
      new ApiResponse(201, "Procurement plan generated successfully.", plan)
    );
});

const approve = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const procurement = await getProcurement(String(id));

  if (procurement.status !== "PLANNED") {
    throw new ApiError(400, "Procurement has already been approved.");
  }

  procurement.status = "APPROVED";
  procurement.updatedAt = new Date().toISOString();

  await updateProcurement(procurement);

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Procurement approved successfully.", procurement)
    );
});

export { create, approve };
