"use client";

import { ArrowRight, ChevronDown, Phone } from "lucide-react";
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";

import { contact } from "@/data/contact";
import { dictionary as d } from "@/i18n/dictionary";
import { localize, type Locale } from "@/lib/i18n";
import { telHref } from "@/lib/links";

export const APPLY_EVENT = "tabobat:apply";

type Field = "name" | "phone" | "course";
type Status = "idle" | "sending" | "sent" | "failed";

interface ApplyFormProps {
  lang: Locale;
  courses: { id: string; label: string }[];
  /** Pre-selected course, e.g. on a course's own page. */
  defaultCourse?: string;
}

const digits = (value: string) => value.replace(/\D/g, "");

/** The course application, sent to /api/apply. Errors sit under their fields. */
export function ApplyForm({ lang, courses, defaultCourse = "" }: ApplyFormProps) {
  const pick = <T,>(value: Record<Locale, T>) => localize(value, lang);
  const uid = useId();
  const [course, setCourse] = useState(defaultCourse);
  const [errors, setErrors] = useState<Field[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  // "Yozilish" on a course row writes that course in and brings the visitor here.
  useEffect(() => {
    function onApply(event: Event) {
      setCourse((event as CustomEvent<string>).detail);
      setErrors((current) => current.filter((field) => field !== "course"));
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 400);
    }
    window.addEventListener(APPLY_EVENT, onApply);
    return () => window.removeEventListener(APPLY_EVENT, onApply);
  }, []);

  function validate(data: FormData): Field[] {
    const invalid: Field[] = [];
    const name = String(data.get("name") ?? "").trim();
    const phone = digits(String(data.get("phone") ?? ""));
    if (name.length < 2) invalid.push("name");
    if (phone.length < 9 || phone.length > 15) invalid.push("phone");
    if (!data.get("course")) invalid.push("course");
    return invalid;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const invalid = validate(data);
    setErrors(invalid);
    if (invalid.length) {
      formRef.current?.querySelector<HTMLElement>(`[name="${invalid[0]}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(data), lang }),
      });
      if (response.status === 422) {
        const result = (await response.json()) as { fields?: Field[] };
        setErrors(result.fields ?? []);
        setStatus("idle");
        return;
      }
      setStatus(response.ok ? "sent" : "failed");
    } catch {
      setStatus("failed");
    }
  }

  const fieldClass = (field: Field) =>
    `mt-1.5 block h-14 w-full border-2 bg-paper px-4 text-lg outline-none transition-colors duration-150 focus-visible:border-cobalt focus-visible:outline-0 ${
      errors.includes(field) ? "border-pomegranate" : "border-ink"
    }`;

  const errorText = (field: Field) =>
    errors.includes(field) ? (
      <p id={`${uid}-${field}-error`} className="mt-1.5 text-sm font-medium text-pomegranate">
        {pick(d.form.errors[field])}
      </p>
    ) : null;

  if (status === "sent" || status === "failed") {
    const sent = status === "sent";
    return (
      <div id="ariza" role="status" className={`border-2 p-5 md:p-8 ${sent ? "border-cobalt" : "border-ink"}`}>
        <h2 className="text-3xl font-bold tracking-[-0.02em] md:text-4xl">
          {pick(sent ? d.form.successTitle : d.form.failTitle)}
        </h2>
        <p className="mt-3 max-w-[48ch] text-lg leading-snug text-ink-2">
          {pick(sent ? d.form.successText : d.form.failText)}
        </p>
        {!sent && (
          <a
            href={telHref(contact.phones[0])}
            className="tabular mt-5 inline-flex h-14 items-center gap-3 bg-herb px-6 font-bold text-on-herb no-underline transition-colors duration-200 hover:bg-herb-deep"
          >
            <Phone aria-hidden className="size-5" strokeWidth={2.25} />
            {contact.phones[0]}
          </a>
        )}
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 block text-sm font-bold underline"
        >
          {pick(sent ? d.form.another : d.form.retry)}
        </button>
      </div>
    );
  }

  return (
    <form
      id="ariza"
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      aria-labelledby={`${uid}-title`}
      className="border-t-2 border-ink pt-5"
    >
      <h2 id={`${uid}-title`} className="text-3xl font-bold tracking-[-0.02em] md:text-5xl">
        {pick(d.form.title)}
      </h2>
      <p className="mt-2 max-w-[48ch] leading-snug text-ink-2 md:text-lg">{pick(d.form.lede)}</p>

      <div className="mt-6 grid gap-5">
        <div>
          <label htmlFor={`${uid}-course`} className="text-sm font-bold">
            {pick(d.form.course)}
          </label>
          <div className="relative">
            <select
              id={`${uid}-course`}
              name="course"
              value={course}
              onChange={(event) => setCourse(event.target.value)}
              aria-invalid={errors.includes("course")}
              aria-describedby={errors.includes("course") ? `${uid}-course-error` : undefined}
              className={`${fieldClass("course")} appearance-none pr-12 font-bold`}
            >
              <option value="" disabled>
                {pick(d.form.chooseCourse)}
              </option>
              {courses.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-4 mt-[0.1875rem] size-5 -translate-y-1/2" strokeWidth={2.5} />
          </div>
          {errorText("course")}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={`${uid}-name`} className="text-sm font-bold">
              {pick(d.form.name)}
            </label>
            <input
              ref={nameRef}
              id={`${uid}-name`}
              name="name"
              type="text"
              autoComplete="name"
              maxLength={80}
              aria-invalid={errors.includes("name")}
              aria-describedby={errors.includes("name") ? `${uid}-name-error` : undefined}
              className={fieldClass("name")}
            />
            {errorText("name")}
          </div>
          <div>
            <label htmlFor={`${uid}-phone`} className="text-sm font-bold">
              {pick(d.form.phone)}
            </label>
            <input
              id={`${uid}-phone`}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+998 __ ___ __ __"
              aria-invalid={errors.includes("phone")}
              aria-describedby={errors.includes("phone") ? `${uid}-phone-error` : undefined}
              className={`tabular placeholder:text-ink-3 ${fieldClass("phone")}`}
            />
            {errorText("phone")}
          </div>
        </div>

        <div>
          <label htmlFor={`${uid}-note`} className="text-sm font-bold">
            {pick(d.form.note)}
          </label>
          <textarea
            id={`${uid}-note`}
            name="note"
            rows={3}
            maxLength={1000}
            className="mt-1.5 block w-full resize-y border-2 border-ink bg-paper px-4 py-3 text-lg outline-none transition-colors duration-150 focus-visible:border-cobalt focus-visible:outline-0"
          />
        </div>

        {/* Honeypot: hidden from people and assistive tech, filled by bots. */}
        <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex h-14 items-center justify-center gap-3 bg-cobalt px-6 text-base font-bold text-on-cobalt transition-colors duration-200 hover:bg-cobalt-deep disabled:cursor-wait disabled:opacity-70 sm:justify-self-start"
        >
          {pick(status === "sending" ? d.form.sending : d.form.submit)}
          <ArrowRight
            aria-hidden
            className="size-5 transition-transform duration-300 ease-out group-hover:translate-x-1"
            strokeWidth={2.25}
          />
        </button>
      </div>
    </form>
  );
}

/** A course row's "Yozilish": writes the course into the form on this page. */
export function ApplyLink({ courseId, className, children }: { courseId: string; className?: string; children: ReactNode }) {
  return (
    <a
      href="#ariza"
      className={className}
      onClick={(event) => {
        event.preventDefault();
        window.dispatchEvent(new CustomEvent(APPLY_EVENT, { detail: courseId }));
      }}
    >
      {children}
    </a>
  );
}
