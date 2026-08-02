import { Star } from "lucide-react";

import { Card } from "@repo/ui";

import { Product } from "@/types/procurement";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Card className="space-y-4 p-5">
      <div>
        <h3 className="text-lg font-semibold">{product.name}</h3>

        <p className="text-sm text-zinc-500">{product.brand}</p>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">${product.price}</span>

        <span className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

          {product.rating}
        </span>
      </div>

      <div className="text-xs text-zinc-500">
        Warranty {product.warranty} years
      </div>
    </Card>
  );
}
