import { Card } from "@repo/ui";

import { Reasoning } from "@/types/procurement";

interface Props {
  reasoning: Reasoning;
}

export default function ReasoningCard({ reasoning }: Props) {
  return (
    <Card className="space-y-6 p-6">
      <div>
        <h2 className="text-xl font-semibold">AI Reasoning</h2>

        <p className="mt-3 text-zinc-400">{reasoning.summary}</p>
      </div>

      <div>
        <h3 className="font-medium">Advantages</h3>

        <ul className="mt-2 list-disc space-y-2 pl-5 text-zinc-400">
          {reasoning.advantages.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-medium">Tradeoffs</h3>

        <ul className="mt-2 list-disc space-y-2 pl-5 text-zinc-400">
          {reasoning.tradeoffs.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
