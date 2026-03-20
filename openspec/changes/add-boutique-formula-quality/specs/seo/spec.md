# SEO Spec Delta: add-boutique-formula-quality

## MODIFIED Requirements

### Requirement: Open Graph Metadata

The system SHALL generate Open Graph metadata for all public pages to enable rich social media sharing previews.

#### Scenario: Formula page Open Graph tags
- **GIVEN** a user shares a formula page URL on social media
- **WHEN** the social platform fetches the page metadata
- **THEN** the response SHALL include:
  - `og:title` with the formula name and site branding
  - `og:description` with the formula's own `metaDescription` (not a generic "Generate X formulas..." template)
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
  - `twitter:description` with the formula's own `metaDescription` (not a generic formula description template)
  - `twitter:image` with a valid image URL

#### Scenario: Twitter Card for homepage
- **GIVEN** a user shares the homepage URL on Twitter/X
- **WHEN** Twitter fetches the page metadata
- **THEN** the response SHALL include Twitter Card metadata with site branding

---
