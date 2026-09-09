import type { Product, Currency } from "../types";
import { getProductImages } from "../utils";

interface ProductCardProps {
  product: Product;
  currency: Currency;
  onOpen: (product: Product) => void;
  onBuy: (product: Product) => void;
}

export function ProductCard({ product, currency, onOpen, onBuy }: ProductCardProps) {
  const cover = getProductImages(product)[0];

  // Функция для получения цены под выбранную валюту
  const getPriceValue = (priceProp: number | { RUB: number; BYN: number; KZT: number }) => {
    if (typeof priceProp === "number") {
      return priceProp;
    }
    return priceProp[currency] ?? priceProp.RUB;
  };

  const currentPrice = getPriceValue(product.price);
  const currentOldPrice = product.oldPrice ? getPriceValue(product.oldPrice) : null;

  const formatPriceVal = (val: number) => {
    switch (currency) {
      case 'BYN': return `${val} Br`;
      case 'KZT': return `${val.toLocaleString()} ₸`;
      default: return `${val.toLocaleString()} ₽`;
    }
  };

  return (
    <article className="product-card">
      <button
        type="button"
        className="product-card__image-wrap"
        onClick={() => onOpen(product)}
        aria-label={`Открыть карточку товара: ${product.name}`}
        style={{ border: "none", padding: 0 }}
      >
        <img src={cover} alt={product.name} loading="lazy" />
      </button>

      <div className="product-card__body">
        <span className="product-card__category">{product.category}</span>
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__desc">{product.description}</p>

        <div className="product-card__price">
          <span>{formatPriceVal(currentPrice)}</span>
          {currentOldPrice && (
            <span className="product-card__price-old">
              {formatPriceVal(currentOldPrice)}
            </span>
          )}
        </div>
      </div>

      <div className="product-card__actions">
        <button
          type="button"
          className="btn btn--outline"
          onClick={() => onOpen(product)}
        >
          Подробнее
        </button>
        <button
          type="button"
          className="btn btn--solid"
          onClick={() => onBuy(product)}
        >
          Купить
        </button>
      </div>
    </article>
  );
}