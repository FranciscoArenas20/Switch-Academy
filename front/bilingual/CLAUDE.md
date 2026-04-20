# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

You are a Senior Frontend Developer and you will help me to fix the landing page that i'm creating.

## Commands

```bash
npm run dev        # Start development server
npm run build      # Production build
npm run lint       # Run ESLint
npm run type-check # TypeScript type checking (tsc --noEmit)
```

## Architecture

**Stack**: Next.js 15 (App Router) · React 19 · TypeScript 5 · Tailwind CSS 4 · Framer Motion

**Single-page landing** — all sections render on `/` via `src/app/page.tsx` in this order: `Navbar` → `HeroSection` → `PlatformSection` → `FeaturesSection`.

### Bilingual System

The core feature is EN/FR language switching:

- `src/context/LanguageContext.tsx` — React Context providing `language`, `toggleLanguage`, and `t` (translations accessor)
- `src/lib/content.ts` — All translation strings for both languages live here; this is the first place to edit when adding/changing copy
- `src/types/language.ts` — `Language` type and `LanguageContent` interface
- Language also drives color theming: English → blue (`#2563EB`), French → red (`#C8102E`)

### Styling Conventions

- Tailwind CSS v4 with PostCSS (`@tailwindcss/postcss` plugin)
- Custom CSS variables, animations (`fadeUp`, `fadeIn`, `slideIn`), and theme colors are in `src/app/globals.css`
- Fonts: **Syne** (headings/display) and **DM Sans** (body) — loaded via `src/app/layout.tsx`
- Background: cream (`#F5F2EC`)
- Use `cn()` from `src/lib/utils.ts` (clsx + tailwind-merge) for conditional class merging

### Path Aliases

`@/*` maps to `./src/*` — use this for all imports.

### Environment Variables

Copy `.env.example` to `.env.local`. Required variables:
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` / `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET` / `SANITY_API_TOKEN`
- `NEXT_PUBLIC_SITE_URL`

Remote images are allowed from `unsplash.com`, `cdn.sanity.io`, and `*.supabase.co` (configured in `next.config.ts`).

### Docker

```bash
docker-compose up   # Local dev with hot-reload
docker build .      # Multi-stage production build
```
