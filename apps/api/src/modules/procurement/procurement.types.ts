import { Product } from "@/data/products";

// export type ProcurementStatus = "PLANNED" | "APPROVED" | "PURCHASED" | "FAILED";
export type ProcurementStatus =
  | "PLANNED"
  | "APPROVED"
  | "PAYMENT_PENDING"
  | "PAID"
  | "FAILED";

export interface ProcurementPlan {
  id: string;
  prompt: string;
  role: string;
  budget: number;
  requiredItems: string[];
  status: ProcurementStatus;
}

export interface ProcurementBundle {
  products: Product[];
  totalCost: number;
  remainingBudget: number;
}

export interface ProcurementReasoning {
  summary: string;
  reasons: string[];
  tradeoffs: string[];
}

export interface ProcurementPlannerResult {
  role: string;
  budget: number;
  requiredItems: string[];
}

export interface Procurement {
  id: string;
  prompt: string;
  role: string;
  budget: number;
  bundle: ProcurementBundle;
  reasoning: ProcurementReasoning;
  status: "PLANNED" | "APPROVED" | "PAID";
  updatedAt?: string;
}
