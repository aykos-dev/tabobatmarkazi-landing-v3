---
name: Tabobat Markazi
description: An Eastern-medicine centre in Tashkent presented as one pharmaceutical range, with seven colour-coded cartons, set in one strict Swiss system on white board.
colors:
  paper: "#ffffff"
  ink: "#141414"
  ink-2: "#474747"
  ink-3: "#6b6b6b"
  herb: "#0b6b43"
  herb-deep: "#09593a"
  on-herb: "#ffffff"
  on-herb-2: "#cfe6da"
  pomegranate: "#b5112b"
  on-pomegranate: "#ffffff"
  on-pomegranate-2: "#f6d3d8"
  saffron: "#f2b705"
  saffron-bright: "#ffc71a"
  on-saffron: "#141414"
  on-saffron-2: "#4a3a05"
  cobalt: "#1d44c9"
  cobalt-deep: "#1838a8"
  on-cobalt: "#ffffff"
  on-cobalt-2: "#d3dcf7"
  stone: "#e7e4dc"
  on-stone: "#141414"
  on-stone-2: "#4d4a42"
  on-ink: "#ffffff"
  on-ink-2: "#bdbdbd"
  on-ink-3: "#333333"
  on-paper: "#141414"
  on-paper-2: "#474747"
typography:
  wordmark:
    fontFamily: "Golos Text, Helvetica Neue, Arial, sans-serif"
    fontSize: "min(20.5vw, 20rem)"
    fontWeight: 900
    lineHeight: 0.8
    letterSpacing: "-0.04em"
  section-number:
    fontFamily: "Golos Text, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(6.5rem, 30vw, 17rem)"
    fontWeight: 800
    lineHeight: 0.8
    letterSpacing: "-0.04em"
    fontFeature: "\"tnum\" 1"
  item-number:
    fontFamily: "Golos Text, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(6.5rem, 34vw, 13rem)"
    fontWeight: 800
    lineHeight: 0.8
    letterSpacing: "-0.04em"
    fontFeature: "\"tnum\" 1"
  display:
    fontFamily: "Golos Text, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.5rem, 4vw, 4.25rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Golos Text, Helvetica Neue, Arial, sans-serif"
    fontSize: "4.5rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.03em"
  subhead:
    fontFamily: "Golos Text, Helvetica Neue, Arial, sans-serif"
    fontSize: "3rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Golos Text, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  spec-price:
    fontFamily: "Golos Text, Helvetica Neue, Arial, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
    fontFeature: "\"tnum\" 1"
  price:
    fontFamily: "Golos Text, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.33
    fontFeature: "\"tnum\" 1"
  lede:
    fontFamily: "Golos Text, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.375
  reading:
    fontFamily: "Golos Text, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.625
  field:
    fontFamily: "Golos Text, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.55
  button:
    fontFamily: "Golos Text, Helvetica Neue, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    lineHeight: 1.5
  body:
    fontFamily: "Golos Text, Helvetica Neue, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.375
  address:
    fontFamily: "Golos Text, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1.43
    fontFeature: "\"tnum\" 1"
  meta:
    fontFamily: "Golos Text, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.43
  label:
    fontFamily: "Golos Text, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1.43
    letterSpacing: "0.06em"
  caption:
    fontFamily: "Golos Text, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.33
  menu:
    fontFamily: "Golos Text, Helvetica Neue, Arial, sans-serif"
    fontSize: "3rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.02em"
rounded:
  none: "0px"
spacing:
  gutter: "16px"
  gutter-md: "40px"
  grid-gap: "24px"
  band-pad: "32px"
  band-pad-md: "56px"
  block-gap: "56px"
  block-gap-md: "96px"
  row-pad: "20px"
  row-pad-md: "32px"
  spec-row-pad: "16px"
  address-col: "44px"
  address-col-md: "56px"
  bar-height: "56px"
  container: "1600px"
