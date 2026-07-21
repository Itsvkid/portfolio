# DESIGN_SPEC.md — Portfolio Revamp: Vinaykumar Venkateshkumar

Author: Kai Andersen (principal product designer).
Implementer: this document is complete and self-contained. Every measurement is decided. Do not substitute values. Where this spec says "delete", delete. Where it is silent, default to less.

Site: single-page portfolio at vinaykumar.is-a.dev. Stack stays: Next.js 16 App Router, Tailwind CSS 4, React 19, Vercel, Web3Forms contact backend. All real content (name, projects, experience, education, links, CV PDF, headshot, Web3Forms flow) is preserved — this is a redesign of presentation, with the specific content edits called out in §5.

---

## 1. Design direction

**Concept: "Instrument Grade."** The site should read like a flight-test instrument: dark, monochrome, typographically precise, with a single test-flight orange accent — the color painted on experimental aircraft so the important thing is unmissable. The owner's black-and-white studio portrait already belongs to this world; the design is built around it. Five principles govern every decision:

1. **One accent, spent sparingly.** Orange marks the current focus (kickers, links, live markers). Everything else is a grayscale.
2. **Typography is the layout.** Hierarchy comes from size, weight, and a mono/sans contrast — never from boxes. No cards.
3. **Rules, not containers.** Content is separated by 1px horizontal rules and whitespace, like an engineering drawing.
4. **Thin content presented as editorial, not inventory.** Two projects are two numbered chapters, full-width, generous — not two lonely cards in a grid.
5. **Motion is punctuation.** The full allowed list is four transitions (see §3.5). Nothing else moves.

Dark mode is the default and the primary design target. Light mode is fully specified and switched purely by `prefers-color-scheme` — there is no manual toggle (a toggle is UI about the UI; delete the idea).

---

## 2. Audit summary — what is wrong today

Concrete problems in the current implementation, by file:

- **No loaded typeface.** `app/layout.js` imports no `next/font`; the site renders in the browser default sans. Zero typographic identity for a portfolio whose whole job is credibility.
- **Card-itis.** `app/page.js` wraps every unit of content — projects, experience, education, skill groups, certifications, contact links, even the form (`app/ContactForm.js` line 80) — in `rounded-2xl border border-line` cards. The page reads as a template, and thin content (2 projects, 1 internship) looks like a sparsely stocked shelf.
- **Pill overload.** `Tag` component (`page.js` ~line 38) renders `rounded-full` pills for every skill, module, and tag — dozens of pills. Skill tag-clouds are the #1 template tell. Delete the `Tag` component entirely.
- **Graph-paper hero background.** `.grid-bg` in `app/globals.css` (lines 24–32) is a generic dev-portfolio trope. Delete the class and its usage.
- **Emoji in the hero.** `📍 {profile.location}` (`page.js` line 97). Never. Replace per §5.2.
- **Zebra sections.** Alternating `bg-wash` bands (`page.js` lines 187, 280) are a template rhythm. All sections sit on one background; rules do the separating.
- **Mixed radii and lazy hovers.** `rounded-full` buttons, `rounded-2xl` cards, `rounded-lg` inputs coexist; buttons hover via `hover:opacity-85` (opacity fades on solid fills read as cheap). `hover:shadow-sm` on project cards is motion without meaning.
- **Light-only palette** in `globals.css` `@theme`; no dark scheme despite a B/W portrait and an engineering audience that overwhelmingly browses dark.
- **Accessibility gaps:** no `:focus-visible` treatment anywhere; form inputs use `outline-none` with only a border-color change (`ContactForm.js` lines 106/123/140) — insufficient focus affordance; `scroll-behavior: smooth` is unconditional (no `prefers-reduced-motion` guard); no skip link; mobile users lose all section navigation (nav links are `hidden` below `md`, `page.js` line 55).
- **Contact section has three competing CTAs** — a 4-card link grid, a form, and a big CV button stacked with no hierarchy (`page.js` lines 336–374). `break-all` on link text wraps mid-word.
- **Metadata is minimal**: `app/layout.js` has no `metadataBase`, no OG image, no Twitter card, no canonical URL.
- **Certifications list leads with IELTS sub-scores** — visa paperwork presented as an achievement. Content edit in §5.6.

What already works and must be kept: the `app/data.js` single-source-of-content pattern; the Web3Forms form logic including the honeypot, the no-key `mailto` fallback, and the idle/sending/sent/error state machine; the mono index numbers on section headings (the one good instinct — it survives, refined); Vercel Analytics + Speed Insights; the CV PDF; the headshot.

---

## 3. Design tokens

All tokens are declared in `app/globals.css`. Pattern: raw scheme values live on `:root` custom properties that flip under `@media (prefers-color-scheme: light)`; Tailwind `@theme` maps utility names onto them so classes like `bg-bg0 text-fg1 border-line` work in both schemes automatically.

