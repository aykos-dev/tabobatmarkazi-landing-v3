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

Services, news, tabibs, Fitobar products (with categories) and courses are edited in the questionnaire admin under **Content** and served by the questionnaire backend at `CONTENT_API_URL` (`/public/<type>`). Pages are cached and refreshed on demand: after each admin edit the backend calls `/api/revalidate` with `REVALIDATE_SECRET`. Images come from the backend's object storage at `CONTENT_MEDIA_URL`. Set all three in `.env.local` (see `.env.example`). The API must be reachable during `npm run build`.

Contacts, section names and interface text still live in `src/data/contact.ts`, `src/data/sections.ts` and `src/i18n/dictionary.ts`.

Before launch:

- **Tabibs:** the three seeded tabibs are placeholder people and start as drafts. Publish real practitioners from the admin.
- **Images:** the images in `public/images/concept/` are concept visualisations, captioned as such. Replace them with real photographs.

## Design

`PRODUCT.md` holds product facts. `DESIGN.md` holds the visual system (colours, type, components).
