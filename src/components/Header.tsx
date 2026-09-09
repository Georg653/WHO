import type { Currency } from "../types";
import { CurrencySelector } from "./CurrencySelector";

interface HeaderProps {
  onLogoClick: () => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
}

export function Header({ onLogoClick, currency, setCurrency }: HeaderProps) {
  return (
    <header className="site-header">
      <button type="button" className="site-header__logo" onClick={onLogoClick}>
        <img src="/images/logo/logo.svg" alt="WHO" />
      </button>

      <div className="site-header__right">
        <CurrencySelector currency={currency} setCurrency={setCurrency} />
      </div>
    </header>
  );
}