```css
@import "tailwindcss";

:root {
  color-scheme: dark;
  --bg0: #0A0C0E;      /* page background */
  --bg1: #101316;      /* raised surface: inputs, sticky nav fill */
  --line: #23282E;     /* all rules and borders */
  --fg0: #EDEEF0;      /* headings, primary text */
  --fg1: #A8AFB8;      /* body, secondary text */
  --fg2: #788087;      /* faint: meta, footer, placeholders */
  --accent: #FF6D3B;   /* test-flight orange */
  --accent-hover: #FF8A5E;
  --accent-active: #F05A26;
}

@media (prefers-color-scheme: light) {
  :root {
    color-scheme: light;
    --bg0: #FBFBFA;
    --bg1: #F3F3F1;
    --line: #E3E3DF;
    --fg0: #17191C;
    --fg1: #4A5057;
    --fg2: #686E75;
    --accent: #BC3C0A;
    --accent-hover: #9E3208;
    --accent-active: #8A2B06;
  }
}

@theme {
  --color-bg0: var(--bg0);
  --color-bg1: var(--bg1);
  --color-line: var(--line);
  --color-fg0: var(--fg0);
  --color-fg1: var(--fg1);
  --color-fg2: var(--fg2);
  --color-accent: var(--accent);
  --color-accent-hover: var(--accent-hover);
  --color-accent-active: var(--accent-active);
  --font-sans: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, "SF Mono", monospace;
}
```

### 3.1 Contrast (verified, WCAG relative luminance)

| Pair | Ratio | Use |
|---|---|---|
| `fg0` on `bg0` (dark) | 16.88:1 | headings, primary text |
| `fg1` on `bg0` (dark) | 8.85:1 | body |
| `fg1` on `bg1` (dark) | 8.42:1 | body on surface |
| `fg2` on `bg0` (dark) | 4.89:1 | meta text |
| `accent` on `bg0` (dark) | 7.00:1 | links, kickers |
| `bg0` text on `accent` fill (dark) | 7.00:1 | primary button |
| `fg0` on `bg0` (light) | 17.01:1 | headings |
| `fg1` on `bg0` (light) | 7.87:1 | body |
| `fg2` on `bg0` (light) | 4.98:1 | meta text (4.64:1 on `bg1`) |
| `accent` on `bg0` (light) | 5.35:1 | links, kickers |
| white `#FBFBFA` on `accent` fill (light) | 5.35:1 | primary button |

Every text/background pair in this spec is ≥ 4.5:1. Do not use `fg2` below 12px.

### 3.2 Typography

Families via `next/font/google`: **Geist** (sans) and **Geist Mono** — precise, engineered, current, and free. Setup in §9.3. Weights loaded: Geist 400, 500, 600; Geist Mono 400, 500. No other weights, no italics.

Type scale (rem values; letter-spacing in em):

| Token | Size / line-height | Tracking | Weight | Family | Used for |
|---|---|---|---|---|---|
| `display` | `clamp(2.5rem, 1.2rem + 5.5vw, 4.25rem)` / 1.05 | −0.035 | 600 | sans | Hero name only |
| `h2` | 1.375rem (22px) / 1.3 | −0.02 | 600 | sans | Section titles |
| `h3` | 1.75rem (28px) / 1.25 | −0.025 | 600 | sans | Project titles (projects are the stars — bigger than h2 deliberately) |
| `h4` | 1.0625rem (17px) / 1.4 | −0.01 | 600 | sans | Entry titles (org, school, credential group) |
| `body` | 1rem (16px) / 1.7 | 0 | 400 | sans | Paragraphs, bullets |
| `body-sm` | 0.875rem (14px) / 1.6 | 0 | 400 | sans | Form help, secondary rows |
| `label` | 0.6875rem (11px) / 1.2 | +0.12, uppercase | 500 | mono | Kickers, section indices, form labels, column headers |
| `meta` | 0.8125rem (13px) / 1.5 | +0.01 | 400 | mono | Dates, locations, tech lists, footer |

Color mapping: `display/h2/h3/h4` → `fg0`. `body` → `fg1`. `meta` → `fg2`. `label` → `accent` when it marks a section or state; `fg2` when it is a form/table label.

### 3.3 Layout, spacing, rhythm

- Base unit 4px. Only multiples of 4 appear anywhere.
- Content max-width: **70rem (1120px)**, centered. Gutter: 24px mobile, 40px ≥ 768px. (Class: `mx-auto max-w-[70rem] px-6 md:px-10`.)
- Section grid ≥ 1024px: 12 columns, 32px gap. Every section uses the same split — **label column (cols 1–4)** holding index + title (sticky, `top: 6rem`), **content column (cols 5–12)**. Below 1024px the label stacks above content with 32px between.
- Section vertical padding: 96px top and bottom desktop (`py-24`), 64px mobile (`py-16`). Sections are separated by a full-width 1px `line` rule (`border-t border-line` on each section except hero).
- Hero: 128px top / 112px bottom desktop; 64px / 72px mobile (below the 64px fixed-height nav).
- Vertical rhythm inside content: 8px label→title, 16px title→body, 32px between entries in a list, 48px between sub-groups.

