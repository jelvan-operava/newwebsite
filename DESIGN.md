# OPERAVA Design System & Change Instructions

**This document is mandatory.** Every human and every AI agent must read and follow it before changing any file in this repository.

Last updated: 2026-09-09

---

## 1. Brand identity (non-negotiable)

| Location | Exact text | Notes |
|----------|------------|--------|
| Header / nav brand | **OPERAVA** | All caps. No tagline in the header. |
| Footer brand | **Operava Global Solutions** | Full legal/trade name. |
| Page `<title>` | `{Page} \| OPERAVA` or `OPERAVA \| Operava Global Solutions` on home | Keep OPERAVA primary. |

Do **not**:
- Put “Operava Global Solutions” in the header
- Put only “OPERAVA” as the sole footer brand without the full name
- Invent new brand spellings (Operava / OPERAVA / Operava Global Solutions only)

---

## 2. Site structure & directory layout

The repository is organized into distinct, purposeful directories:
- `/pages/` — All HTML documents (served cleanly at root and direct `.html` extensions)
- `/public/` — Static media assets (`/public/images/`, `/public/icons/`)
- `/api/` — Backend server routes (`/api/contact`, `/api/talent`, `/api/resume`, `/api/referral`, `/api/health`)
- `server.js` — Express server providing clean routing, form processing, and asset serving

| File in `/pages/` | Clean Route | Purpose |
|-------------------|-------------|---------|
| `index.html` | `/` | Home — Technology, Workforce & Talent Solutions overview |
| `solutions.html` | `/solutions` | Complete Services Directory (IT & BPO services) |
| `service-detail.html` | `/service-detail` or `/service/:slug` | Deep-dive service architecture, deliverables, 4-step delivery process, FAQs, and talent engagement |
| `about.html` | `/about` | About Operava Global Solutions & SEC Corporate Governance |
| `careers.html` | `/careers` | Careers & Core Professional Role Tracks |
| `jobs-global.html` | `/jobs-global` | Global 100% Remote Opportunities |
| `jobs-us.html` | `/jobs-us` | U.S. & North American Talent Opportunities |
| `talent.html` | `/talent` | Request Dedicated Talent Pods & Enterprise Squads |
| `resume.html` | `/resume` | Candidate Application Submission |
| `referral.html` | `/referral` | Client & Candidate Referral Program |
| `contact.html` | `/contact` | Corporate Inquiries & Direct Engagement |
| `privacy-policy.html` | `/privacy-policy` | Data Privacy Policy (RA 10173 & Global Standards) |
| `refund-policy.html` | `/refund-policy` | Billing, Milestone SOW & Refund Governance |
| `terms.html` | `/terms` | Official Terms & Conditions of Engagement |

Navigation must link to these targets (not hash-only anchors for primary destinations). Keep header + footer consistent on every page. Active nav item uses `.is-active`.

---

## 3. Layout system — premium full-width

**Principle:** Use the entire horizontal viewport intentionally. Do not trap content in a narrow centered column.

### Required

- Fluid horizontal padding via CSS variable, e.g. `--gutter: clamp(24px, 5vw, 80px)` (or equivalent `--page-gutter`)
- Sections span full width; padding lives *inside* the section
- Left-aligned primary compositions (hero type, section titles, body)
- Split, asymmetrical, or edge-to-edge layouts where content benefits
- Readable text measure: constrain long prose (~`38rem` / `--measure`), not the whole page shell

### Forbidden

- `max-width: 1200px; margin: 0 auto` (or similar) wrapping the **entire** page
- Defaulting every block to `text-align: center`
- Huge empty side margins that leave a “postcard” of content in the middle of ultrawide screens

### Mental model

```
LEFT EDGE ┃━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┃ RIGHT EDGE
```

Not:

```
        ┃━━━━━━━━ CENTERED CONTENT ━━━━━━━━┃
```

Full-width does **not** mean stretch every text line edge-to-edge. It means structure, backgrounds, grids, and composition use the canvas; prose stays readable.

---

## 4. Design philosophy — principal / editorial standard

The site must feel like a **premium enterprise technology brand**, not a generic SaaS template.

Target qualities: **minimal · intentional · spacious · sophisticated · editorial · premium.**

### 4.1 Remove unnecessary information first

Audit every section. Eliminate anything that does not improve understanding or hierarchy.

Avoid by default:
- Eyebrow / kicker text used only to fill space (kickers are allowed when they clarify section role)
- Redundant subtitles under clear headlines
- Decorative labels, badges, pills, tags
- Numbers or stats without a real purpose
- Generic feature icons
- Repeated CTAs in the same section
- Partner logo rows without real partner assets

**Do not add an element because there is empty space.**

### 4.2 Do not turn everything into cards

Cards are allowed only when content genuinely needs separation or interaction.

Prefer:
- Open layouts
- Large typography
- Whitespace
- Hairline dividers
- Full-width sections
- Editorial / split compositions
- Integrated content (not boxed by default)

Do **not** automatically wrap features, stats, testimonials, jobs, or navigation in bordered cards.

