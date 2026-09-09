import type { FormEvent } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  error?: string | null;
}

export function SearchBar({ value, onChange, onSubmit, error }: SearchBarProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSubmit(value);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-bar__row">
        <input
          type="text"
          className="search-bar__input"
          placeholder="Поиск по названию или артикулу"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button type="submit" className="search-bar__btn" aria-label="Найти">
          Найти
        </button>
      </div>

      {error && <p className="search-bar__error">{error}</p>}
    </form>
  );
}