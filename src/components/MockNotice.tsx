import { Info } from "lucide-react";

/** States plainly that what follows is sample data, until real content replaces it. */
export function MockNotice({ label, text }: { label: string; text: string }) {
  return (
    <p className="flex gap-3 border-2 border-pomegranate px-4 py-3 text-sm leading-snug md:text-base">
      <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-pomegranate" strokeWidth={2.25} />
      <span>
        <strong className="font-bold text-pomegranate">{label}.</strong> {text}
      </span>
    </p>
  );
}