### 3.4 Radii, borders, shadows

- Radius: **0** on everything except form inputs and buttons, which get **2px** (`rounded-[2px]`). No `rounded-full`, no `rounded-2xl`, anywhere. The headshot is a hard-edged square with a 1px `line` border.
- Borders: 1px `line` only. No 2px borders except the focus outline (§9).
- Shadows: **none**. Zero `shadow-*` classes in the codebase. Elevation is expressed by `bg1` fill + 1px border. The sticky nav uses a solid `bg0` fill at 94% opacity with `backdrop-blur-sm` and a bottom rule — that is the only translucency on the site.

### 3.5 Motion

Tokens: `--dur-fast: 120ms` (color/border/opacity), `--dur-base: 200ms` (underline, transform), easing `cubic-bezier(0.3, 0, 0.4, 1)` for everything.

The complete list of allowed animations:

1. **Link underline.** Text links render a 1px underline via `background-image` (or `text-decoration-color` transition): idle `transparent`/`line`, hover `accent`, 120ms. Nav links: `fg1` → `fg0` color transition, 120ms.
2. **Fade-up on first reveal.** Each section's content block fades from `opacity 0, translateY(10px)` to rest over 400ms when it first enters the viewport (IntersectionObserver, threshold 0.15, fires **once**, no stagger beyond a single 60ms delay for the label column). Hero content does not animate — it is visible on load, always.
3. **Button state.** Background-color transition 120ms between idle/hover/active fills. No scale, no translate.
4. **Form status swap.** Sent-state panel fades in over 200ms.

**Forbidden — do not implement under any circumstances:** parallax; scroll-linked animation of any kind; infinite marquees/tickers; typewriter effects; cursor followers; tilt/3D card hovers; scale-on-hover; gradient animation; skeleton shimmer; carousels; animated counters; blob/mesh backgrounds; glassmorphism panels. If `prefers-reduced-motion: reduce`, all four allowed animations collapse to instant state changes (§9.2).

---

## 4. Page architecture

Single page. One person, one narrative, seven scroll-lengths — multiple routes would add navigation cost and dilute the CV-reviewer's 60-second pass. Order:

1. **Nav** — fixed, minimal, CV always reachable.
2. **Hero** — who, what, where, availability; portrait; two actions.
3. **01 / Projects** — the strongest evidence goes first. Two numbered, full-width entries.
4. **02 / Experience** — the AIESL internship as a single confident entry.
5. **03 / Education** — Cranfield first, then Anna University; module lists as quiet meta text.
6. **04 / Toolchain** — skills as a definition list (renamed from "Technical Skills"; includes Credentials as a sub-group).
7. **05 / Contact** — one statement, one big mailto link, the form.
8. **Footer** — links, colophon.

Rationale for order: a recruiter for an entry-level CFD role needs proof of simulation work before anything else; education matters but Cranfield already appears in the hero location line, so it can sit third; skills are reference material, not narrative, so they sit late; contact is the terminal action.

---

## 5. Wireframes and section specs

Legend: `═` section rule (1px `line`), `─` internal rule, `[ ]` interactive, `◇` accent-colored, mono text shown in CAPS-ish spacing. Desktop frames ≈ 1440px viewport (content 1120px); mobile ≈ 390px.

### 5.1 Nav

Desktop:
```
┌──────────────────────────────────────────────────────────────────────────────┐
│  VK—V6                Projects  Experience  Education  Toolchain  Contact    │
│  (wordmark)                                                    [Download CV] │
└──────────────────────────────────────────────────────────────────────────────┘  ← 1px line rule
```
(single 64px row; wordmark left, links center-right group, CV button far right)

Mobile:
```
┌──────────────────────────────┐
│ VK—V6            [CV] [Menu] │ 64px
└──────────────────────────────┘
│ (Menu open: full-width panel │
│  under bar, bg0, links       │
│  stacked, 56px rows, rules)  │
```

Annotations:
- Bar: `fixed top-0 inset-x-0 z-50`, height 64px, `bg0` at 94% opacity + `backdrop-blur-sm`, `border-b border-line`. Inner container = standard gutter/max-width.
- Wordmark: mono, 13px, weight 500, `fg0`, reading `VK—V6` is wrong — use exactly **`VINAYKUMAR V.`** in `label` style but 12px, tracking +0.08em. Links to `#top`.
- Nav links: `body-sm` 14px, `fg1`, hover `fg0` (120ms), 32px gap. Active-section highlighting is **not** built (scroll-spy is complexity without payoff at this page length).
- Download CV: the only filled button in the header. `accent` fill, text `bg0` (dark) / `#FBFBFA` (light), mono 12px tracking +0.06em uppercase "CV — PDF", padding 8px 16px, radius 2px. Hover `accent-hover`, active `accent-active`.
- Mobile (< 768px): links hidden; show CV button (compact, same style, label "CV") and a "Menu" text button (mono 12px uppercase, `fg1`) that toggles a full-width dropdown panel: `bg0`, `border-b border-line`, links stacked in 56px rows each with a bottom rule, `body` 16px `fg0`. Panel closes on link tap and on Escape. This fixes the current total loss of mobile navigation. No hamburger icon — the word "Menu"/"Close" is the control.

