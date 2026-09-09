import type { Product } from "../types";

const SIZES = ["S", "M", "L", "XL", "2XL"];

export const products: Product[] = [
  {
    id: "hoodie-who",
    imageFolder: "hoodie-who",
    imageCount: 4,
    name: "Худи WHO «TIME»",
    sku: "WHO-HD-001",
    category: "Худи",
    description: "Time isn't slipping away - it's pushing you under. Stand up and fight, or let the bottom hold you forever.",
    price: { RUB: 4500, BYN: 160, KZT: 23500 },
    oldPrice: { RUB: 5499, BYN: 195, KZT: 28900 },
    sizes: SIZES,
    details: [
      "Плотный футер с начёсом, тяжёлый «доспех» на каждый день",
      "Oversize-крой, глубокий капюшон",
      "Принт с цитатой и цифровым табло 00:00 на спине",
      "Вес: 800 г",
    ],
  },
  {
    id: "tshirt-01",
    imageFolder: "tshirt-01",
    imageCount: 4,
    name: "Футболка WHO «TIME»",
    sku: "WHO-TS-001",
    category: "Футболка",
    description: "Time isn't slipping away - it's pushing you under. Stand up and fight, or let the bottom hold you forever.",
    price: { RUB: 3000, BYN: 110, KZT: 15700 },
    oldPrice: { RUB: 3800, BYN: 135, KZT: 19900 },
    sizes: SIZES,
    details: [
      "100% премиальный плотный хлопок (240 г/м²)",
      "Свободный oversize-силуэт, заниженное плечо",
      "Манифест-принт на спине и лаконичный логотип спереди",
      "Вес: 230 г",
    ],
  },
  {
    id: "tshirt-02",
    imageFolder: "tshirt-02",
    imageCount: 4,
    name: "Футболка WHO «VICTORIOUS»",
    sku: "WHO-TS-002",
    category: "Футболка",
    description: "Be strong and courageous. Do not be afraid or terrified because of them, for the Lord your God goes with you; he will never leave you nor forsake you. Deuteronomy 31:6",
    price: { RUB: 5000, BYN: 180, KZT: 26000 },
    sizes: SIZES,
    details: [
      "100% премиальный плотный хлопок (240 г/м²)",
      "Oversize-крой, усиленный ворот",
      "Глубокий арт с Георгием Победоносцем и полная цитата из Второзакония (31:6) на спине",
      "Вес: 230 г",
    ],
  },
  {
    id: "tshirt-mentalist",
    imageFolder: "tshirt-mentalist",
    imageCount: 4,
    name: "Футболка WHO «MENTALIST»",
    sku: "WHO-TS-003",
    category: "Футболка",
    description: "Grief is just a form of selfishness. We don't cry for those who are gone, we cry for ourselves, left behind without them.",
    price: { RUB: 3200, BYN: 115, KZT: 16800 },
    sizes: SIZES,
    details: [
      "100% плотный премиальный хлопок (240 г/м²)",
      "Oversize-крой с заниженным плечом",
      "Принт с цитатой и отсылкой к культовому сериалу на спине",
      "Красный акцентный логотип WHO на груди",
      "Вес: 230 г",
    ],
  },
];

/** Кнопка "Купить" открывает чат с этим аккаунтом в Telegram (без @). */
export const TELEGRAM_USERNAME = "who1349";