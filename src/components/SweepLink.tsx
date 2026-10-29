"use client";

import { useRouter } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";

import { SWEEP_EVENT, SWEEP_IN_MS, type SweepDetail } from "@/components/Sweep";

interface SweepLinkProps extends SweepDetail {
  href: string;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
}

/**
 * A link that raises its section's colour over the page, then moves there.
 * Plain navigation when motion is reduced or the click is modified.
 */
export function SweepLink({
  href,
  tone,
  number,
  title,
  className,
  children,
  onNavigate,
}: SweepLinkProps) {
  const router = useRouter();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    const modified =
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (modified || event.button !== 0) return;
    onNavigate?.();
    if (reduced) return;

    event.preventDefault();
    window.dispatchEvent(
      new CustomEvent<SweepDetail>(SWEEP_EVENT, {
        detail: { tone, number, title },
      }),
    );

    window.setTimeout(() => {
      const hash = href.startsWith("#") ? href : new URL(href, location.href).hash;
      const target = hash ? document.getElementById(hash.slice(1)) : null;
      if (target && (href.startsWith("#") || new URL(href, location.href).pathname === location.pathname)) {
        target.scrollIntoView({ behavior: "instant", block: "start" });
        history.pushState(null, "", hash);
      } else {
        // Land at the top of the new page; <Sweep> moves on to a hash target
        // once that page has rendered.
        router.push(href, { scroll: false });
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    }, SWEEP_IN_MS);
  }

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
