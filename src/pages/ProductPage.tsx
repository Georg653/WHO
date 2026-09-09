import { useEffect, useState } from "react";
import { TELEGRAM_USERNAME } from "../data/products";
import type { Product, Currency } from "../types";
import { getProductImages } from "../utils";
import { ProductGallery } from "../components/ProductGallery";

interface ProductPageProps {
  product: Product;
  onBack: () => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
}

function resolveInitialSize(product: Product): string {
  if (product.initialSize && product.sizes.includes(product.initialSize)) {
    return product.initialSize;
  }
  return "S";
}

export function ProductPage({ product, onBack, currency }: ProductPageProps) {
  const [size, setSize] = useState<string>(() => resolveInitialSize(product));
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Активный индекс картинки (синхронизирован с галереей и с модалкой)
  const [activeIndex, setActiveIndex] = useState(0);

  // Если пришли на другой товар (например, через поиск), пока компонент
  // не размонтировался — сбрасываем размер и индекс картинки заново.
  //
  // Важно: зависим не только от product.id, но и от product.initialSize —
  // иначе повторный переход на ТОТ ЖЕ товар (тот же id), но с другим
  // размером в артикуле поиска (например, сначала WHO-HD-001-S,
  // потом WHO-HD-001-XL), не приведёт к пересчёту размера, потому что
  // React не считает это новым монтированием компонента.
  useEffect(() => {
    setSize(resolveInitialSize(product));
    setActiveIndex(0);
    setIsModalOpen(false);
  }, [product.id, product.initialSize]);

  const images = getProductImages(product);
  const currentSku = size ? `${product.sku}-${size}` : product.sku;

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

  const handleCopySku = () => {
    navigator.clipboard.writeText(currentSku);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBuy = () => {
    const lines = [
      "Хочу купить:",
      product.name,
      `Артикул: ${currentSku}`,
      `Цена: ${formatPriceVal(currentPrice)}`,
    ].filter(Boolean);

    const text = encodeURIComponent(lines.join("\n"));
    window.open(`https://t.me/${TELEGRAM_USERNAME}?text=${text}`, "_blank");
  };

  const goToModalImage = (next: number) => {
    const total = images.length;
    setActiveIndex(((next % total) + total) % total);
  };

  return (
    <div className="product-page">
      <div className="product-page__top-bar">
        <button type="button" className="product-page__back" onClick={onBack}>
          ← Назад в каталог
        </button>
      </div>

      <div className="product-page__layout">
        {/* Галерея — полностью управляемая, клик по фото открывает фулскрин с тем же индексом */}
        <div style={{ flex: '1 1 380px', maxWidth: '440px', position: 'relative' }}>
          <ProductGallery
            images={images}
            alt={product.name}
            currentIndex={activeIndex}
            onChangeIndex={setActiveIndex}
            onImageClick={() => setIsModalOpen(true)}
          />
        </div>

        <div className="product-page__info">
          <h1 className="product-page__name">{product.name}</h1>
          
          <div className="product-page__sku-row">
            <span className="product-page__sku">Артикул: {currentSku}</span>
            <button type="button" className="product-page__copy-btn" onClick={handleCopySku}>
              {copied ? "Скопировано ✓" : "Копировать"}
            </button>
          </div>

          <div className="product-page__price">
            <span>{formatPriceVal(currentPrice)}</span>
            {currentOldPrice && (
              <span className="product-page__price-old">
                {formatPriceVal(currentOldPrice)}
              </span>
            )}
          </div>

          <div className="product-page__field">
            <span className="product-page__label">Размер</span>
            <div className="size-row">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={"size-row__btn" + (size === s ? " size-row__btn--active" : "")}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button type="button" className="product-page__buy-btn" onClick={handleBuy}>
            Купить
          </button>

          <p className="product-page__desc">— {product.description}</p>

          <ul className="product-page__details">
            {product.details.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Модальное окно: открывает именно images[activeIndex], со стрелками для переключения */}
      {isModalOpen && (
        <div className="image-modal" onClick={() => setIsModalOpen(false)}>
          <div className="image-modal__content" onClick={(e) => e.stopPropagation()}>
            <button className="image-modal__close" onClick={() => setIsModalOpen(false)}>✕</button>
            <img src={images[activeIndex]} alt={`${product.name} - фото ${activeIndex + 1}`} />

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  className="gallery__arrow gallery__arrow--prev"
                  onClick={() => goToModalImage(activeIndex - 1)}
                  aria-label="Предыдущее фото"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="gallery__arrow gallery__arrow--next"
                  onClick={() => goToModalImage(activeIndex + 1)}
                  aria-label="Следующее фото"
                >
                  ›
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}