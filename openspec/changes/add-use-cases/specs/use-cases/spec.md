## ADDED Requirements

### Requirement: Use-case configuration structure

The system SHALL use a centralized configuration for all use-case (industry) landing page definitions.

#### Scenario: Use-case config file
- **GIVEN** a developer needs to add a new use-case
- **WHEN** they edit `lib/use-cases.ts`
- **THEN** the USE_CASES array SHALL accept objects with the UseCase interface

#### Scenario: Required use-case fields
- **GIVEN** a use-case configuration object
- **WHEN** it is validated
- **THEN** it SHALL contain: `slug`, `title`, `description`, and at least one of `formulas` (array of formula slugs) or `tools` (array of tool/solution paths); it MAY contain `metaDescription`, `painPoints`, `ctaText`

---

### Requirement: Use-case list page

The system SHALL provide a use-case list page at `/use-cases` that displays all use-cases as cards linking to their detail pages.

#### Scenario: Use-case list route
- **GIVEN** the site is deployed
- **WHEN** a user requests `/use-cases`
- **THEN** a page SHALL be returned with status 200

#### Scenario: Use-case cards
- **GIVEN** a user visits `/use-cases`
- **WHEN** the page renders
- **THEN** it SHALL display a card for each use-case in the USE_CASES array
- **AND** each card SHALL link to `/use-cases/[slug]` for that use-case

#### Scenario: Use-case list metadata
- **GIVEN** the use-case list page is rendered
- **WHEN** metadata is generated
- **THEN** it SHALL have a title (e.g. "Industry Solutions" or "Use Cases") and description suitable for SEO
- **AND** it SHALL have canonical URL and Open Graph tags

---

### Requirement: Use-case detail page

The system SHALL provide a dynamic use-case detail page at `/use-cases/[slug]` that shows pain points, recommended formulas, recommended tools, and a call-to-action.

#### Scenario: Use-case detail route
- **GIVEN** a use-case slug exists in USE_CASES (e.g. accountants, data-analysts)
- **WHEN** a user requests `/use-cases/[slug]`
- **THEN** a page SHALL be returned with status 200

#### Scenario: Use-case detail content
- **GIVEN** a user visits a use-case detail page
- **WHEN** the page renders
- **THEN** it SHALL display the use-case title and description
- **AND** it SHALL list recommended formulas with links to `/formulas/[slug]`
- **AND** it SHALL list recommended tools with links to `/tools/...` or `/solutions/...` as configured
- **AND** it MAY display pain points and a CTA (e.g. "Try [Formula]")

#### Scenario: Use-case detail metadata
- **GIVEN** a use-case detail page is requested
- **WHEN** generateMetadata is called with the slug
- **THEN** it SHALL return title and description (from use-case metaDescription or derived); canonical URL and Open Graph tags

#### Scenario: Static generation of use-case pages
- **GIVEN** the Next.js build runs
- **WHEN** `/use-cases/[slug]` routes are generated
- **THEN** generateStaticParams SHALL return all use-case slugs from USE_CASES
