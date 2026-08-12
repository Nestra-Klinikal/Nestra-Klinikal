# Nestra Klinikal

The public website for **Nestra Klinikal Limited** (RC 1054356), a Clinical
Research and Quality Management Systems organisation based in Ibadan, Nigeria.

The site has three jobs: turn a visitor into an enquiry or an enrolment, let a
non-technical administrator publish a new programme without a developer, and
capture email addresses into a list the business owns.

- **Editing content?** Read [ADMIN-GUIDE.md](./ADMIN-GUIDE.md) instead. It
  assumes no technical knowledge.
- **About to launch?** Read [PLACEHOLDERS.md](./PLACEHOLDERS.md) first. It lists
  every unconfirmed value and unverified claim.

---

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js (App Router), React 19, TypeScript strict |
| Styling | Tailwind CSS, CSS custom properties for theming |
| UI | Radix primitives, `class-variance-authority`, `lucide-react` |
| Forms | `react-hook-form` + `zod` |
| URL state | `nuqs` (programme filters live in the URL, so a filtered view is shareable) |
| Content | Sanity, with Studio embedded at `/studio` |
| Notifications | `sonner` |
| Theming | `next-themes`, class strategy |
| Images | `next/image` with `sharp` |
| Testing | Playwright (end-to-end) |
| Hosting | Vercel |

---

## Running it locally

```bash
npm install
cp .env.example .env.local     # works with everything left blank
npm run dev
```

Open http://localhost:3000.

**The site runs with no configuration at all.** When no Sanity project is
connected it renders the seed content in `src/lib/seed-content.ts`, so the whole
site is browsable immediately. Connecting Sanity swaps in live content through
the same queries, with no code change.

### Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run seed` | Load the starting content into a new Sanity dataset |
| `npm run seed -- --dry-run` | Validate the seed documents without connecting |
| `npm run test:e2e` | Playwright end-to-end tests |

Running the tests requires a production build first:

```bash
npm run build && npm run test:e2e
```

On a machine whose preinstalled Chromium does not match Playwright's expected
build, point at it explicitly:

```bash
PLAYWRIGHT_CHROMIUM_PATH=/path/to/chromium npm run test:e2e
```

---

## Environment variables

Every variable is documented in [`.env.example`](./.env.example). None are
required for the site to build and run. The two that matter most:

- `NEXT_PUBLIC_SANITY_PROJECT_ID` — switches the CMS on.
- `SANITY_API_WRITE_TOKEN` — lets the site save captured email addresses. Server
  side only; it has no `NEXT_PUBLIC_` prefix so it never reaches a browser.

---

## How the content model works

One `programme` document drives everything about that programme:

```
Programme (Sanity)
  ├─ /programmes/[slug]        detail page, statically generated
  ├─ /programmes               index card and filter entry
  ├─ sitemap.xml               entry, added automatically
  ├─ Course structured data    for search engines
  └─ WhatsApp deep link        pre-filled with the programme's name
```

Nothing about that list is hard-coded per programme. `generateStaticParams`,
the sitemap and the filters all read from the same query, so publishing a
programme in Studio produces all of it.

The same applies to intakes, testimonials, team members, partners, FAQs and
articles. Contact details, the WhatsApp number and the announcement bar live in
a single `siteSettings` document rather than in code.

### Falling back to seed content

`src/lib/content.ts` wraps every query. If Sanity is unconfigured, unreachable,
or returns nothing, it returns seed content instead of throwing. A marketing
site that returns a 500 because a CMS is down costs enquiries, so it does not
do that.

An empty result is treated differently depending on what it means: an empty
intake list is a real state and is passed through, while an empty programme list
means something is wrong and falls back to seed data.

---

## Email capture

Addresses are captured in four places: the hero above the fold, the footer, a
scroll or exit-intent modal shown once per visitor, and a guide download gated
by email.

Each one posts to `POST /api/leads`, which:

- validates the payload with zod at the boundary,
- discards submissions that fill a hidden honeypot field,
- deduplicates on email address, patching the existing record rather than
  creating a second one,
- stores the source page, programme of interest and UTM parameters,
- records consent as three fields — whether it was given, the exact wording
  agreed to, and the timestamp — because the Nigeria Data Protection Act
  requires evidence of consent, not an assumption of it,
- optionally mirrors the address to an email platform, and never does so without
  recorded consent.

The list of record is Sanity. The CSV export lives inside Studio under **Export
leads**, so the administrator never needs a developer to get the list out.

### The modal's restraint

The modal deliberately does not appear on `/contact`, `/corporate`,
`/partnerships` or any programme page, does not open while a form is visible on
screen, and stands down permanently as soon as the visitor focuses any form
field. Interrupting somebody who is already filling in an application costs more
than an address is worth.

---

## WhatsApp

WhatsApp is the primary enquiry channel for this audience, so every link is
built through `src/lib/whatsapp.ts` and rendered through `WhatsAppButton`. That
means no tap can happen without also firing the `whatsapp_click` analytics
event, and every link carries a message naming the specific programme or service
the person was looking at.

The number comes from `siteSettings`, so changing it is a content edit.

---

## Analytics

`src/lib/analytics.ts` pushes to `window.dataLayer` and to Vercel Analytics when
present. Events: `whatsapp_click`, `lead_submitted`, `form_submitted`,
`application_started`, `programme_viewed`.

Nothing throws if no analytics provider is installed or if a network blocks it,
which is common on this audience's connections.

---

## Performance notes

Decisions made specifically for mid-range Android handsets on 3G/4G:

- Both webfonts use `display: optional`, keeping them off the critical rendering
  path. Text paints immediately in a metric-matched fallback with no reflow, and
  the brand face arrives from cache on later visits.
- Font weights are trimmed to the two per family the design actually uses.
- The email modal and its form libraries are dynamically imported, so nothing
  about it is in the initial bundle.
- Programme filters are wrapped in Suspense with the unfiltered grid as the
  prerendered fallback, so crawlers and slow connections still get content.

Measured on the production build, mobile: home 92 performance / 100
accessibility, programme page 95 / 100. See PLACEHOLDERS.md section 5 for the
full verification status, including where measurements disagree.

---

## Project structure

```
src/
  app/                    routes
    api/leads/            lead capture endpoint
    programmes/[slug]/    programme detail, statically generated
    studio/[[...tool]]/   embedded Sanity Studio
  components/
    ui/                   base primitives (button, input, field)
    shared/               header, footer, section, logo, WhatsApp
  features/
    leads/                capture forms, modal, lead magnet
    programmes/           cards, filters, enquiry form
    content/              testimonials, FAQs
  lib/
    content.ts            data access with seed fallback
    seed-content.ts       content shown before the CMS is connected
    validations/          zod schemas
    whatsapp.ts           deep-link builders
    analytics.ts          event tracking
  sanity/
    schemas/              content model
    tools/                CSV export tool inside Studio
  types/                  shared types
tests/e2e/                Playwright specs
```

---

## Deploying

1. Push to GitHub.
2. Import the repository into Vercel. The framework is detected automatically.
3. Add the environment variables from `.env.example` in **Settings → Environment
   Variables**.
4. Deploy.
5. Point `www.nestraklinikal.com` at the Vercel deployment.
6. Work through [PLACEHOLDERS.md](./PLACEHOLDERS.md).
