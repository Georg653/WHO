/**
 * Полноширинный баннер вверху главной страницы.
 * Сейчас показывает картинку-заглушку.
 * Чтобы поставить свою: замените файл
 * /public/images/hero/banner.svg на banner.jpg (или .png)
 * и поправьте путь в src="" ниже.
 */
export function HeroBanner() {
  return (
    <div className="hero-banner">
      <img
        src="/images/hero/banner.svg"
        alt="WHO — баннер коллекции"
      />
    </div>
  );
}