### 4.3 Do not center everything

Default to left-aligned type and purposeful asymmetric layout. Centering is an exception, not the system.

### 4.4 Do not use one pattern for every section

Each major block should get a treatment suited to its job:

| Section type | Appropriate treatment |
|--------------|----------------------|
| Hero | Immersive, dramatic, large type, left-locked |
| Solutions / features | Editorial split or structured list — not three identical cards |
| Jobs | Open list with dividers |
| News / perspective | Horizontal image + text rows |
| Testimonial | Typographic quote block — not a card |
| CTA | Simple, high-impact band; one clear action |
| Forms | Quiet underline inputs; no heavy form chrome |

### 4.5 Hierarchy over decoration

When a section feels weak, **do not** add icons, cards, badges, or extra subtitles first.

Try in order:
1. Typography scale and weight  
2. Spacing  
3. Alignment  
4. Proportions  
5. Contrast  
6. Imagery  
7. Whitespace  
8. Composition  

**Simplify before adding.**

Every element must earn its place. If it does not improve usability, comprehension, hierarchy, or visual storytelling, remove it.

---

## 5. Visual tokens (current system)

Keep tokens consistent when editing CSS. Prefer CSS custom properties on `:root`.

| Token | Role | Typical value |
|-------|------|----------------|
| `--ink` | Primary text / dark UI | `#0c0a14` |
| `--muted` | Secondary text | `#6b6578` |
| `--line` | Dividers | `#e8e4ef` |
| `--surface` | Alternate band | `#f7f5fa` |
| `--purple` | Accent / primary action | `#6d28d9` |
| `--purple-deep` | Dark brand band / page hero | `#1e0b3a` |
| `--gutter` / `--page-gutter` | Horizontal page padding | `clamp(24px, 5vw, 80px)` |
| `--measure` / `--prose-max` | Max readable text width | `~38rem`–`42rem` |
| Display font | Headings / brand | Roboto Condensed |
| Body font | Body / UI | Montserrat |

Buttons: sparse, pill-shaped, limited variants (`fill`, `ghost`, `ink`, `line`). Do not invent many button styles.

Forms: bottom-border inputs, not heavy boxed fields, unless a specific UX need appears.

---

## 6. Content & copy rules

- Preserve existing meaning and offering (technology + talent solutions).
- Prefer short, confident sentences over marketing filler.
- Do not invent fake metrics, awards, or partner logos.
- Placeholder emails (`@operava.example`) may stay until real contacts are provided.
- Job listings may be representative placeholders until a live feed exists.

---

## 7. How to make changes (checklist)

Before any PR or AI edit:

1. **Read this file** (`DESIGN.md`) and `AGENTS.md`.
2. **Identify the page(s)** affected; keep shared header/footer behavior aligned across all HTML files.
3. **Preserve branding** (header OPERAVA, footer Operava Global Solutions).
4. **Preserve full-width layout** — no regressing to a single narrow centered container.
5. **Avoid cardification** and centered-by-default layouts.
6. **Prefer hierarchy** (type, space, contrast) over new UI chrome.
7. **Match section purpose** to layout treatment (see §4.4).
8. **Test mobile**: nav collapses; grids stack; gutters remain usable (`~20–24px` minimum).
9. **Do not add** scaffold files (package.json, Vite, React, etc.) unless the project explicitly migrates off static HTML.
10. **Do not delete** pages that are linked from the primary nav without replacing those links.

When adding a **new page**:
- Reuse the same nav, footer, tokens, and page-hero pattern.
- Register it in the nav on **all** pages.
- Use left-aligned, full-width section structure.

When changing **CSS**:
- Edit shared patterns carefully; many pages duplicate a compact style block — update consistently or extract only if the project adopts a shared stylesheet.
- Keep `--gutter` / measure variables; do not hard-code conflicting max-widths on page shells.

---

## 8. Explicit anti-patterns (never reintroduce)

- Whole-site `max-width: 1100px` (or similar) + `margin: 0 auto`
- “Feature card grid” of icon + title + paragraph repeated everywhere
- Centered hero headline + centered subtitle + centered dual CTAs as the only hero pattern
- Badge/pill spam on job rows
- Fake partner logo carousels
- Multiple stacked CTAs saying the same thing
- Decorative icons that do not encode meaning
- New frameworks or build tooling without an explicit product decision

---

## 9. Deployment notes

- Repo: static HTML at repository root — suitable for **GitHub Pages** or **Cloudflare Pages**.
- Publish from `main`; entry file `index.html`.
- After structural changes, verify all nav targets resolve (`about.html`, `jobs-us.html`, etc.).

---

## 10. Authority

If a request conflicts with this document:

1. Prefer **this design system** for layout, hierarchy, and branding.
2. Prefer the **user’s explicit new instruction** only when they clearly override a specific rule (e.g. “put the full company name in the header”).
3. When unsure, choose the option that is **simpler, more editorial, and more full-width**, not the option that adds more UI.

**Design space. Do not fill space.**