### 5.2 Hero

Desktop:
```
════════════════════════════════════════════════════════════════════════════════
│                                                                              │
│  ◇ PROPULSION / CFD — CRANFIELD UNIVERSITY            ┌────────────┐         │
│                                                       │            │         │
│  Vinaykumar                                           │  portrait  │ 240px   │
│  Venkateshkumar                                       │  B/W, 1px  │         │
│                                                       │  border    │         │
│  CFD and propulsion engineer working on nacelle       └────────────┘         │
│  installation aerodynamics. ANSYS Fluent, parametric  ◇ AVAILABLE SEP 2026   │
│  CAD, validated jet-mixing research.                    ENTRY-LEVEL ROLES    │
│                                                                              │
│  CRANFIELD, UK · SPONSORSHIP REQUIRED                                        │
│                                                                              │
│  [View projects →]   [kumarvsvinay@gmail.com]                                │
│                                                                              │
════════════════════════════════════════════════════════════════════════════════
```

Mobile:
```
│ ┌──────┐                     │
│ │ 80px │ portrait            │
│ └──────┘                     │
│ ◇ PROPULSION / CFD —         │
│   CRANFIELD UNIVERSITY       │
│ Vinaykumar                   │
│ Venkateshkumar   (display)   │
│ CFD and propulsion engineer  │
│ working on nacelle …         │
│ CRANFIELD, UK ·              │
│ SPONSORSHIP REQUIRED         │
│ [View projects →]            │
│ [kumarvsvinay@gmail.com]     │
```

Annotations:
- Two-column desktop: text block cols 1–8, portrait block cols 10–12 top-aligned. Mobile stacks portrait first (80px square), then text; 24px between blocks.
- Kicker: `label` style, `accent`: `PROPULSION / CFD — CRANFIELD UNIVERSITY`. 12px below it → name.
- Name: `display`, `fg0`, two lines allowed. This is the largest text on the site by design.
- Summary paragraph, 20px below name, `body` at 17px/1.6, `fg1`, `max-width: 34rem`. Copy (tightened from `data.js` tagline — update `profile.tagline` to): *"CFD and propulsion engineer working on nacelle installation aerodynamics — ANSYS Fluent simulation, parametric CAD, and a validated jet-mixing study."*
- Status line, 24px below summary: `meta` style, `fg2`: `CRANFIELD, UK · SPONSORSHIP REQUIRED`. No emoji, no pin icon. The current `📍` and the `|` divider are deleted.
- Portrait: `next/image`, `/headshot.jpg`, square, `object-cover`, 240px desktop / 80px mobile, 1px `line` border, radius 0, `priority`. Alt: `"Vinaykumar Venkateshkumar, black-and-white studio portrait"`. Add CSS `filter: grayscale(1)` so the image stays monochrome even if the asset is ever replaced with a color photo.
- Availability marker under portrait (desktop) / merged into status line (mobile): `label` style; first line `accent` with a leading 6px `accent` square glyph (`■`): `AVAILABLE SEP 2026`; second line `fg2`: `ENTRY-LEVEL PROPULSION / CFD / AIRCRAFT DESIGN`. This is `profile.seeking`, reframed as a positive signal.
- Actions row, 40px below status line: primary button "View projects" (accent fill, same recipe as nav CV button but 12px 20px padding, 14px text) with a `→` glyph; secondary is the raw email address as a mono 14px `fg0` text link with `line` underline → `accent` underline on hover. An email address as a literal link is more useful to a recruiter than a "Get in touch" pill.
- No background pattern. `bg0` only. (`.grid-bg` deleted from `globals.css`.)

### 5.3 Section shell (applies to sections 01–05)

Desktop:
```
════════════════════════════════════════════════════════════════════════════════
│  ◇ 01            │   (content column, cols 5–12)                             │
│  Projects        │                                                           │
│  (sticky top-24) │                                                           │
════════════════════════════════════════════════════════════════════════════════
```
Mobile: label block (index + title inline: `◇ 01 / Projects`) stacked above content, 32px gap.

- Index: `label`, `accent`. Title: `h2`, `fg0`, 8px below index on desktop; inline on mobile.
- The current `SectionHeading` kicker lines ("Research and simulation work in…") are deleted — they restate the content.
- Label column is `position: sticky; top: 6rem` within the section (desktop only).

### 5.4 Section 01 — Projects

