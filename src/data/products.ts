import type { Localized } from "@/lib/i18n";

export interface Product {
  id: string;
  image: string;
  title: Localized<string>;
  description: Localized<string>;
  price: Localized<string>;
  /* Shown on the Fitobar page only when the centre supplies them. */
  size?: Localized<string>;
  ingredients?: Localized<string>;
  usage?: Localized<string>;
}

export const products: Product[] = [
  {
    id: "herbal-tea",
    image: "/images/concept/section3-teas.jpg",
    title: {
      uz: "Dorivor choy to'plami",
      ru: "Сбор лечебного чая",
      en: "Medicinal tea blend",
    },
    description: {
      uz: "O'zbekiston tog'laridan yig'ilgan dorivor o'tlar asosidagi tetiklashtiruvchi choy.",
      ru: "Тонизирующий чай на основе целебных трав, собранных в горах Узбекистана.",
      en: "An invigorating tea made from medicinal herbs gathered in the mountains of Uzbekistan.",
    },
    price: { uz: "85 000 so'm", ru: "85 000 сум", en: "85,000 UZS" },
  },
  {
    id: "essential-oil",
    image: "/images/concept/section2-oils.jpg",
    title: {
      uz: "Tabiiy efir moyi",
      ru: "Натуральное эфирное масло",
      en: "Natural essential oil",
    },
    description: {
      uz: "An'anaviy retseptlar bo'yicha distillangan sof efir moyi. Massaj va aromaterapiya uchun.",
      ru: "Чистое эфирное масло, дистиллированное по традиционным рецептам. Для массажа и ароматерапии.",
      en: "A pure essential oil distilled to traditional recipes — for massage and aromatherapy.",
    },
    price: { uz: "120 000 so'm", ru: "120 000 сум", en: "120,000 UZS" },
  },
  {
    id: "mountain-honey",
    image: "/images/concept/section5-sweets.jpg",
    title: {
      uz: "Tog' asali",
      ru: "Горный мёд",
      en: "Mountain honey",
    },
    description: {
      uz: "Ekologik toza tog' hududlaridan yig'ilgan tabiiy asal. Immunitetni mustahkamlaydi.",
      ru: "Натуральный мёд из экологически чистых горных районов. Укрепляет иммунитет.",
      en: "Natural honey from pristine mountain regions that strengthens the immune system.",
    },
    price: { uz: "95 000 so'm", ru: "95 000 сум", en: "95,000 UZS" },
  },
  {
    id: "black-seed",
    image: "/images/concept/section6-islamic-medicine.jpg",
    title: {
      uz: "Qora zira moyi",
      ru: "Масло чёрного тмина",
      en: "Black seed oil",
    },
    description: {
      uz: "Sovuq presslash usulida tayyorlangan qora zira moyi. Islom tibbiyotining mashhur mahsuloti.",
      ru: "Масло чёрного тмина холодного отжима. Известный продукт исламской медицины.",
      en: "Cold-pressed black seed oil — a renowned product of Islamic medicine.",
    },
    price: { uz: "110 000 so'm", ru: "110 000 сум", en: "110,000 UZS" },
  },
  {
    id: "spice-set",
    image: "/images/concept/section4-spices.jpg",
    title: {
      uz: "Ziravorlar to'plami",
      ru: "Набор специй",
      en: "Spice set",
    },
    description: {
      uz: "O'rta Osiyoning noyob ziravorlaridan iborat sovg'abop to'plam.",
      ru: "Подарочный набор из редких специй Центральной Азии.",
      en: "A gift set of rare Central Asian spices.",
    },
    price: { uz: "140 000 so'm", ru: "140 000 сум", en: "140,000 UZS" },
  },
  {
    id: "herbal-supplement",
    image: "/images/concept/section1-supplements.jpg",
    title: {
      uz: "O'simlik qo'shimchalari",
      ru: "Растительные добавки",
      en: "Herbal supplements",
    },
    description: {
      uz: "Ibn Sino retseptlari asosidagi tabiiy biologik faol qo'shimchalar.",
      ru: "Натуральные биологически активные добавки по рецептам Авиценны.",
      en: "Natural dietary supplements based on Avicenna's recipes.",
    },
    price: { uz: "160 000 so'm", ru: "160 000 сум", en: "160,000 UZS" },
  },
];
