# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router) + Tailwind CSS, fresh project in this folder (`tabobatmarkazi-landing-v3`). Locale-prefixed routes: `uz` (default), `ru`, `en`. Dev server is configured in `.claude/launch.json` as `landing-v3` on port 3013. Structured content (courses, services, contacts, news, products) may be ported from `../tabobatmarkazi-landing-v2/src/data/`; v2's code and look are not carried over.

## Users

Two primary audiences with equal weight:

- **Patients**: people in Tashkent considering traditional/folk (Eastern) medicine treatment. They want to know what treatments exist, what they cost, who treats them, and how to come in or call.
- **Prospective students**: people who want to learn folk medicine. They compare courses by requirements, duration and price, then apply.

Secondary: Fitobar customers (herbal teas, oils, honey, spices, supplements) and anyone looking for the address and phone.

## Product Purpose

Tabobat Markazi is a traditional medicine center in Tashkent that both treats patients and teaches folk medicine. The website introduces the center and lets each visitor reach their goal: choose a service, learn about the tabibs, read the center's news, browse Fitobar, pick and apply for a course, or find contacts. Success: a patient calls or comes in; a student submits an application.

## Positioning

One center that combines treatment, teaching, and a herbal shop (Fitobar) under one roof, in the tradition of Eastern medicine (Ibn Sina / Avicenna heritage is the center's concept theme).

## Operating Context

The site is organised into seven sections, in this menu order:

1. **Bosh sahifa**: home
2. **Xizmatlar**: services with prices
3. **Yangiliklar**: news list and article pages
4. **Tabiblar**: practitioners
5. **Fitobar**: herbal products with prices
6. **Ta'lim**: courses with requirements, duration, price, and an application form
7. **Kontaktlar**: address, phones, map, social links

Visitors are mostly on phones; Uzbek is the default language, and Russian copy often runs longer than Uzbek or English.

## Capabilities and Constraints

- Three languages (uz/ru/en) for all copy.
- Course application form on Ta'lim. **Open:** where submissions go (v2/v3 forwarded to an env-configured webhook; target not decided).
- **Open:** how a Fitobar purchase works (call, visit, messenger, or online order).
- **Open:** whether the center is presented as a state institution and whether the President's quote is used (the earlier v3 brief mentioned both; not reconfirmed).

## Brand Commitments

- **Official name** (from the logo, supplied 2026-10-29): "Respublika Xalq Tabobati Ilmiy-Amaliy Markazi". The ru/en renderings on the site ("Республиканский научно-практический центр народной медицины", "Republican Scientific and Practical Centre of Folk Medicine") are translations the user approved on 2026-10-29. "Tabobat Markazi" remains the short name.
- **Logo**: a four-stroke interlocking square mark in red, orange, blue and grey, with the name set in blue capitals beneath. The mark alone is at `public/brand/logo-mark.png` (cut from the supplied lockup); the full lockup with the name has not been supplied as a separate file.
- **Logo colours** (sampled from the mark): red #F03110, orange #FC8F02, blue #3A4EB7, grey #8C8B90. They live in the mark only: on 2026-10-29 the user tried them as section colours (strong, then light tints) and chose to keep the site's original palette instead.

## Evidence on Hand

Real, publishable (source: `../tabobatmarkazi-landing-v2/src/data/`):

- **Contacts** (`contact.ts`): two phones, address (Farobiy 2, Olmazor district, Tashkent), Instagram, Telegram, YouTube, Google Maps embed.
- **Courses** (`courses.ts`): six courses (phytotherapy basics, hijama practice, aromatherapy, Islamic medicine, massage therapy, herbal pharmacy), 4–10 weeks, 800 000–2 000 000 so'm, each with description and requirements in uz/ru/en.
- **Services** (`services.ts`): four services (hijama, phytotherapy, tabib consultation, massage), 150 000–250 000 so'm.
- **News** (`news.ts`): three articles (center opening 2026-06-15, new Fitobar 2026-06-28, education programs 2026-07-10), confirmed real by the user.
- **Fitobar products** (`products.ts`): six products (herbal tea blend, essential oil, mountain honey, black seed, spice set, herbal supplement), 85 000–160 000 so'm, confirmed real by the user.

Not available. **Do not fabricate:**

- **Tabibs**: no real names, specialties or portraits yet. By the user's decision (2026-10-29), Tabiblar is filled with mock data and placeholder portraits (`src/data/tabibs.ts`, `src/assets/mock/`), each entry flagged `mock: true` and labelled "Namuna ma'lumot" on the page. **Launch gate (open):** whether mock tabibs may appear on a public deploy; replace with real practitioners before launch.
- **Center photos**: no real photographs of the building or rooms. The 17 images in `../tabobatmarkazi-landing-v2/public/images/avicenna/` are AI concept renders of an Avicenna-themed interior (herb room, manuscript study, lab, pharmacy sections, floor plan). They may serve as mood/atmosphere imagery but must not be presented as photos of the actual center.
- **Testimonials, reviews, statistics, awards, licences**: none. v2's `testimonials.ts` and `faq.ts` are unverified and are not to be used without confirmation.
- No AI images presented as real patients, staff or events; the mock tabib portraits are the one sanctioned exception and stay labelled while `mock: true`.

## Product Principles

1. **Two front doors, equal weight.** Every key page gives patients a route to a service and students a route to a course; neither audience is buried.
2. **Prices and terms in plain sight.** Service prices, course durations, requirements and prices are shown openly, never hidden behind "contact us".
3. **Honest about what exists.** Only real people, real news, real products. Missing content gets a clear empty state, not invented filler.
4. **Uzbek first, trilingual always.** Every string exists in uz/ru/en and the layout holds for the longest one.
5. **Image-rich, truthfully labelled.** The site leans on imagery, but concept renders and stock stand-ins are never passed off as the real center or real staff.