components:
  button-call:
    backgroundColor: "{colors.herb}"
    textColor: "{colors.on-herb}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "56px"
  button-call-hover:
    backgroundColor: "{colors.herb-deep}"
  button-outline:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "56px"
  button-outline-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-section-saffron:
    backgroundColor: "{colors.saffron}"
    textColor: "{colors.on-saffron}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "56px"
  button-section-saffron-hover:
    backgroundColor: "{colors.saffron-bright}"
  button-section-cobalt:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.on-cobalt}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "56px"
  button-section-cobalt-hover:
    backgroundColor: "{colors.cobalt-deep}"
  button-apply-row:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.cobalt}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "48px"
  button-apply-row-hover:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.on-cobalt}"
  button-directions:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.address}"
    rounded: "{rounded.none}"
    padding: "0 16px"
    height: "48px"
  site-header:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    height: "56px"
    padding: "0 16px"
  logo-mark-header:
    size: "36px"
  logo-mark-footer:
    size: "72px"
  range-cell:
    rounded: "{rounded.none}"
    height: "48px"
    padding: "0 16px"
  section-band-head:
    typography: "{typography.headline}"
    padding: "40px 40px 0"
  band-crumb:
    typography: "{typography.address}"
    padding: "24px 40px 0"
  item-address:
    textColor: "{colors.herb}"
    typography: "{typography.address}"
    width: "56px"
  spec-row:
    textColor: "{colors.ink}"
    typography: "{typography.meta}"
    padding: "16px 0"
  spec-row-price:
    textColor: "{colors.ink}"
    typography: "{typography.spec-price}"
  input-field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.field}"
    rounded: "{rounded.none}"
    padding: "0 16px"
    height: "56px"
  field-error:
    textColor: "{colors.pomegranate}"
    typography: "{typography.meta}"
  mock-notice:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
  mock-flag:
    backgroundColor: "{colors.pomegranate}"
    textColor: "{colors.on-pomegranate}"
    typography: "{typography.caption}"
    rounded: "{rounded.none}"
    padding: "4px 10px"
  article-header:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
    typography: "{typography.headline}"
    padding: "24px 40px 56px"
  article-body:
    textColor: "{colors.ink}"
    typography: "{typography.reading}"
    width: "65ch"
  contact-row:
    textColor: "{colors.ink}"
    padding: "20px 0"
  contact-row-address:
    textColor: "{colors.on-stone-2}"
    typography: "{typography.address}"
    width: "44px"
  quick-link-cell:
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: "16px 20px"
    height: "144px"
  menu-item:
    typography: "{typography.menu}"
    rounded: "{rounded.none}"
    height: "64px"
    padding: "0 40px"
  call-bar:
    backgroundColor: "{colors.paper}"
    padding: "8px"
  plate-caption:
    textColor: "{colors.ink-3}"
    typography: "{typography.caption}"
  footer:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
    padding: "40px 40px 0"
---

# Design System: Tabobat Markazi

## Overview

**Creative North Star: "The Pharmaceutical Range"**

The centre is presented as one coherent line of medicine cartons. Every section is a carton in the range: it owns one flat colour, carries a two-digit address at architectural scale, and opens onto white board where its contents sit in a strict Swiss grid. The ground is white carton board, the ink is a near-black print, and the only decoration is the colour of the section you are in. A visitor reads the whole range on one shelf (the colour strip under the hero), then moves between cartons by number. Each carton opens into its own section page, and each item in it into a page laid out like the package insert folded inside the box.

Density is high and orderly: priced lists, spec tables and numbered rows ruled off with 2px ink lines, with one photographic plate owning each sheet. Type is a single grotesk driven by weight, not by family changes: 900 for the wordmark, 800 for section numbers, 700 for everything that must be read first. Corners are square everywhere. Nothing floats; depth comes from colour fields and rules, never from shadow.

The system refuses the clinic template: no split hero with a smiling doctor, no equal service cards, no stats row, no testimonials.

