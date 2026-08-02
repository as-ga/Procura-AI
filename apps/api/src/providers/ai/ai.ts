import OpenAI from "openai";

import { env } from "@/config";
import { ApiError } from "@/utils/apiHandler";
import {
  PROCUREMENT_SYSTEM_PROMPT,
  PROCUREMENT_REASONING_PROMPT,
} from "./prompts";
import {
  ProcurementBundle,
  ProcurementPlan,
  ProcurementReasoning,
  ProcurementPlannerResult,
} from "@/modules/procurement/procurement.types";

const client = env.OPENAI_BASE_URL
  ? new OpenAI({ apiKey: env.OPENAI_API_KEY, baseURL: env.OPENAI_BASE_URL })
  : new OpenAI({ apiKey: env.OPENAI_API_KEY });

async function generateStructuredOutput<T>(
  systemPrompt: string,
  userPrompt: string,
  schema: { [key: string]: unknown } // JSON Schema object
): Promise<T> {
  try {
    const response = await client.chat.completions.create({
      model: env.OPENAI_MODEL || "gpt-4o-mini",

      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],

      response_format: {
        type: "json_schema",
        json_schema: {
          name: "procurement_response",
          schema: schema,
        },
      },
    });

    const rawContent = response.choices[0]?.message?.content;
    if (!rawContent) {
      throw new ApiError(500, "AI returned an empty response.");
    }

    return JSON.parse(rawContent) as T;
  } catch (error) {
    console.error("Error generating structured output:", error);
    throw new ApiError(500, "AI request failed.");
  }
}

/* =============== Procurement Planning =============== */
const plannerSchema = {
  type: "object",
  properties: {
    role: { type: "string" },
    budget: { type: "number" },
    requiredItems: { type: "array", items: { type: "string" } },
  },
  required: ["role", "budget", "requiredItems"],
  additionalProperties: false,
};
export async function planProcurement(
  prompt: string
): Promise<ProcurementPlannerResult> {
  return generateStructuredOutput<ProcurementPlannerResult>(
    PROCUREMENT_SYSTEM_PROMPT,
    prompt,
    plannerSchema
  );
}

/* =============== Reasoning Generation =============== */
const reasoningSchema = {
  type: "object",
  properties: {
    summary: { type: "string" },
    reasons: { type: "array", items: { type: "string" } },
    tradeoffs: { type: "array", items: { type: "string" } },
  },
  required: ["summary", "reasons", "tradeoffs"],
  additionalProperties: false,
};
export async function generateReasoning(
  plan: ProcurementPlan,
  bundle: ProcurementBundle
): Promise<ProcurementReasoning> {
  const prompt = JSON.stringify({
    role: plan.role,
    budget: plan.budget,
    products: bundle.products,
    totalCost: bundle.totalCost,
    remainingBudget: bundle.remainingBudget,
  });

  return generateStructuredOutput<ProcurementReasoning>(
    PROCUREMENT_REASONING_PROMPT,
    prompt,
    reasoningSchema
  );
}
