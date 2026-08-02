"use client";

import { useRouter } from "next/navigation";
import { Button } from "@repo/ui";
import { paymentApi, procurementApi } from "@/lib/api";
import { useState } from "react";

interface Props {
  procurementId: string;
  status: "PLANNED" | "APPROVED" | "PAID";
}

export default function ApproveButton({ procurementId, status }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleApprove() {
    try {
      setIsLoading(true);
      await procurementApi.approve(procurementId);
      const payment = await paymentApi.create(procurementId);
      router.push(`/payment/${payment.id}`);
    } finally {
      setIsLoading(false);
    }
  }

  async function createPayment() {
    try {
      setIsLoading(true);
      const payment = await paymentApi.create(procurementId);
      router.push(`/payment/${payment.id}`);
    } finally {
      setIsLoading(false);
    }
  }

  if (status == "PLANNED") {
    return (
      <Button
        onClick={handleApprove}
        disabled={isLoading}
        className="w-full hover:cursor-pointer p-2.5 hover:bg-blue-700"
      >
        {isLoading ? "Approving..." : "Approve Procurement"}
      </Button>
    );
  } else if (status == "APPROVED") {
    return (
      <Button
        onClick={createPayment}
        disabled={isLoading}
        className="w-full hover:cursor-pointer p-2.5 hover:bg-blue-700"
      >
        {isLoading ? "Creating Payment..." : "Create Payment"}
      </Button>
    );
  } else {
    return <p>You Procurement Approve and Payment created</p>;
  }
}
