# Railshop Service Site Starter — Claude Code Agent Guide

You are working inside the **Railshop Service Site Starter**, a production-grade
monorepo for building local service business websites. Built and maintained by
Railshop (railshop.co). Every output should reflect Railshop's standard: clean,
fast, accessible, SEO-optimized, and genuinely designed — not generic.

---

## Repo Structure

```
railshop-service-starter/
├── web/                         # Astro 5 frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── blocks/          # Page section components (Hero, FAQ, etc.)
│   │   │   ├── layout/          # Header, Footer
│   │   │   └── seo/             # SEO.astro — all head meta + JSON-LD
│   │   ├── data/
│   │   │   └── local.ts         # Local data source (used when cmsMode = 'local')
│   │   ├── layouts/
│   │   │   └── BaseLayout.astro # HTML shell for all pages
│   │   ├── lib/
│   │   │   └── data.ts          # Unified data adapter — ALWAYS import from here
│   │   ├── pages/               # File-based routing
│   │   ├── styles/
│   │   │   └── global.css       # Brand token system — per-client theming lives here
│   │   └── site.config.ts       # Per-client configuration — start here
│   ├── public/
│   │   └── robots.txt
│   ├── astro.config.mjs
│   ├── package.json
│   └── tsconfig.json
├── studio/                      # Sanity Studio CMS
│   ├── schemaTypes/
│   │   ├── documents/           # One file per Sanity document type
│   │   ├── objects/             # Reusable field groups
│   │   └── index.ts             # Registers all schemas
│   ├── sanity.config.ts
│   ├── package.json
│   └── tsconfig.json
├── netlify.toml                 # Netlify build + redirect config
├── .env.example                 # All required env vars documented
└── package.json                 # Monorepo workspace root
```

---

## Starting a New Client Project

**Step 1 — Edit `web/src/site.config.ts`**

This is the single most important file. Set:
- `clientName` / `clientSlug`
- `industry` — drives `industryComponentMap` recommendations
- `schemaType` — Schema.org business type for JSON-LD
- `cmsMode` — `'sanity'` (default) or `'local'` (no CMS)
- `siteUrl` — must be exact, used in canonical URLs and sitemap
- `features` — toggle blog, projects, areas, emergency banner, etc.

**Step 2 — Update the brand tokens in `web/src/styles/global.css`**

Find the `:root` block and update:
- `--color-brand-*` — full 50–950 scale for the primary color
- `--color-accent-*` — CTA and highlight color
- `@import url(...)` — swap Google Fonts for the client's pairing

Never use Inter, Roboto, Arial, or system fonts. Every client gets a
distinctive font pairing. Good options: Fraunces, Playfair Display, DM Serif
Display, Syne, Space Grotesk (sparingly), Cabinet Grotesk, Instrument Serif.

**Step 3 — Populate data**

- `cmsMode: 'sanity'` → set up Sanity project, add `.env`, populate Studio
- `cmsMode: 'local'`  → edit `web/src/data/local.ts` directly

**Step 4 — Update `web/public/robots.txt`**

Replace `https://example.com` with the client's actual domain.

---

## Architecture Rules

### Data Layer
- **Always import data from `web/src/lib/data.ts`** — never directly from
  Sanity or local files. The adapter handles both CMS modes transparently.
- All data functions are async. Always `await` them in Astro frontmatter.
- Never hardcode business name, phone, or address in components. Always
  pull from `getBusiness()`.

### Components
- **Block components** live in `src/components/blocks/`. They are
  self-contained sections used to compose pages.
- **Layout components** live in `src/components/layout/`. Header and Footer
  are global and should rarely need modification per client.
- **SEO component** lives in `src/components/seo/SEO.astro`. Never add
  `<title>` or meta tags anywhere else — always pass `seo` props to
  `BaseLayout` and let `SEO.astro` handle it.
- Components use CSS custom properties (tokens) for all colors, spacing,
  and typography. Never use hardcoded hex values in component styles.

### Pages
- Every page must use `BaseLayout.astro` and pass a `seo` prop.
- Use `getStaticPaths()` for all dynamic routes (`[service]`, `[area]`, etc.)
- Breadcrumbs are passed as `seo.breadcrumbs` — the SEO component renders
  the `BreadcrumbList` JSON-LD automatically.
- Landing pages (`/lp/[campaign]`) use a stripped layout with no main nav.

### JSON-LD Schema
Every page should include appropriate structured data:
- Homepage: `LocalBusiness` with full address, hours, service catalog
- Service pages: `Service` with provider, areaServed, priceRange
- Area pages: `LocalBusiness` with `areaServed` scoped to that city
- Blog posts: `BlogPosting`
- Project pages: `CreativeWork`
- FAQ sections: `FAQPage` (handled automatically by `FaqAccordion.astro`)
- Testimonial sections: `AggregateRating` (handled by `Testimonials.astro`)

---

## Adding New Components

When a client needs a component that doesn't exist in the library:

