import { Phone } from "lucide-react";

import { contact } from "@/data/contact";
import { dictionary as d } from "@/i18n/dictionary";
import { localize, type Locale } from "@/lib/i18n";
import { telHref } from "@/lib/links";

/** The green phone-first action: number always, label from sm up. */
export function CallButton({ lang, className = "" }: { lang: Locale; className?: string }) {
  return (
    <a
      href={telHref(contact.phones[0])}
      className={`inline-flex h-14 items-center justify-center gap-3 bg-herb px-6 text-base font-bold text-on-herb no-underline transition-colors duration-200 hover:bg-herb-deep ${className}`}
    >
      <Phone aria-hidden className="size-5 shrink-0" strokeWidth={2.25} />
      <span className="sr-only sm:not-sr-only">{localize(d.call, lang)}</span>
      <span className="tabular whitespace-nowrap sm:font-medium sm:text-on-herb-2">{contact.phones[0]}</span>
    </a>
  );
}