Desktop content column:
```
│  01·A                                    ONGOING — SEP 2026 ◇■               │
│  Installation Aerodynamics of                                                │
│  Aero-Engine Nacelles                                        (h3)            │
│  Cranfield Individual Research Project                       (meta)          │
│                                                                              │
│  Investigating installation aerodynamics with a Python-based                 │
│  propulsion-integration tool, applying iCST parametric geometry              │
│  to model nacelle installation effects.                                      │
│  Developing and benchmarking a pyOCC / OpenCASCADE geometry-                 │
│  generation workflow against commercial CAD output.                          │
│                                                                              │
│  PYTHON · ICST · PYOCC · OPENCASCADE · OPENFOAM              (meta, fg2)     │
│  ──────────────────────────────────────────────────────────────────          │
│  01·B                                              MAR 2025                  │
│  Investigation of Controlled Jets for                                        │
│  Enhanced Mixing Rates                                                       │
│  BEng Final Year Project — team of 3                                         │
│                                                                              │
│  ▸ 64–76% core-length reduction     ▸ Mach 0.6–1.0     ▸ 3.4M+ nodes         │
│                                                                              │
│  Passive flow-control tab geometries (Delta Tandem Tab, M Delta              │
│  Tandem Tab) to enhance nozzle jet mixing. ANSYS Fluent simulations          │
│  with grid-independence studies, validated against experimental              │
│  shadowgraph imaging. No significant thrust penalty.                         │
│                                                                              │
│  ANSYS FLUENT · DESIGNMODELER · ICEM CFD                                     │
```

Mobile: identical order, single column; the stat row wraps to a stacked list.

Annotations:
- No cards, no borders around entries. Entries separated by a 1px `line` rule with 48px space above and below it.
- Entry index `01·A` / `01·B`: `label`, `fg2`. Period/date: `meta`, `fg2`, right-aligned on the same baseline row (flex `justify-between`). The ongoing project's date gets a leading 6px `accent` square — live work is literally marked in orange.
- Title `h3` `fg0`, 8px under the index row; context line `meta` `fg2`, 4px under title.
- Body: the current bullet arrays render as `body` 16px/1.7 `fg1` paragraphs (join each `points` item as its own paragraph, 12px apart). Delete the accent-dot `<li>` markers.
- **Stat row (project B only):** the measurable results are pulled out of prose into a horizontal row of three figures: value in sans 600 17px `fg0`, label beneath in `label` `fg2` (`CORE-LENGTH REDUCTION`, `MACH RANGE VALIDATED`, `MESH NODES`). 40px gap between figures; wraps on mobile. Data additions to `data.js`: add `stats: [{value:"64–76%",label:"Core-length reduction"},{value:"M 0.6–1.0",label:"Validated range"},{value:"3.4M+",label:"Mesh nodes"}]` to the jets project. This is how thin content is made to look deliberate: fewer items, richer treatment.
- Tech list: `meta`, `fg2`, uppercase, ` · ` separated, 24px below body. The `tags` pill array from `data.js` is **not rendered** (the tech list covers it); keep the data field, unused, or delete it.

### 5.5 Section 02 — Experience

Desktop content column:
```
│  AI Engineering Services Limited (AIESL)          MAR — APR 2025             │
│  Engineering Intern — Aircraft Maintenance        THIRUVANANTHAPURAM, IN     │
│  Boeing 737 MRO base servicing Air India Express  (meta, fg2)                │
│                                                                              │
│  Rotational internship across Component Overhaul, Material/Production        │
│  Planning, and Stores. Documented wheel/brake overhaul procedures            │
│  (torque spec 158 lb-ft, tyre pressure 205 ± 5 psi) and Eddy Current         │
│  Testing for non-destructive flaw detection. Tracked parts issuance          │
│  and task-card compliance in AMOS and RAMCO.                                 │
```

Mobile: org/role stack, dates+location as one `meta` line beneath, then body.

Annotations:
- Header row: org `h4` `fg0` left; date `meta` `fg2` right. Second row: role in `body-sm` 500 `fg1` left; location `meta` `fg2` right. Sub-line `meta` `fg2`.
- Bullets merge into flowing paragraphs (same rule as projects). The concrete numbers (158 lb-ft, 205 ± 5 psi) stay — specificity is the credibility.
- One entry only: no rules needed inside; the generous section shell makes a single entry read as a statement, not a shortage.

### 5.6 Section 03 — Education

Desktop content column:
```
│  Cranfield University                              OCT 2025 — SEP 2026 ◇■    │
│  Thermal Power and Propulsion — Postgraduate       CRANFIELD, UK             │
│                                                                              │
│  MODULES  Gas Turbine Performance · Combustion · Turbomachinery              │
│           Aerodynamics · Propulsion System Design                            │
│  THESIS   Installation aerodynamics of aero-engine nacelles (ongoing)        │
│  ────────────────────────────────────────────────────────────────            │
│  KCG College of Technology, Anna University        2021 — 2025               │
│  BEng Aeronautical Engineering — CGPA 7.37/10      CHENNAI, IN               │
│                                                                              │
│  MODULES  Air Breathing Propulsion · Rocket Propulsion · Aerodynamics        │
│           I & II · CFD · Aircraft Structures I & II · FEM · Wind             │
│           Tunnel Techniques · NDT · Aircraft Design · Thermodynamics         │
```

