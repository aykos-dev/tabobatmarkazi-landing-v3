# Tabobat Markazi — website

Website for the Respublika Xalq Tabobati Ilmiy-Amaliy Markazi (Tashkent): services, news, tabibs, Fitobar, courses and contacts, in Uzbek, Russian and English.

Built with Next.js (App Router) and Tailwind CSS. Every page is generated statically under `/uz`, `/ru` and `/en`.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000/uz.

## Course applications

The Ta'lim form posts to `/api/apply`, which forwards each application as JSON to the URL in `APPLICATION_WEBHOOK_URL`. Copy `.env.example` to `.env.local` and set it there. Until it is set, the form tells visitors to call instead.

## Content

Text and prices live in `src/data/` (services, courses, products, news, tabibs, contacts) and `src/i18n/dictionary.ts`.

Before launch:

- **Tabibs:** the entries in `src/data/tabibs.ts` are sample data (`mock: true`), labelled as such on the site and kept out of search engines. Replace them with the real team.
- **Images:** the images in `public/images/concept/` are concept visualisations, captioned as such. Replace them with real photographs.

## Design

`PRODUCT.md` holds product facts. `DESIGN.md` holds the visual system (colours, type, components).
