import type { Product, Currency } from "../types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  onOpen: (product: Product) => void;
  onBuy: (product: Product) => void;
  currency: Currency;
}

export function ProductGrid({ products, onOpen, onBuy, currency }: ProductGridProps) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          currency={currency} // Прокидываем в карточку товара
          onOpen={onOpen}
          onBuy={onBuy}
        />
      ))}
    </div>
  );
}