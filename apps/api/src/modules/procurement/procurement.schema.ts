import { z } from "zod";

export const createProcurementSchema = z.object({
  prompt: z
    .string({ error: "prompt is required" })
    .trim()
    .min(10, "Prompt must be at least 10 characters.")
    .max(500, "Prompt must be at most 500 characters."),
});

export type CreateProcurementInput = z.infer<typeof createProcurementSchema>;
