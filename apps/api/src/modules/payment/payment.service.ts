import axios from "axios";
import { randomUUID } from "crypto";

import { env, redis } from "@/config";
import { ApiError } from "@/utils/apiHandler";

import { Payment } from "./payment.types";

function paymentKey(id: string) {
  return `payment:${id}`;
}

export async function savePayment(payment: Payment) {
  await redis.set(paymentKey(payment.id), JSON.stringify(payment));
}

export async function getPayment(id: string) {
  const payment = await redis.get(paymentKey(id));

  if (!payment) {
    throw new ApiError(404, "Payment not found.");
  }

  return JSON.parse(payment) as Payment;
}

export async function createPravaSession(
  procurementId: string,
  amount: number
): Promise<Payment> {
  const now = new Date().toISOString();

  try {
    const { data } = await axios.post(
      `${env.PRAVA_BASE_URL}/sessions`,
      {
        user_id: procurementId,
        user_email: "ashutosh@example.com",
        total_amount: amount.toFixed(2),
        currency: "USD",
        merchant_details: {
          name: "Procura AI",
          url: "https://procura-ai.vercel.app",
          country_code_iso2: "IN",
        },
        product_details: [
          {
            description: "AI Procurement Order",
            unit_price: amount.toFixed(2),
            quantity: 1,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${env.PRAVA_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const payment: Payment = {
      id: randomUUID(),
      procurementId,
      amount,
      sessionToken: data.session_token,
      iframeUrl: data.iframe_url,
      status: "PENDING",
      createdAt: now,
      updatedAt: now,
    };

    await savePayment(payment);

    return payment;
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Failed to create Prava session.");
  }
}
