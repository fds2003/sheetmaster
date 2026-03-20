## MODIFIED Requirements

### Requirement: Dynamic Sitemap Generation

The system SHALL automatically generate a sitemap.xml containing all pages, including formulas, solutions, static pages, blog, resources, tools, compare pages, and use-case pages.

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

#### Scenario: Sitemap includes use-case routes
- **GIVEN** use-cases are configured in `lib/use-cases.ts`
- **WHEN** `/sitemap.xml` is requested
- **THEN** it SHALL include the `/use-cases` URL and all `/use-cases/[slug]` URLs with priority 0.7 (or equivalent)
