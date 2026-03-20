## MODIFIED Requirements

### Requirement: Formula Configuration Structure

The system SHALL use a centralized configuration for all formula definitions.

#### Scenario: Formula config file
- **GIVEN** a developer needs to add a new formula
- **WHEN** they edit `lib/formulas.ts`
- **THEN** the FORMULAS array SHALL accept objects with the FormulaConfig interface

#### Scenario: Required formula fields
- **GIVEN** a formula configuration object
- **WHEN** it is validated
- **THEN** it SHALL contain:
  - `slug`: URL path identifier
  - `title`: Page title
  - `metaDescription`: SEO description
  - `excelFunction`: Excel function name
  - `category`: Formula category
  - `description`: Short description
  - `inputs`: Array of input configurations
  - `generate`: Function to generate formula string

#### Scenario: Optional formula fields
- **GIVEN** a formula configuration object
- **WHEN** additional SEO content is needed
- **THEN** it MAY contain `richContent` with HTML string for detailed tutorials
- **AND** it MAY contain `faq` as an array of question/answer objects for FAQPage structured data
- **AND** it MAY contain `howToSteps` for HowTo structured data

---

## ADDED Requirements

### Requirement: Core formula FAQ data

The system SHALL provide FAQ data for at least the five core formulas (vlookup, if, sumif, index-match, xlookup) so that FAQPage structured data can be emitted on those pages.

#### Scenario: Core formulas have faq array
- **GIVEN** the formula slug is one of vlookup, if, sumif, index-match, xlookup
- **WHEN** the formula configuration is read from `lib/formulas.ts`
- **THEN** that formula SHALL have a `faq` array with at least five question/answer pairs

#### Scenario: FAQ content relevance
- **GIVEN** a core formula's faq array
- **WHEN** each item is inspected
- **THEN** each item SHALL have a question and answer appropriate to the formula (e.g. What does VLOOKUP do? Why #N/A? Can VLOOKUP look left?)

---

### Requirement: Share actions on formula result

The system SHALL provide share actions next to the formula result (e.g. Copy button): Share to Twitter, Share to LinkedIn, and Copy Link.

#### Scenario: Share to Twitter
- **GIVEN** a formula has been generated and the result is visible
- **WHEN** the user clicks Share to Twitter
- **THEN** the system SHALL open or navigate to Twitter intent URL with pre-filled text including the site (getsheetmaster.com) and formula context

#### Scenario: Share to LinkedIn
- **GIVEN** a formula has been generated and the result is visible
- **WHEN** the user clicks Share to LinkedIn
- **THEN** the system SHALL open or navigate to LinkedIn share URL with the current page URL

#### Scenario: Copy Link
- **GIVEN** a formula page is displayed
- **WHEN** the user clicks Copy Link
- **THEN** the current page URL SHALL be copied to the clipboard

---

### Requirement: Related Formulas block

The system SHALL display a "Related Formulas" block at the bottom of each formula page, linking to three to five related formula pages.

#### Scenario: Related formulas visible
- **GIVEN** a user visits a formula page
- **WHEN** the page renders
- **THEN** a block SHALL be visible at the bottom (e.g. "Related Formulas") with links to other formula pages

#### Scenario: Related formulas relevance
- **GIVEN** the related formulas are determined (e.g. by category or predefined mapping)
- **WHEN** the block is rendered
- **THEN** it SHALL show three to five links to formula pages that are relevant (e.g. vlookup → index-match, xlookup, iferror)
