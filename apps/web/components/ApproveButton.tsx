"use client";

import { useRouter } from "next/navigation";
import { Button } from "@repo/ui";
import { paymentApi, procurementApi } from "@/lib/api";

interface Props {
  procurementId: string;
}

export default function ApproveButton({ procurementId }: Props) {
  const router = useRouter();

  async function handleApprove() {
    await procurementApi.approve(procurementId);
    const payment = await paymentApi.create(procurementId);
    router.push(`/payment/${payment.data.data.id}`);
  }

  return (
    <Button onClick={handleApprove} className="w-full">
      Approve Procurement
    </Button>
  );
}