Annotations:
- Same header-row pattern as Experience (`h4` + `meta`). Cranfield's period gets the `accent` square (current).
- Modules: a two-column definition row — `label` `fg2` term ("MODULES", "THESIS") in a 88px fixed column, definition as `meta`-sized (13px) sans `fg1` text, ` · ` separated, wrapping. **No pills.** Mobile: term stacks above definition.
- Entries separated by the standard 1px rule, 40px clearance.

### 5.7 Section 04 — Toolchain

Desktop content column (definition-list rows):
```
│  CFD & SIMULATION      ANSYS Fluent · ICEM CFD / Meshing · k-ε / k-ω        │
│                        turbulence modelling · OpenFOAM · grid-               │
│                        independence studies                                  │
│  ─────────────────────────────────────────────────────────────────           │
│  CAD & GEOMETRY        CATIA V5 · ANSYS DesignModeler · pyOCC /              │
│                        OpenCASCADE · iCST parametric geometry                │
│  ─────────────────────────────────────────────────────────────────           │
│  PROGRAMMING           Python · MATLAB                                       │
│  ─────────────────────────────────────────────────────────────────           │
│  DOMAINS               Propulsion · Aerodynamics · Jet flow control ·        │
│                        Thermodynamics · Aircraft structures · NDT            │
│                                                                              │
│  CREDENTIALS           CATIA V5 — CADD Centre, 80 hrs          2024          │
│                        MATLAB Essential Training — LinkedIn     2024         │
│                        ML with Python / DL with TensorFlow —    2024         │
│                        IBM Cognitive Class                                   │
```

Mobile: term stacks above items, rows keep their rules.

Annotations:
- Semantic `<dl>`. Term (`<dt>`): `label`, `fg2`, fixed 176px column desktop. Definition (`<dd>`): `body-sm` 14px/1.7 `fg1`, ` · ` separated plain text. Rows separated by 1px rules with 20px padding-block. **No proficiency bars, no pills, no icons, no percentages — ever.**
- Skill levels are not displayed except where factual ("CATIA V5" drops "(Proficient)" from the list — the 80-hr certification line carries the proof).
- **Credentials sub-group** replaces the "Certifications & Achievements" block: same `<dl>` row, each credential on its own line with year right-aligned in `meta` `fg2`. **Content edit (deliberate): the IELTS entry is removed from the page.** Language-test sub-scores are visa admin, not engineering achievement, and publishing a 5.5 Speaking band actively works against the owner. It remains in the CV PDF; delete the object from `certifications` in `data.js` or filter it out. Everything else stays.

### 5.8 Section 05 — Contact

Desktop content column:
```
│  Hiring for propulsion, CFD, or aircraft-design work?                        │
│  I reply within a day.                          (h3, fg0, max-w 30rem)       │
│                                                                              │
│  ◇ kumarvsvinay@gmail.com        (mono 20px, accent, underlined link)        │
│                                                                              │
│  ──────────────────────────────────────────────────────────────────          │
│                                                                              │
│  NAME                          EMAIL                                         │
│  [__________________]          [__________________]                          │
│  MESSAGE                                                                     │
│  [________________________________________________]                         │
│  [__________________________________________ 5 rows]                        │
│                                                                              │
│  [Send message]        or download the [CV — PDF]                            │
```

Mobile: statement, email link, then form fields stacked full-width.

Annotations:
- The 4-card contact grid is **deleted**. Email is promoted to a single large mono link (20px, `accent`, 1px underline offset 4px, hover `accent-hover`); phone, LinkedIn, GitHub move to the footer where reference data belongs.
- Statement: `h3` sizing, `fg0`. Exact copy: *"Hiring for propulsion, CFD, or aircraft-design work? I reply within a day."*
- Form (restyled `ContactForm.js`, logic untouched — keep env-key guard, honeypot, fetch flow, state machine):
  - Labels: `label` style, `fg2`, 8px above field. Keep `htmlFor`/`id` pairs.
  - Inputs: `bg1` fill, 1px `line` border, radius 2px, padding 10px 12px, `body-sm` 14px `fg0`, placeholder `fg2`. Focus: `border-accent` **plus** the global focus outline (§8.1) — replace `outline-none` with `focus-visible` treatment.
  - Error text: `accent` (not Tailwind `red-600` — the accent doubles as the alert hue in this monochrome system; light-mode `#BC3C0A` reads as alert on white, dark-mode ratio 7.0:1 exceeds AA), `body-sm`, `role="alert"` kept, plus `aria-invalid` wiring per §8.4.
  - Submit: primary button recipe. Sending state keeps `disabled:opacity-50` but adds `cursor: default`.
  - Sent state: `bg1` panel, 1px `line` border, radius 0, left-aligned (not centered): `h4` "Message sent." + `body-sm` `fg1` line + "Send another" text link.
  - No-key fallback panel: same `bg1`/`line` recipe.
