import { planProcurement } from "@/providers/ai/ai";
import { ProcurementPlan } from "./procurement.types";
import { products } from "@/data/products";

async function plannerService(prompt: string): Promise<ProcurementPlan> {
  const result = await planProcurement(prompt);
  return {
    id: crypto.randomUUID(),
    prompt,
    role: result.role,
    budget: result.budget,
    requiredItems: result.requiredItems,
    status: "PLANNED",
  };
}

async function productFinderService(requiredItems: string[]) {
  return products.filter((product) => requiredItems.includes(product.category));
}

export async function createProcurement(prompt: string) {
  const plan = await plannerService(prompt);
  const matchedProducts = await productFinderService(plan.requiredItems);

  return { ...plan, products: matchedProducts };
}
