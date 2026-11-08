"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export interface NewsSlide {
  slug: string;
  href: string;
  image: string;
  title: string;
  description: string;
  date: string;
  /** Formatted date for display. */
  dateLabel: string;
}

interface NewsSliderProps {
  slides: NewsSlide[];
  labels: { region: string; previous: string; next: string };
}

/**
 * The latest news as one wide plate at a time: the image fills the slide, the
 * title and two lines of description sit on its lower edge. Swipe or use the
 * arrows; scroll snapping does the work, so it also scrolls without JS.
 */
export function NewsSlider({ slides, labels }: NewsSliderProps) {
  const trackRef = useRef<HTMLOListElement>(null);
  const [index, setIndex] = useState(0);

  // Follow the slide in view, whether reached by arrow, swipe or keyboard.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => setIndex(Math.round(track.scrollLeft / track.clientWidth));
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  function go(to: number) {
    const track = trackRef.current;
    if (!track) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = Math.max(0, Math.min(slides.length - 1, to));
    track.scrollTo({ left: target * track.clientWidth, behavior: reduced ? "auto" : "smooth" });
  }

  if (!slides.length) return null;

  const arrow =
    "grid size-12 place-items-center border-2 border-ink bg-paper text-ink transition-colors duration-200 hover:bg-ink hover:text-paper disabled:pointer-events-none disabled:opacity-30 md:size-14";

  return (
    <section aria-roledescription="carousel" aria-label={labels.region} className="relative border-b-2 border-ink">
      <ol
        ref={trackRef}
        className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, i) => (
          <li
            key={slide.slug}
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${slides.length}`}
            className="relative w-full shrink-0 snap-start"
          >
            <Link href={slide.href} className="group block text-on-ink no-underline">
              <div className="relative aspect-[4/5] overflow-hidden bg-stone sm:aspect-[16/10] md:aspect-[21/9]">
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
                {/* Ink rises from the lower edge so the text holds on any photograph */}
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 px-4 pt-16 pb-20 md:px-10 md:pb-10">
                  <time dateTime={slide.date} className="tabular text-sm font-bold text-on-ink-2">
                    {slide.dateLabel}
                  </time>
                  <h2 className="mt-2 max-w-[22ch] text-3xl leading-[1.05] font-bold tracking-[-0.03em] text-balance group-hover:underline md:max-w-[28ch] md:text-6xl">
                    {slide.title}
                  </h2>
                  <p className="mt-3 line-clamp-2 max-w-[60ch] text-base leading-snug text-on-ink-2 md:mt-4 md:text-xl md:pr-40">
                    {slide.description}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ol>

      {slides.length > 1 && (
        <div className="absolute right-4 bottom-4 flex items-center gap-2 md:right-10 md:bottom-10">
          <span className="tabular mr-2 text-sm font-bold text-on-ink" aria-live="polite">
            {index + 1} / {slides.length}
          </span>
          <button type="button" className={arrow} onClick={() => go(index - 1)} disabled={index === 0} aria-label={labels.previous}>
            <ArrowLeft aria-hidden className="size-5" strokeWidth={2.5} />
          </button>
          <button
            type="button"
            className={arrow}
            onClick={() => go(index + 1)}
            disabled={index === slides.length - 1}
            aria-label={labels.next}
          >
            <ArrowRight aria-hidden className="size-5" strokeWidth={2.5} />
          </button>
        </div>
      )}
    </section>
  );
}
