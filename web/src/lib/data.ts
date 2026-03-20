/**
 * src/lib/data.ts
 *
 * Unified data adapter. Reads from Sanity or local files depending on
 * the cmsMode set in site.config.ts. All Astro pages and components
 * import from here — never directly from Sanity or local data files.
 *
 * This means switching CMS mode never requires touching page code.
 */

import config from '../site.config';

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
  category: string;
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

async function getSanityClient() {
  if (config.cmsMode !== 'sanity') return null;
  const { createClient } = await import('@sanity/client');
  return createClient({
    projectId: process.env.SANITY_PROJECT_ID || '',
    dataset:   process.env.SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: true,
  });
}

async function getLocalData() {
  // Dynamic import — only loads if cmsMode is 'local'
  return import('../data/local');
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function getBusiness(): Promise<Business> {
  if (config.cmsMode === 'sanity') {
    const client = await getSanityClient();
    const data = await client!.fetch(`*[_type == "businessSettings"][0]{
      name, legalName, owner, phone, phoneHref, email, website,
      address, coordinates, hours, license, yearEstablished,
      serviceRadius, schemaType, description, tagline,
      "logo": logo.asset->url
    }`);
    return data;
  }
  const local = await getLocalData();
  return local.business;
}

export async function getServices(): Promise<Service[]> {
  if (config.cmsMode === 'sanity') {
    const client = await getSanityClient();
    return client!.fetch(`*[_type == "service"] | order(order asc) {
      "slug": slug.current, name, shortDescription, description,
      priceRange, emergency, icon, "image": image.asset->url,
      processSteps, relatedServices[]->{"slug": slug.current}
    }`);
  }
  const local = await getLocalData();
  return local.services;
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  if (config.cmsMode === 'sanity') {
    const client = await getSanityClient();
    return client!.fetch(`*[_type == "service" && slug.current == $slug][0]{
      "slug": slug.current, name, shortDescription, description,
      priceRange, emergency, icon, "image": image.asset->url,
      processSteps, relatedServices[]->{"slug": slug.current, name}
    }`, { slug });
  }
  const local = await getLocalData();
  return local.services.find((s: Service) => s.slug === slug) ?? null;
}

export async function getServiceAreas(): Promise<ServiceArea[]> {
  if (config.cmsMode === 'sanity') {
    const client = await getSanityClient();
    return client!.fetch(`*[_type == "serviceArea"] | order(priority asc, name asc) {
      "slug": slug.current, name, county, population, priority,
      lat, lng, nearby[]->{"slug": slug.current},
      description, zipCodes, responseTime, localContext
    }`);
  }
  const local = await getLocalData();
  return local.serviceAreas;
}

export async function getAreaBySlug(slug: string): Promise<ServiceArea | null> {
  if (config.cmsMode === 'sanity') {
    const client = await getSanityClient();
    return client!.fetch(`*[_type == "serviceArea" && slug.current == $slug][0]{
      "slug": slug.current, name, county, population, priority,
      lat, lng, nearby[]->{"slug": slug.current, name},
      description, zipCodes, responseTime, localContext
    }`, { slug });
  }
  const local = await getLocalData();
  return local.serviceAreas.find((a: ServiceArea) => a.slug === slug) ?? null;
}

export async function getBlogPosts(limit?: number): Promise<BlogPost[]> {
  if (config.cmsMode === 'sanity') {
    const client = await getSanityClient();
    const limitClause = limit ? `[0...${limit}]` : '';
    return client!.fetch(`*[_type == "blogPost"] | order(publishDate desc) ${limitClause} {
      "slug": slug.current, title, description, publishDate,
      author, category, tags, readingTime, featured,
      "body": body, "image": image.asset->url
    }`);
  }
  const local = await getLocalData();
  const posts = local.blogPosts ?? [];
  return limit ? posts.slice(0, limit) : posts;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (config.cmsMode === 'sanity') {
    const client = await getSanityClient();
    return client!.fetch(`*[_type == "blogPost" && slug.current == $slug][0]{
      "slug": slug.current, title, description, publishDate,
      author, category, tags, readingTime, featured,
      "body": body, "image": image.asset->url
    }`, { slug });
  }
  const local = await getLocalData();
  return (local.blogPosts ?? []).find((p: BlogPost) => p.slug === slug) ?? null;
}

export async function getProjects(limit?: number): Promise<Project[]> {
  if (config.cmsMode === 'sanity') {
    const client = await getSanityClient();
    const limitClause = limit ? `[0...${limit}]` : '';
    return client!.fetch(`*[_type == "project"] | order(completedDate desc) ${limitClause} {
      "slug": slug.current, title, description, category,
      completedDate, location, featured,
      "images": images[].asset->url,
      "beforeImage": beforeImage.asset->url,
      "afterImage": afterImage.asset->url,
      services, testimonial, testimonialAuthor
    }`);
  }
  const local = await getLocalData();
  const projects = local.projects ?? [];
  return limit ? projects.slice(0, limit) : projects;
}

export async function getTestimonials(limit?: number): Promise<Testimonial[]> {
  if (config.cmsMode === 'sanity') {
    const client = await getSanityClient();
    const limitClause = limit ? `[0...${limit}]` : '';
    return client!.fetch(`*[_type == "testimonial"] | order(featured desc, _createdAt desc) ${limitClause} {
      author, location, date, rating, text, service, area,
      "avatar": avatar.asset->url, featured
    }`);
  }
  const local = await getLocalData();
  const t = local.testimonials ?? [];
  return limit ? t.slice(0, limit) : t;
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  if (config.cmsMode === 'sanity') {
    const client = await getSanityClient();
    return client!.fetch(`*[_type == "teamMember"] | order(order asc) {
      "slug": slug.current, name, title, bio,
      "image": image.asset->url, certifications
    }`);
  }
  const local = await getLocalData();
  return local.teamMembers ?? [];
}

export async function getFaqs(category?: string): Promise<FaqItem[]> {
  if (config.cmsMode === 'sanity') {
    const client = await getSanityClient();
    const filter = category
      ? `*[_type == "faq" && category == $category]`
      : `*[_type == "faq"]`;
    return client!.fetch(`${filter} | order(order asc) { question, answer, category }`, { category });
  }
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
  const years = business.yearEstablished
    ? new Date().getFullYear() - business.yearEstablished
    : null;

  // Build local angle from context if available, fall back to generic
  const propertyAngle = ctx?.propertyCharacter
    ? `${area.name}'s ${ctx.propertyCharacter}`
    : `homes and properties in ${area.name}`;

  const challengeAngle = ctx?.commonChallenges?.length
    ? ctx.commonChallenges[0]
    : `the demands of ${area.county || area.name} properties`;

  const seasonalAngle = ctx?.seasonalFactors
    ? ctx.seasonalFactors
    : `seasonal conditions in the ${area.county || area.name} area`;

  const communityAngle = ctx?.communityType
    ? `${area.name}'s ${ctx.communityType}`
    : area.name;

  const landmarkAngle = ctx?.landmarks?.length
    ? ` near ${ctx.landmarks[0]}`
    : '';

  const lotAngle = ctx?.lotProfile
    ? ` We understand the challenges of ${ctx.lotProfile}.`
    : '';

  return {
    headline: `${service.name} in ${area.name}, ${area.county || business.address.state}`,

    subheadline: ctx?.propertyCharacter
      ? `Specialized ${service.name.toLowerCase()} for ${propertyAngle}`
      : `Professional ${service.name.toLowerCase()} serving ${area.name} and surrounding communities`,

    heroDescription: [
      `${business.name} provides expert ${service.name.toLowerCase()} to ${communityAngle}${landmarkAngle}.`,
      ctx?.commonChallenges?.length
        ? `We know the local conditions — including ${challengeAngle} — and bring the right approach to every job.`
        : `Every project is handled with the care and expertise your property deserves.`,
      area.responseTime
        ? `Our team can typically reach ${area.name} within ${area.responseTime}.`
        : '',
    ].filter(Boolean).join(' '),

    localAngle: ctx?.propertyCharacter
      ? `${area.name} is home to ${ctx.propertyCharacter}.${lotAngle} Our approach is tailored to what actually works here — not a one-size-fits-all method.`
      : `We've worked throughout ${area.name} and understand the specific conditions that affect ${service.name.toLowerCase()} quality and longevity here.`,

    whyUsLocal: [
      years ? `${years}+ years serving ${business.serviceRadius || business.address.city} and the surrounding area` : `Experienced local team`,
      `${area.responseTime ? area.responseTime + ' response time to ' + area.name : 'Fast local response'}`,
      business.license ? business.license : 'Fully licensed and insured',
      ctx?.permitNotes ? `Familiar with ${area.county || area.name} permit requirements` : 'Free estimates, no obligation',
    ].join(' · '),

    processIntro: ctx?.seasonalFactors
      ? `${seasonalAngle} shapes how we approach every ${service.name.toLowerCase()} project in ${area.name}. Here's our process:`
      : `Here's how we handle every ${service.name.toLowerCase()} project in ${area.name}:`,

    faqIntro: `Common questions from ${area.name} customers about our ${service.name.toLowerCase()} service:`,

    ctaHeadline: `Need ${service.name} in ${area.name}?`,

    metaDescription: [
      `${business.name} offers professional ${service.name.toLowerCase()} in ${area.name}, ${area.county || business.address.state}.`,
      ctx?.propertyCharacter ? `Specialized experience with ${ctx.propertyCharacter}.` : '',
      `Licensed, insured. Free estimates. ${area.responseTime ? area.responseTime + ' response.' : 'Fast response.'}`,
    ].filter(Boolean).join(' ').slice(0, 158),

    ogTitle: `${service.name} in ${area.name} | ${business.name}`,
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
        ? `${service.name} in ${area.name} typically ranges from $${service.priceRange.min.toLocaleString()} to $${service.priceRange.max.toLocaleString()} depending on the scope of work, property size, and site conditions. ${business.name} provides free, detailed estimates with no obligation.`
        : `Pricing for ${service.name.toLowerCase()} in ${area.name} depends on your property's specific needs. ${business.name} offers free estimates — contact us for an accurate quote.`,
    },
    {
      question: `How quickly can ${business.name} respond in ${area.name}?`,
      answer: area.responseTime
        ? `We can typically reach ${area.name} within ${area.responseTime}. ${service.emergency ? 'We offer 24/7 emergency service for urgent situations.' : 'We schedule most jobs within the week and always confirm your appointment in advance.'}`
        : `${business.name} serves ${area.name} as part of our regular service area. Contact us for current scheduling availability.`,
    },
    {
      question: `Is ${business.name} licensed and insured to work in ${area.name}?`,
      answer: `Yes. ${business.name} is ${business.license ? business.license + ' and is' : ''} fully insured${years ? ` with ${years}+ years of experience` : ''} serving ${area.county || area.name}. We carry full liability insurance and workers' compensation coverage on every job.`,
    },
    ...(ctx?.commonChallenges?.length ? [{
      question: `What are the biggest ${service.name.toLowerCase()} challenges for ${area.name} properties?`,
      answer: `${area.name} properties commonly face ${ctx.commonChallenges.slice(0, 2).join(' and ')}. ${ctx.seasonalFactors ? ctx.seasonalFactors + '.' : ''} Our team has direct experience with these local conditions and plans every project accordingly.`,
    }] : []),
    {
      question: `Do you serve areas near ${area.name}?`,
      answer: `Yes — in addition to ${area.name}, we serve ${area.county || 'the surrounding area'}${area.nearby?.length ? `, including nearby communities` : ''}. Contact us to confirm coverage for your specific location.`,
    },
    ...(ctx?.permitNotes ? [{
      question: `Do I need a permit for ${service.name.toLowerCase()} in ${area.name}?`,
      answer: `${ctx.permitNotes} ${business.name} is familiar with local requirements and can help navigate the process as part of your project.`,
    }] : []),
  ];
}
