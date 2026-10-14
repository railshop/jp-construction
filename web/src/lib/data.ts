/**
 * src/lib/data.ts
 *
 * Unified data adapter. All Astro pages and components import from here —
 * never directly from data files. Currently sources from local data
 * (src/data/local.ts); a CMS can be reintroduced behind this adapter
 * without touching page code.
 */

// ─── Shared Types ─────────────────────────────────────────────────────────────

export interface Business {
  name: string;
  legalName?: string;
  owner?: string;
  phone: string;
  phoneHref: string;
  email: string;
  website: string;
  address: {
    street?: string;
    city: string;
    state: string;
    zip: string;
  };
  coordinates?: { lat: number; lng: number };
  hours: Array<{ days: string; hours: string }>;
  license?: string;
  yearEstablished?: number;
  serviceRadius?: string;
  schemaType: string;
  description: string;
  tagline: string;
  logo?: string;
}

export interface Service {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  heroTagline?: string;
  priceRange?: { min: number; max: number };
  emergency: boolean;
  icon?: string;
  image?: string;
  processSteps: Array<{ title: string; description: string }>;
  relatedServices?: string[];
}

export interface LocalContext {
  propertyCharacter?: string;
  housingAge?: string;
  lotProfile?: string;
  communityType?: string;
  notableFeatures?: string[];
  demographics?: string;
  commonChallenges?: string[];
  seasonalFactors?: string;
  permitNotes?: string;
  landmarks?: string[];
  neighboringAreas?: string[];
}

export interface ServiceArea {
  slug: string;
  name: string;
  county?: string;
  population?: number;
  priority: 'primary' | 'secondary' | 'tertiary';
  lat?: number;
  lng?: number;
  nearby?: string[];
  description?: string;
  zipCodes?: string[];
  responseTime?: string;
  image?: string;
  localContext?: LocalContext;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishDate: string;
  author: string;
  category: string;
  tags: string[];
  readingTime?: string;
  featured: boolean;
  body: string;
  image?: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  /** One-line summary, 140-160 chars. Used for the meta description and OG text. */
  summary?: string;
  category: string;
  clientName?: string;
  completedDate?: string;
  location?: string;
  featured: boolean;
  images: string[];
  beforeImage?: string;
  afterImage?: string;
  services?: string[];
  testimonial?: string;
  testimonialAuthor?: string;
}

export interface Testimonial {
  author: string;
  location?: string;
  date?: string;
  rating: number;
  text: string;
  service?: string;
  area?: string;
  avatar?: string;
  featured: boolean;
}

