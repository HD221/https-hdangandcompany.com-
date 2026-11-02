# hdangandcompany.com

Website for H Dang and Company, Chartered Accountants, Vadodara.

Vite, React, TypeScript, Tailwind CSS 4 and Framer Motion. Every page is pre-rendered
to static HTML at build time, so each has its own title, description and content.

## Commands

```bash
npm install
npm run dev        # local dev server
npm run build      # type check, build, pre-render pages, write sitemap.xml
node scripts/serve.mjs   # serve dist/ with clean URLs on :4173
```

## Deploy

- **Netlify:** connect the repo. `netlify.toml` sets the build. The contact form uses Netlify Forms
  (submissions appear under Forms in the Netlify dashboard).
- **Vercel:** connect the repo, framework "Vite", output `dist`. `vercel.json` turns on clean URLs.
  The contact form needs a form service on Vercel; WhatsApp, phone and email links work everywhere.

## Editing content

All text lives in `src/content.ts` (firm facts, services, industries, team, clients, FAQs, articles) and
`src/routes.ts` (page titles and meta descriptions). Legal pages are in `src/pages/Legal.tsx`.
Shared page sections are in `src/components/Sections.tsx`. Images are in `public/images` as `name-WIDTH.avif/.jpg`.

## Theme

| Token | Hex | Use |
|---|---|---|
| paper | `#F7F5F1` | background |
| green-ink | `#1B4239` | darker green panels |
| ink | `#212121` | text |
| green | `#2E6B5C` | accent, contact band |
| lime | `#C3F18A` | the one call to action on green |

Type: Cormorant Garamond (headings, matches the logo) and Hanken Grotesk (body text).

Motion lives in `src/components/Motion.tsx` (word reveals, scroll highlights, ticker, magnetic buttons, clip reveals),
`HorizontalServices.tsx` (pinned sideways scroll), `ServiceVisuals.tsx` (animated service diagrams) and
`BreakEven.tsx` (calculator). Everything respects the reduced-motion setting.
