# Personal site — Bohdan

Personal portfolio / business card of a software engineer (mobile & web).
Live: https://bogdan.starcoding.top

## Tech stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **SCSS Modules** with a design-token layer (`src/styles`)
- **velite** content layer — portfolio items and posts authored as Markdown/MDX
- **GSAP** (`@gsap/react`) for animation
- **ESLint** (flat config) + **Prettier**
- Deployed on **Netlify**

## Project structure

```
src/
  app/                 # routes + root layout + globals
  components/
    layout/            # AppShell, Sidebar, Nav, Footer, Cursor
    sections/          # Hero, PortfolioList
    ui/                # SocialLinks, ProfileImage
  config/site.ts       # single source of truth (identity, nav, SEO)
  lib/                 # helpers & hooks
  styles/              # design tokens + mixins
content/
  works/*.md           # portfolio entries
  blog/*.mdx           # posts (WIP)
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server (http://localhost:3000) |
| `npm run build` | Production build (runs the velite content build first) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run format` | Format with Prettier |
| `npm run typecheck` | TypeScript check |

## Local development

Requires Node 20 (see `.nvmrc`).

```bash
npm install
npm run dev
```