export interface TeamMember {
  slug: string;
  name: string;
  title: string;
  bio: string;
  image?: string;
  certifications?: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

// ─── Data Fetcher ─────────────────────────────────────────────────────────────

async function getLocalData() {
  return import('../data/local');
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function getBusiness(): Promise<Business> {
  const local = await getLocalData();
  return local.business;
}

export async function getServices(): Promise<Service[]> {
  const local = await getLocalData();
  return local.services;
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const local = await getLocalData();
  return local.services.find((s: Service) => s.slug === slug) ?? null;
}

export async function getServiceAreas(): Promise<ServiceArea[]> {
  const local = await getLocalData();
  return local.serviceAreas;
}

export async function getAreaBySlug(slug: string): Promise<ServiceArea | null> {
  const local = await getLocalData();
  return local.serviceAreas.find((a: ServiceArea) => a.slug === slug) ?? null;
}

export async function getBlogPosts(limit?: number): Promise<BlogPost[]> {
  const local = await getLocalData();
  const posts = local.blogPosts ?? [];
  return limit ? posts.slice(0, limit) : posts;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const local = await getLocalData();
  return (local.blogPosts ?? []).find((p: BlogPost) => p.slug === slug) ?? null;
}

export async function getProjects(limit?: number): Promise<Project[]> {
  const local = await getLocalData();
  const projects = local.projects ?? [];
  return limit ? projects.slice(0, limit) : projects;
}

export async function getTestimonials(limit?: number): Promise<Testimonial[]> {
  const local = await getLocalData();
  const t = local.testimonials ?? [];
  return limit ? t.slice(0, limit) : t;
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  const local = await getLocalData();
  return local.teamMembers ?? [];
}

export async function getFaqs(category?: string): Promise<FaqItem[]> {
  const local = await getLocalData();
  const faqs = local.faqs ?? [];
  return category ? faqs.filter((f: FaqItem) => f.category === category) : faqs;
}

// ─── Combo Page Content Generation ───────────────────────────────────────────
//
// Generates unique, locally-aware copy for each service × area combination.
// Called by getStaticPaths() in pages/services/[area]/[service].astro.
// The Claude Code agent populates area.localContext to make this output
// genuinely specific rather than templated.

export interface ComboContent {
  headline: string;
  subheadline: string;
  heroDescription: string;
  localAngle: string;
  whyUsLocal: string;
  processIntro: string;
  faqIntro: string;
  ctaHeadline: string;
  metaDescription: string;
  ogTitle: string;
}

export function generateComboContent(
  service: Service,
  area: ServiceArea,
  business: Business
): ComboContent {
  const ctx = area.localContext;
  const svc = service.name.toLowerCase().replace(' & ', ' and ');
  const since = business.yearEstablished ? `since ${business.yearEstablished}` : 'for years';
  const years = business.yearEstablished
    ? new Date().getFullYear() - business.yearEstablished
    : null;

  const challenges = (ctx?.commonChallenges ?? []).map(c => c.replace(/\.$/, ''));

  return {
    headline: `${service.name} in ${area.name}, ${business.address.state}`,

    subheadline: `${business.name} does ${svc} in ${area.name} and the rest of ${area.county || 'the area'}. Licensed and insured, with free estimates.`,

    heroDescription: `${area.description.replace(/\s+$/, '')} We have been doing ${svc} here ${since}, and the same project manager runs your job from the first site visit to the final inspection.`,

    localAngle: challenges.length >= 2
      ? `A few things come up again and again on ${area.name} jobs: ${challenges[0]}, and ${challenges[1]}. We plan for both before we price the work, and we know what the local building department wants to see on a permit application, which keeps the review from dragging on.`
      : challenges.length === 1
        ? `One thing that comes up often on ${area.name} jobs is ${challenges[0]}. We plan for it before we price the work, and we know what the local building department wants to see on a permit application.`
        : `We have worked in ${area.name} long enough to know the site conditions and permit requirements that affect ${svc} here.`,

    whyUsLocal: years
      ? `${years}+ years serving ${business.serviceRadius || business.address.city}`
      : `Local contractor serving ${area.name} and surrounding communities`,

    processIntro: `Here is how we run a ${svc} job in ${area.name}:`,

    faqIntro: `Questions we get from ${area.name} customers about ${svc}:`,

    ctaHeadline: `Need ${service.name} in ${area.name}?`,

    metaDescription: `${service.name} in ${area.name}, ${business.address.state} from ${business.name}. Licensed and insured, with free estimates on every project.`.slice(0, 158),

    ogTitle: `${service.name} in ${area.name}, ${business.address.state}`,
  };
}

// ─── Combo FAQ Generation ─────────────────────────────────────────────────────
// Generates area + service specific FAQs. More targeted than generic FAQs.

export function generateComboFaqs(
  service: Service,
  area: ServiceArea,
  business: Business
): Array<{ question: string; answer: string }> {
  const ctx = area.localContext;
  const years = business.yearEstablished
    ? new Date().getFullYear() - business.yearEstablished
    : null;

  return [
    {
      question: `How much does ${service.name.toLowerCase()} cost in ${area.name}?`,
      answer: service.priceRange
        ? `Most ${service.name.toLowerCase()} jobs in ${area.name} run from $${service.priceRange.min.toLocaleString()} to $${service.priceRange.max.toLocaleString()} depending on scope, size, and site conditions. We will come out, look at the property, and give you a written estimate at no charge.`
        : `Pricing for ${service.name.toLowerCase()} in ${area.name} depends on your property's specific needs. ${business.name} offers free estimates, so contact us for an accurate quote.`,
    },
    {
      question: `Does ${business.name} regularly work in ${area.name}?`,
      answer: `Yes. ${area.name} is part of our regular service area. ${service.emergency ? 'We offer 24/7 emergency service for urgent situations.' : 'We can usually get out for an estimate within the week.'}`,
    },
    {
      question: `Is ${business.name} licensed and insured to work in ${area.name}?`,
      answer: `Yes. ${business.name} is licensed in Pennsylvania and carries general liability and workers' compensation coverage on every job${years ? `. We have been working in ${area.county || area.name} since ${business.yearEstablished}` : ''}.`,
    },
    ...(ctx?.commonChallenges?.length ? [{
      question: `What are the biggest ${service.name.toLowerCase()} challenges for ${area.name} properties?`,
      answer: `Two we see often: ${ctx.commonChallenges.slice(0, 2).join(', and ')}.${ctx.seasonalFactors ? ' ' + ctx.seasonalFactors.charAt(0).toUpperCase() + ctx.seasonalFactors.slice(1).replace(/\.$/, '') + '.' : ''} We plan for these before we price the job.`,
    }] : []),
    {
      question: `Do you serve areas near ${area.name}?`,
      answer: `Yes. In addition to ${area.name}, we serve ${area.county || 'the surrounding area'}${area.nearby?.length ? `, including nearby communities` : ''}. Contact us to confirm coverage for your specific location.`,
    },
    ...(ctx?.permitNotes ? [{
      question: `Do I need a permit for ${service.name.toLowerCase()} in ${area.name}?`,
      answer: `${ctx.permitNotes.replace(/\.$/, '')}. We handle the permit application and the inspections as part of the job.`,
    }] : []),
  ];
}
