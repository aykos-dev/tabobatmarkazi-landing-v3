import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Golos_Text } from "next/font/google";
import { notFound } from "next/navigation";

import { Sweep } from "@/components/Sweep";
import { isLocale, locales } from "@/lib/i18n";
import "../globals.css";

const golos = Golos_Text({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: "variable",
  variable: "--font-golos",
  display: "swap",
});

const titles = {
  uz: "Tabobat Markazi — Sharq tabobati klinikasi, Toshkent",
  ru: "Tabobat Markazi — клиника восточной медицины, Ташкент",
  en: "Tabobat Markazi — Eastern medicine clinic, Tashkent",
};

const descriptions = {
  uz: "Hijoma, fitoterapiya, massaj, tabib konsultatsiyasi, xalq tabobati kurslari va fitobar. Toshkent, Farobiy 2.",
  ru: "Хиджама, фитотерапия, массаж, консультация табиба, курсы народной медицины и фитобар. Ташкент, Фаробий 2.",
  en: "Cupping, phytotherapy, massage, tabib consultations, folk-medicine courses and a herbal bar. Farobiy 2, Tashkent.",
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return {
    title: titles[lang],
    description: descriptions[lang],
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html lang={lang} className={golos.variable}>
      <body>
        {children}
        <Sweep />
      </body>
    </html>
  );
}
