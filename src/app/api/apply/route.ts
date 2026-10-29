import { NextResponse } from "next/server";

import { getCourse } from "@/data/courses";
import { isLocale } from "@/lib/i18n";

/** Digits only, so "+998 (90) 123-45-67" and "998901234567" compare equal. */
const digits = (value: string) => value.replace(/\D/g, "");

type Field = "name" | "phone" | "course";

/**
 * Receives a course application and forwards it to APPLICATION_WEBHOOK_URL.
 * Applicant details are passed through, never logged.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  // Honeypot: people never see this field, bots fill it.
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const courseId = typeof body.course === "string" ? body.course : "";
  const note = typeof body.note === "string" ? body.note.trim().slice(0, 1000) : "";
  const lang = typeof body.lang === "string" && isLocale(body.lang) ? body.lang : "uz";
  const course = getCourse(courseId);

  const invalid: Field[] = [];
  if (name.length < 2 || name.length > 80) invalid.push("name");
  if (digits(phone).length < 9 || digits(phone).length > 15) invalid.push("phone");
  if (!course) invalid.push("course");
  if (invalid.length) {
    return NextResponse.json({ error: "invalid", fields: invalid }, { status: 422 });
  }

  const webhook = process.env.APPLICATION_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "course_application",
        course: { id: course!.id, title: course!.title.uz },
        name,
        phone,
        note,
        lang,
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) {
      return NextResponse.json({ error: "upstream" }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ error: "upstream" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
