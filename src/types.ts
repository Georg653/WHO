export type Currency = 'RUB' | 'BYN' | 'KZT';

export interface Product {
  id: string;
  /** Folder name under /public/images/, e.g. "hoodie-who" */
  imageFolder: string;
  /** How many images live in that folder, named 1.svg, 2.svg, 3.svg ... */
  imageCount: number;
  name: string;
  /** Артикул / SKU shown under the product name */
  sku: string;
  category: string;
  /** Short poetic line shown on the card and under the description on the product page */
  description: string;
  
  /** Цена может быть числом (для ₽ по умолчанию) или объектом с разными валютами */
  price: number | {
    RUB: number;
    BYN: number;
    KZT: number;
  };
  
  oldPrice?: number | {
    RUB: number;
    BYN: number;
    KZT: number;
  };

  sizes: string[];
  /** Bullet-style spec lines: material, fit, dimensions, weight, etc. */
  details: string[];
}