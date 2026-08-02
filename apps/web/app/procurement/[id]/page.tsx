import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";
import BudgetCard from "@/components/BudgetCard";
import BundleCard from "@/components/BundleCard";
import ReasoningCard from "@/components/ReasoningCard";
import ApproveButton from "@/components/ApproveButton";

import { procurementApi } from "@/lib/api";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProcurementPage({ params }: Props) {
  const { id } = await params;

  try {
    const res = await procurementApi.get(id);

    const procurement = res.data.data;

    return (
      <>
        <Navbar />

        <main className="mx-auto max-w-7xl space-y-10 px-6 py-10">
          <div>
            <h1 className="text-4xl font-bold">Procurement Summary</h1>

            <p className="mt-2 text-zinc-500">
              AI generated purchasing recommendations.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <BudgetCard title="Budget" value={`$${procurement.budget}`} />

            <BudgetCard
              title="Total Cost"
              value={`$${procurement.bundle.totalCost}`}
            />

            <BudgetCard
              title="Remaining"
              value={`$${procurement.bundle.remainingBudget}`}
            />
          </div>

          <section className="space-y-5">
            <h2 className="text-2xl font-semibold">Recommended Products</h2>

            <BundleCard bundle={procurement.bundle} />
          </section>

          <ReasoningCard reasoning={procurement.reasoning} />

          <ApproveButton procurementId={procurement.id} />
        </main>
      </>
    );
  } catch {
    notFound();
  }
}
