import type { Localized } from "@/lib/i18n";

export type SectionId =
  | "home"
  | "services"
  | "news"
  | "tabibs"
  | "fitobar"
  | "education"
  | "contacts";

export interface Section {
  id: SectionId;
  /** Two-digit address used in the menu, page headers and anchors. */
  number: string;
  /** Anchor on the homepage; becomes the route slug once section pages exist. */
  slug: string;
  title: Localized<string>;
  /** True once the section has its own page; until then it lives as a homepage anchor. */
  page?: boolean;
  /** Tailwind colour token name from globals.css (`bg-<tone>`, `text-on-<tone>`). */
  tone: "paper" | "herb" | "ink" | "pomegranate" | "saffron" | "cobalt" | "stone";
}

/** The range, in menu order. Colour order is the navigation. */
export const sections: Section[] = [
  {
    id: "home",
    number: "00",
    slug: "",
    title: { uz: "Bosh sahifa", ru: "Главная", en: "Home" },
    tone: "paper",
  },
  {
    id: "services",
    number: "01",
    slug: "xizmatlar",
    title: { uz: "Xizmatlar", ru: "Услуги", en: "Services" },
    page: true,
    tone: "herb",
  },
  {
    id: "news",
    number: "02",
    slug: "yangiliklar",
    title: { uz: "Yangiliklar", ru: "Новости", en: "News" },
    page: true,
    tone: "ink",
  },
  {
    id: "tabibs",
    number: "03",
    slug: "tabiblar",
    title: { uz: "Tabiblar", ru: "Табибы", en: "Tabibs" },
    page: true,
    tone: "pomegranate",
  },
  {
    id: "fitobar",
    number: "04",
    slug: "fitobar",
    title: { uz: "Fitobar", ru: "Фитобар", en: "Fitobar" },
    page: true,
    tone: "saffron",
  },
  {
    id: "education",
    number: "05",
    slug: "talim",
    title: { uz: "Ta'lim", ru: "Обучение", en: "Education" },
    page: true,
    tone: "cobalt",
  },
  {
    id: "contacts",
    number: "06",
    slug: "kontaktlar",
    title: { uz: "Kontaktlar", ru: "Контакты", en: "Contacts" },
    page: true,
    tone: "stone",
  },
];

export function getSection(id: SectionId): Section {
  return sections.find((section) => section.id === id)!;
}

/** Where a section lives: its own page when built, otherwise its homepage anchor. */
export function sectionHref(section: Section, lang: string): string {
  if (!section.slug) return `/${lang}`;
  return section.page ? `/${lang}/${section.slug}` : `/${lang}#${section.slug}`;
}
