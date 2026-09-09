# OPERAVA | Operava Global Solutions

Premium static marketing website for **Operava Global Solutions**.

## Brand

| Location | Text |
|----------|------|
| Header | **OPERAVA** |
| Footer | **Operava Global Solutions** |

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home |
| `about.html` | About Us |
| `referral.html` | Referral Program |
| `jobs-us.html` | U.S. Job Search |
| `jobs-global.html` | Global Job Search |
| `resume.html` | Submit Resume |
| `talent.html` | Request Talent |
| `contact.html` | Contact Us |

Static HTML/CSS/JS — **no build step** required.

## Design rules (required reading)

Before changing any page, read:

1. **[DESIGN.md](./DESIGN.md)** — full design system, layout rules, anti-patterns  
2. **[AGENTS.md](./AGENTS.md)** — mandatory checklist for AI agents and automation  

Summary:

- Premium **full-width** layout (edge-to-edge; not a narrow centered shell)
- **Editorial / principal-level** hierarchy — not a generic SaaS card template
- Do **not** card-wrap everything or center everything by default
- Simplify (type, space, contrast) before adding UI chrome

## Deploy

### GitHub Pages

1. Repo → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` / folder: `/ (root)`
4. Save  

URL: `https://jelvan-operava.github.io/newwebsite/`

### Cloudflare Pages

1. Cloudflare → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. Select this repository  
3. Framework: **None** · Build command: empty · Output: `/`  
4. Deploy  

### Local preview

```bash
npx serve .
```

Or open any HTML file directly in a browser.

## Making changes

1. Read `DESIGN.md` and `AGENTS.md`
2. Keep branding, full-width layout, and page map intact
3. Prefer hierarchy over decoration
4. Update nav links on **all** pages if you add/remove a primary page
