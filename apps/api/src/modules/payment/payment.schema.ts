import { z } from "zod";

export const createPaymentSchema = z.object({
  procurementId: z.string().uuid(),
});
