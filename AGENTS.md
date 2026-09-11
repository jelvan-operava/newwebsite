# AGENTS.md — Mandatory instructions for AI agents

You are editing the OPERAVA website repository. **Follow this file and `DESIGN.md` on every change.**

## Non-negotiable brand

- Header brand text: **OPERAVA** only
- Footer brand text: **Operava Global Solutions**
- Do not swap, merge, or restyle these inconsistently across pages

## Architecture & Directory Layout

- HTML Pages organized in `/pages/`: `index.html`, `solutions.html`, `service-detail.html`, `about.html`, `careers.html`, `jobs-global.html`, `jobs-us.html`, `talent.html`, `resume.html`, `referral.html`, `contact.html`, `privacy-policy.html`, `refund-policy.html`, `terms.html`
- Static Assets in `/public/`: media, images (`/public/images/`), icons (`/public/icons/`)
- Backend API in `/api/`: modular Express handlers (`/api/contact`, `/api/talent`, `/api/resume`, `/api/referral`, `/api/health`)
- Server: Express in `server.js` serving `/pages`, `/public`, and `/api` on port 3000
- Primary nav links to real files, not only `#` anchors
- Keep header/footer present and consistent on every page
- Careers content and Terms content must stay faithful to official OPERAVA source documents when updated

## Layout (always)

- **Premium full-width:** use the viewport from left edge to right edge
- Use fluid gutters (`clamp` on horizontal padding). Do **not** wrap the whole site in a narrow centered `max-width` container
- Default alignment is **left**, not center
- Constrain prose width for readability; do not constrain the entire page chrome the same way

## Design quality bar

This is a **principal-level editorial** product site, not a generic SaaS template.

**Do:**
- Remove unnecessary copy, badges, pills, icons, and repeated CTAs
- Prefer typography, spacing, contrast, and composition over decoration
- Use open lists, splits, dividers, and full-width bands
- Give each section a treatment that fits its purpose (hero ≠ jobs ≠ quote ≠ CTA)

**Do not:**
- Card-wrap everything (features, jobs, quotes, stats)
- Center everything by default
- Repeat the same card + icon + title + description pattern site-wide
- Add UI to fill empty space
- Reintroduce partner logo rows without real assets
- Add React/Vite/npm scaffold unless the user explicitly requests a stack migration

## When a section feels weak

1. Improve type scale / weight  
2. Improve spacing and alignment  
3. Improve contrast and proportion  
4. Only then consider a new element — and only if it earns its place  

## Change checklist

- [ ] Read `DESIGN.md`
- [ ] Branding intact (header OPERAVA, footer Operava Global Solutions)
- [ ] Full-width layout preserved (no narrow centered shell)
- [ ] No new unnecessary cards / badges / centered stacks
- [ ] Nav still works across pages
- [ ] Mobile: collapsible nav, stacked grids, usable gutters
- [ ] No unsolicited tooling files
- [ ] Terms/Careers remain faithful to official source wording when those pages change

## Conflict resolution

- User explicitly overrides a rule → follow the user for that rule
- Otherwise → follow this file + `DESIGN.md`
- Prefer simpler, more editorial, more intentional full-width layouts

Full detail: **`DESIGN.md`**
