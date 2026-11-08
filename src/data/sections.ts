import type { Localized } from "@/lib/i18n";

export type DirectionId =
  | "standardization"
  | "research"
  | "integration"
  | "biolab"
  | "international"
  | "legal";

/** Pages that live inside a direction (the site's original sections). */
export type SubSectionId = "services" | "tabibs" | "fitobar" | "education";

export type SectionId = "home" | DirectionId | SubSectionId | "news" | "contacts";

export interface Section {
  id: SectionId;
  /**
   * Two-digit address used in the menu, page headers and anchors.
   * A sub-section shares its direction's address.
   */
  number: string;
  /** Route slug; "" is the home page. */
  slug: string;
  /** Full name, set as the page heading. */
  title: Localized<string>;
  /** Shorter name for the menu, range strip and crumbs; defaults to the title. */
  short?: Localized<string>;
  /** True once the section has its own page; until then it lives as a homepage anchor. */
  page?: boolean;
  /** Tailwind colour token name from globals.css (`bg-<tone>`, `text-on-<tone>`). */
  tone: "paper" | "herb" | "ink" | "pomegranate" | "saffron" | "cobalt" | "stone";
  /**
   * home: 00. direction: the six coloured cartons 01–06, the site's main structure.
   * sub: a page inside a direction, in its colour. site: News and Contacts (07–08), uncoloured.
   */
  group: "home" | "direction" | "sub" | "site";
  /** For a sub-section, the direction it belongs to. */
  parent?: DirectionId;
}

/** In menu order. Colour order is the navigation: one colour per direction. */
export const sections: Section[] = [
  {
    id: "home",
    number: "00",
    slug: "",
    title: { uz: "Bosh sahifa", ru: "Главная", en: "Home" },
    tone: "paper",
    group: "home",
  },
  {
    id: "standardization",
    number: "01",
    slug: "standartlashtirish",
    title: {
      uz: "Standartlashtirish va tasniflash yo'nalishi",
      ru: "Стандартизация и классификация",
      en: "Standardisation and classification",
    },
    short: {
      uz: "Standartlashtirish va tasniflash",
      ru: "Стандартизация и классификация",
      en: "Standardisation and classification",
    },
    page: true,
    tone: "pomegranate",
    group: "direction",
  },
  {
    id: "research",
    number: "02",
    slug: "talim-va-tadqiqotlar",
    title: {
      uz: "Ta'lim va ilmiy tadqiqotlar yo'nalishi",
      ru: "Обучение и научные исследования",
      en: "Education and research",
    },
    short: {
      uz: "Ta'lim va ilmiy tadqiqotlar",
      ru: "Обучение и исследования",
      en: "Education and research",
    },
    page: true,
    tone: "cobalt",
    group: "direction",
  },
  {
    id: "integration",
    number: "03",
    slug: "integratsiya",
    title: {
      uz: "Integratsiyalash yo'nalishi",
      ru: "Интеграция в здравоохранение",
      en: "Integration into healthcare",
    },
    short: { uz: "Integratsiyalash", ru: "Интеграция", en: "Integration" },
    page: true,
    tone: "herb",
    group: "direction",
  },
  {
    id: "biolab",
    number: "04",
    slug: "biolaboratoriya",
    title: { uz: "Biolaboratoriya yo'nalishi", ru: "Биолаборатория", en: "Biolaboratory" },
    short: { uz: "Tabiiy mahsulotlar va biolabaratoriya", ru: "Биолаборатория", en: "Biolaboratory" },
    page: true,
    tone: "saffron",
    group: "direction",
  },
  {
    id: "international",
    number: "05",
    slug: "xalqaro-munosabatlar",
    title: {
      uz: "Xalqaro munosabatlar yo'nalishi",
      ru: "Международные отношения",
      en: "International relations",
    },
    short: { uz: "Xalqaro munosabatlar yo'nalishi", ru: "Международные отношения", en: "International relations" },
    page: true,
    tone: "ink",
    group: "direction",
  },
  {
    id: "legal",
    number: "06",
    slug: "meyoriy-huquqiy",
    title: {
      uz: "Me'yoriy-huquqiy yo'nalish",
      ru: "Нормативно-правовое направление",
      en: "Legal and regulatory affairs",
    },
    short: { uz: "Me'yoriy-huquqiy", ru: "Нормативно-правовое", en: "Legal and regulatory" },
    page: true,
    tone: "stone",
    group: "direction",
  },
  {
    id: "news",
    number: "07",
    slug: "yangiliklar",
    title: { uz: "Yangiliklar", ru: "Новости", en: "News" },
    page: true,
    tone: "paper",
    group: "site",
  },
  {
    id: "contacts",
    number: "08",
    slug: "kontaktlar",
    title: { uz: "Kontaktlar", ru: "Контакты", en: "Contacts" },
    page: true,
    tone: "paper",
    group: "site",
  },

  // Pages inside a direction: same address and colour as their direction.
  {
    id: "education",
    number: "02",
    slug: "talim",
    title: { uz: "Kurslar", ru: "Курсы", en: "Courses" },
    page: true,
    tone: "cobalt",
    group: "sub",
    parent: "research",
  },
  {
    id: "services",
    number: "03",
    slug: "xizmatlar",
    title: { uz: "Xizmatlar", ru: "Услуги", en: "Services" },
    page: true,
    tone: "herb",
    group: "sub",
    parent: "integration",
  },
  {
    id: "tabibs",
    number: "03",
    slug: "tabiblar",
    title: { uz: "Mutaxassislar", ru: "Специалисты", en: "Specialists" },
    page: true,
    tone: "herb",
    group: "sub",
    parent: "integration",
  },
  {
    id: "fitobar",
    number: "04",
    slug: "fitobar",
    title: { uz: "Fitobar", ru: "Фитобар", en: "Fitobar" },
    page: true,
    tone: "saffron",
    group: "sub",
    parent: "biolab",
  },
];

/** The six directions, 01–06. */
export const directions = sections.filter((section) => section.group === "direction");

/** What the menu and footer list: home, the directions, then News and Contacts. */
export const navSections = sections.filter((section) => section.group !== "sub");

export function getSection(id: SectionId): Section {
  return sections.find((section) => section.id === id)!;
}

/** Sub-sections of a direction, in their listed order. */
export function subSections(direction: DirectionId): Section[] {
  return sections.filter((section) => section.parent === direction);
}

/** The menu/strip name: the short form when there is one. */
export function shortTitle(section: Section): Localized<string> {
  return section.short ?? section.title;
}

/** Where a section lives: its own page when built, otherwise its homepage anchor. */
export function sectionHref(section: Section, lang: string): string {
  if (!section.slug) return `/${lang}`;
  return section.page ? `/${lang}/${section.slug}` : `/${lang}#${section.slug}`;
}