**Key Characteristics:**
- White board ground (paper), near-black ink, one strong flat colour per section in fixed order.
- Section numbers 00–06 are addresses: in the header, the range strip, the band heads, the menu, the sweep and the footer. Items extend them (01.2), and an item page sets its own address at scale.
- One grotesk (Golos Text) at hard weight steps; tabular numerals for every number, price, date and address.
- 2px ink rules and zero radius throughout.
- Unframed photographic plates with a small caption beneath.
- The logo mark in the header and footer, on paper and ink only.
- Signature motion: the colour sweep between sections.

## Colors

A print system where colour is spent only as section identity: each section owns one strong flat colour, used at full strength on every field it fills, with its own on-colours for text set on it. There are no light tints. The logo's own colours belong to the mark and are not interface colours.

### Primary
- **Herb Green** (herb): Xizmatlar's carton colour and the colour of calling. Every phone-call action (hero, each section's booking block, the detail-page inserts, the form's failed state, the mobile call bar) is herb with white text (6.6:1). Herb also sets Xizmatlar's item addresses and leaflet numbers on paper (6.6:1) and the phone icons in Kontaktlar's rows. Secondary text on herb, including the phone number inside the call button, is Herb Mist (on-herb-2, 5.0:1).
- **Deep Herb** (herb-deep): the hover state of every herb slab (white 8.4:1, Herb Mist 6.4:1).

### Secondary
- **Pomegranate** (pomegranate): Tabiblar's carton, with white text (6.8:1) and Pomegranate Blush (on-pomegranate-2, 4.9:1) for secondary text. Pomegranate also carries Tabiblar's addresses and links on paper (6.8:1), and is the system's warning colour: the sample-data notice and flag, and form field errors.
- **Saffron** (saffron): Fitobar's carton and its order button. Text on saffron is ink (on-saffron, 10.1:1); secondary text is Burnt Saffron (on-saffron-2, 6.1:1), which also sets Fitobar's item addresses on paper (11.1:1). Hover lifts to Bright Saffron (saffron-bright, ink 11.8:1). Saffron is also the text-selection colour, under ink text. Saffron itself is 1.8:1 on paper and never carries text there.
- **Cobalt** (cobalt): Ta'lim's carton, its application button and its course addresses on paper (7.7:1), with white text (7.7:1) and Pale Cobalt (on-cobalt-2, 5.6:1) for secondary text. Hover deepens to Deep Cobalt (cobalt-deep, white 9.7:1). Cobalt is also the focus colour: the global focus ring, the border of a focused form field, and the border of the form's sent state.

### Neutral
- **Carton White** (paper): page ground, header, menu panel, mobile call bar, form fields, and the 00 carton (home). Text on it uses on-paper / on-paper-2, which equal ink and ink-2.
- **Print Ink** (ink): body text (18.4:1 on paper), every rule and outline border, the footer ground, the article reading header, and Yangiliklar's carton. Text on ink is white (on-ink) with Light Grey (on-ink-2, 9.8:1) for secondary text, footer section numbers and the footer nav's top rule; Ink Divider (on-ink-3, 1.5:1, never text) draws the 1px dividers between footer nav rows.
- **Graphite** (ink-2): ledes, descriptions, dates, spec-table labels, field notes, inactive language links (9.3:1 on paper).
- **Pencil Grey** (ink-3): image captions, fine-print notes and the phone field's placeholder only (5.3:1 on paper).
- **Stone** (stone): Kontaktlar's carton, and the empty-state fill behind every photographic plate and the map frame while loading. Text on stone is ink (on-stone, 14.5:1); secondary text is Stone Shadow (on-stone-2, 7.0:1), which also numbers Kontaktlar's contact rows on paper (8.9:1). Stone itself is 1.3:1 on paper and never carries text there.

### Named Rules
**The Range Order Rule.** Section colours are bound to sections and never reordered: 00 paper, 01 herb, 02 ink, 03 pomegranate, 04 saffron, 05 cobalt, 06 stone. Colour order is the navigation. A section's colour appears only in that section's band, its item addresses, its range-strip cell, its menu row, its sweep, its own CTA, and a quick-link cell elsewhere that routes into that section. Every one of those fields uses the strong colour itself.

