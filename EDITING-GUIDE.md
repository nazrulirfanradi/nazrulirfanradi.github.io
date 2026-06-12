# 📝 Editing Guide — Nazrul's Personal Website

This guide explains how to change **every section** of the website yourself, without
needing to understand React. Almost everything you'd want to edit is plain text inside
the files under `src/data/`.

---

## 🚀 Before you edit: run the site locally

```bash
cd website
npm run dev
```

Open **http://localhost:5173** in your browser. Keep this running while you edit —
every time you save a file, the browser updates automatically within a second.

**Golden rules when editing:**
1. Only change text **inside the quotes** `'like this'`.
2. Keep the comma `,` at the end of each line.
3. If the page goes blank after a save, you made a typo — the browser shows the exact
   file and line. Press `Ctrl+Z` in your editor to undo, then save again.

---

## 🗺️ Quick map: which file controls what

| Section on the website | File to edit |
|---|---|
| Hero (name, rotating roles, tagline, badge) | `src/data/profile.ts` |
| Navbar identity & "Let's Talk" email | `src/data/profile.ts` |
| Scrolling dashboard carousel | `src/components/DashboardMarquee.tsx` |
| About Me (paragraphs, chips, toolkit, stat cards) | `src/data/profile.ts` + `src/components/About.tsx` |
| Career timeline & leadership badges | `src/data/experience.ts` |
| Skills categories & badges | `src/data/skills.ts` |
| Projects / case-study cards | `src/data/projects.ts` |
| AI & Automation Lab animations | `src/data/pipeline.ts` |
| Live demo dashboard data & filters | `src/data/dashboardData.ts` |
| Certifications & awards | `src/data/certifications.ts` |
| Contact section & footer | `src/data/profile.ts` |
| Browser tab title & SEO description | `index.html` |
| Colors, fonts, glow effects | `src/index.css` |

---

## 1. Hero section (top of the page)

**File:** `src/data/profile.ts`

### Change the rotating roles ("I am a ___")
```ts
roles: [
  'Supply Chain Executive',
  'Data Engineer',
  'Data Scientist',
  'AI Automation Engineer',
],
```
- Rename: change the text in quotes (e.g. `'AI Engineer'`).
- Add a role: add a new line `'New Role',`.
- Remove a role: delete its line.
- The typing animation cycles automatically through whatever is in this list.

### Other hero text
```ts
name: 'Nazrul Irfanradi',                          // big headline name
badge: 'BASF · Supply Chain Nerve Centre',          // small pill above the headline
tagline: 'Turning supply chain data into decisions.', // sub-text under the roles
email: 'nazrulirfanradi@gmail.com',                 // all "Let's Talk" buttons
location: 'Kuala Lumpur, Malaysia',
```

### Social media links (hero icons + footer icons)
```ts
socials: {
  linkedin: 'https://www.linkedin.com/in/nazrulirfanradi/',
  github: 'https://github.com/nazrulirfanradi',
  kaggle: 'https://www.kaggle.com/nazrulirfanradi',
  maven: 'https://mavenanalytics.io/profile/nazrulirfanradi',
  portfolio: 'https://www.datascienceportfol.io/nazrulirfanradi',
},
```

---

## 2. Scrolling dashboard carousel (under the hero)

**File:** `src/components/DashboardMarquee.tsx` (top of the file)

```ts
const previews = [
  { seed: 1, title: 'Global Lead Time Calculator' },
  { seed: 2, title: 'VISTA Data Quality' },
  ...
]
```
- **Rename** a dashboard → change its `title`.
- **Remove** one → delete its line.
- **Add** one → copy a line and use a new `seed` number (any number; it controls the
  random shapes in the preview art).

The caption under the carousel ("Dashboards I've shipped — stylized previews") is
near the bottom of the same file.

---

## 3. About Me section

### Heading
**File:** `src/components/About.tsx`
```tsx
<SectionHeading
  chip="About Me"                                    // small pill
  title="Supply chain by day, data & AI always"      // big heading
  accent="data & AI"                                 // glowing words (must exist in title)
/>
```

### First paragraph
**File:** `src/data/profile.ts` → the `summary: '...'` field.

### Second paragraph ("At BASF's Supply Chain Nerve Centre...")
**File:** `src/components/About.tsx` → the second `<p ...> ... </p>` block.

### Strength chips
**File:** `src/data/profile.ts`
```ts
strengths: ['Stakeholder management', 'Root cause analysis', ...],
```

### Daily Toolkit row
**File:** `src/data/profile.ts`
```ts
techEcosystem: ['Power BI', 'SQL', 'Python', 'Azure', 'Databricks', 'Airflow', 'SAP'],
```

### The 4 animated stat cards
**File:** `src/data/profile.ts`
```ts
stats: [
  { value: 4, suffix: '+', label: 'Years of experience' },
  ...
],
```
`value` = number that counts up · `suffix` = `'+'`, `'×'`, `'%'` or `''` · `label` = text below.

---

## 4. Career timeline

**File:** `src/data/experience.ts`

Each job/education entry is one block:
```ts
{
  type: 'work',                      // 'work' (briefcase icon) or 'education' (cap icon)
  company: 'BASF Asia-Pacific Service Centre',
  role: 'Data Quality Management (Executive)',
  period: 'May 2024 — Present',
  location: 'Kuala Lumpur, Malaysia',
  highlights: [
    'Bullet point one...',
    'Bullet point two...',
  ],
  tags: ['Power BI', 'Azure Data Factory'],   // small chips at the bottom of the card
},
```
- Entries appear **top to bottom in the order listed** — keep newest first.
- Add a new job by copying a whole `{ ... },` block.

