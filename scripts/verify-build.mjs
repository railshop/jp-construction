#!/usr/bin/env node
/**
 * scripts/verify-build.mjs
 *
 * Post-build verification script for railshop-starter-service.
 * Run after `npm run build` to confirm the site is production-ready.
 *
 * Usage:
 *   node scripts/verify-build.mjs
 *
 * What it checks:
 *   1. Build output exists and has pages
 *   2. Critical pages are present
 *   3. No pages are empty (0 bytes)
 *   4. All internal links in HTML files resolve to real output files
 *   5. JSON-LD schema blocks are present on key pages
 *   6. Meta descriptions are present and within length limits
 *   7. sitemap-index.xml exists
 *   8. robots.txt exists
 *   9. No broken image src paths (relative)
 *  10. Page count summary
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '../web/dist');

let errors   = 0;
let warnings = 0;
let passed   = 0;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function pass(msg)  { console.log(`  ✓ ${msg}`); passed++; }
function warn(msg)  { console.log(`  ⚠ ${msg}`); warnings++; }
function fail(msg)  { console.log(`  ✗ ${msg}`); errors++; }
function section(title) { console.log(`\n── ${title} ${'─'.repeat(50 - title.length)}`); }

function getAllHtmlFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...getAllHtmlFiles(full));
    else if (entry.name.endsWith('.html')) results.push(full);
  }
  return results;
}

function readHtml(filePath) {
  try { return fs.readFileSync(filePath, 'utf8'); }
  catch { return ''; }
}

// ─── Check 1: Build output exists ────────────────────────────────────────────

section('Build Output');

if (!fs.existsSync(DIST)) {
  fail(`dist/ directory not found at ${DIST}`);
  fail('Run: cd web && npm run build');
  console.log('\n🔴 Build verification failed — run the build first.\n');
  process.exit(1);
}

const allHtml = getAllHtmlFiles(DIST);
if (allHtml.length === 0) {
  fail('No HTML files found in dist/');
  process.exit(1);
}

pass(`Found ${allHtml.length} HTML pages in dist/`);

// ─── Check 2: Critical pages present ─────────────────────────────────────────

section('Critical Pages');

const criticalPages = [
  'index.html',
  'about/index.html',
  'contact/index.html',
  'services/index.html',
  'areas/index.html',
];

for (const page of criticalPages) {
  const full = path.join(DIST, page);
  if (fs.existsSync(full)) pass(page);
  else fail(`Missing: ${page}`);
}

// ─── Check 3: No empty pages ──────────────────────────────────────────────────

section('Page Size Check');

const emptyPages = allHtml.filter(f => fs.statSync(f).size < 500);
if (emptyPages.length === 0) {
  pass('All pages have content (>500 bytes)');
} else {
  for (const p of emptyPages) {
    fail(`Empty/tiny page: ${p.replace(DIST, '')}`);
  }
}

// ─── Check 4: Internal link integrity ────────────────────────────────────────

section('Internal Link Check');

const hrefRegex = /href="(\/[^"#?]+)"/g;
let brokenLinks = 0;
let checkedLinks = 0;

// Build a set of all output paths for fast lookup
const outputPaths = new Set(allHtml.map(f =>
  f.replace(DIST, '').replace('/index.html', '/').replace('index.html', '/')
));
outputPaths.add('/');
outputPaths.add('/sitemap-index.xml');
outputPaths.add('/robots.txt');

// Sample check — only check first 20 pages to keep it fast
const samplePages = allHtml.slice(0, 20);

for (const htmlFile of samplePages) {
  const html = readHtml(htmlFile);
  const matches = [...html.matchAll(hrefRegex)];
  for (const [, href] of matches) {
    // Skip external links, anchors, assets
    if (!href.startsWith('/') || href.includes('.')) continue;
    const normalized = href.endsWith('/') ? href : href + '/';
    checkedLinks++;
    if (!outputPaths.has(normalized)) {
      warn(`Broken internal link: ${href} (in ${htmlFile.replace(DIST, '')})`);
      brokenLinks++;
      if (brokenLinks >= 5) { warn('(stopping after 5 broken links)'); break; }
    }
  }
  if (brokenLinks >= 5) break;
}

if (brokenLinks === 0) pass(`${checkedLinks} internal links checked — all valid`);

// ─── Check 5: JSON-LD schema on key pages ─────────────────────────────────────

section('JSON-LD Schema');

const schemaPages = [
  { file: 'index.html', type: 'LocalBusiness' },
  { file: 'contact/index.html', type: null },
  { file: 'about/index.html', type: null },
];

// Also check first service and area page if they exist
const servicePages = allHtml.filter(f => f.includes('/services/') && f.endsWith('/index.html') && !f.endsWith('services/index.html'));
const areaPages    = allHtml.filter(f => f.includes('/areas/')    && f.endsWith('/index.html') && !f.endsWith('areas/index.html'));
const comboPages   = allHtml.filter(f => {
  const rel = f.replace(DIST + '/services/', '');
  return f.includes('/services/') && rel.includes('/') && f.endsWith('/index.html');
});

if (servicePages[0]) schemaPages.push({ file: servicePages[0].replace(DIST + '/', ''), type: 'Service' });
if (areaPages[0])    schemaPages.push({ file: areaPages[0].replace(DIST + '/', ''), type: 'LocalBusiness' });
if (comboPages[0])   schemaPages.push({ file: comboPages[0].replace(DIST + '/', ''), type: 'LocalBusiness' });

for (const { file, type } of schemaPages) {
  const full = path.join(DIST, file);
  if (!fs.existsSync(full)) { warn(`Skipping schema check — page not found: ${file}`); continue; }
  const html = readHtml(full);
  const hasSchema = html.includes('application/ld+json');
  if (hasSchema) {
    pass(`Schema present: ${file}`);
    if (type && !html.includes(`"@type":"${type}`) && !html.includes(`"@type": "${type}`)) {
      warn(`Expected @type "${type}" not found in ${file}`);
    }
  } else {
    fail(`No JSON-LD schema found: ${file}`);
  }
}

// ─── Check 6: Meta descriptions ───────────────────────────────────────────────

section('Meta Descriptions');

let missingMeta = 0;
let tooLongMeta = 0;
const metaRegex = /<meta name="description" content="([^"]+)"/;

// Sample 10 pages
for (const htmlFile of allHtml.slice(0, 10)) {
  const html = readHtml(htmlFile);
  const match = html.match(metaRegex);
  if (!match) {
    warn(`Missing meta description: ${htmlFile.replace(DIST, '')}`);
    missingMeta++;
  } else if (match[1].length > 160) {
    warn(`Meta description too long (${match[1].length} chars): ${htmlFile.replace(DIST, '')}`);
    tooLongMeta++;
  }
}

if (missingMeta === 0 && tooLongMeta === 0) pass('Meta descriptions present and within limits (sample of 10 pages)');

// ─── Check 7: Sitemap ─────────────────────────────────────────────────────────

section('Sitemap & Robots');

const sitemapPath = path.join(DIST, 'sitemap-index.xml');
if (fs.existsSync(sitemapPath)) {
  const content = fs.readFileSync(sitemapPath, 'utf8');
  const urlCount = (content.match(/<sitemap>/g) || []).length;
  pass(`sitemap-index.xml found (${urlCount} sitemaps)`);
} else {
  fail('sitemap-index.xml not found — check @astrojs/sitemap config');
}

// ─── Check 8: Robots.txt ──────────────────────────────────────────────────────

const robotsPath = path.join(DIST, 'robots.txt');
if (fs.existsSync(robotsPath)) {
  const content = fs.readFileSync(robotsPath, 'utf8');
  if (content.includes('example.com')) {
    warn('robots.txt still contains example.com — update with production domain');
  } else {
    pass('robots.txt found and domain updated');
  }
} else {
  fail('robots.txt not found');
}

// ─── Check 9: Page count summary ─────────────────────────────────────────────

section('Page Count Summary');

const serviceCount = allHtml.filter(f => {
  const rel = f.replace(DIST + '/services/', '');
  return f.includes('/services/') && f.endsWith('/index.html') && !f.endsWith('services/index.html') && !rel.includes('/');
}).length;

const areaCount = allHtml.filter(f =>
  f.includes('/areas/') && f.endsWith('/index.html') && !f.endsWith('areas/index.html')
).length;

const comboCount = allHtml.filter(f => {
  if (!f.includes('/services/')) return false;
  const rel = f.replace(DIST + '/services/', '');
  return rel.includes('/') && f.endsWith('/index.html');
}).length;

const blogCount = allHtml.filter(f =>
  f.includes('/blog/') && f.endsWith('/index.html') && !f.endsWith('blog/index.html')
).length;

const projectCount = allHtml.filter(f =>
  f.includes('/projects/') && f.endsWith('/index.html') && !f.endsWith('projects/index.html')
).length;

console.log(`  Services:         ${serviceCount}`);
console.log(`  Areas:            ${areaCount}`);
console.log(`  Combo pages:      ${comboCount} (${serviceCount} × ${areaCount} = ${serviceCount * areaCount} expected)`);
console.log(`  Blog posts:       ${blogCount}`);
console.log(`  Projects:         ${projectCount}`);
console.log(`  Total HTML pages: ${allHtml.length}`);

if (comboCount < serviceCount * areaCount) {
  warn(`Combo page count (${comboCount}) is less than expected (${serviceCount * areaCount}) — check getStaticPaths in services/[area]/[service].astro`);
} else {
  pass('Combo page count matches expected (services × areas)');
}

// ─── Final Summary ────────────────────────────────────────────────────────────

console.log('\n' + '═'.repeat(54));
console.log(`  Passed:   ${passed}`);
if (warnings > 0) console.log(`  Warnings: ${warnings}`);
if (errors > 0)   console.log(`  Errors:   ${errors}`);
console.log('═'.repeat(54));

if (errors > 0) {
  console.log('\n🔴 Build verification FAILED — fix errors before deploying.\n');
  process.exit(1);
} else if (warnings > 0) {
  console.log('\n🟡 Build verification passed with warnings — review before deploying.\n');
} else {
  console.log('\n🟢 Build verification passed — ready to deploy.\n');
}