**The Call Is Green Rule.** Every phone-call action is herb with white text wherever it appears, including outside Xizmatlar (hero, other sections' booking blocks, the mobile call bar), and deepens to herb-deep on hover. A section CTA that is the section's own action takes its section colour instead: saffron for Fitobar's order, cobalt for Ta'lim's application.

**The On-Colour Rule.** Text on a colour field uses that field's paired on-colour (`on-<tone>` for primary text, `on-<tone>-2` for secondary). Saffron and stone are never used as text on paper: Fitobar's item addresses use Burnt Saffron (on-saffron-2), Kontaktlar's row addresses use Stone Shadow (on-stone-2), and Yangiliklar sets no coloured addresses on paper.

**The Logo Field Rule.** The logo mark sits only on paper (site header) and on ink (footer). It never sits on a pomegranate or herb field, or any other section colour: pomegranate and herb swallow its red and blue strokes (about 1.6:1 and 1:1), saffron swallows the orange, and cobalt the blue.

**The Warning Pomegranate Rule.** Pomegranate is the only warning colour: a field in error takes a 2px pomegranate border and a pomegranate message beneath it, and sample data is announced in pomegranate. Herb is never used to signal an error.

## Typography

**Display Font:** Golos Text (with Helvetica Neue, Arial, sans-serif)
**Body Font:** Golos Text (same family)

**Character:** One Russian-designed grotesk carrying Latin and Cyrillic alike, loaded as a variable font and used only at hard weight steps. Hierarchy comes from weight and scale jumps, not from a second family.

### Hierarchy
- **Wordmark** (900, 23vw on phones / min(20.5vw, 20rem) on desktop, line-height 0.8, -0.04em): "TABOBAT" at edge-cropping scale at the top of the home carton and again cropped at the foot of the footer. Decorative (aria-hidden).
- **Section Number** (800, clamp(6.5rem, 30vw, 17rem), line-height 0.8, -0.04em, tabular): the 01–06 address in each band head, set to bleed off the bottom of the colour field (-0.16em). The sweep uses the same face larger: clamp(7rem, 34vw, 22rem), line-height 0.78.
- **Item Number** (800, clamp(6.5rem, 34vw, 13rem), same line-height and tracking): a dotted address such as 01.2 set at scale in the band head of an item page. On phones it stacks below the title; from 768px it takes the left four columns like a section number.
- **Display** (700, 2rem on phones / clamp(2.5rem, 4vw, 4.25rem), line-height 1.02, -0.03em): the single hero headline.
- **Headline** (700, 2.25rem on phones / 4.5rem, line-height 1, -0.03em): section and item titles in band heads. The article title uses the same sizes at line-height 1.02.
- **Subhead** (700, 1.875rem on phones / 3rem, -0.02em, line-height 1, or 1.25 when it sits beside running copy): headings that open a block inside a sheet: "how to book", the application form, "other services / courses / tabibs / news", quick links.
- **Title** (700, 1.25rem on phones / 1.5rem, line-height 1.25, -0.02em): item names (services, tabibs, courses, news). Section-page rows step up to 1.5rem / 2.25rem; the lead news article to 1.5rem / 2.25rem on the home sheet and 1.875rem / 3rem on its own page; product names on the home sheet run 1rem / 1.25rem.
- **Spec Price** (700, 1.875rem on phones / 2.25rem, -0.02em, tabular): the price row at the top of a package insert.
- **Price** (700, 1.125rem on phones / 1.5rem, tabular): prices in service rows, products and course tables, right-aligned on desktop.
- **Lede** (400, 1rem / 1.25rem, line-height 1.375, max 46ch): section ledes on colour, in the on-tone secondary colour. The hero lede is 1rem / 1.125rem, max 40ch, Graphite.
- **Reading** (400, 1.125rem on phones / 1.25rem, line-height 1.625, max 65ch): article body text and nothing else.
- **Field** (400, 1.125rem): text typed into form fields; the course select is set at 700.
- **Button** (700, 1rem): every slab and outline button.
- **Body** (400, 0.875rem–1rem, line-height 1.375, max 52–65ch): descriptions, requirements, booking text.
- **Address** (700, 0.75rem–0.875rem, tabular): dotted item addresses (01.1, 03.2) in the section colour, band crumbs, field labels.
- **Meta** (400 or 500, 0.875rem): spec-table labels and field notes at 400 in Graphite; dates, durations, roles and table heads at 500.
- **Label** (700, 0.75rem / 0.875rem, 0.06em tracking, uppercase): only the carton spec line under the wordmark: the official name on the left, "Toshkent · Farobiy 2" on the right.
- **Caption** (400, 0.75rem, Pencil Grey): plate captions and image notes. The sample-data flag uses the same size at 700.
- **Menu** (700, 1.875rem on phones / 3rem, -0.02em): full-screen menu rows.

### Named Rules
**The Hard Steps Rule.** Weights are 900, 800, 700, 500, 400 and nothing in between: 900 is reserved for the wordmark, 800 for section and item numbers, 700 for headings, prices, buttons, labels and addresses, 500 for dates, durations, roles and table heads, 400 for running text.

**The Tabular Rule.** Every numeral that is compared or read as an address (prices, phone numbers, dates, durations, 00–06, 01.1) uses tabular figures.

## Layout

A 12-column grid inside a 1600px container, with 16px gutters on phones and 40px from 768px up; column gap 24px. The system is mobile-first with one real breakpoint at 768px. 640px reveals the call button's label and pairs the name and phone fields; 1024px narrows the application form's column.

Each section is a band: a full-width colour field holding the section number (columns 1–4) and title plus lede (columns 6–12), bottom-aligned so the number sits on the band's lower edge, followed by board with 32px vertical padding on phones and 56px on desktop. On the home page the six bands follow one another; each section page opens with the same band, its title as the page's h1. Blocks inside a sheet are separated by 56px on phones and 96px on desktop.

Lists are ruled tables: rows separated by 2px ink rules, each with a fixed left address column (44px on phones, 56px on desktop; 40/48px for product tiles) holding the dotted address, the title and description in the next column, and the price in a right column on desktop or under the title on phones. Ta'lim's courses are a real table on desktop that collapses to the same address-column rows on phones. On section pages the service rows add a plate in columns 9–12 and a "Batafsil" link beneath the copy.

Inside a band, one photographic plate owns the sheet: a 5-column sticky plate beside Xizmatlar's list on the home page, a 21:8 full-width plate over the Xizmatlar, Fitobar and Ta'lim section pages, a 7-column lead image in Yangiliklar, a 4-column plate beside Ta'lim's table. Tabiblar is a horizontal snap-scroll carousel of 78%-wide cards on the home page on phones and a stacked list on its own page on phones; both become a 3-column grid from 768px.

Item pages (services, courses, tabibs) split the sheet like a package insert: plates in columns 1–7 and the insert in columns 8–12 (sticky 80px from the top on service pages), with numbered leaflet paragraphs below the plates; a tabib page sets the portrait in columns 1–5 and the spec table in columns 7–12. An "other items" nav closes each item page as three ruled columns on desktop.

The article page reads in one measure: a date column (columns 1–3) beside the title (columns 4–11) in the header, the image in columns 4–12, and the body in columns 4–10 at 65ch.

The header and mobile call bar are each 56px tall; anchor scrolling allows 4rem of top padding for the sticky header. On phones the page bottom is padded so the fixed call bar never covers the footer.

## Elevation & Depth

The system is completely flat. There are no shadows anywhere. Depth and separation come from three things only: full-bleed colour fields (bands, range cells, menu rows, quick-link cells, the sweep, the article header), 2px rules, and stacking order for fixed layers (header z-40, menu z-50, sweep z-60, call bar z-30).

### Named Rules
**The Print Rule.** Nothing casts a shadow and nothing is translucent. If an element needs to separate from the page, give it a colour field or a 2px rule.

## Shapes

Every corner is square (0px radius): buttons, fields, plates, range cells, quick-link cells, menu rows, the map frame, the sample-data notice and flag. Lines are 2px ink; on ink grounds the footer nav takes a 2px Light Grey top rule with 1px Ink Divider rules between rows. Photographs are unframed rectangles cropped flat to fixed aspect ratios (1:1, 4:5, 3:4, 4:3, 3:2, 16:10, 16:9, 2:1, 21:9, 21:8), with a Stone fill behind them. The only cropping device besides images is type: the wordmark and section numbers deliberately bleed past their containers. The logo mark's rounded, interlocking strokes are the centre's artwork and are shown as supplied; they are not a corner style for the interface.

### Named Rules
**The Square Corner Rule.** Radius is 0 everywhere in the interface. There is no rounded variant.

## Components

### Buttons
Heavy, flat slabs at a fixed 56px height.
- **Shape:** square (0px), 56px tall, 24px horizontal padding, 700 weight 1rem, a 20px line icon (stroke 2.25) leading with a 12px gap.
- **Call (primary):** herb with white text; from 640px the label "Qo'ng'iroq qilish" is followed by the phone number at 500 weight in Herb Mist. On phones only the number shows. Hover deepens to herb-deep over 200ms.
- **Outline:** board with a 2px ink border and ink text ("Kurslar", a second phone number, "all items" links); hover fills ink with board-coloured text.
- **Section CTA:** the same slab in the section colour with its on-colour text: saffron in Fitobar (48px on a product row, hover saffron-bright), cobalt in Ta'lim (hover cobalt-deep).
- **Apply row button ("Yozilish"):** 48px, 2px cobalt border, cobalt text, full width on phones; hover fills cobalt with white text.
- **Directions:** 48px outline buttons (2px ink border, 0.875rem 700, map-pin icon) for Google Maps and Yandex Maps.
- **Focus:** two-tone ring (global): a 3px cobalt outline at 2px offset over a 2px paper inner band, so focus shows on paper and stone (cobalt) and on herb, pomegranate and ink fields (white band).

### Range Strip
The whole range on one shelf, directly under the hero. Six cells, one per section, each filled with its section colour: address (tabular, 700), title (700, 1.25rem on desktop) and one real fact (price floor, count, duration span) with a down arrow. Desktop: six equal columns, at least 112px tall, separated by 2px ink rules. Phones: six stacked 48px rows (address column, title, fact). Hover brightens the cell (brightness 110%); the arrow nudges down. Each cell triggers the sweep.

### Section Band
The carton head: full-bleed colour field, section number bleeding off its bottom edge at architectural scale, title and lede to the right (below on phones in a two-column auto/1fr grid). Followed by the section's content on board. The heading is an h2 on the home page and the h1 on a section or item page. An item page overrides the number with the item's dotted address (Item Number), which stacks below the title on phones. An optional crumb runs above the grid (16px from the top on phones, 24px on desktop): a back link in the on-tone secondary colour, 0.875rem 700, with a 16px left arrow, the section number and the section name ("← 01 Xizmatlar"). It is a way back, not a label.

### Numbered Item Row
A ruled row with the dotted address in its own left column (01.1, 03.2, 05.4 in the section colour), title and description beside it, price right. Used for services, tabibs, products and courses. The address is never placed above the heading. When the row opens an item page, the whole row is the link: the title underlines on hover, the plate scales to 1.03 over 500ms and the arrow moves 4px right.

### Package Insert (item pages)
The service, course and tabib pages, laid out like the leaflet inside a carton.
- **Spec table:** a definition list with a 2px ink top rule and a 2px ink rule under every row, 16px vertical padding. Label (0.875rem, Graphite) on the left, value (1.25rem 700, tabular) on the right; the price row comes first at Spec Price. On the tabib page labels sit in a 10rem column from 640px and values run 1.125rem 700. Requirements stack label over value.
- **Optional fields:** duration, contraindications, start date, schedule, certificate, experience, education and schedule rows render only when the data exists. When a fact a visitor needs is missing, the insert says to ask by phone instead (a 0.875rem Graphite note, under a 2px rule on service pages), and the booking row reads "by phone".
- **Actions:** below the table, the herb call button at full width and the second number as an outline slab (services), the cobalt "Ariza" slab that jumps to the form (courses), or the call button (tabibs); then the address with a map pin.
- **Leaflet paragraphs:** indications, contraindications and preparation as numbered rows (1, 2, 3 in the section colour in the address column), a 1.25rem / 1.5rem heading and Graphite body at 65ch, line-height 1.625.
- **Other items:** a subhead and three ruled link rows with address, title, a 500-weight price or duration line and a right arrow.

### Course Application Form
The application on Ta'lim and on each course page, under a 2px ink top rule with a subhead title and a Graphite lede.
- **Fields:** a label above each field (0.875rem 700), then a 56px field with a 2px ink border on board, 16px padding and 1.125rem text. The course is a select set at 700 with a 20px chevron; name and phone pair into two columns from 640px; the note is a resizable textarea. The phone field is tabular with a Pencil Grey placeholder.
- **Focus:** the border turns cobalt over 150ms; the outline is suppressed on fields.
- **Error:** the border turns pomegranate and a 0.875rem 500 pomegranate message sits directly under the field. On submit, focus moves to the first invalid field.
- **Submit:** a cobalt slab with a right arrow that moves 4px on hover; while sending it reads "sending", shows a wait cursor and drops to 70% opacity.
- **Sent:** the form is replaced by a panel with a 2px cobalt border, a subhead and Graphite text, and an underlined link to send another.
- **Failed:** the same panel with a 2px ink border, plus a herb call slab with the first phone number, and a retry link.
- **"Yozilish" prefill:** the apply button on a course row writes that course into the select, scrolls the form into view and focuses the name field. On a course page the course is preselected.

### Article Reading Layout
A news story set for reading. The header is an ink field with board-coloured text: a crumb back to 02 Yangiliklar in Light Grey, then the date (tabular, 700, Light Grey) in its own left column and the title at Headline size with a 52ch description in Light Grey beside it. On phones the date sits above the title. Below, one 2:1 image (16:10 on phones) with its caption, then the body at Reading size within 65ch. A ruled "more news" block of two columns follows, each story a title, a 500-weight date and a square thumbnail.

### Sample-Data Notice
Content that is not yet real says so. A notice above the sample content: a 2px pomegranate border, 12px × 16px padding, a 20px info icon in pomegranate, and the bold pomegranate label "Namuna ma'lumot." followed by plain ink text. Each sample portrait also carries a flag in its top-left corner: pomegranate fill, white 0.75rem 700 text "Namuna ma'lumot", 10px × 4px padding.

### Contact Rows and Quick Links
- **Contact rows:** Kontaktlar's address, phones, hours and social links as a definition list ruled in 2px ink, 20px vertical padding. Each row's address (06.1 to 06.4) is generated from a `data-n` attribute into the 44px left column, tabular 700 in Stone Shadow, so the list holds only labels and values. The address and phone numbers run 1.5rem / 1.875rem 700, hours and social links 1.25rem 700; each phone number carries a 20px herb phone icon. Missing hours read as a Graphite "ask by phone" line.
- **Quick links:** three colour-coded cells that route to the section that handles each reason to get in touch (Xizmatlar, the Ta'lim form, Fitobar). Each cell is filled with its target section's colour, at least 96px tall on phones and 144px on desktop, with the section's number and name in the on-tone secondary colour at the top and the action at 1.25rem / 1.5rem 700 with a right arrow at the bottom. Cells stack under 2px ink rules on phones and sit in three columns from 768px. Each cell triggers the sweep.

### Photographic Plate
Unframed, square-cornered image at a fixed aspect ratio over a Stone fill, with a 0.75rem Pencil Grey caption 8px below naming what it is (concept render, stand-in).

### Navigation
- **Site Header:** sticky, board-coloured, 56px, 2px ink bottom rule. Left: the 36px logo mark, then the current section's address and title (tabular number, 700, 0.875rem), updated by scroll position; the whole group links home and is named by the official name. Section and item pages start with their own section's address. Right: UZ / RU / EN (current is 700 and underlined; others Graphite, ink on hover) and a menu toggle (label from 640px plus a 24px menu icon).
- **Numbered Menu:** a full-screen board panel. Each section is a full-width row filling equal height (at least 64px), in its own colour with its on-colour text, divided by 2px ink rules: address (tabular, on-tone secondary colour, 1rem / 1.5rem) then the title at 1.875rem / 3rem. Escape closes it; focus moves to the first row and returns to the toggle. Choosing a row closes the menu and runs the sweep.
- **Footer:** ink ground, board-coloured text. It opens with the logo mark (56px on phones, 72px on desktop) beside the official name "Respublika xalq tabobati ilmiy-amaliy markazi" (1.125rem / 1.5rem, 700, max 28ch). Then a numbered nav grid (one column, two from 640px, four from 768px) with a 2px Light Grey top rule, 1px Ink Divider rules and Light Grey addresses, then the image-provenance note and copyright in Light Grey, then the wordmark cropped by the page bottom.

### Mobile Call Bar
Phones only: a fixed board-coloured bar at the bottom with a 2px ink top rule and 8px padding, holding a full-width herb call button. Hidden from 768px up. SiteShell renders it, with the header and footer, on every page.

### The Colour Sweep (signature)
When a visitor follows a range cell, a menu row or a quick-link cell, the target section's colour rises over the whole viewport carrying its number (800, clamp(7rem, 34vw, 22rem)) and title (700, 2.25rem / 3.75rem), bottom-left. In: clip-path inset(100% 0 0 0) to inset(0) over 420ms; the page moves to the target underneath (the same page's section, or the top of the target page, then its anchor); hold 60ms; out: inset(0) to inset(0 0 100% 0) over 520ms, so the colour leaves through the top. Both phases use the expo ease-out (cubic-bezier(0.16, 1, 0.3, 1)). Under prefers-reduced-motion the sweep element is not displayed and links navigate normally; modified clicks (cmd, ctrl, shift, alt) also skip it.

## Do's and Don'ts

### Do:
- **Do** keep the section colour order fixed: 00 paper, 01 herb, 02 ink, 03 pomegranate, 04 saffron, 05 cobalt, 06 stone.
- **Do** set dotted item addresses (01.1) in their own left column (44px on phones, 56px on desktop), tabular, 700, in the section colour or its legible on-board stand-in.
- **Do** separate rows and blocks with 2px ink rules.
- **Do** make every phone-call action herb, 56px tall, with the phone icon, deepening to herb-deep on hover.
- **Do** use the paired on-colour for text on any colour field, and Burnt Saffron (on-saffron-2) or Stone Shadow (on-stone-2) instead of saffron or stone for text on paper.
- **Do** open every section page and item page with the Section Band as its h1; item pages set the dotted address at scale and a crumb back to the section.
- **Do** render an optional spec row only when its data exists, and tell the visitor to ask by phone when a needed fact is missing.
- **Do** announce sample data with the pomegranate notice and flag a sample portrait "Namuna ma'lumot".
- **Do** give each sheet one photographic plate with a caption beneath it saying what the image is.
- **Do** use tabular figures for prices, phones, dates, durations and addresses.
- **Do** remove the sweep under prefers-reduced-motion and fall back to plain navigation.

### Don't:
- **Don't** round any corner; radius is 0 everywhere.
- **Don't** add shadows, gradients or translucent layers.
- **Don't** place dotted addresses or other small labels as eyebrows above headings.
- **Don't** use a section's colour outside that section's own band, address, strip cell, menu row, quick-link cell, sweep or CTA (the herb call action, pomegranate as the warning colour, cobalt as the focus colour and saffron as the selection colour are the exceptions).
- **Don't** set the logo mark on a pomegranate, herb or other section colour field; it sits on paper and ink only.
- **Don't** set saffron or stone as text on paper.
- **Don't** lighten a section colour into a tint; section fields use the strong colour itself.
- **Don't** introduce a second typeface or weights between the hard steps (900, 800, 700, 500, 400).
- **Don't** build the clinic template: a split hero with a smiling doctor, equal service cards, a stats row or testimonials.
