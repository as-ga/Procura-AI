import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";
import PravaCheckout from "@/components/PravaCheckout";

import { paymentApi } from "@/lib/api";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PaymentPage({ params }: Props) {
  const { id } = await params;

  try {
    const payment = await paymentApi.get(id);

    return (
      <>
        <Navbar />
        <main className="mx-auto max-w-4xl px-6 py-10">
          <PravaCheckout payment={payment} />
        </main>
      </>
    );
  } catch {
    notFound();
  }
}
