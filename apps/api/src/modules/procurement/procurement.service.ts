import { planProcurement, generateReasoning } from "@/providers/ai/ai";
import { products, Product } from "@/data/products";
import { redis } from "@/config";
import { ApiError } from "@/utils/apiHandler";
import {
  ProcurementPlan,
  ProcurementBundle,
  Procurement,
} from "./procurement.types";

const normalize = (value: number, min: number, max: number): number => {
  if (max === min) return 1;
  return (value - min) / (max - min);
};

const calculateProductScore = (
  product: Product,
  categoryProducts: Product[]
): number => {
  const ratingWeight = 0.5;
  const warrantyWeight = 0.3;
  const priceWeight = 0.2;

  const maxPrice = Math.max(...categoryProducts.map((p) => p.price));
  const minPrice = Math.min(...categoryProducts.map((p) => p.price));
  const maxWarranty = Math.max(...categoryProducts.map((p) => p.warranty));
  const minWarranty = Math.min(...categoryProducts.map((p) => p.warranty));
  const normalizedRating = product.rating / 5;

  const normalizedWarranty = normalize(
    product.warranty,
    minWarranty,
    maxWarranty
  );

  const normalizedPrice = normalize(product.price, minPrice, maxPrice);

  return (
    ratingWeight * normalizedRating +
    warrantyWeight * normalizedWarranty -
    priceWeight * normalizedPrice
  );
};

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

async function bundleOptimizerService(
  products: Product[],
  budget: number
): Promise<ProcurementBundle> {
  const bundle: Product[] = [];
  let totalCost = 0;

  const categories = [...new Set(products.map((product) => product.category))];

  for (const category of categories) {
    // Get all products for the current category
    const categoryProducts = products.filter(
      (product) => product.category === category
    );

    // Sort products by score (highest first)
    categoryProducts.sort(
      (a, b) =>
        calculateProductScore(b, categoryProducts) -
        calculateProductScore(a, categoryProducts)
    );

    // Pick the best product that fits within the remaining budget
    const selectedProduct = categoryProducts.find(
      (product) => totalCost + product.price <= budget
    );

    if (!selectedProduct) {
      continue;
    }

    bundle.push(selectedProduct);
    totalCost += selectedProduct.price;
  }

  return {
    products: bundle,
    totalCost,
    remainingBudget: budget - totalCost,
  };
}

async function saveProcurement(procurement: Procurement): Promise<void> {
  await redis.set(`procurement:${procurement.id}`, JSON.stringify(procurement));
}

// =============== Procurement Service =============== /

export async function getProcurement(id: string): Promise<Procurement> {
  const procurement = await redis.get(`procurement:${id}`);
  if (!procurement) throw new ApiError(404, "Procurement not found.");

  return JSON.parse(procurement) as Procurement;
}

export async function updateProcurement(
  procurement: Procurement
): Promise<void> {
  await redis.set(`procurement:${procurement.id}`, JSON.stringify(procurement));
}

export async function createProcurement(prompt: string) {
  const plan = await plannerService(prompt);
  const matchedProducts = await productFinderService(plan.requiredItems);
  const bundle = await bundleOptimizerService(matchedProducts, plan.budget);
  const reasoning = await generateReasoning(plan, bundle);
  const procurement: Procurement = {
    ...plan,
    bundle,
    reasoning,
    status: "PLANNED",
  };

  await saveProcurement(procurement);
  return procurement;
}
