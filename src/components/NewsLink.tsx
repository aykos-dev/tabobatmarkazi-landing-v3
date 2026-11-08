import Link from "next/link";
import type { ReactNode } from "react";

/**
 * A link to a news story: its article page, or, for a story published
 * elsewhere, the source site in a new tab.
 */
export function NewsLink({
  href,
  external,
  className,
  children,
  externalLabel,
}: {
  href: string;
  external: boolean;
  className?: string;
  children: ReactNode;
  /** Screen-reader note that the link leaves the site, e.g. "opens on kun.uz". */
  externalLabel?: string;
}) {
  if (!external) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      {externalLabel && <span className="sr-only"> ({externalLabel})</span>}
    </a>
  );
}
