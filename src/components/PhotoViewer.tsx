"use client";

import { ArrowLeft, ArrowRight, X } from "lucide-react";
import Image from "next/image";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";

export interface Photo {
  src: string;
  alt: string;
}

interface ViewerLabels {
  open: string;
  close: string;
  previous: string;
  next: string;
}

const ViewerContext = createContext<{
  open: (index: number, trigger?: HTMLElement) => void;
  photos: Photo[];
  labels: ViewerLabels;
} | null>(null);

/**
 * Holds a story's photos and the full-screen viewer. Anything inside can open
 * it at a photo with <PhotoButton index={n}>. Keys: ← → to move, Esc to close;
 * on phones, swipe left or right.
 */
export function PhotoViewer({ photos, labels, children }: { photos: Photo[]; labels: ViewerLabels; children: ReactNode }) {
  const [index, setIndex] = useState<number | null>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);

  const open = useCallback((i: number, trigger?: HTMLElement) => {
    returnFocus.current = trigger ?? (document.activeElement as HTMLElement | null);
    setIndex(i);
  }, []);
  const close = useCallback(() => setIndex(null), []);
  const go = useCallback(
    (step: number) => setIndex((i) => (i === null ? i : (i + step + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (index === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [index, close, go]);

  // Give focus back to whatever opened the viewer.
  useEffect(() => {
    if (index === null) returnFocus.current?.focus();
  }, [index]);

  const photo = index === null ? null : photos[index];
  const many = photos.length > 1;
  const control =
    "grid size-12 place-items-center border-2 border-on-ink-2 text-on-ink transition-colors duration-200 hover:bg-paper hover:text-ink md:size-14";

  return (
    <ViewerContext.Provider value={{ open, photos, labels }}>
      {children}
      {photo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${photo.alt || labels.open} (${index! + 1} / ${photos.length})`}
          className="fixed inset-0 z-[70] flex flex-col bg-ink text-on-ink"
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null || !many) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <div className="flex h-16 shrink-0 items-center justify-between gap-4 px-4 md:h-20 md:px-10">
            <span className="tabular text-sm font-bold text-on-ink-2" aria-live="polite">
              {index! + 1} / {photos.length}
            </span>
            <button ref={closeRef} type="button" onClick={close} className={control} aria-label={labels.close}>
              <X aria-hidden className="size-6" strokeWidth={2.25} />
            </button>
          </div>

          <div className="relative min-h-0 flex-1" onClick={close}>
            <Image
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="100vw"
              className="object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {many && (
            <div className="flex h-20 shrink-0 items-center justify-center gap-3 md:h-24">
              <button type="button" onClick={() => go(-1)} className={control} aria-label={labels.previous}>
                <ArrowLeft aria-hidden className="size-5" strokeWidth={2.5} />
              </button>
              <button type="button" onClick={() => go(1)} className={control} aria-label={labels.next}>
                <ArrowRight aria-hidden className="size-5" strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>
      )}
    </ViewerContext.Provider>
  );
}

/** Opens the viewer at a photo; wraps a thumbnail or the cover. */
export function PhotoButton({ index, className, children }: { index: number; className?: string; children: ReactNode }) {
  const viewer = useContext(ViewerContext);
  if (!viewer) return <>{children}</>;
  const photo = viewer.photos[index];
  return (
    <button
      type="button"
      onClick={(event) => viewer.open(index, event.currentTarget)}
      className={`block w-full cursor-zoom-in text-left ${className ?? ""}`}
      aria-label={`${viewer.labels.open}: ${photo?.alt || index + 1}`}
    >
      {children}
    </button>
  );
}
