import { useState } from "react";
import { Header } from "./components/Header";
import { useHashRoute } from "./hooks/useHashRoute";
import { products, TELEGRAM_USERNAME } from "./data/products";
import { HomePage } from "./pages/HomePage";
import { ProductPage } from "./pages/ProductPage";
import type { Currency, Product } from "./types";

export function App() {
  const { route, goHome, goToProduct } = useHashRoute();
  
  // Состояние выбранной валюты (по умолчанию RUB)
  const [currency, setCurrency] = useState<Currency>('RUB');

  // Быстрая покупка из каталога при нажатии на кнопку "Купить"
  const handleBuyDirect = (product: Product) => {
    const priceVal = typeof product.price === 'number' 
      ? product.price 
      : product.price[currency];

    const currencySymbol = currency === 'BYN' ? 'Br' : currency === 'KZT' ? '₸' : '₽';

    const lines = [
      "Хочу купить:",
      product.name,
      `Артикул: ${product.sku}-S`, // По умолчанию размер S при быстрой покупке из каталога
      `Цена: ${priceVal.toLocaleString()} ${currencySymbol}`,
    ].filter(Boolean);

    const text = encodeURIComponent(lines.join("\n"));
    window.open(`https://t.me/${TELEGRAM_USERNAME}?text=${text}`, "_blank");
  };

  const currentProduct =
    route.name === "product"
      ? products.find((p) => p.id === route.id) ?? null
      : null;

  return (
    <>
      <Header 
        onLogoClick={goHome} 
        currency={currency} 
        setCurrency={setCurrency} 
      />

      {currentProduct ? (
        <ProductPage 
          product={currentProduct} 
          onBack={goHome} 
          currency={currency}
          setCurrency={setCurrency}
        />
      ) : (
        <HomePage 
          onOpenProduct={(p) => goToProduct(p.id)} 
          onBuy={handleBuyDirect} 
          currency={currency}
        />
      )}

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} WHO</span>
        <span>Доставка по всей стране</span>
      </footer>
    </>
  );
}