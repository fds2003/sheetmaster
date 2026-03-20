# SEO Specification

## Purpose
SheetMaster 的 SEO 优化规范，确保网站在搜索引擎中获得良好的可见性和排名。包括元数据、结构化数据、社交分享优化、站点地图等功能的完整实现。

## Current Status (2026-01-06)
- SEO 评分: **100/100** (PageSpeed Insights)
- 性能评分: **98/100** (PageSpeed Insights)
- 索引页面: **53 个** (3 静态 + 50 公式)
- Canonical URL: `www.getsheetmaster.com`

---
## Requirements
### Requirement: Metadata Base Configuration

The system SHALL configure a global metadata base URL for consistent canonical URL generation.

#### Scenario: metadataBase configuration
- **GIVEN** the Next.js application is configured
- **WHEN** metadata is generated for any page
- **THEN** the `metadataBase` SHALL be set to `https://www.getsheetmaster.com`

#### Scenario: Canonical URL consistency
- **GIVEN** a page has metadata configured
- **WHEN** the canonical URL is resolved
- **THEN** it SHALL use the `www` subdomain consistently

---

### Requirement: Open Graph Metadata

The system SHALL generate Open Graph metadata for all public pages to enable rich social media sharing previews.

#### Scenario: Formula page Open Graph tags
- **GIVEN** a user shares a formula page URL on social media
- **WHEN** the social platform fetches the page metadata
- **THEN** the response SHALL include:
  - `og:title` with the formula name and site branding
  - `og:description` with a compelling formula description
  - `og:url` with the canonical page URL (www.getsheetmaster.com)
  - `og:type` set to "website"
  - `og:site_name` set to "SheetMaster"
  - `og:image` with a dynamically generated image URL (/api/og)

#### Scenario: Homepage Open Graph tags
- **GIVEN** a user shares the homepage URL on social media
- **WHEN** the social platform fetches the page metadata
- **THEN** the response SHALL include complete Open Graph tags with site branding

#### Scenario: Dynamic OG image generation
- **GIVEN** a page requires an Open Graph image
- **WHEN** the `/api/og` endpoint is called with title and description parameters
- **THEN** it SHALL return a 1200x630 PNG image with branded styling

---

### Requirement: Twitter Card Metadata

The system SHALL generate Twitter Card metadata for enhanced Twitter/X sharing experience.

#### Scenario: Twitter Card for formula pages
- **GIVEN** a user shares a formula page URL on Twitter/X
- **WHEN** Twitter fetches the page metadata
- **THEN** the response SHALL include:
  - `twitter:card` set to "summary_large_image"
  - `twitter:title` with the formula name
  - `twitter:description` with a brief formula description
  - `twitter:image` with a valid image URL

#### Scenario: Twitter Card for homepage
- **GIVEN** a user shares the homepage URL on Twitter/X
- **WHEN** Twitter fetches the page metadata
- **THEN** the response SHALL include Twitter Card metadata with site branding

---

### Requirement: Homepage SEO Metadata

The system SHALL provide comprehensive SEO metadata on the homepage to improve search engine ranking.

#### Scenario: Homepage meta tags generation
- **GIVEN** a search engine crawler visits the homepage
- **WHEN** the page is rendered
- **THEN** the HTML head SHALL contain:
  - A `<title>` tag with primary keywords
  - A `<meta name="description">` tag with compelling copy under 160 characters
  - A `<meta name="keywords">` tag with target keywords
  - Author and creator meta tags

#### Scenario: Homepage keywords relevance
- **GIVEN** the homepage metadata is configured
- **WHEN** reviewing the keywords meta tag
- **THEN** it SHALL include high-value terms: "Excel formula generator", "Google Sheets formulas", "VLOOKUP generator", "IF statement generator", "SUMIF formula", "spreadsheet formulas"

---

### Requirement: Canonical URL Management

The system SHALL implement canonical URLs to prevent duplicate content issues.

#### Scenario: Canonical URL on all pages
- **GIVEN** any page on the website
- **WHEN** the page is rendered
- **THEN** it SHALL include a canonical URL pointing to `www.getsheetmaster.com`

