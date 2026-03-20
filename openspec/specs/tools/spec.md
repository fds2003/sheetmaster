# tools Specification

## Purpose
TBD - created by archiving change add-growth-features. Update Purpose after archive.
## Requirements
### Requirement: Dedicated tool page remove-duplicates

The system SHALL provide a dedicated tool page at `/tools/remove-duplicates` for Excel/Sheets "remove duplicates" formulas, with multiple sub-tools and SEO-oriented metadata.

#### Scenario: Remove-duplicates page route
- **GIVEN** the site is deployed
- **WHEN** a user requests `/tools/remove-duplicates`
- **THEN** a page SHALL be returned with status 200

#### Scenario: Sub-tools available
- **GIVEN** a user visits `/tools/remove-duplicates`
- **WHEN** the page renders
- **THEN** it SHALL offer at least: Get Unique (or equivalent), Remove Duplicates (Keep First), optional Keep Latest Date, Count Duplicates, and optional Highlight Duplicates
- **AND** each sub-tool SHALL allow generating or copying the corresponding formula

#### Scenario: Remove-duplicates page metadata
- **GIVEN** the page is rendered
- **WHEN** metadata is generated
- **THEN** the title and meta description SHALL target keywords such as "remove duplicates excel formula" and "how to remove duplicates in excel"

---

### Requirement: Dedicated tool page split-text

The system SHALL provide a dedicated tool page at `/tools/split-text` for Excel/Sheets text-splitting formulas, with multiple sub-tools and SEO-oriented metadata.

#### Scenario: Split-text page route
- **GIVEN** the site is deployed
- **WHEN** a user requests `/tools/split-text`
- **THEN** a page SHALL be returned with status 200

#### Scenario: Sub-tools available
- **GIVEN** a user visits `/tools/split-text`
- **WHEN** the page renders
- **THEN** it SHALL offer at least: Split by delimiter (e.g. TEXTSPLIT), Extract First Name, Extract Last Name, Split by comma (or equivalent)
- **AND** each sub-tool SHALL allow generating or copying the corresponding formula

#### Scenario: Split-text page metadata
- **GIVEN** the page is rendered
- **WHEN** metadata is generated
- **THEN** the title and meta description SHALL target keywords such as "split text in excel" and "text to columns excel formula"

