import OpenAI from "openai";

import { env } from "@/config/env";
import { PROCUREMENT_SYSTEM_PROMPT } from "./prompts";
import { ApiError } from "@/utils/apiHandler";

const client = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

interface ProcurementPlannerResponse {
  role: string;
  budget: number;
  requiredItems: string[];
}

export async function planProcurement(
  prompt: string
): Promise<ProcurementPlannerResponse> {
  try {
    const response = await client.responses.create({
      model: "gpt-4.1-mini",

      input: [
        { role: "system", content: PROCUREMENT_SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],

      text: {
        format: {
          type: "json_schema",
          name: "procurement_plan",
          strict: true,
          schema: {
            type: "object",
            properties: {
              role: { type: "string" },
              budget: { type: "number" },
              requiredItems: { type: "array", items: { type: "string" } },
            },
            required: ["role", "budget", "requiredItems"],
            additionalProperties: false,
          },
        },
      },
    });

    return JSON.parse(response.output_text);
  } catch (error) {
    throw new ApiError(500, "Failed to generate procurement plan.");
  }
}