- CV link: text link beside submit, mono 13px, `fg1` underline → `accent`. The big duplicate CV button at the bottom of the current contact section is deleted (nav owns the primary CV action).

### 5.9 Footer

Desktop:
```
════════════════════════════════════════════════════════════════════════════════
│  © 2026 VINAYKUMAR VENKATESHKUMAR        GITHUB   LINKEDIN   +44 7742 914241 │
│  PROPULSION · CFD · PARAMETRIC CAD                            CV — PDF       │
════════════════════════════════════════════════════════════════════════════════
```
Mobile: two stacked groups, 16px apart.

- All footer text: `meta` 13px mono. Left block `fg2`; links right, `fg1`, underline on hover → `accent`. GitHub → `profile.github`, LinkedIn → `profile.linkedin`, phone → `tel:` link, CV → PDF. 40px padding-block, `border-t border-line`.
- Year computed as today (`new Date().getFullYear()` is fine — page is static-rendered per deploy, acceptable drift).

---

## 6. Component inventory

All under `app/components/`. Server components unless marked. Content still flows exclusively from `app/data.js` — components take data as props; no copy hardcoded in JSX except structural labels.

| File | Props | States / notes | Responsive |
|---|---|---|---|
| `Nav.js` (client) | `nav: {href,label}[]`, `cvHref` | `menuOpen` boolean (mobile panel); Escape + link-click close; `aria-expanded` on trigger | Links row ≥768px; Menu button + panel <768px |
| `Hero.js` | `profile` | none | 2-col ≥1024px; stacked below |
| `Section.js` | `index` ("01"), `title`, `id`, `children` | renders shell of §5.3; wraps children in `Reveal` | sticky label ≥1024px |
| `Reveal.js` (client) | `children`, `delay?` | IO fade-up once (§3.5.2); renders children statically when `prefers-reduced-motion` | n/a |
| `ProjectEntry.js` | `project` (incl. optional `stats`) | accent square when `period` contains "Ongoing" | stat row wraps <640px |
| `ExperienceEntry.js` | `entry` | — | header rows stack <640px |
| `EducationEntry.js` | `entry` | accent square on current period | dl term stacks <768px |
| `ToolchainList.js` | `skills`, `certifications` | renders `<dl>` incl. Credentials rows | term column collapses <768px |
| `ContactSection.js` | `profile` | — | 1-col <768px |
| `ContactForm.js` (client, existing file restyled) | `email` | idle / sending / sent / error / no-key (all preserved) | 2-col name+email ≥640px |
| `Footer.js` | `profile` | — | stacks <640px |

`app/page.js` becomes a thin composition of these. Delete the inline `SectionHeading` and `Tag` components.

---

## 7. Responsive breakpoints

Tailwind defaults; exact behavior:

- **< 640px (base, design at 390px):** single column everywhere; gutter 24px; section padding-block 64px; hero portrait 80px above text; stat row stacks vertically (12px gaps); nav = wordmark + CV + Menu; form fields full-width stacked; footer stacked.
- **≥ 640px (`sm`):** form name/email side-by-side (16px gap); stat row horizontal; entry header rows become two-ended flex lines.
- **≥ 768px (`md`):** nav links visible, Menu button removed; gutter 40px; `<dl>` term columns activate (176px / 88px fixed).
- **≥ 1024px (`lg`):** 12-col section grid with sticky label column engages; hero goes two-column with 240px portrait; section padding-block 96px.
- **≥ 1440px:** no change — content stays capped at 1120px; whitespace grows symmetrically. No ultra-wide special casing.

No horizontal scrolling at any width ≥ 320px; the long email/URL strings are broken with `break-words` (never `break-all`) or wrapped in `overflow-wrap: anywhere` only inside the footer.

---

## 8. Accessibility requirements

1. **Focus:** global rule in `globals.css`:
   ```css
   :focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; border-radius: 2px; }
   ```
   Remove every `outline-none`. Focus outlines must be visible on nav links, buttons, form fields, and footer links; verify against both schemes.
2. **Reduced motion:**
   ```css
   @media (prefers-reduced-motion: reduce) {
     html { scroll-behavior: auto; }
     *, *::before, *::after { animation: none !important; transition: none !important; }
   }
   ```
   `Reveal.js` must render content fully visible (no initial `opacity-0`) when the media query matches — check it in JS, don't rely on CSS alone, so content is never hidden if JS fails mid-reveal. Additionally: initial state must be applied by JS, not markup, so no-JS visitors see everything.