#### Scenario: Non-www to www redirect
- **GIVEN** a user visits `getsheetmaster.com` (without www)
- **WHEN** the request is processed by Vercel
- **THEN** it SHALL redirect to `www.getsheetmaster.com`

---

### Requirement: Breadcrumb Navigation

The system SHALL display breadcrumb navigation on formula pages to improve user experience and SEO.

#### Scenario: Breadcrumb display on formula page
- **GIVEN** a user visits a formula page (e.g., /formulas/vlookup)
- **WHEN** the page renders
- **THEN** a breadcrumb navigation SHALL be visible showing: Formulas > VLOOKUP

#### Scenario: Breadcrumb links functionality
- **GIVEN** a breadcrumb navigation is displayed
- **WHEN** the user clicks on "Formulas"
- **THEN** they SHALL be navigated to the homepage

#### Scenario: Breadcrumb accessibility
- **GIVEN** a user uses a screen reader
- **WHEN** they navigate to the breadcrumb section
- **THEN** the navigation SHALL have `aria-label="Breadcrumb"` for accessibility

---

### Requirement: Breadcrumb Structured Data

The system SHALL include BreadcrumbList structured data (JSON-LD) to enhance search result appearance.

#### Scenario: BreadcrumbList JSON-LD on formula pages
- **GIVEN** a search engine crawls a formula page
- **WHEN** the page source is parsed
- **THEN** it SHALL contain valid JSON-LD with:
  - `@type`: "BreadcrumbList"
  - An array of `itemListElement` with proper `position`, `name`, and `item` (URL) for each breadcrumb level
  - URLs pointing to `www.getsheetmaster.com`

#### Scenario: Structured data validation
- **GIVEN** the breadcrumb JSON-LD is implemented
- **WHEN** validated using Google Rich Results Test
- **THEN** no errors SHALL be reported for the BreadcrumbList schema

---

### Requirement: Dynamic Sitemap Generation

The system SHALL automatically generate a sitemap.xml containing all pages, including formulas, solutions, static pages, blog, resources, tools, and compare pages.

#### Scenario: Sitemap includes all formulas
- **GIVEN** formulas are configured in `lib/formulas.ts`
- **WHEN** `/sitemap.xml` is requested
- **THEN** it SHALL include URLs for all 50 formula pages

#### Scenario: Sitemap includes static pages
- **GIVEN** static pages exist (homepage, privacy, terms)
- **WHEN** `/sitemap.xml` is requested
- **THEN** it SHALL include URLs for all static pages

#### Scenario: Sitemap URL format
- **GIVEN** the sitemap is generated
- **WHEN** URLs are inspected
- **THEN** all URLs SHALL use the `www.getsheetmaster.com` domain

#### Scenario: Sitemap includes blog routes
- **GIVEN** blog list and post pages exist
- **WHEN** `/sitemap.xml` is requested
- **THEN** it SHALL include the `/blog` URL and all `/blog/[slug]` URLs

#### Scenario: Sitemap includes resources and growth routes
- **GIVEN** the resources page and tools/compare pages exist
- **WHEN** `/sitemap.xml` is requested
- **THEN** it SHALL include `/resources`, `/tools/remove-duplicates`, `/tools/split-text`, and `/compare/vlookup-vs-xlookup` (or equivalent compare URL)

### Requirement: Robots.txt Configuration

The system SHALL provide a robots.txt file to guide search engine crawlers.

#### Scenario: Robots.txt allows crawling
- **GIVEN** a search engine requests `/robots.txt`
- **WHEN** the response is parsed
- **THEN** it SHALL allow all user agents to crawl all paths#### Scenario: Robots.txt includes sitemap
- **GIVEN** a search engine requests `/robots.txt`
- **WHEN** the response is parsed
- **THEN** it SHALL include a reference to `https://www.getsheetmaster.com/sitemap.xml`

---

### Requirement: SoftwareApplication Structured Data

The system SHALL include SoftwareApplication structured data for formula generator pages.

