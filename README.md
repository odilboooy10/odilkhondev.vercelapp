# odilkhondev.vercelapp

Portfolio for [odilkhondev.vercel.app](https://odilkhondev.vercel.app) — built
around three production platforms rather than a project gallery.

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind v4. Every route is static or SSG.

## Structure

```
app/
  layout.tsx            Inter + Fraunces, full OpenGraph metadata
  page.tsx              hero · work · about · stack · contact
  opengraph-image.tsx   OG card generated at build time
  work/[slug]/page.tsx  case study template
  sitemap.ts robots.ts
components/section.tsx  Shell, Section, Tag primitives
lib/content.ts          all copy and project data
```

All content lives in `lib/content.ts`. Case studies follow a fixed structure:
problem → constraints → decisions (each with reasoning) → measured evidence →
what I'd do differently.

## Design

Typography-led and deliberately restrained — Inter + Fraunces, warm paper
ground, a single sienna accent, full dark mode, `prefers-reduced-motion`
honoured. Design tokens are in `app/globals.css`.

## Performance budget

Measured from the production build:

| | |
|---|---|
| HTML | 6.0 KB gzipped |
| First-load JS | 173 KB gzipped |
| Routes | 6, all prerendered |

The JS figure is essentially the Next 16 + React 19 framework floor; the pages
themselves ship almost no client code.

## Local development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Status

`lib/content.ts` carries TODO markers for role, dates, and links. These are
left unfilled rather than invented — fill them with real values before launch.
