import { asyncHandler } from "@/utils/asyncHandler";
import { ApiResponse } from "@/utils/apiHandler";

import { getReceipt } from "./receipt.service";

const getById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const receipt = await getReceipt(String(id));

  return res
    .status(200)
    .json(new ApiResponse(200, "Receipt fetched successfully.", receipt));
});

export { getById };
