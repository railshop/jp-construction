/**
 * src/data/local.ts
 *
 * Local data source — used when cmsMode is set to 'local' in site.config.ts.
 * Populate these with client data when a CMS is not needed.
 * Structure mirrors Sanity document types exactly for easy future migration.
 */

import type {
  Business, Service, ServiceArea,
  BlogPost, Project, Testimonial, TeamMember, FaqItem
} from '../lib/data';

// ─── Business ─────────────────────────────────────────────────────────────────

export const business: Business = {
  name: 'Acme Services',
  legalName: 'Acme Services LLC',
  owner: 'John Smith',
  phone: '(555) 123-4567',
  phoneHref: 'tel:+15551234567',
  email: 'info@acmeservices.com',
  website: 'https://acmeservices.com',
  address: {
    street: '123 Main Street',
    city: 'Pittsburgh',
    state: 'PA',
    zip: '15201',
  },
  coordinates: { lat: 40.4406, lng: -79.9959 },
  hours: [
    { days: 'Monday - Friday', hours: '7:00 AM - 6:00 PM' },
    { days: 'Saturday',        hours: '8:00 AM - 2:00 PM' },
    { days: 'Sunday',          hours: 'Closed' },
  ],
  license: 'PA License #12345',
  yearEstablished: 2010,
  serviceRadius: 'Allegheny, Butler, and Westmoreland Counties',
  schemaType: 'LandscapingService',
  description: 'Professional landscaping and outdoor services serving the greater Pittsburgh area since 2010.',
  tagline: 'Transforming Outdoor Spaces Across Pittsburgh',
};

// ─── Services ─────────────────────────────────────────────────────────────────

export const services: Service[] = [
  {
    slug: 'lawn-care',
    name: 'Lawn Care',
    shortDescription: 'Complete lawn maintenance to keep your property looking its best year-round.',
    description: 'Our comprehensive lawn care programs are tailored to your lawn\'s specific needs. From mowing and edging to fertilization and weed control, we handle everything.',
    priceRange: { min: 50, max: 200 },
    emergency: false,
    icon: 'leaf',
    image: '/images/lawn-care.webp',
    processSteps: [
      { title: 'Assessment', description: 'We evaluate your lawn\'s current condition and identify specific needs.' },
      { title: 'Plan', description: 'We develop a customized maintenance schedule for your property.' },
      { title: 'Service', description: 'Our crew arrives on schedule and completes all agreed work.' },
      { title: 'Follow-up', description: 'We check in after each visit and adjust the plan as needed.' },
    ],
  },
];

// ─── Service Areas ─────────────────────────────────────────────────────────────

export const serviceAreas: ServiceArea[] = [
  {
    slug: 'pittsburgh',
    name: 'Pittsburgh',
    county: 'Allegheny County',
    population: 302971,
    priority: 'primary',
    lat: 40.4406,
    lng: -79.9959,
    nearby: ['north-hills', 'south-hills', 'east-end'],
    description: 'We serve all Pittsburgh neighborhoods from the North Side to Mount Washington.',
    zipCodes: ['15201', '15202', '15203', '15204', '15205', '15206', '15207', '15208', '15209', '15210'],
    responseTime: '30 minutes',
    localContext: {
      propertyCharacter: 'diverse mix of historic rowhouses, hillside properties, and urban lots across distinct neighborhoods',
      housingAge: 'predominantly pre-1970 housing stock with significant Victorian-era and Craftsman homes',
      lotProfile: 'narrow urban lots with steep grades common in hillside neighborhoods',
      communityType: 'established urban neighborhoods with strong community identity',
      notableFeatures: ['historic architecture', 'steep hillside terrain', 'urban tree canopy', 'walkable streets'],
      commonChallenges: ['steep grade erosion and drainage', 'limited equipment access on narrow lots', 'aging infrastructure adjacent to work areas'],
      seasonalFactors: 'freeze-thaw cycles from December through March create significant ground movement and drainage stress each spring',
      landmarks: ['Schenley Park', 'the North Shore', 'Mount Washington overlook'],
      neighboringAreas: ['Bethel Park', 'Mt. Lebanon', 'Penn Hills'],
    },
  },
];

// ─── Blog Posts ───────────────────────────────────────────────────────────────

export const blogPosts: BlogPost[] = [];

// ─── Projects ────────────────────────────────────────────────────────────────

export const projects: Project[] = [];

// ─── Testimonials ─────────────────────────────────────────────────────────────

export const testimonials: Testimonial[] = [
  {
    author: 'Sarah M.',
    location: 'Pittsburgh, PA',
    date: '2025-11-15',
    rating: 5,
    text: 'Exceptional work from start to finish. The crew was professional, on time, and the results exceeded our expectations.',
    service: 'lawn-care',
    featured: true,
  },
];

// ─── Team Members ─────────────────────────────────────────────────────────────

export const teamMembers: TeamMember[] = [];

// ─── FAQs ─────────────────────────────────────────────────────────────────────

export const faqs: FaqItem[] = [
  {
    question: 'What areas do you serve?',
    answer: 'We serve the greater Pittsburgh area including Allegheny, Butler, and Westmoreland Counties.',
    category: 'general',
  },
  {
    question: 'Are you licensed and insured?',
    answer: 'Yes, we are fully licensed in Pennsylvania and carry comprehensive liability insurance and workers\' compensation coverage.',
    category: 'general',
  },
];
