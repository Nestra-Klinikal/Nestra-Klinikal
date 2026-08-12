# Managing the Nestra Klinikal website

This guide is for whoever looks after the website day to day. It assumes you
have never used a content management system before, and that you do not write
code. Nothing in this guide requires a developer.

Everything described here takes effect on the live website within about an hour
of you pressing **Publish**, without anybody rebuilding or redeploying anything.

---

## Contents

1. [One-time setup](#1-one-time-setup)
2. [Logging in](#2-logging-in)
3. [Finding your way around](#3-finding-your-way-around)
4. [Adding a new programme](#4-adding-a-new-programme)
5. [Changing a price](#5-changing-a-price)
6. [Opening a new intake](#6-opening-a-new-intake)
7. [Getting the email list out](#7-getting-the-email-list-out)
8. [Changing the WhatsApp number and contact details](#8-changing-the-whatsapp-number-and-contact-details)
9. [Putting a message in the announcement bar](#9-putting-a-message-in-the-announcement-bar)
10. [Adding testimonials, team members, partners and questions](#10-adding-testimonials-team-members-partners-and-questions)
11. [Writing an article](#11-writing-an-article)
12. [Rules we do not break](#12-rules-we-do-not-break)

---

## 1. One-time setup

This section only needs doing once, by whoever sets the site up. If somebody has
already done it, skip to section 2.

**Step 1. Create the content system.**
Go to [sanity.io](https://www.sanity.io) and create a free account, then create
a new project. Call it "Nestra Klinikal". When it is created you will see a
**Project ID** — a short string of letters and numbers. Copy it.

**Step 2. Create a token so the website can save email addresses.**
Still on sanity.io, open your project, go to **API**, then **Tokens**, then
**Add API token**. Name it "Website lead capture", give it **Editor**
permission, and click Save. Copy the token that appears. You will not be shown
it again.

**Step 3. Put those two values into the website's settings.**
In Vercel (where the site is hosted), open the project, go to **Settings**, then
**Environment Variables**, and add:

| Name | Value |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | the Project ID from step 1 |
| `SANITY_API_WRITE_TOKEN` | the token from step 2 |

Then redeploy the site once. From that point on, everything in this guide works
and no further redeploys are needed.

**Step 4. Load the starting content.**
The website ships with its programmes, testimonials, partners and questions
already written. This step copies them into your new content system so you are
editing real entries rather than starting from an empty screen.

On a computer with the project code, create a file called `.env.local` in the
project folder containing:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-from-step-1
SANITY_API_WRITE_TOKEN=your-token-from-step-2
```

Then run:

```
npm install
npm run seed
```

You should see `✓ Wrote 17 documents.` That is 6 programmes, 2 testimonials,
2 partners, 6 questions and your site settings.

The seeder refuses to run if the content system already has content in it, so
it cannot accidentally wipe your work later. To preview what it would write
without changing anything, run `npm run seed -- --dry-run`.

**Step 5. Check your Site settings.**
Log in (section 2), open **Site settings**, and confirm the WhatsApp number,
phone number, email address and office address. See section 8.

---

## 2. Logging in

Go to **www.nestraklinikal.com/studio**.

Sign in with the same account you used to create the Sanity project, or with
whatever account you were invited with. You will land on the editing screen.

To give somebody else access, go to sanity.io/manage, open the project, choose
**Members**, and invite them by email address. Give them the **Editor** role so
they can publish but cannot change project settings.

---

## 3. Finding your way around

Down the left-hand side you will see:

- **Programmes** — every course you offer.
- **Intakes** — the dated cohorts of those courses.
- **Email leads** — every email address captured by the website.
- **Testimonials** — quotes from past participants.
- **Team** — faculty and leadership profiles.
- **Partners** — partner institutions.
- **FAQs** — the questions and answers shown on the home page.
- **Articles** — the Resources section.
- **Site settings** — contact details, WhatsApp number, announcement bar.

There is also an **Export leads** tab at the top for downloading the email list.

Two buttons matter on every screen:

- **Publish** puts your change on the live website. Nothing is public until you
  press it.
- Anything you type before pressing Publish is saved as a draft. Drafts are only
  visible to you and other editors.

---

## 4. Adding a new programme

This is the important one. Creating one Programme automatically produces the
programme's own page, its card on the Programmes list, its entry in the search
filters, its listing in the site's sitemap for Google, and a WhatsApp button
pre-filled with that programme's name. You do not have to create any of those
separately.

1. Click **Programmes** in the left-hand list.
2. Click the **pencil-and-paper icon** at the top to create a new one.
3. Fill in the **Content** tab:
   - **Programme name** — the full name, e.g. "Quality Management Systems &
     Quality Assurance".
   - **Web address** — click **Generate**. It fills itself in from the name.
   - **Category** and **Level** — these decide where the programme appears when
     someone uses the filters.
   - **Short summary** — one or two sentences. This is what appears on the card
     and in Google results.
   - **Main image** — optional. If you add one, fill in the image description so
     the page works for people using screen readers.
   - **Who this is for**, **What you will be able to do**, **Curriculum** —
     click **Add item** for each entry.
4. Fill in the **Details & fees** tab:
   - **Duration**, **Delivery mode**, **Entry requirements**.
   - **Certification awarded** — write only what Nestra Klinikal actually
     awards.
   - **Requires supervised practical hours** — turn this on for Phlebotomy and
     any other programme where certification depends on supervised practice. It
     puts a clear notice on the page.
   - **Fee (Naira)** and **Fee (US dollars)** — numbers only. No ₦ or $ sign, no
     commas. Leave either one empty and the page will say "On request".
   - **Show on the home page** — turn on for the programmes you want featured.
   - **Sort order** — lower numbers appear first.
5. Leave the **Search listing** tab empty unless you want a different title or
   description in Google.
6. Press **Publish**.

The new programme appears on the website within the hour.

---

## 5. Changing a price

1. Click **Programmes**.
2. Click the programme you want to change.
3. Open the **Details & fees** tab.
4. Change **Fee (Naira)** and/or **Fee (US dollars)**. Type numbers only — write
   `250000`, not `₦250,000`.
5. Press **Publish**.

To stop showing a price entirely, clear the field. The page will show "On
request" and invite the person to message you.

---

## 6. Opening a new intake

1. Click **Intakes**.
2. Click the **pencil-and-paper icon** to create a new one.
3. Choose the **Programme** this intake belongs to.
4. Set the **Start date**, and the **Application deadline** if you have one.
5. Set **Status**:
   - **Open for applications** — shows a blue "Open" label.
   - **Filling fast** — shows a red "Filling fast" label, which creates urgency.
   - **Closed** — hides the intake from the website completely.
6. Add a **Location** for in-person or blended intakes.
7. Press **Publish**.

The intake appears on the home page and on that programme's page. When it is
over, set its status to **Closed** rather than deleting it, so you keep the
record.

---

## 7. Getting the email list out

Every address captured anywhere on the website — the home page, the pop-up, the
footer, the guide download, and every enquiry form — is saved automatically.

**To look at them:** click **Email leads**. The newest are at the top. Click any
one to see where that person signed up from, which programme they were looking
at, and whether they agreed to marketing.

**To download the whole list:**

1. Click **Export leads** at the top of the screen.
2. Click **Download CSV**.
3. The file saves to your computer. Open it in Excel or Google Sheets, or upload
   it to your email marketing tool.

**Important.** The file has a **Consent given** column. Only send marketing
email to people whose consent column says **yes**. This is a legal requirement
under the Nigeria Data Protection Act, not a preference.

---

## 8. Changing the WhatsApp number and contact details

1. Click **Site settings**.
2. On the **Contact** tab:
   - **WhatsApp number** — digits only, starting with the country code, with no
     plus sign and no spaces. For +234 813 125 3352 you would type
     `2348131253352`. Getting this wrong breaks every WhatsApp button on the
     site, so check it carefully.
   - **Phone number (as displayed)** — how you want it to read on the page, e.g.
     `+234 (0) 813 125 3352`. This one can have spaces and brackets.
   - **Email address** and **Office address**.
3. Press **Publish**.

Every WhatsApp button across the whole website updates automatically.

---

## 9. Putting a message in the announcement bar

The announcement bar is the strip across the very top of the site. Use it for
things like "January intake now open".

1. Click **Site settings**, then the **Announcement bar** tab.
2. Turn on **Show the announcement bar**.
3. Type the **Announcement text**.
4. Optionally add an **Announcement link**, such as `/programmes`, so the message
   is clickable.
5. Press **Publish**.

To take it down, turn **Show the announcement bar** off and publish again.

---

## 10. Adding testimonials, team members, partners and questions

These all work the same way: click the section on the left, click the
pencil-and-paper icon, fill in the fields, press **Publish**.

A few things worth knowing:

- **Testimonials** have a **Written permission to publish is on file** tick box.
  Only tick it when you genuinely hold that person's permission. Never edit
  somebody's quote in a way that changes what they meant.
- **Team** members have a **Group** setting — Leadership, Faculty or Operations.
  Until you add team members, the About page shows a short note saying profiles
  are being finalised, rather than an empty space.
- **FAQs** appear on the home page in **Sort order**, lowest number first.

---

## 11. Writing an article

Articles appear in the Resources section and help people find the site through
Google.

1. Click **Articles**, then the pencil-and-paper icon.
2. Fill in the **Title**, click **Generate** for the web address, and write a
   **Short summary**.
3. Set the **Publish date**.
4. Write the article in the **Article** field. You can add headings, lists,
   links and images using the toolbar.
5. Press **Publish**.

---

## 12. Rules we do not break

These are not style preferences. Breaking them creates legal and reputational
risk for the organisation.

1. **Never publish a qualification, accreditation or endorsement we cannot
   evidence.** If a document proving it is not on file, it does not go on the
   website.
2. **Never publish a testimonial you did not receive**, and never change one in
   a way that alters its meaning.
3. **Never publish a student number you cannot support.** The completions figure
   on the home page is a public claim.
4. **Never remove the supervised practical hours notice from Phlebotomy.**
   Certification genuinely depends on those hours, and saying otherwise would
   mislead someone into paying for a certificate they cannot receive.
5. **Only market to people who consented.** Check the consent column before any
   email campaign.
6. **Do not publish a price you have not confirmed.** Leave the fee blank and
   the page will invite an enquiry instead.

---

## If something looks wrong

Changes take up to an hour to appear. If something still looks wrong after that:

- Check you pressed **Publish** and not just left it as a draft.
- Check you are looking at the right programme — it is easy to edit a draft copy
  of the wrong one.
- If a WhatsApp button misbehaves, check the WhatsApp number in **Site
  settings** has digits only, with no plus sign or spaces.

If none of that explains it, contact whoever maintains the site, and tell them
what you changed and what you expected to see.
