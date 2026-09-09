import type { Product } from "./types";

export function getProductImages(product: Product): string[] {
  return Array.from(
    { length: product.imageCount },
    (_, i) => `/images/${product.imageFolder}/${i + 1}.png`
  );
}

export function formatPrice(value: number): string {
  return `${value.toLocaleString("ru-RU")} ₽`;
}
