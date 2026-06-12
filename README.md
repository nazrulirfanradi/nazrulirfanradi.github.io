# Nazrul Irfanradi — Personal Website

Personal portfolio website: supply chain × data engineering × AI automation.
Built with **Vite + React + TypeScript + Tailwind CSS v4 + Framer Motion + Recharts**.

## Run locally

```bash
npm install
npm run dev      # open http://localhost:5173
```

```bash
npm run build    # production build to dist/
npm run preview  # serve the production build locally
```

## Editing content

All text content lives in `src/data/` — no need to touch components:

| File | What it controls |
|---|---|
| `src/data/profile.ts` | Name, hero roles, tagline, socials, stats, strengths |
| `src/data/experience.ts` | Career timeline + leadership badges |
| `src/data/skills.ts` | Skill categories and badges |
| `src/data/projects.ts` | Project case-study cards |
| `src/data/certifications.ts` | Certifications (set `credentialUrl` to your Credly/Microsoft Learn links) & awards |
| `src/data/pipeline.ts` | AI Lab pipeline animations, terminal code, "currently learning" list |
| `src/data/dashboardData.ts` | Demo dashboard sample data |

## Deploy to GitHub Pages (nazrulirfanradi.github.io)

> ⚠️ This replaces whatever is currently in the `nazrulirfanradi.github.io` repository.

1. Initialise git in this `website/` folder and point it at your repo:

   ```bash
   git init
   git add .
   git commit -m "New personal website"
   git branch -M main
   git remote add origin https://github.com/nazrulirfanradi/nazrulirfanradi.github.io.git
   ```

2. Push (force replaces the old site):

   ```bash
   git push -u origin main --force
   ```

3. On GitHub: repo **Settings → Pages → Build and deployment → Source = "GitHub Actions"**.

4. The included workflow (`.github/workflows/deploy.yml`) builds and publishes automatically
   on every push to `main`. Your site goes live at **https://nazrulirfanradi.github.io**.
