# Formulas Spec Delta: add-boutique-formula-quality

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
- **AND** it MAY contain `commonErrors` as an array of objects with optional `title`, and arrays `causes` and `fixes` for a "Common Errors & Fixes" block

---

### Requirement: Core formula FAQ data

The system SHALL provide FAQ data for at least the Hero 10 formulas so that FAQPage structured data can be emitted on those pages.

#### Scenario: Hero 10 formulas have faq array
- **GIVEN** the formula slug is one of: vlookup, if, sumif, index-match, xlookup, sumifs, countif, countifs, iferror, concatenate (Hero 10)
- **WHEN** the formula configuration is read from `lib/formulas.ts`
- **THEN** that formula SHALL have a `faq` array with at least five question/answer pairs

#### Scenario: FAQ content relevance
- **GIVEN** a Hero 10 formula's faq array
- **WHEN** each item is inspected
- **THEN** each item SHALL have a question and answer appropriate to that specific formula (e.g. VLOOKUP: "Why #N/A?", "Can VLOOKUP look left?"; IF: nesting limits, IF vs IFS)
- **AND** questions SHALL NOT be generic templates where only the function name is swapped

---

## ADDED Requirements

### Requirement: Formula page unique metadata

The system SHALL ensure each formula page has unique, formula-specific title and meta description suitable for search and social sharing.

#### Scenario: Unique title per formula
- **GIVEN** any formula in the FORMULAS array
- **WHEN** the formula's `title` is used for the page
- **THEN** the title SHALL be a unique phrasing that reflects that formula's purpose or use case
- **AND** it SHALL NOT be a generic template where only the function name is substituted

#### Scenario: Unique metaDescription per formula
- **GIVEN** any formula in the FORMULAS array
- **WHEN** the formula's `metaDescription` is used for the page
- **THEN** the meta description SHALL be a unique phrasing that reflects that formula's purpose, benefits, or common pain points
- **AND** it SHALL NOT be a generic template where only the function name is substituted

---

### Requirement: Common Errors and Fixes block

The system SHALL display a "Common Errors & Fixes" block on a formula page when that formula's configuration includes `commonErrors`.

#### Scenario: Block visible when commonErrors present
- **GIVEN** a formula configuration has a non-empty `commonErrors` array
- **WHEN** the formula page is rendered
- **THEN** a block SHALL be visible (e.g. titled "Common Errors & Fixes") that lists each entry's causes and fixes

#### Scenario: Block hidden when commonErrors absent
- **GIVEN** a formula configuration has no `commonErrors` or an empty array
- **WHEN** the formula page is rendered
- **THEN** the "Common Errors & Fixes" block SHALL NOT be displayed

#### Scenario: CommonErrors data shape
- **GIVEN** a formula has `commonErrors` configured
- **WHEN** each entry is rendered
- **THEN** each entry SHALL support at least: an optional title, a list of causes, and a list of fixes (or equivalent structure as defined in design)
