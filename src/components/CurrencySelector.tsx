import type { Currency } from "../types";

interface CurrencySelectorProps {
  currency: Currency;
  setCurrency: (c: Currency) => void;
}

export function CurrencySelector({ currency, setCurrency }: CurrencySelectorProps) {
  return (
    <div className="currency-selector">
      <button 
        className={currency === 'RUB' ? 'active' : ''} 
        onClick={() => setCurrency('RUB')}
      >
        ₽ RUB
      </button>
      <button 
        className={currency === 'BYN' ? 'active' : ''} 
        onClick={() => setCurrency('BYN')}
      >
        Br BYN
      </button>
      <button 
        className={currency === 'KZT' ? 'active' : ''} 
        onClick={() => setCurrency('KZT')}
      >
        ₸ KZT
      </button>
    </div>
  );
}