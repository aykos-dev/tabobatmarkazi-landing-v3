import type { Localized } from "@/lib/i18n";

export interface Service {
  id: string;
  images: string[];
  title: Localized<string>;
  description: Localized<string>;
  /** Display string, shown as-is. */
  price: Localized<string>;
  /* Leaflet fields: rendered on the detail page only when the centre supplies them. */
  duration?: Localized<string>;
  indications?: Localized<string>;
  contraindications?: Localized<string>;
  preparation?: Localized<string>;
}

export function getService(id: string): Service | undefined {
  return services.find((service) => service.id === id);
}

export const services: Service[] = [
  {
    id: "hijama",
    images: [
      "/images/concept/section6-islamic-medicine.jpg",
      "/images/concept/pharmacy-interior.jpg",
    ],
    title: {
      uz: "Hijoma (qon olish)",
      ru: "Хиджама (кровопускание)",
      en: "Hijama (cupping)",
    },
    description: {
      uz: "Sunnat asosidagi an'anaviy hijoma muolajasi. Tajribali tabiblar nazoratida, steril sharoitda o'tkaziladi.",
      ru: "Традиционная процедура хиджамы по сунне. Проводится в стерильных условиях под наблюдением опытных табибов.",
      en: "Traditional cupping therapy performed under the supervision of experienced healers in sterile conditions.",
    },
    price: { uz: "250 000 so'm", ru: "250 000 сум", en: "250,000 UZS" },
  },
  {
    id: "phytotherapy",
    images: [
      "/images/concept/section3-teas.jpg",
      "/images/concept/zone6-herbs.jpg",
      "/images/concept/section2-oils.jpg",
    ],
    title: {
      uz: "Fitoterapiya",
      ru: "Фитотерапия",
      en: "Phytotherapy",
    },
    description: {
      uz: "Dorivor o'simliklar asosida shaxsiy davolash dasturi. Tabib bilan konsultatsiya va tabiiy yig'malar tanlovi.",
      ru: "Индивидуальная программа лечения на основе лекарственных трав. Консультация табиба и подбор натуральных сборов.",
      en: "A personalised treatment programme based on medicinal herbs, with a consultation and a selection of natural blends.",
    },
    price: { uz: "180 000 so'm", ru: "180 000 сум", en: "180,000 UZS" },
  },
  {
    id: "consultation",
    images: [
      "/images/concept/zone3-office.jpg",
      "/images/concept/zone4-lab.jpg",
    ],
    title: {
      uz: "Tabib konsultatsiyasi",
      ru: "Консультация табиба",
      en: "Healer consultation",
    },
    description: {
      uz: "Sharq tabobati bo'yicha mutaxassis bilan to'liq ko'rik va tashxis. Individual sog'lomlashtirish rejasi tuziladi.",
      ru: "Полный осмотр и диагностика у специалиста восточной медицины с составлением индивидуального плана оздоровления.",
      en: "A full examination and diagnosis with an Eastern-medicine specialist, followed by a tailored wellness plan.",
    },
    price: { uz: "150 000 so'm", ru: "150 000 сум", en: "150,000 UZS" },
  },
  {
    id: "massage",
    images: [
      "/images/concept/section2-oils.jpg",
      "/images/concept/pharmacy-interior.jpg",
    ],
    title: {
      uz: "Tabiiy yog'lar bilan massaj",
      ru: "Массаж с натуральными маслами",
      en: "Herbal oil massage",
    },
    description: {
      uz: "An'anaviy retseptlar bo'yicha tayyorlangan efir va o'simlik yog'lari yordamida tiklovchi massaj muolajasi.",
      ru: "Восстанавливающий массаж с использованием эфирных и растительных масел по традиционным рецептам.",
      en: "A restorative massage using essential and plant oils prepared to traditional recipes.",
    },
    price: { uz: "220 000 so'm", ru: "220 000 сум", en: "220,000 UZS" },
  },
];
