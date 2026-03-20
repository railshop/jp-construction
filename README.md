# railshop-starter-service

A production-grade monorepo starter for local service business websites. Built and maintained by [Railshop](https://railshop.co).

**Stack:** Astro 5 · Tailwind CSS v4 · Sanity CMS · Netlify · TypeScript

---

## What This Is

A complete, opinionated starting point for building premium websites for local service businesses — landscapers, contractors, HVAC companies, plumbers, excavators, outdoor lighting installers, and more.

Every client project starts from this repo. The structure is consistent. The quality baseline is high. The customization per client happens in a handful of focused places rather than scattered across the codebase.

---

## What's Included

### Frontend (`/web`)
- **20 block components** — Hero, TrustBar, ServiceCardsGrid, Testimonials, FaqAccordion, ProcessSteps, ProjectGallery, BeforeAfterSlider, StatsBar, CtaBanner, GoogleMapsEmbed, EmergencyBanner, StickyPhoneBar, AwardsCertifications, RelatedServices, Financing, and more
- **Full page templates** — Home, About, Services (index + individual), Service Areas (index + individual), Blog (index + individual post), Projects (index + individual), Contact, Campaign Landing Pages
- **Brand token system** — CSS custom properties for color, typography, and spacing. Every client gets a unique visual identity by swapping tokens in one file
- **SEO out of the box** — JSON-LD schema per page type, sitemap, robots.txt, canonical URLs, Open Graph, Twitter cards, breadcrumb schema, local business schema
- **CMS-optional architecture** — toggle between Sanity and local TypeScript data files per client without touching any page or component code

### CMS (`/studio`)
- Full Sanity Studio with structured desk
- Document types: Business Settings (singleton), Services, Service Areas, Blog Posts, Projects, Testimonials, Team Members, FAQs
- All schemas typed and validated

### Config & Tooling
- `site.config.ts` — single per-client configuration file
- `industryComponentMap` — recommends the right components for each industry category
- `netlify.toml` — build config, redirects, security headers, cache rules
- `CLAUDE.md` — agent instructions for Claude Code

---

## Repo Structure

```
railshop-starter-service/
├── web/                              # Astro 5 frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── blocks/               # Page section components
│   │   │   ├── layout/               # Header, Footer
│   │   │   └── seo/                  # SEO component (all head meta + JSON-LD)
│   │   ├── data/
│   │   │   └── local.ts              # Local data source (cmsMode: 'local')
│   │   ├── layouts/
│   │   │   └── BaseLayout.astro      # HTML shell for all pages
│   │   ├── lib/
│   │   │   └── data.ts               # Unified data adapter — always import from here
│   │   ├── pages/                    # File-based routing
│   │   │   ├── index.astro           # Homepage
│   │   │   ├── about.astro
│   │   │   ├── contact.astro
│   │   │   ├── services/
│   │   │   │   ├── index.astro
│   │   │   │   └── [service].astro
│   │   │   ├── areas/
│   │   │   │   ├── index.astro
│   │   │   │   └── [area].astro
│   │   │   ├── blog/
│   │   │   │   ├── index.astro
│   │   │   │   └── [slug].astro
│   │   │   ├── projects/
│   │   │   │   ├── index.astro
│   │   │   │   └── [project].astro
│   │   │   └── lp/
│   │   │       └── [campaign].astro  # Campaign landing pages
│   │   ├── styles/
│   │   │   └── global.css            # Brand token system + global styles
│   │   └── site.config.ts            # Per-client configuration — start here
│   ├── public/
│   │   └── robots.txt
│   ├── astro.config.mjs
│   ├── package.json
│   └── tsconfig.json
├── studio/                           # Sanity Studio
│   ├── schemaTypes/
│   │   ├── documents/                # One file per document type
│   │   ├── objects/                  # Reusable field groups
│   │   └── index.ts
│   ├── sanity.config.ts
│   ├── package.json
│   └── tsconfig.json
├── CLAUDE.md                         # Claude Code agent instructions
├── netlify.toml                      # Netlify build + deploy config
├── .env.example                      # All required environment variables
└── package.json                      # Monorepo workspace root
```

---

## Starting a New Client Project

### 1. Clone and rename

```bash
git clone https://github.com/railshop/railshop-starter-service.git client-name
cd client-name
rm -rf .git
git init
git add .
git commit -m "Initial commit from railshop-starter-service"
```

### 2. Configure the client

Open `web/src/site.config.ts` and update:

```ts
const config: SiteConfig = {
  clientName: 'Client Name Here',
  clientSlug: 'client-name',
  industry: 'landscaping',       // drives component recommendations
  schemaType: 'LandscapingService',
  cmsMode: 'sanity',             // 'sanity' | 'local'
  siteUrl: 'https://clientdomain.com',
  siteName: 'Client Name Here',
  siteDescription: 'One-sentence business description.',
  features: {
    blog: true,
    projects: true,
    serviceAreas: true,
    teamMembers: false,
    emergencyBanner: false,
    beforeAfterSlider: true,
    financing: false,
    campaignLandingPages: true,
  },
};
```

### 3. Set the brand

Open `web/src/styles/global.css` and update the `:root` block:

- Replace `--color-brand-*` with the client's color scale (50–950)
- Replace `--color-accent-*` with the CTA/highlight color
- Update the `@import url(...)` at the top with a new Google Fonts pairing

**Font pairing guidance:** Never use Inter, Roboto, Arial, or system fonts. Good options for service businesses: Fraunces + DM Sans, Playfair Display + Source Sans, DM Serif Display + Outfit, Syne + Inter (exception if brand requires it).

### 4. Populate data

**Sanity mode (`cmsMode: 'sanity'`):**
1. Create a Sanity project at sanity.io
2. Copy `.env.example` to `.env` and fill in `SANITY_PROJECT_ID` and `SANITY_DATASET`
3. `cd studio && npm install && npm run dev`
4. Populate Business Settings first, then Services, then Service Areas

**Local mode (`cmsMode: 'local'`):**
1. Edit `web/src/data/local.ts` directly with the client's data
2. No Sanity setup required

### 5. Install and run

```bash
npm install        # installs both web and studio workspaces
npm run dev        # starts Astro dev server
npm run dev:studio # starts Sanity Studio (separate terminal)
```

### 6. Build and verify

```bash
npm run build:verify   # build + run verification in one step
# or separately:
npm run build
npm run verify
```

The verify script checks page count, internal links, JSON-LD schema, meta descriptions, sitemap, and robots.txt. It exits non-zero on errors so it can be used in CI.

### 6. Deploy

Push to GitHub and connect to Netlify. Build settings are pre-configured in `netlify.toml`:

- **Base directory:** `web`
- **Build command:** `npm run build`
- **Publish directory:** `dist`

Add environment variables in the Netlify dashboard (copy from `.env.example`).

Deploy Sanity Studio separately:

```bash
cd studio && npx sanity deploy
```

---

## CMS Mode

This starter supports two data modes, toggled in `site.config.ts`:

| Mode | When to use | Setup required |
|------|-------------|----------------|
| `sanity` | Full client builds with a CMS the client manages | Sanity project + env vars |
| `local` | Internal sites, quick builds, or when client doesn't need CMS access | Edit `local.ts` directly |

Switching modes never requires touching page or component code. All data flows through `web/src/lib/data.ts`.

---

## Component Library

All block components live in `web/src/components/blocks/`. Each is self-contained with scoped styles and typed props.

| Component | Description |
|-----------|-------------|
| `Hero` | Full-width hero with background image support, trust signals, dual CTAs |
| `TrustBar` | Horizontal strip of trust signals (licensed, insured, rated, etc.) |
| `ServiceCardsGrid` | Responsive grid of service cards with images and pricing |
| `ProcessSteps` | Numbered 4-step process section |
| `StatsBar` | Bold statistics bar (years in business, jobs completed, etc.) |
| `Testimonials` | Review cards with `AggregateRating` JSON-LD schema |
| `FaqAccordion` | Accessible accordion with `FAQPage` JSON-LD schema |
| `ProjectGallery` | Filterable project grid with category filter |
| `BeforeAfterSlider` | Drag-to-reveal image comparison |
| `CtaBanner` | High-conversion CTA section, mid-page or bottom |
| `GoogleMapsEmbed` | Lazy-loaded Google Maps embed with business info |
| `EmergencyBanner` | Dismissible top banner for 24/7 emergency services |
| `StickyPhoneBar` | Mobile-fixed bottom bar with call and quote CTAs |
| `AwardsCertifications` | Logo/badge display for BBB, licensing, certifications |
| `RelatedServices` | Internal linking pill list for related services |
| `Financing` | Financing/payment options section |

### Industry-aware recommendations

`site.config.ts` exports an `industryComponentMap` that lists the recommended components for each industry. When Claude Code spins up a new client project, it references this map to suggest which components to use on each page.

---

## SEO

Every page includes:
- Unique `<title>` and meta description
- Canonical URL
- Open Graph and Twitter card meta
- JSON-LD structured data appropriate to the page type
- Breadcrumb schema on all interior pages
- Auto-generated `sitemap-index.xml` via `@astrojs/sitemap`
- `robots.txt` with sitemap URL

### Combo pages (service × area)

Pages at `/services/[area]/[service]/` are generated for every service × area
combination. With 8 services and 10 areas that's 80 additional indexed pages,
each targeting a specific "service in city" search query with locally-aware copy.

Content quality scales with how thoroughly `area.localContext` is populated in
the data layer. See `CLAUDE.md` for full guidance on populating local context.

**Page count formula:**
```
Fixed pages  +  Services  +  Areas  +  (Services × Areas)  +  Blog posts  +  Projects
     6       +     S      +    A    +        S × A          +      B       +      P
```

Example: 8 services, 10 areas, 5 blog posts, 12 projects = **121 total pages**

---

### Schema types by page

| Page | JSON-LD type |
|------|-------------|
| Homepage | `LocalBusiness` |
| Service page | `Service` |
| Area page | `LocalBusiness` with `areaServed` |
| Blog post | `BlogPosting` |
| Project page | `CreativeWork` |
| Any page with FAQ | `FAQPage` (auto from `FaqAccordion`) |
| Any page with reviews | `AggregateRating` (auto from `Testimonials`) |

---

## Claude Code

This repo includes a `CLAUDE.md` file that gives Claude Code full context on the architecture, naming conventions, data layer, component patterns, and Railshop quality standards. When working inside this repo with Claude Code, it will follow the established patterns automatically.

---

## Other Railshop Starters

This repo is part of the `railshop-starter-*` series:

| Repo | Description |
|------|-------------|
| [`railshop-starter-service`](https://github.com/railshop/railshop-starter-service) | Local service businesses (this repo) |
| `railshop-starter-saas` | *(coming soon)* |
| `railshop-starter-ecommerce` | *(coming soon)* |

---

## Built by Railshop

[Railshop](https://railshop.co) is a digital growth agency for home and consumer service brands. We build websites, run paid ads, and produce content for clients who want serious results.