3. **Landmarks & semantics:** one `<header>`, one `<main id="top">`, one `<footer>`; each section is `<section aria-labelledby>` its `h2` id; skip link as first DOM element (`"Skip to content"`, visually hidden until focused, jumps to `#top`); heading order h1 → h2 → h3/h4 with no skips; the toolchain uses a real `<dl>`; document has exactly one `<h1>` (hero name).
4. **Form:** visible labels kept (never placeholder-as-label); on error set `aria-invalid="true"` on offending fields and keep `role="alert"` on the message; error text never conveyed by color alone (it is text); submit button min target 44×32px; honeypot keeps `aria-hidden` + `tabIndex={-1}`.
5. **Images:** headshot alt per §5.2; decorative accent squares are CSS pseudo-elements or `aria-hidden` spans.
6. **Color scheme:** `color-scheme` set on `:root` per scheme (form controls, scrollbars render correctly); all ratios per §3.1.
7. **Nav panel:** mobile menu trigger is a `<button>` with `aria-expanded`/`aria-controls`; panel links are plain anchors; focus stays in document flow (no trap needed — panel is in-flow, not modal).

---

## 9. Implementation notes

### 9.1 Build sequence

1. `globals.css`: replace entire file — token block from §3, focus rule, reduced-motion block, keep `scroll-padding-top: 5rem`, smooth scroll gated behind `@media (prefers-reduced-motion: no-preference)`. Delete `.grid-bg`.
2. `app/layout.js`: add fonts (§9.3), upgraded metadata (§9.4), `bg-bg0 text-fg1 font-sans` on body. Keep `<Analytics />` and `<SpeedInsights />` exactly as-is.
3. Build `Section.js` + `Reveal.js`, then components top-to-bottom: Nav, Hero, ProjectEntry, ExperienceEntry, EducationEntry, ToolchainList, ContactSection (+ restyle `ContactForm.js` — move it to `app/components/`, update the import), Footer.
4. Rewrite `app/page.js` as composition. Delete `SectionHeading`, `Tag`, the contact card grid, the bottom CV button, all `rounded-2xl`/`rounded-full`/`shadow`/`bg-wash` classes.
5. `data.js` edits (only these): tightened `tagline` (§5.2); add `stats` to the jets project (§5.4); remove the IELTS certification entry (§5.7); everything else byte-identical.
6. QA pass (§9.5).

### 9.2 Keep / delete

**Keep:** Web3Forms endpoint + `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` guard + honeypot + status machine; `@vercel/analytics` + `@vercel/speed-insights`; `/Vinaykumar_Venkateshkumar_CV.pdf`; `/headshot.jpg`; `data.js` as single content source; single-page anchor architecture; README (update its Structure section after the move).
**Delete:** `.grid-bg`; old `@theme` colors (`ink/ink-2/muted/line/paper/wash` — fully replaced, no aliases); `Tag`; `SectionHeading`; contact card grid; emoji; kicker lines; IELTS page entry; every `shadow-*`, `rounded-2xl`, `rounded-full`, `hover:opacity-85`.

### 9.3 Fonts (`next/font`)

```js
// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
const geist = Geist({ subsets: ["latin"], weight: ["400","500","600"], variable: "--font-geist-sans", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], weight: ["400","500"], variable: "--font-geist-mono", display: "swap" });
// <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
```
`@theme` maps `--font-sans`/`--font-mono` onto these variables (§3), so `font-sans`/`font-mono` utilities just work.

### 9.4 Metadata

Extend the existing object: `metadataBase: new URL("https://vinaykumar.is-a.dev")`, `alternates: { canonical: "/" }`, keep title/description, add `openGraph.url`, `openGraph.siteName`, `openGraph.images: ["/headshot.jpg"]`, and `twitter: { card: "summary", images: ["/headshot.jpg"] }`. Keep wording of title/description unchanged.

### 9.5 Final QA checklist

- [ ] `npm run build` clean; page fully statically prerendered.
- [ ] Lighthouse (mobile, production build): Performance ≥ 95, Accessibility 100, Best Practices 100, SEO 100.
- [ ] Keyboard walkthrough: Tab from load → skip link → wordmark → nav links → CV → hero actions → … → form → footer; every stop shows the 2px accent outline; mobile menu operable by keyboard; Escape closes it.
- [ ] Both color schemes checked (macOS appearance toggle): no hardcoded hex leaks, form controls match scheme.
- [ ] `prefers-reduced-motion`: no smooth scroll, no reveal animation, all content visible.
- [ ] JS disabled: all content visible (reveal initial states applied by JS only), form falls back gracefully (native validation still labels fields).
- [ ] 320px width: no horizontal scroll.
- [ ] Contact form: real submission against Web3Forms succeeds; error path (bad key locally) shows accent alert; no-key fallback renders.
- [ ] Grep the repo for `rounded-full`, `rounded-2xl`, `shadow-`, `grid-bg`, `📍` — zero hits.
- [ ] Zoom 200%: layout intact, no clipped text.
