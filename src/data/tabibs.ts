import type { StaticImageData } from "next/image";
import type { Localized } from "@/lib/i18n";

import portraitSarah from "@/assets/mock/student-sarah.jpg";
import portraitMichael from "@/assets/mock/student-michael.jpg";
import portraitElena from "@/assets/mock/student-elena.jpg";

/**
 * MOCK DATA. Names, roles, descriptions and portraits below are placeholders
 * for design work only; no real practitioners have been supplied yet.
 */
export interface Tabib {
  id: string;
  image: StaticImageData;
  name: Localized<string>;
  role: Localized<string>;
  description: Localized<string>;
  /** Mock entry: replace with a real practitioner before public launch. */
  mock: boolean;
  /* Shown on the tabib's page only when the centre supplies them. */
  experience?: Localized<string>;
  education?: Localized<string>;
  schedule?: Localized<string>;
  /** Ids from services.ts this tabib performs. */
  services?: string[];
  instagram: string;
  telegram: string;
}

export const tabibs: Tabib[] = [
  {
    id: "kamola-yusupova",
    image: portraitSarah,
    name: {
      uz: "Kamola Yusupova",
      ru: "Камола Юсупова",
      en: "Kamola Yusupova",
    },
    role: {
      uz: "Bosh tabib · Fitoterapevt",
      ru: "Главный табиб · Фитотерапевт",
      en: "Chief healer · Phytotherapist",
    },
    description: {
      uz: "20 yillik tajribaga ega mutaxassis. Dorivor o'simliklar va an'anaviy sharq tibbiyoti bo'yicha yetakchi tabib.",
      ru: "Специалист с 20-летним опытом. Ведущий табиб в области лекарственных трав и традиционной восточной медицины.",
      en: "A specialist with 20 years of experience — a leading healer in medicinal herbs and traditional Eastern medicine.",
    },
    mock: true,
    instagram: "https://instagram.com/tabobatmarkazi",
    telegram: "https://t.me/tabobatmarkazi",
  },
  {
    id: "otabek-rahimov",
    image: portraitMichael,
    name: {
      uz: "Otabek Rahimov",
      ru: "Отабек Рахимов",
      en: "Otabek Rahimov",
    },
    role: {
      uz: "Tabib · Hijoma mutaxassisi",
      ru: "Табиб · Специалист по хиджаме",
      en: "Healer · Cupping specialist",
    },
    description: {
      uz: "Islom tibbiyoti va hijoma muolajalari bo'yicha sertifikatlangan mutaxassis. Individual yondashuv tarafdori.",
      ru: "Сертифицированный специалист по исламской медицине и процедурам хиджамы. Сторонник индивидуального подхода.",
      en: "A certified specialist in Islamic medicine and cupping therapy, committed to an individual approach.",
    },
    mock: true,
    instagram: "https://instagram.com/tabobatmarkazi",
    telegram: "https://t.me/tabobatmarkazi",
  },
  {
    id: "dilnoza-karimova",
    image: portraitElena,
    name: {
      uz: "Dilnoza Karimova",
      ru: "Дилноза Каримова",
      en: "Dilnoza Karimova",
    },
    role: {
      uz: "Tabib · Massaj terapevti",
      ru: "Табиб · Массажный терапевт",
      en: "Healer · Massage therapist",
    },
    description: {
      uz: "Tabiiy yog'lar bilan tiklovchi massaj va sog'lomlashtirish muolajalari bo'yicha mutaxassis.",
      ru: "Специалист по восстанавливающему массажу с натуральными маслами и оздоровительным процедурам.",
      en: "A specialist in restorative massage with natural oils and wellness treatments.",
    },
    mock: true,
    instagram: "https://instagram.com/tabobatmarkazi",
    telegram: "https://t.me/tabobatmarkazi",
  },
];

export function getTabib(id: string): Tabib | undefined {
  return tabibs.find((tabib) => tabib.id === id);
}
