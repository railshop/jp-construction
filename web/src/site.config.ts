/**
 * site.config.ts
 * 
 * The single per-client configuration file. Set these values when spinning up
 * a new client project. This drives component recommendations, schema type,
 * conditional rendering, and the brand token system.
 * 
 * CMS Mode:
 *   'sanity'  — data is sourced from Sanity CMS (default for full client builds)
 *   'local'   — data is sourced from local TypeScript files in src/data/
 *               (use when client does not need a CMS)
 */

export type IndustryCategory =
  | 'landscaping'
  | 'hardscape'
  | 'outdoor-lighting'
  | 'excavation'
  | 'construction'
  | 'plumbing'
  | 'hvac'
  | 'electrical'
  | 'roofing'
  | 'cleaning'
  | 'pest-control'
  | 'painting'
  | 'concrete'
  | 'fencing'
  | 'general-contractor'
  | 'other';

export type CMSMode = 'sanity' | 'local';

export type SchemaType =
  | 'LandscapingService'
  | 'HomeAndConstructionBusiness'
  | 'Plumber'
  | 'HVACBusiness'
  | 'Electrician'
  | 'RoofingContractor'
  | 'HousekeepingService'
  | 'PestControlService'
  | 'GeneralContractor'
  | 'LocalBusiness';

export interface SiteConfig {
  // Client identity
  clientName: string;
  clientSlug: string;

  // Industry
  industry: IndustryCategory;
  schemaType: SchemaType;

  // CMS
  cmsMode: CMSMode;

  // Site
  siteUrl: string;
  siteName: string;
  siteDescription: string;

  // Features — toggle per client
  features: {
    blog: boolean;
    projects: boolean;
    serviceAreas: boolean;
    teamMembers: boolean;
    emergencyBanner: boolean;
    beforeAfterSlider: boolean;
    financing: boolean;
    campaignLandingPages: boolean;
  };

  // Analytics
  ga4Id?: string;
  gtmId?: string;

  // Integrations
  googleMapsApiKey?: string;
  hubspotPortalId?: string;
}

// ─── Per-client configuration ────────────────────────────────────────────────
// Edit these values for each new client project.

const config: SiteConfig = {
  clientName: 'Acme Services',
  clientSlug: 'acme-services',

  industry: 'landscaping',
  schemaType: 'LandscapingService',

  cmsMode: 'sanity', // 'sanity' | 'local'

  siteUrl: 'https://example.com',
  siteName: 'Acme Services',
  siteDescription: 'Professional landscaping and outdoor services in the greater Pittsburgh area.',

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

  ga4Id: undefined,
  gtmId: undefined,
  googleMapsApiKey: undefined,
  hubspotPortalId: undefined,
};

export default config;

// ─── Industry-aware component recommendations ─────────────────────────────────
// Used by CLAUDE.md and the scaffolding agent to suggest relevant components
// for a given industry.

