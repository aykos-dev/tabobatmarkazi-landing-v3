import type { Localized } from "@/lib/i18n";

export interface Course {
  id: string;
  image: string;
  title: Localized<string>;
  description: Localized<string>;
  requirements: Localized<string>;
  duration: Localized<string>;
  price: Localized<string>;
  /* Rendered on the detail page only when the centre supplies them. */
  start?: Localized<string>;
  schedule?: Localized<string>;
  certificate?: Localized<string>;
}

export function getCourse(id: string): Course | undefined {
  return courses.find((course) => course.id === id);
}

export const courses: Course[] = [
  {
    id: "phytotherapy-basics",
    image: "/images/concept/zone6-herbs.jpg",
    title: {
      uz: "Fitoterapiya asoslari",
      ru: "Основы фитотерапии",
      en: "Fundamentals of phytotherapy",
    },
    description: {
      uz: "Dorivor o'simliklar, ularning xossalari va tayyorlash usullari bo'yicha boshlang'ich kurs.",
      ru: "Начальный курс о лекарственных растениях, их свойствах и способах приготовления.",
      en: "An introductory course on medicinal plants, their properties and methods of preparation.",
    },
    requirements: {
      uz: "Talab yo'q, boshlang'ich daraja",
      ru: "Без требований, начальный уровень",
      en: "No prerequisites, beginner level",
    },
    duration: { uz: "8 hafta", ru: "8 недель", en: "8 weeks" },
    price: { uz: "1 200 000 so'm", ru: "1 200 000 сум", en: "1,200,000 UZS" },
  },
  {
    id: "hijama-practice",
    image: "/images/concept/section6-islamic-medicine.jpg",
    title: {
      uz: "Hijoma amaliyoti",
      ru: "Практика хиджамы",
      en: "Cupping practice",
    },
    description: {
      uz: "Sunnat asosidagi hijoma muolajasini o'tkazish texnikasi va xavfsizlik qoidalari.",
      ru: "Техника проведения процедуры хиджамы по сунне и правила безопасности.",
      en: "The technique of performing cupping therapy according to the sunnah, and safety rules.",
    },
    requirements: {
      uz: "Tibbiy yoki biologiya bilimi tavsiya etiladi",
      ru: "Рекомендуются медицинские или биологические знания",
      en: "Medical or biology background recommended",
    },
    duration: { uz: "6 hafta", ru: "6 недель", en: "6 weeks" },
    price: { uz: "1 800 000 so'm", ru: "1 800 000 сум", en: "1,800,000 UZS" },
  },
  {
    id: "aromatherapy",
    image: "/images/concept/section2-oils.jpg",
    title: {
      uz: "Aromaterapiya va moylar",
      ru: "Ароматерапия и масла",
      en: "Aromatherapy and oils",
    },
    description: {
      uz: "Efir moylarini tayyorlash, aralashtirish va davolashda qo'llash bo'yicha amaliy kurs.",
      ru: "Практический курс по приготовлению, смешиванию и применению эфирных масел в лечении.",
      en: "A practical course on preparing, blending and using essential oils in treatment.",
    },
    requirements: {
      uz: "Talab yo'q",
      ru: "Без требований",
      en: "No prerequisites",
    },
    duration: { uz: "5 hafta", ru: "5 недель", en: "5 weeks" },
    price: { uz: "1 000 000 so'm", ru: "1 000 000 сум", en: "1,000,000 UZS" },
  },
  {
    id: "islamic-medicine",
    image: "/images/concept/zone5-manuscripts.jpg",
    title: {
      uz: "Islom tibbiyoti tarixi",
      ru: "История исламской медицины",
      en: "History of Islamic medicine",
    },
    description: {
      uz: "Ibn Sino va boshqa allomalarning meros va davolash usullari haqida nazariy kurs.",
      ru: "Теоретический курс о наследии и методах лечения Авиценны и других учёных.",
      en: "A theoretical course on the legacy and healing methods of Avicenna and other scholars.",
    },
    requirements: {
      uz: "Talab yo'q",
      ru: "Без требований",
      en: "No prerequisites",
    },
    duration: { uz: "4 hafta", ru: "4 недели", en: "4 weeks" },
    price: { uz: "800 000 so'm", ru: "800 000 сум", en: "800,000 UZS" },
  },
  {
    id: "massage-therapy",
    image: "/images/concept/pharmacy-interior.jpg",
    title: {
      uz: "Massaj terapiyasi",
      ru: "Массажная терапия",
      en: "Massage therapy",
    },
    description: {
      uz: "Tabiiy yog'lar bilan tiklovchi va sog'lomlashtiruvchi massaj texnikalari.",
      ru: "Техники восстанавливающего и оздоровительного массажа с натуральными маслами.",
      en: "Techniques of restorative and wellness massage with natural oils.",
    },
    requirements: {
      uz: "Jismoniy tayyorgarlik tavsiya etiladi",
      ru: "Рекомендуется физическая подготовка",
      en: "Physical fitness recommended",
    },
    duration: { uz: "7 hafta", ru: "7 недель", en: "7 weeks" },
    price: { uz: "1 500 000 so'm", ru: "1 500 000 сум", en: "1,500,000 UZS" },
  },
  {
    id: "herbal-pharmacy",
    image: "/images/concept/section1-supplements.jpg",
    title: {
      uz: "Dorixona va retseptura",
      ru: "Аптека и рецептура",
      en: "Pharmacy and formulation",
    },
    description: {
      uz: "Tabiiy dorilar va biologik qo'shimchalar tayyorlash, retsepturani o'rganish kursi.",
      ru: "Курс по приготовлению натуральных лекарств и добавок, изучению рецептуры.",
      en: "A course on preparing natural remedies and supplements, and studying formulation.",
    },
    requirements: {
      uz: "Fitoterapiya asoslari kursi tavsiya etiladi",
      ru: "Рекомендуется курс основ фитотерапии",
      en: "Fundamentals of phytotherapy course recommended",
    },
    duration: { uz: "10 hafta", ru: "10 недель", en: "10 weeks" },
    price: { uz: "2 000 000 so'm", ru: "2 000 000 сум", en: "2,000,000 UZS" },
  },
];
