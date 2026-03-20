/**
 * src/lib/urls.ts
 *
 * Centralized URL builder. All internal links should use these functions
 * rather than hardcoded strings. If URL structure ever changes, update
 * here and it propagates everywhere automatically.
 */

import config from '../site.config';

// ─── Page URLs ────────────────────────────────────────────────────────────────

export const homeUrl         = ()                          => '/';
export const aboutUrl        = ()                          => '/about/';
export const contactUrl      = ()                          => '/contact/';
export const servicesUrl     = ()                          => '/services/';
export const areasUrl        = ()                          => '/areas/';
export const blogUrl         = ()                          => '/blog/';
export const projectsUrl     = ()                          => '/projects/';

// ─── Dynamic URLs ─────────────────────────────────────────────────────────────

/** Individual service page: /services/lawn-care/ */
export const serviceUrl = (serviceSlug: string) =>
  `/services/${serviceSlug}/`;

/** Individual area page: /areas/pittsburgh/ */
export const areaUrl = (areaSlug: string) =>
  `/areas/${areaSlug}/`;

/** Service × area combo page: /services/pittsburgh/lawn-care/ */
export const comboUrl = (areaSlug: string, serviceSlug: string) =>
  `/services/${areaSlug}/${serviceSlug}/`;

/** Individual blog post: /blog/spring-lawn-care-tips/ */
export const blogPostUrl = (slug: string) =>
  `/blog/${slug}/`;

/** Individual project page: /projects/shadyside-backyard/ */
export const projectUrl = (slug: string) =>
  `/projects/${slug}/`;

/** Campaign landing page: /lp/spring-special/ */
export const campaignUrl = (slug: string) =>
  `/lp/${slug}/`;

// ─── Absolute URLs (for schema, OG, sitemap) ──────────────────────────────────

export const absoluteUrl = (path: string) =>
  `${config.siteUrl}${path}`;

export const absoluteServiceUrl  = (slug: string) => absoluteUrl(serviceUrl(slug));
export const absoluteAreaUrl     = (slug: string) => absoluteUrl(areaUrl(slug));
export const absoluteComboUrl    = (areaSlug: string, serviceSlug: string) =>
  absoluteUrl(comboUrl(areaSlug, serviceSlug));
export const absoluteBlogPostUrl = (slug: string) => absoluteUrl(blogPostUrl(slug));
export const absoluteProjectUrl  = (slug: string) => absoluteUrl(projectUrl(slug));

// ─── Breadcrumb helpers ───────────────────────────────────────────────────────

export type Breadcrumb = { name: string; url: string };

export const serviceBreadcrumbs = (serviceName: string, serviceSlug: string): Breadcrumb[] => [
  { name: 'Services', url: servicesUrl() },
  { name: serviceName, url: serviceUrl(serviceSlug) },
];

export const areaBreadcrumbs = (areaName: string, areaSlug: string): Breadcrumb[] => [
  { name: 'Service Areas', url: areasUrl() },
  { name: areaName, url: areaUrl(areaSlug) },
];

export const comboBreadcrumbs = (
  areaName: string, areaSlug: string,
  serviceName: string, serviceSlug: string
): Breadcrumb[] => [
  { name: 'Services',   url: servicesUrl() },
  { name: areaName,     url: areaUrl(areaSlug) },
  { name: serviceName,  url: comboUrl(areaSlug, serviceSlug) },
];

export const blogBreadcrumbs = (postTitle: string, postSlug: string): Breadcrumb[] => [
  { name: 'Blog', url: blogUrl() },
  { name: postTitle, url: blogPostUrl(postSlug) },
];

export const projectBreadcrumbs = (projectTitle: string, projectSlug: string): Breadcrumb[] => [
  { name: 'Projects', url: projectsUrl() },
  { name: projectTitle, url: projectUrl(projectSlug) },
];
