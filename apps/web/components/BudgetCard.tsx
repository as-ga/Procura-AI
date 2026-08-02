import { Card } from "@repo/ui";

interface Props {
  title: string;

  value: string | number;
}

export default function BudgetCard({ title, value }: Props) {
  return (
    <Card className="p-5">
      <p className="text-sm text-zinc-500">{title}</p>

      <h2 className="mt-2 text-3xl font-bold">{value}</h2>
    </Card>
  );
}