#### Scenario: JSON-LD for formula pages
- **GIVEN** a search engine crawls a formula page
- **WHEN** the page source is parsed
- **THEN** it SHALL contain JSON-LD with `@type: "SoftwareApplication"`---## Implementation Files| Feature | File |
|---------|------|
| Global Metadata | `app/layout.tsx` |
| Homepage Metadata | `app/page.tsx` |
| Formula Metadata | `app/formulas/[slug]/page.tsx` |
| Breadcrumbs Component | `components/Breadcrumbs.tsx` |
| JSON-LD Component | `components/JsonLd.tsx` |
| Dynamic OG Image | `app/api/og/route.tsx` |
| Sitemap | `app/sitemap.ts` |
| Robots.txt | `app/robots.ts` |

### Requirement: Global default description

The system SHALL set the default meta description in the root layout so that product positioning emphasizes "No AI, no signup" (or equivalent) and SHALL NOT use "AI-powered" in the default description.

#### Scenario: Default description wording
- **GIVEN** the root layout metadata is configured
- **WHEN** a page uses the default description (e.g. homepage or fallback)
- **THEN** the description SHALL NOT contain "AI-powered"
- **AND** the description SHALL contain wording such as "No AI, no signup" or equivalent positioning

#### Scenario: Open Graph and Twitter description alignment
- **GIVEN** the root layout sets default description
- **WHEN** openGraph.description and twitter.description are set
- **THEN** they SHALL align with the default description (no "AI-powered")

---

### Requirement: Main navigation links

The system SHALL display in the main layout navigation links to Blog and Resources.

#### Scenario: Blog link
- **GIVEN** a user views any page
- **WHEN** the main nav is visible
- **THEN** a link to Blog SHALL be present
- **AND** it SHALL point to `/blog`

#### Scenario: Resources link
- **GIVEN** a user views any page
- **WHEN** the main nav is visible
- **THEN** a link to Resources SHALL be present
- **AND** it SHALL point to `/resources`

---

### Requirement: Homepage content structure

The system SHALL render the homepage with a hero H1, a value-proposition section, a most-popular formulas section, and an industry solutions section.

#### Scenario: Hero H1 and subtitle
- **GIVEN** a user visits the homepage
- **WHEN** the page renders
- **THEN** the main H1 SHALL include "Free Excel & Google Sheets Formula Generator" and "50+ Tools" (or equivalent)
- **AND** the subtitle SHALL mention "No signup, instant results" or equivalent

#### Scenario: Why SheetMaster section
- **GIVEN** a user visits the homepage
- **WHEN** the page renders
- **THEN** a section SHALL be visible between the hero and solutions (e.g. "Why SheetMaster?") with at least three value props (e.g. Free/No signup, Not AI/full control, Learn every formula)

#### Scenario: Most Popular Formulas section
- **GIVEN** a user visits the homepage
- **WHEN** the page renders
- **THEN** a section SHALL link to at least three core formula pages (e.g. VLOOKUP, IF, SUMIF, INDEX MATCH, XLOOKUP)

#### Scenario: Industry Solutions section
- **GIVEN** a user visits the homepage
- **WHEN** the page renders
- **THEN** the solutions block SHALL be titled or subtitled "Industry Solutions" (or equivalent) and SHALL link to solution pages

---

### Requirement: FAQPage structured data

The system SHALL output FAQPage JSON-LD on formula pages when the formula configuration includes FAQ data.

#### Scenario: FAQPage JSON-LD when faq present
- **GIVEN** a formula configuration has a non-empty `faq` array
- **WHEN** the formula page is rendered
- **THEN** the page source SHALL contain valid JSON-LD with `@type: "FAQPage"`
- **AND** each FAQ item SHALL have `Question` and `acceptedAnswer` (Answer) structure

#### Scenario: No FAQPage when faq absent
- **GIVEN** a formula configuration has no `faq` or empty `faq`
- **WHEN** the formula page is rendered
- **THEN** the page MAY omit FAQPage JSON-LD

---
