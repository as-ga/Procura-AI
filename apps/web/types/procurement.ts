export interface Product {
  name: string;
  category: string;
  brand: string;
  price: number;
  rating: number;
  warranty: number;
  score: number;
}

export interface Bundle {
  products: Product[];
  totalCost: number;
  remainingBudget: number;
}

export interface Reasoning {
  summary: string;
  advantages: string[];
  tradeoffs: string[];
}

export interface Procurement {
  id: string;
  prompt: string;
  budget: number;
  role: string;
  requiredItems: string[];
  status: "PLANNED" | "APPROVED" | "PAID";
  bundle: Bundle;
  reasoning: Reasoning;
}
