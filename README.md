# OPERAVA | Operava Global Solutions

Premium static marketing website for **Operava Global Solutions**.

- **Header brand:** OPERAVA  
- **Footer brand:** Operava Global Solutions  
- Single-page HTML/CSS/JS (no build step required)

## Files

| File | Purpose |
|------|--------|
| `index.html` | Full site (header, hero, solutions, jobs, news, footer) |
| `README.md` | This file |

## Deploy

### Option A — GitHub Pages (simplest)

1. Repo → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` / folder: `/ (root)`
4. Save

Site URL will be:  
`https://jelvan-operava.github.io/newwebsite/`

### Option B — Cloudflare Pages

1. [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. Select this repository
3. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/` (or leave default)
4. Deploy

You will get a `*.pages.dev` URL. Custom domain can be added in Cloudflare.

### Option C — Any static host

Upload `index.html` only to Netlify, Vercel, S3, etc. No build required.

## Local preview

Open `index.html` in a browser, or run:

```bash
npx serve .
```