1. Create it in `web/src/components/blocks/NewComponent.astro`
2. Follow the existing pattern:
   - Accept typed `Props` interface
   - Use CSS custom properties for all colors/spacing — no hardcoded values
   - Include `<style>` scoped to the component
   - Keep client-side `<script>` minimal and focused
   - Export from the file so it can be imported cleanly
3. Add it to the `industryComponentMap` in `site.config.ts` if it's
   industry-relevant
4. Document it with a JSDoc comment at the top explaining when to use it

---

## Combo Pages (service × area)

Combo pages at `/services/[area]/[service]/` are one of the highest-value
SEO assets in this starter. With 8 services and 10 areas you get 80 pages,
each targeting a specific "service in city" query.

**Content quality is determined by `area.localContext`.** This is the most
important thing to populate when setting up a new client. The fields are:

- `propertyCharacter` — housing stock, lot types, architectural character
- `housingAge` — when most homes were built
- `lotProfile` — flat suburban, steep hillside, large rural, etc.
- `communityType` — established neighborhood, fast-growing suburb, rural borough
- `notableFeatures` — historic district, riverfront, HOA, new construction
- `commonChallenges` — local conditions that affect the service (soil type,
  drainage, deer pressure, freeze-thaw, etc.)
- `seasonalFactors` — how local seasons shape service needs
- `permitNotes` — any local permit requirements
- `landmarks` — well-known local references for copy authenticity
- `neighboringAreas` — adjacent communities

**When setting up a new client**, research each service area and populate
`localContext` before generating any combo page copy. Use web search to find:
- City/neighborhood character and housing history
- Common property challenges in the region
- Local landmarks and community identity
- County permit requirements for relevant service types

**Page count formula:**
```
Fixed pages:    6  (home, about, contact, services index, areas index, blog index)
Service pages:  S  (one per service)
Area pages:     A  (one per area)
Combo pages:    S × A  (every service × area combination)
Blog posts:     B
Projects:       P
─────────────────────────────────────────────────
Total:          6 + S + A + (S × A) + B + P
```

Example: 8 services, 10 areas, 5 blog posts, 12 projects = 6 + 8 + 10 + 80 + 5 + 12 = **121 pages**

## Product Marketing Context

Every client project should have a `product-marketing-context.md` at the
repo root. This file defines:
- Business positioning and differentiation
- Ideal customer profile and pain points
- Brand voice and tone guidelines
- Key messages and proof points
- Common objections and responses
- Seasonal messaging angles
- What to avoid in copy

**Claude Code reads this file before writing any copy.** The quality of
generated headlines, descriptions, and page content is directly tied to
how thoroughly this file is filled out. Update it whenever the client's
messaging or positioning evolves.

## Adding New Pages

1. Create `web/src/pages/[page-name].astro`
2. Always wrap content in `<BaseLayout seo={...}>` 
3. Include meaningful `title`, `description`, and `breadcrumbs` in the SEO prop
4. Add appropriate JSON-LD schema
5. If the page is a new dynamic route, implement `getStaticPaths()`
6. Add the page to the Header nav in `Header.astro` if it should appear there
7. Add the page to the Footer nav in `Footer.astro`

---

## Extending Sanity Schemas

When adding a new field to an existing document type:

1. Edit the schema in `studio/schemaTypes/documents/[type].ts`
2. Add the corresponding field to the TypeScript interface in `web/src/lib/data.ts`
3. Update the GROQ query in the relevant `get*` function in `data.ts`
4. Update `web/src/data/local.ts` to include the new field with a placeholder value

When creating a new document type:

1. Create `studio/schemaTypes/documents/[type].ts`
2. Register it in `studio/schemaTypes/index.ts`
3. Add it to the desk structure in `studio/sanity.config.ts`
4. Add the TypeScript interface and fetch function to `web/src/lib/data.ts`
5. Add a placeholder array/object to `web/src/data/local.ts`

---

## Brand Token System

The `global.css` `:root` block is the **only place** client-specific visual
customization should happen. Components reference tokens — they never define
their own colors.

### Token naming convention
```css
--color-brand-[50-950]   /* Primary brand color scale */
--color-accent-[400-600] /* CTA / highlight color */
--color-neutral-[50-950] /* Grays */
--color-bg               /* Page background */
--color-bg-subtle        /* Slightly off-white sections */
--color-bg-muted         /* Input backgrounds, cards */
--color-border           /* Default border color */
--color-border-strong    /* Emphasized borders */
--color-text             /* Primary text */
--color-text-muted       /* Secondary text */
--color-text-subtle      /* Tertiary / placeholder text */
--color-text-inverse     /* Text on dark backgrounds */
--font-display           /* Display / heading font */
--font-body              /* Body text font */
```

### Generating a brand color scale
Given a client's hex code, generate a full 50–950 scale:
- 50–200: Very light tints (near white)
- 300–500: Mid range
- 600: The client's actual brand color (base)
- 700–950: Dark shades

---

## SEO Standards