The **leadership badges** under the timeline are at the bottom of the same file:
```ts
export const leadership = [
  { title: 'BASF Data Practitioner Community Mentor', year: '2026' },
  ...
]
```

---

## 5. Skills section

**File:** `src/data/skills.ts`

```ts
{
  id: 'programming',        // internal name — keep lowercase, no spaces
  label: 'Programming',     // text shown on the pill button
  skills: ['SQL', 'Python', 'Pandas', ...],   // the badges
},
```
- Add/remove skills inside the `skills: [...]` list.
- Add a whole new category by copying a block (give it a unique `id`).

---

## 6. Projects / Case studies

**File:** `src/data/projects.ts`

Each card:
```ts
{
  title: 'Global Lead Time Calculator',
  org: 'BASF',                          // shown top-right of the card
  category: 'data-eng',                 // filter tab: 'supply-chain' | 'data-eng' | 'ai-automation'
  tag: 'Power BI + Databricks',         // chip on the preview image
  description: 'One or two sentences...',
  metrics: ['5,402 arrival points', 'MVP shipped in 1 week'],  // green ↗ bullet lines
  tech: ['Power BI', 'DAX'],            // grey chips
  links: [                              // leave [] for no links
    { label: 'Portfolio', url: 'https://...' },
  ],
  previewSeed: 1,                       // any number — controls the preview art shapes
},
```
- **Remove a project** → delete its whole `{ ... },` block.
- **Add a project** → copy a block and edit.
- The filter tab labels themselves are in `projectCategories` at the top of the file.
- The "Browse All Projects" button links to your GitHub (set in `profile.ts → socials.github`).

---

## 7. AI & Automation Lab

**File:** `src/data/pipeline.ts`

### The two animated pipelines (Data Pipeline / AI Automation)
Each mode has:
```ts
{
  id: 'data',
  label: 'Data Pipeline',               // pill button text
  headline: 'how a shipment becomes a dashboard',  // becomes "See how a shipment... ."
  stages: ['Extract', 'Clean', 'Transform', 'Load', 'Dashboard'],  // the stage pills
  lines: [
    { stage: 0, text: '> ingest SAP Cobalt tables...' },   // terminal lines, in order
    { stage: 1, text: 'validate...', accent: true },       // accent: true = teal color
  ],
  checklist: [
    { stage: 0, text: 'Source data extracted' },  // ticks when that stage finishes
  ],
},
```
`stage` numbers refer to positions in `stages` (0 = first pill). Lines appear one per
beat; the checklist item ticks once the animation passes its stage.

### The self-typing code editor
Same file → `terminalCode` — each line has `text` and a `color` class. Edit the text freely.

### "Currently Learning" card
Same file:
```ts
export const currentlyLearning = [
  'Building AI agents & LLM workflows',
  ...
]
```

---

## 8. Live demo dashboard

**File:** `src/data/dashboardData.ts`

- **Filter options:** `regions`, `carriers`, `years` lists at the top (keep the first
  "All ..." entry).
- **Lane lead-time chart:** the `laneLeadTimes` list at the bottom — edit lane names
  and day values directly.
- The KPI/chart numbers are **generated demo data**. The overall feel is controlled by
  `regionBias` and `carrierBias` (higher `otd` = better on-time %, higher `lead` =
  longer lead times, `volume` = more shipments). You normally don't need to touch these.
- The "DEMO DATA" label and chart titles are in `src/components/DemoDashboard.tsx`.

---

## 9. Certifications & Awards

**File:** `src/data/certifications.ts`

### Certifications
```ts
{
  name: 'Power BI Data Analyst Associate',
  issuer: 'Microsoft',
  code: 'PL-300',
  year: '2025',
  vendor: 'microsoft',     // logo: 'microsoft' | 'google' | 'python' | 'apu'
  credentialUrl: '#',      // ← paste your Credly / MS Learn share link here
},
```
**Important:** while `credentialUrl` is `'#'`, the "Show Credentials" button shows
greyed-out. Paste a real `https://...` link and it becomes an active teal button.

### Awards
```ts
{
  title: 'SPOT Award — Employee of the Month',
  org: 'BASF',
  year: '2025',
  description: 'One line about why...',
},
```

---

## 10. Contact section & footer

**File:** `src/data/profile.ts`
- `status: 'Open to data & AI collaborations'` → the green availability pill.
- `email`, `location`, `socials` → buttons and icons.

The big "Let's build something **with data**." headline and the paragraph under it are in
`src/components/Contact.tsx`.

---

## 11. Browser tab title & SEO

**File:** `index.html` (in the `website/` root)
- `<title>` → the browser tab text.
- `<meta name="description" ...>` → what Google shows under your link.

---

## 12. Colors & fonts (advanced)

**File:** `src/index.css` → the `@theme` block at the top.
- `--color-accent: #2dd4bf;` → the main teal. Change this one value and the whole
  site (buttons, glows, charts borders) follows.
- Fonts are loaded in `index.html` (Google Fonts) and assigned in the same `@theme` block.

---

## ✅ Publishing your changes

While testing locally nothing is public. When you're happy, follow the
**"Deploy to GitHub Pages"** steps in [README.md](./README.md). After the first setup,
every future `git push` republishes the site automatically.
