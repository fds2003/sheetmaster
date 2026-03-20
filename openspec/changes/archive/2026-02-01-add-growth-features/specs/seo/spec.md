## ADDED Requirements

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

## MODIFIED Requirements

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
