import { fetchList, fetchOne, full, optional, type ApiLocalized } from "@/lib/api";
import { priceText } from "@/lib/format";
import type { Localized } from "@/lib/i18n";

export interface CourseTeacher {
  /** Tabib slug. */
  id: string;
  name: Localized<string>;
  role: Localized<string>;
  image: string;
}

/** Managed in the admin under Content → Courses. */
export interface Course {
  /** URL slug. */
  id: string;
  image: string;
  title: Localized<string>;
  description: Localized<string>;
  requirements: Localized<string>;
  duration: Localized<string>;
  price: Localized<string>;
  priceAmount: number;
  /* Rendered on the detail page only when the centre supplies them. */
  start?: Localized<string>;
  schedule?: Localized<string>;
  certificate?: Localized<string>;
  teachers: CourseTeacher[];
}

interface ApiCourse {
  slug: string;
  imageUrl: string;
  title: ApiLocalized;
  description: ApiLocalized;
  requirements: ApiLocalized;
  duration: ApiLocalized;
  price: number;
  start: ApiLocalized | null;
  schedule: ApiLocalized | null;
  certificate: ApiLocalized | null;
  teachers?: { slug: string; name: ApiLocalized; role: ApiLocalized; imageUrl: string }[];
}

function toCourse(c: ApiCourse): Course {
  return {
    id: c.slug,
    image: c.imageUrl,
    title: full(c.title),
    description: full(c.description),
    requirements: full(c.requirements),
    duration: full(c.duration),
    price: priceText(c.price),
    priceAmount: c.price,
    start: optional(c.start),
    schedule: optional(c.schedule),
    certificate: optional(c.certificate),
    teachers: (c.teachers ?? []).map((t) => ({
      id: t.slug,
      name: full(t.name),
      role: full(t.role),
      image: t.imageUrl,
    })),
  };
}

// Course pages show teachers, so they also refresh when doctors change.
export async function getCourses(): Promise<Course[]> {
  return (await fetchList<ApiCourse>("courses", ["doctors"])).map(toCourse);
}

export async function getCourse(id: string): Promise<Course | undefined> {
  const c = await fetchOne<ApiCourse>("courses", id, ["doctors"]);
  return c ? toCourse(c) : undefined;
}
