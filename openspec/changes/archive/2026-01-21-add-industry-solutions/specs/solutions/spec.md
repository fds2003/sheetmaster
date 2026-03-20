# Solutions Specification (Delta)

## MODIFIED Requirements

### Requirement: Solution Types

The system SHALL support six industry-vertical solution types.

#### Scenario: Loan Calculator solution (retained)
- **GIVEN** a user needs to calculate loan payments
- **WHEN** they visit `/solutions/loan-calculator`
- **THEN** the page SHALL provide mortgage, auto, and personal loan calculators
- **AND** use US-specific interest rates and terminology

#### Scenario: Data Cleaning solution (retained)
- **GIVEN** a user needs to clean marketing data
- **WHEN** they visit `/solutions/data-cleaning`
- **THEN** the page SHALL provide email extraction, domain extraction, and text normalization tools

#### Scenario: SEO Toolkit solution (new)
- **GIVEN** a content marketer or SEO specialist needs URL and metadata tools
- **WHEN** they visit `/solutions/seo-toolkit`
- **THEN** the page SHALL provide:
  - URL Slug Generator (LOWER + SUBSTITUTE + TRIM)
  - Meta Tag Length Checker (LEN + IF)
  - UTM Link Builder (CONCATENATE)
- **AND** the title SHALL target keywords like "URL slug generator", "meta tag checker"

#### Scenario: Inventory Manager solution (new)
- **GIVEN** an e-commerce seller or retail store owner needs inventory tools
- **WHEN** they visit `/solutions/inventory-manager`
- **THEN** the page SHALL provide:
  - Reorder Alert Generator (IF + AND)
  - SKU Price Lookup (XLOOKUP)
  - Missing Data Finder (COUNTBLANK)
- **AND** the title SHALL target keywords like "inventory reorder alert", "SKU lookup"

#### Scenario: Subscription Tracker solution (new)
- **GIVEN** a SaaS company, gym, or rental service needs membership tracking
- **WHEN** they visit `/solutions/subscription-tracker`
- **THEN** the page SHALL provide:
  - Expiry Date Calculator (EDATE)
  - Billing Cycle Finder (EOMONTH)
  - Days Until Renewal (DATEDIF)
- **AND** the title SHALL target keywords like "membership expiry calculator", "subscription renewal"

#### Scenario: Grade Calculator solution (new)
- **GIVEN** a teacher or trainer needs grading tools
- **WHEN** they visit `/solutions/grade-calculator`
- **THEN** the page SHALL provide:
  - Letter Grade Converter (IFS)
  - Clean Average Calculator (AVERAGEIF)
  - Attendance Counter (COUNTIF)
- **AND** the title SHALL target keywords like "grade calculator", "letter grade converter"

---

## REMOVED Requirements

### Requirement: HR Time Calculator
**Reason**: Functionality covered by Subscription Tracker (both use EDATE, DATEDIF)
**Migration**: Users directed to Subscription Tracker for date calculations

### Requirement: Multi-Criteria Analysis (SUMIFS Generator)
**Reason**: Too technical, not scenario-driven enough
**Migration**: SUMIFS/COUNTIFS remain available as individual formula pages

---

## Implementation Files

| Feature | File |
|---------|------|
| Solution Configurations | `lib/solutions.ts` |
| Solution Builder Component | `components/SolutionBuilder.tsx` |
| Solution Card Component | `components/SolutionCard.tsx` |
| Dynamic Solution Page | `app/solutions/[slug]/page.tsx` |
| Homepage | `app/page.tsx` |
| Sitemap | `app/sitemap.ts` |
