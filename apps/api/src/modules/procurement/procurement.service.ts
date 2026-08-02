import { ProcurementPlan } from "./procurement.types";
import { ApiError } from "@/utils/apiHandler";

export async function plannerService(prompt: string): Promise<ProcurementPlan> {
  // TODO:
  // OpenAI Integration

  return {
    id: crypto.randomUUID(),
    prompt,
    role: "Frontend Developer",
    budget: 80000,
    requiredItems: ["Laptop", "Monitor", "Keyboard", "Mouse"],
    status: "PLANNED",
  };
}

export async function productFinderService() {
  // TODO
}

export async function bundleOptimizerService() {
  // TODO
}

export async function reasoningService() {
  // TODO
}

export async function createProcurement(prompt: string) {
  // const plan = await plannerService(prompt);

  // if (!plan) throw new ApiError(500, "Failed to generate procurement plan.");

  return {
    id: crypto.randomUUID(),
    prompt,
    role: "Frontend Developer",
    budget: 80000,
    requiredItems: ["Laptop", "Monitor", "Keyboard", "Mouse"],
    status: "PLANNED",
  };
}
