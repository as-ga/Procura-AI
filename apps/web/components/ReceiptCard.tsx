import { CheckCircle2, ReceiptText } from "lucide-react";

import { Card, Button } from "@repo/ui";

import { Receipt } from "@/types/receipt";

interface Props {
  receipt: Receipt;
}

export default function ReceiptCard({ receipt }: Props) {
  return (
    <Card className="mx-auto max-w-2xl space-y-8 p-8">
      <div className="flex flex-col items-center text-center">
        <CheckCircle2 className="mb-4 h-16 w-16 text-green-500" />

        <h1 className="text-3xl font-bold">Payment Successful</h1>

        <p className="mt-2 text-zinc-500">
          Your procurement has been completed successfully.
        </p>
      </div>

      <div className="space-y-4 rounded-xl border border-zinc-800 p-5">
        <InfoRow label="Receipt ID" value={receipt.id} />

        <InfoRow label="Payment ID" value={receipt.paymentId} />

        <InfoRow label="Procurement ID" value={receipt.procurementId} />

        <InfoRow label="Amount" value={`$${receipt.amount}`} />

        <InfoRow label="Currency" value={receipt.currency} />

        <InfoRow label="Status" value={receipt.status} />

        <InfoRow
          label="Paid At"
          value={new Date(receipt.paidAt).toLocaleString()}
        />
      </div>

      <Button className="w-full">
        <ReceiptText className="mr-2 h-4 w-4" />
        Download Receipt
      </Button>
    </Card>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-zinc-800 pb-3 last:border-none">
      <span className="text-zinc-500">{label}</span>

      <span className="font-medium">{value}</span>
    </div>
  );
}
