import ProductCard from "./ProductCard";

import { Bundle } from "@/types/procurement";

interface Props {
  bundle: Bundle;
}

export default function BundleCard({ bundle }: Props) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {bundle.products.map((product) => (
        <ProductCard key={product.name} product={product} />
      ))}
    </div>
  );
}