Every client site should have:
- [ ] Unique `<title>` on every page (format: `Page Title | Business Name`)
- [ ] Unique meta description on every page (140–160 chars)
- [ ] Canonical URL on every page
- [ ] OG image specified (default: `/images/og-default.jpg`)
- [ ] JSON-LD schema appropriate to page type
- [ ] Breadcrumb schema on all interior pages
- [ ] `LocalBusiness` schema on homepage with full details
- [ ] `sitemap-index.xml` generated by `@astrojs/sitemap`
- [ ] `robots.txt` with correct sitemap URL
- [ ] No duplicate H1s
- [ ] Images have descriptive `alt` text
- [ ] Internal links between service pages and area pages

---

## Quality Standards

Railshop builds premium websites. When writing code for this repo:

- **Accessibility first**: Use semantic HTML, ARIA labels, keyboard navigation,
  sufficient color contrast. Every interactive element must be reachable by keyboard.
- **Performance**: Images use `loading="lazy"` except above-fold. No unused JS.
  Prefer CSS animations over JS where possible.
- **Mobile first**: All components are designed for mobile and enhanced for desktop.
  The sticky phone bar is critical for service business conversions on mobile.
- **No console errors**: Clean builds only. TypeScript strict mode is on.
- **Consistent code style**: Match the patterns already in the codebase.
  Use the existing button classes, card classes, and section structure.
- **No generic AI output**: Copy, headings, and descriptions should sound like
  a real business, not a chatbot. Specific, local, credible.

---

## Common Tasks

### Changing the client's brand color
```
Edit web/src/styles/global.css
Update --color-brand-50 through --color-brand-950 in :root
Update --color-accent-* if needed
```

### Changing the client's fonts
```
Edit web/src/styles/global.css
Update the @import url(...) at the top with new Google Fonts
Update --font-display and --font-body in :root
```

### Switching from Sanity to local data
```
Edit web/src/site.config.ts
Set cmsMode: 'local'
Populate web/src/data/local.ts with client data
```

### Adding a service area
```
Sanity mode: Add a new serviceArea document in the Studio
Local mode:  Add an entry to the serviceAreas array in web/src/data/local.ts
```

### Adding a campaign landing page
```
Edit web/src/pages/lp/[campaign].astro
Add a new entry to the campaigns array
Deploy — page is live at /lp/[your-slug]/
```

### Enabling/disabling features per client
```
Edit web/src/site.config.ts
Toggle true/false in the features object:
  blog, projects, serviceAreas, teamMembers,
  emergencyBanner, beforeAfterSlider, financing,
  campaignLandingPages
```

---

## Build Verification

After every build, run the verification script before deploying:

```bash
npm run build:verify
# or separately:
npm run build
npm run verify
```

The script checks:
- All critical pages exist (home, about, contact, services, areas)
- No empty pages
- Internal link integrity (samples 20 pages)
- JSON-LD schema present on key pages
- Meta descriptions present and within 160 chars
- sitemap-index.xml exists
- robots.txt domain updated from example.com
- Combo page count matches services × areas
- Full page count summary

**Exit codes:**
- `🟢` — Ready to deploy
- `🟡` — Passes with warnings — review before deploying
- `🔴` — Errors found — fix before deploying

**Common failures and fixes:**

| Failure | Fix |
|---------|-----|
| Combo count < expected | Check `getStaticPaths()` in `services/[area]/[service].astro` |
| Missing meta description | Check `seo.description` prop on the affected page |
| robots.txt has example.com | Update sitemap URL in `web/public/robots.txt` |
| No JSON-LD on page | Verify `seo.schema` prop is being passed to `BaseLayout` |
| Broken internal links | Check that `urls.ts` functions match actual page routes |

---

## Deployment Checklist

Before handing off to a client:

- [ ] `site.config.ts` — clientName, siteUrl, industry, features all set correctly
- [ ] `global.css` — brand colors and fonts updated for this client
- [ ] `public/robots.txt` — sitemap URL updated to production domain
- [ ] `astro.config.mjs` — site URL confirmed (auto-reads from site.config.ts)
- [ ] `.env` — all required vars set in Netlify environment settings
- [ ] Sanity Studio deployed (`cd studio && npx sanity deploy`)
- [ ] Netlify build passes with 0 errors
- [ ] All pages reviewed on mobile and desktop
- [ ] Contact form tested — submission confirmed in Netlify dashboard
- [ ] Google Search Console submitted with sitemap URL
- [ ] GA4 or GTM ID added to site.config.ts

---

## Railshop Notes

- This starter is a living document. When you add something useful that doesn't
  exist yet, add it to the component library and update this file.
- Landing pages (`/lp/*`) are set to `noindex: true` by default. Only remove
  this if a client specifically wants them indexed.
- The `industryComponentMap` in `site.config.ts` is a recommendation guide,
  not a hard constraint. Always use judgment about what serves the client.
- Netlify Forms handles lead capture. No backend required. Submissions appear
  in the Netlify dashboard under Forms.
- When in doubt, look at how existing components are built. Consistency
  matters more than cleverness.

---

*Maintained by Railshop — railshop.co*
