"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Card } from "@repo/ui";
import { paymentApi } from "@/lib/api";
import { Payment } from "@/types/payment";

import { PravaSDK } from "@prava-sdk/core";
interface Props {
  payment: Payment;
}

export default function PravaCheckout({ payment }: Props) {
  const router = useRouter();

  useEffect(() => {
    async function initializePrava() {
      try {
        const prava = new PravaSDK({
          publishableKey: process.env.NEXT_PUBLIC_PRAVA_PUBLISHABLE_KEY!,
        });

        await prava.collectPAN({
          sessionToken: payment.sessionToken,
          iframeUrl: payment.iframeUrl,
          container: "#card-form",

          onSuccess: async (card) => {
            console.log("Prava Card:", card);

            /**
             * TODO:
             * Call backend endpoint that reports APPROVED status to Prava
             * before marking the payment as successful.
             *
             * POST /api/payments/:id/report-status
             */

            const result = await paymentApi.success(payment.id);

            router.replace(`/receipt/${result.receipt.id}`);
          },

          onError: (error) => {
            console.error("Prava Error:", error);
          },
        });
      } catch (error) {
        console.error("Failed to initialize Prava:", error);
      }
    }

    initializePrava();
  }, [payment, router]);

  return (
    <Card className="space-y-6 p-8">
      <div>
        <h1 className="text-2xl font-semibold">Complete Payment</h1>

        <p className="mt-2 text-zinc-500">Secure checkout powered by Prava.</p>
      </div>

      <div
        id="card-form"
        className="min-h-[320px] rounded-xl border border-zinc-800"
      />
    </Card>
  );
}
