import { randomUUID } from "crypto";
import { redis } from "@/config";
import { Receipt } from "./receipt.types";
import { ApiError } from "@/utils/apiHandler";

const receiptKey = (id: string) => `receipt:${id}`;

export async function saveReceipt(receipt: Receipt) {
  await redis.set(receiptKey(receipt.id), JSON.stringify(receipt));
}

export async function getReceipt(id: string) {
  const receipt = await redis.get(receiptKey(id));
  if (!receipt) throw new ApiError(404, "Receipt not found.");

  return JSON.parse(receipt) as Receipt;
}

export async function createReceipt(
  paymentId: string,
  procurementId: string,
  amount: number
) {
  const receipt: Receipt = {
    id: randomUUID(),
    paymentId,
    procurementId,
    amount,
    currency: "USD",
    status: "SUCCESS",
    paidAt: new Date().toISOString(),
  };

  await saveReceipt(receipt);

  return receipt;
}
