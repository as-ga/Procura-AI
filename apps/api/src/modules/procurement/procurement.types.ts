export type ProcurementStatus = "PLANNED" | "APPROVED" | "PURCHASED" | "FAILED";

export interface ProcurementPlan {
  id: string;
  prompt: string;
  role: string;
  budget: number;
  requiredItems: string[];
  status: ProcurementStatus;
}
