import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";
import ReceiptCard from "@/components/ReceiptCard";

import { receiptApi } from "@/lib/api";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ReceiptPage({ params }: Props) {
  const { id } = await params;

  try {
    const receipt = await receiptApi.get(id);

    return (
      <>
        <Navbar />

        <main className="mx-auto flex min-h-[calc(100vh-64px)] max-w-5xl items-center justify-center px-6 py-10">
          <ReceiptCard receipt={receipt} />
        </main>
      </>
    );
  } catch {
    notFound();
  }
}
