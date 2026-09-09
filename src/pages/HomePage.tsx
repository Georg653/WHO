import { useMemo, useState } from "react";
import { HeroBanner } from "../components/HeroBanner";
import { ProductGrid } from "../components/ProductGrid";
import { SearchBar } from "../components/SearchBar";
import { products } from "../data/products";
import type { Product, Currency } from "../types";

interface HomePageProps {
  onOpenProduct: (product: Product) => void;
  onBuy: (product: Product) => void;
  currency: Currency; // Принимаем текущую валюту
}

function normalize(value: string) {
  return value.trim().toUpperCase().replace(/\s+/g, "");
}

/**
 * Настоящий поиск по каталогу: ищет частичное совпадение по названию,
 * категории, описанию, артикулу — а также по артикулу с размером на конце
 * (например, "WHO-HD-001-XL"), потому что именно так артикул показывается
 * на странице товара, и его же копируют в поиск.
 */
function matchesQuery(product: Product, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;

  const haystacks = [product.name, product.category, product.description, product.sku];
  if (haystacks.some((field) => field.toLowerCase().includes(q))) {
    return true;
  }

  return extractSizeForProduct(product, query) !== undefined;
}

/**
 * Если запрос выглядит как "АРТИКУЛ-РАЗМЕР" (например "WHO-HD-001-XL")
 * и артикул относится именно к этому товару — возвращает распознанный
 * размер. Используется и для фильтрации, и для того, чтобы сразу
 * прикрепить правильный размер к товару (см. filteredProducts ниже),
 * независимо от того, как товар открыли: кликом по карточке или
 * кнопкой «Найти».
 */
function extractSizeForProduct(product: Product, query: string): string | undefined {
  const q = normalize(query);
  if (!q) return undefined;

  const baseSku = normalize(product.sku);
  if (!q.startsWith(baseSku + "-")) return undefined;

  const sizePart = q.slice(baseSku.length + 1);
  return product.sizes.find((s) => normalize(s) === sizePart);
}

/**
 * Пытается распознать в запросе точный артикул, включая опциональный
 * размер на конце ("WHO-HD-001-M"). Используется при сабмите
 * (Enter / кнопка «Найти»), чтобы сразу открыть карточку товара с нужным размером.
 */
function findExactProductBySku(query: string): { product: Product; size?: string } | null {
  const q = normalize(query);
  if (!q) return null;

  for (const product of products) {
    const baseSku = normalize(product.sku);

    if (q === baseSku) {
      return { product };
    }

    if (q.startsWith(baseSku + "-")) {
      const size = extractSizeForProduct(product, query);
      return { product, size };
    }
  }

  return null;
}

export function HomePage({ onOpenProduct, onBuy, currency }: HomePageProps) {
  const [query, setQuery] = useState("");
  const [searchError, setSearchError] = useState<string | null>(null);

  // Товары, отфильтрованные по запросу. Если запрос содержит артикул с
  // размером (например "WHO-TS-001-2XL"), сразу прикрепляем этот размер
  // к товару как initialSize — тогда независимо от того, кликнет ли
  // пользователь по самой карточке или по кнопке «Найти», на странице
  // товара откроется правильный размер, а не всегда "S" по умолчанию.
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => matchesQuery(p, query))
      .map((p) => {
        const size = extractSizeForProduct(p, query);
        return size ? { ...p, initialSize: size } : p;
      });
  }, [query]);

  const handleChange = (value: string) => {
    setQuery(value);
    setSearchError(null);
  };

  const handleSubmit = (value: string) => {
    // Сначала пробуем распознать точный артикул (+ размер) — если да, открываем товар сразу
    const exact = findExactProductBySku(value);
    if (exact) {
      setSearchError(null);
      const productToOpen: Product = exact.size
        ? { ...exact.product, initialSize: exact.size }
        : exact.product;
      onOpenProduct(productToOpen);
      return;
    }

    // Иначе — это обычный текстовый поиск, просто фильтруем каталог
    const matches = products.filter((p) => matchesQuery(p, value));
    setSearchError(matches.length === 0 ? `По запросу «${value.trim()}» ничего не найдено` : null);
  };

  return (
    <>
      <HeroBanner />

      <main className="catalog">
        <div className="catalog__header">
          <div className="catalog__intro">
            <h1 className="catalog__heading">Новая коллекция</h1>
            <p className="catalog__sub">
              <span className="catalog__sub-full">
                Простые формы, честные ткани, без лишних слов
              </span>
              <span className="catalog__sub-short">Просто. Честно. Без лишнего</span>
            </p>
          </div>

          <SearchBar
            value={query}
            onChange={handleChange}
            onSubmit={handleSubmit}
            error={searchError}
          />
        </div>

        {filteredProducts.length > 0 ? (
          <ProductGrid
            products={filteredProducts}
            onOpen={onOpenProduct}
            onBuy={onBuy}
            currency={currency} // Передаем дальше в сетку товаров
          />
        ) : (
          <p className="catalog__empty">Ничего не найдено. Попробуйте изменить запрос.</p>
        )}
      </main>
    </>
  );
}