export const industryComponentMap: Record<IndustryCategory, string[]> = {
  landscaping: [
    'Hero', 'TrustBar', 'ServiceCardsGrid', 'ProjectGallery',
    'BeforeAfterSlider', 'Testimonials', 'ProcessSteps',
    'ServiceAreaMap', 'StatsBar', 'CtaBanner', 'FaqAccordion',
    'GoogleMapsEmbed', 'RelatedServices',
  ],
  hardscape: [
    'Hero', 'TrustBar', 'ServiceCardsGrid', 'ProjectGallery',
    'BeforeAfterSlider', 'Testimonials', 'ProcessSteps',
    'StatsBar', 'CtaBanner', 'FaqAccordion', 'GoogleMapsEmbed',
    'Financing', 'RelatedServices',
  ],
  'outdoor-lighting': [
    'Hero', 'TrustBar', 'ServiceCardsGrid', 'ProjectGallery',
    'BeforeAfterSlider', 'Testimonials', 'CtaBanner',
    'FaqAccordion', 'GoogleMapsEmbed', 'RelatedServices',
  ],
  excavation: [
    'Hero', 'TrustBar', 'ServiceCardsGrid', 'ProjectGallery',
    'Testimonials', 'ProcessSteps', 'StatsBar', 'CtaBanner',
    'FaqAccordion', 'GoogleMapsEmbed', 'AwardsCertifications',
  ],
  construction: [
    'Hero', 'TrustBar', 'ServiceCardsGrid', 'ProjectGallery',
    'BeforeAfterSlider', 'Testimonials', 'ProcessSteps',
    'StatsBar', 'CtaBanner', 'FaqAccordion', 'GoogleMapsEmbed',
    'Financing', 'AwardsCertifications',
  ],
  plumbing: [
    'Hero', 'EmergencyBanner', 'TrustBar', 'ServiceCardsGrid',
    'Testimonials', 'ProcessSteps', 'StatsBar', 'CtaBanner',
    'FaqAccordion', 'GoogleMapsEmbed', 'StickyPhoneBar',
    'AwardsCertifications', 'RelatedServices',
  ],
  hvac: [
    'Hero', 'EmergencyBanner', 'TrustBar', 'ServiceCardsGrid',
    'Testimonials', 'ProcessSteps', 'StatsBar', 'CtaBanner',
    'FaqAccordion', 'GoogleMapsEmbed', 'StickyPhoneBar',
    'Financing', 'AwardsCertifications', 'RelatedServices',
  ],
  electrical: [
    'Hero', 'EmergencyBanner', 'TrustBar', 'ServiceCardsGrid',
    'Testimonials', 'ProcessSteps', 'StatsBar', 'CtaBanner',
    'FaqAccordion', 'GoogleMapsEmbed', 'StickyPhoneBar',
    'AwardsCertifications', 'RelatedServices',
  ],
  roofing: [
    'Hero', 'TrustBar', 'ServiceCardsGrid', 'ProjectGallery',
    'BeforeAfterSlider', 'Testimonials', 'ProcessSteps',
    'StatsBar', 'CtaBanner', 'FaqAccordion', 'GoogleMapsEmbed',
    'Financing', 'AwardsCertifications', 'RelatedServices',
  ],
  cleaning: [
    'Hero', 'TrustBar', 'ServiceCardsGrid', 'Testimonials',
    'ProcessSteps', 'StatsBar', 'CtaBanner', 'FaqAccordion',
    'GoogleMapsEmbed', 'StickyPhoneBar', 'RelatedServices',
  ],
  'pest-control': [
    'Hero', 'TrustBar', 'ServiceCardsGrid', 'Testimonials',
    'ProcessSteps', 'StatsBar', 'CtaBanner', 'FaqAccordion',
    'GoogleMapsEmbed', 'StickyPhoneBar', 'AwardsCertifications',
  ],
  painting: [
    'Hero', 'TrustBar', 'ServiceCardsGrid', 'ProjectGallery',
    'BeforeAfterSlider', 'Testimonials', 'ProcessSteps',
    'CtaBanner', 'FaqAccordion', 'GoogleMapsEmbed', 'RelatedServices',
  ],
  concrete: [
    'Hero', 'TrustBar', 'ServiceCardsGrid', 'ProjectGallery',
    'BeforeAfterSlider', 'Testimonials', 'ProcessSteps',
    'StatsBar', 'CtaBanner', 'FaqAccordion', 'GoogleMapsEmbed',
  ],
  fencing: [
    'Hero', 'TrustBar', 'ServiceCardsGrid', 'ProjectGallery',
    'BeforeAfterSlider', 'Testimonials', 'ProcessSteps',
    'CtaBanner', 'FaqAccordion', 'GoogleMapsEmbed', 'RelatedServices',
  ],
  'general-contractor': [
    'Hero', 'TrustBar', 'ServiceCardsGrid', 'ProjectGallery',
    'BeforeAfterSlider', 'Testimonials', 'ProcessSteps',
    'StatsBar', 'CtaBanner', 'FaqAccordion', 'GoogleMapsEmbed',
    'Financing', 'AwardsCertifications', 'RelatedServices',
  ],
  other: [
    'Hero', 'TrustBar', 'ServiceCardsGrid', 'Testimonials',
    'CtaBanner', 'FaqAccordion', 'GoogleMapsEmbed',
  ],
};
