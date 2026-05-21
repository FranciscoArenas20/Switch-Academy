# Bilingual — AGENTS.md

## Working agreement

El agente nunca debe ejecutar cambios tecnológicos que el usuario no entienda. Si la petición es vaga, genérica o estética ("ponlo más bonito", "haz algo como..."), el agente debe detenerse, explicar las implicancias técnicas y ofrecer alternativas. No se acepta "vibe coding" — todo cambio se hace con comprensión consciente de ambas partes. Tono fraternal, conversacional, de aprendizaje mutuo.

## Project layout

Two independent Node.js projects, **no workspace tooling**. Each has its own `package.json`, `node_modules/`, and lockfile.

| Path | Tech | Status |
|------|------|--------|
| `front/bilingual/` | Next.js 15 (App Router), React 19, Tailwind v4, Framer Motion | Active landing page |
| `back/bilingual/` | NestJS 11, Jest | Scaffold only (boilerplate) |

## Commands

Run all commands from the respective package directory.

### Frontend (`front/bilingual/`)

```bash
npm run dev        # dev server (localhost:3000)
npm run build      # next build
npm run lint       # next lint (ESLint flat config, eslint.config.mjs)
npm run type-check # tsc --noEmit
```

**No test framework installed in frontend.**

### Backend (`back/bilingual/`)

```bash
npm run start:dev   # nest start --watch
npm run build       # nest build -> dist/
npm run lint        # eslint + prettier (--fix)
npm run format      # prettier --write (separate command)
npm run test        # unit (Jest, *.spec.ts)
npm run test:e2e    # e2e (Jest, test/jest-e2e.json)
```

### Docker (frontend)

```bash
docker-compose up   # front/bilingual/ — targets `builder` stage, hot-reload
docker build .      # multi-stage, node:20-alpine output
```

## Architecture highlights

- **Single-page landing** — sections render on `/` in order: Navbar → HeroSection → PlatformSection → FeaturesSection → FormSection → ContactSection
- **3-language system** (EN/FR/ES) via React Context. Colors: EN→blue `#2563EB`, FR→red `#C8102E`, ES→green `#16A34A`
  - Translations: `src/lib/content.ts` (edit for copy changes)
  - Context: `src/context/LanguageContext.tsx` — provides `t`, `setLang`, `language`, `isEnglish`
  - Switcher: `src/components/ui/LanguageSwitch.tsx` — 3-segment pill toggle
- **Tailwind v4** — `@import "tailwindcss"` via `@tailwindcss/postcss` plugin. No `tailwind.config.ts`. Custom theme vars in `globals.css` (`@theme` block).
- **Class merging**: use `cn()` from `src/lib/utils.ts` (clsx + tailwind-merge)
- **Fonts**: Syne (headings), DM Sans (body) — loaded via `next/font` in `layout.tsx`
- **Background**: cream `#F5F2EC`
- **AdminBar** (`src/components/ui/AdminBar.tsx`) — renders fixed bottom-right bar when Supabase session exists
- **Path alias**: `@/*` → `./src/*`
- **Language switch animation**: CSS custom properties `--transition-lang` in `globals.css` (0.35s ease, applies to color/bg/border)

## Environment

`.env.local` at `front/bilingual/` (committed, contains real Supabase keys). No `.env.example` exists. Required vars: Supabase (URL+anon+service_role), Sanity (projectId+dataset+token), `NEXT_PUBLIC_SITE_URL`.

## Reference

`front/bilingual/CLAUDE.md` has detailed frontend guidance — **note**: it's outdated (says EN/FR only, mentions `toggleLanguage` instead of `setLang`). Trust this AGENTS.md for corrections.
