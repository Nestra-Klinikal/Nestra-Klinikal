# Placeholders and unverified claims

Everything on this list is either a placeholder that must be replaced, or a
statement that has not been verified against a source. **Read this before the
site goes live.**

The site was built without access to the existing nestraklinikal.com (the build
environment's network policy blocks that domain), so the audit of the current
site could not be performed. Content was reconstructed from screenshots supplied
by the client and from the Nestra Klinikal project brief.

---

## 1. Must be resolved before launch

| # | Item | Where | What is needed |
| --- | --- | --- | --- |
| 1 | **Programme fees** | Every programme, `feeNaira` / `feeUsd` | No fee is published anywhere. Every programme shows "On request". The brief lists pricing as unconfirmed. Enter real figures in Studio, or leave blank deliberately. |
| 2 | **Intake dates** | Intakes | No intake exists. The "Upcoming intakes" section is hidden entirely until you create one. Nothing false is shown, but nothing drives urgency either. |
| 3 | **Programme durations** | 6 programmes, `duration` | Each reads `PLACEHOLDER — confirm duration`. The programme card and the facts panel both suppress a duration starting with "PLACEHOLDER", so nothing false reaches a visitor — but the field is empty-looking until you fill it. |
| 4 | **Phlebotomy supervised hours** | Phlebotomy programme | The requirement is stated, but the *number* of supervised hours is not. Confirm and add it. |
| 5 | **WhatsApp business number** | Site settings | Seeded as `2348131253352`, taken from the current public site. Confirm this is the number that should receive enquiries. Every WhatsApp button on the site uses it. |
| 6 | **Completions figure** | Site settings, `completionsCount` | Seeded as `500`, from the brief's "over 500 training completions". This is a public claim. Confirm you can evidence it, or change it. |
| 7 | **Legal pages** | `/privacy`, `/terms`, `/refund-policy` | All three are **drafts written by a non-lawyer** and have not been reviewed. The privacy policy accurately describes what the site does with data, but all three need review by a Nigerian-qualified lawyer before launch. |
| 8 | **Refund windows** | `/refund-policy` | The policy deliberately avoids naming specific day counts because none were supplied. It says "well before" and "close to the start date". Replace with your real commercial terms. |
| 9 | **Social media links** | Site settings, `socialLinks` | Empty. The current site links to Twitter, Facebook, LinkedIn and Instagram, but the actual URLs were not legible in the screenshots. Add them or the icons stay hidden. |

---

## 2. Deliberately not published

These were available but are **not** on the site, on purpose.

| Item | Why |
| --- | --- |
| **Revenue-share percentages** (FABIS 60/40, Polytechnic 70/30) | Commercial-in-confidence. These are partnership contract terms, not marketing copy, and publishing them would weaken your negotiating position with future partners. |
| **Campaign revenue targets** (₦10m+) | Internal commercial planning. |
| **NISLT endorsement** | The brief records it as "in progress — not yet documented". No accreditation or endorsement claim appears anywhere on the site. Do not add one until documentation exists. |
| **PGD / postgraduate diploma references** | The brief records these as removed pending documented regulatory approval. The advanced programme is named "Advanced Diploma in Quality Management Systems" and makes no postgraduate or degree-equivalence claim. |
| **Team member names and biographies** | None were verifiable. The About page shows a short note that profiles are being finalised rather than inventing people. |

---

## 3. Could not be verified

| Item | Status |
| --- | --- |
| **Leftover theme demo content on the current site** | You mentioned the current site may still carry unedited theme content including a US address and copy for an unrelated agency. **This could not be checked** — the build environment cannot reach nestraklinikal.com. The new site contains none of that content, since it was written from scratch, but if the old site is still live anywhere those pages need removing separately. |
| **Full inventory of the current site** | Only the pages visible in the supplied screenshots were harvested: home, about, testimonials, and the organisational structure. If the current site has pages not in those screenshots, their content has not been carried over. |
| **Existing photography and logo files** | No image assets were available. The site uses an inline SVG monogram reconstructed from the screenshots, and CSS gradients where photographs would go. **Supply real photography** — it is the single biggest visual upgrade available, and the layouts already have places for it. |

---

## 4. Content the site is designed for but does not yet have

None of these break anything; each section hides itself when empty.

- **Articles** — the Resources page shows an email signup instead of an empty grid.
- **Team profiles** — the About page shows a short note.
- **Partner logos** — partner cards render as text-only.
- **Programme images** — cards and detail pages use a branded gradient instead.

---

## 5. Verification status of the build

Stated plainly, because some of the brief's acceptance criteria could not be
demonstrated in this environment.

| Criterion | Status |
| --- | --- |
| `npm run build` succeeds | **Verified.** Exit code 0, 22 pages generated. |
| `tsc --noEmit` clean | **Verified.** Exit code 0, no output. |
| ESLint passes | **Verified.** Exit code 0, no warnings. |
| Playwright covers email capture, application flow, WhatsApp | **Verified.** 30 tests across desktop and mobile, all passing. |
| Lighthouse performance and accessibility above 90 | **Verified.** Home 92 / 100, programme page 95 / 100, mobile. |
| Largest contentful paint under 2.5 s on throttled 3G | **Partially verified.** Measured directly under emulated 3G (150 ms latency, 1.6 Mbps, 4× CPU throttle): **0.9 s**, target met. Lighthouse's *simulated* throttling model reports 2.7–3.0 s, above target. The two disagree because Lighthouse's lantern simulation is deliberately pessimistic; the direct measurement reflects real conditions more closely. Re-measure on the real deployment. |
| Creating a Programme in Studio publishes it site-wide | **NOT demonstrated.** This requires a live Sanity project, which needs an account only the client can create. The code path is complete — queries, static params, sitemap and structured data all read from the same source — but it has not been exercised against a real dataset. **Test this yourself after setup**, following section 4 of ADMIN-GUIDE.md. |
| A submitted email appears in Studio and exports to CSV | **NOT demonstrated**, for the same reason. The API route, the schema, the deduplication and the CSV export are all written, and the form-to-API contract is covered by tests using an intercepted endpoint, but no lead has been written to a real dataset. **Test this yourself after setup.** |
