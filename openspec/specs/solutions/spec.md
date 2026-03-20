# Solutions Specification

## Purpose
SheetMaster's industry-vertical solution tools that combine multiple formulas to solve specific business problems for North American users.

## Current Status (2026-01-21)
- Solution count: **6**
- Target market: **North America (US & Canada)**
- Static generated pages: **6**

---

## Requirements

### Requirement: Solution Configuration Structure

The system SHALL use a centralized configuration for all solution definitions.

#### Scenario: Solution config file
- **GIVEN** a developer needs to add a new solution
- **WHEN** they edit `lib/solutions.ts`
- **THEN** the SOLUTIONS array SHALL accept objects with the SolutionConfig interface

#### Scenario: Required solution fields
- **GIVEN** a solution configuration object
- **WHEN** it is validated
- **THEN** it SHALL contain:
  - `slug`: URL path identifier
  - `title`: SEO-optimized page title
  - `metaDescription`: SEO description
  - `icon`: Lucide icon name
  - `description`: Short description
  - `tools`: Array of formula tools with generate functions
  - `scenarios`: Array of quick-fill scenarios
  - `richContent`: Tutorial HTML content

---

### Requirement: Industry-Vertical Solutions

The system SHALL provide six industry-specific solution tools.

#### Scenario: Data Cleaning solution
- **GIVEN** a user needs to clean marketing data
- **WHEN** they visit `/solutions/data-cleaning`
- **THEN** the page SHALL provide:
  - Email Extractor (REGEXEXTRACT)
  - Domain Extractor (REGEXEXTRACT)
  - Remove Extra Spaces (TRIM)
  - Fix Capitalization (PROPER)
- **AND** scenarios for CRM/Salesforce exports and LinkedIn leads

#### Scenario: Loan Calculator solution
- **GIVEN** a user needs to calculate loan payments
- **WHEN** they visit `/solutions/loan-calculator`
- **THEN** the page SHALL provide:
  - Mortgage Payment calculator (PMT)
  - Auto Loan Payment calculator (PMT)
  - Personal Loan Payment calculator (PMT)
- **AND** use current US interest rates (6.5%-7.5% mortgage, 5%-6% auto)

#### Scenario: SEO Toolkit solution
- **GIVEN** a content marketer needs SEO tools
- **WHEN** they visit `/solutions/seo-toolkit`
- **THEN** the page SHALL provide:
  - URL Slug Generator (LOWER + SUBSTITUTE + TRIM)
  - Meta Title Checker (LEN + IF, 60 char limit)
  - Meta Description Checker (LEN + IF, 160 char limit)
  - UTM Link Builder (CONCATENATE)

#### Scenario: Inventory Manager solution
- **GIVEN** an e-commerce seller needs inventory tools
- **WHEN** they visit `/solutions/inventory-manager`
- **THEN** the page SHALL provide:
  - Reorder Alert (IF + AND)
  - SKU Price Lookup (XLOOKUP)
  - Missing Data Finder (COUNTBLANK)
  - Low Stock Counter (COUNTIF)
- **AND** scenarios for Amazon FBA and retail POS

#### Scenario: Subscription Tracker solution
- **GIVEN** a SaaS or service business needs subscription tracking
- **WHEN** they visit `/solutions/subscription-tracker`
- **THEN** the page SHALL provide:
  - Renewal Date Calculator (EDATE)
  - Billing Cycle End (EOMONTH)
  - Days Until Expiry (DATEDIF)
  - Renewal Status (IF with warnings)

#### Scenario: Grade Calculator solution
- **GIVEN** a teacher needs grading tools
- **WHEN** they visit `/solutions/grade-calculator`
- **THEN** the page SHALL provide:
  - Letter Grade Converter (IFS, US A-F scale)
  - Average excluding zeros (AVERAGEIF)
  - Absence Counter (COUNTIF)
  - Pass Rate Calculator (COUNTIF)

---

### Requirement: Solution Builder UI

The system SHALL provide an interactive solution builder interface.

#### Scenario: Multi-tool tabs
- **GIVEN** a user visits a solution page
- **WHEN** the SolutionBuilder component loads
- **THEN** it SHALL display tabs for each tool
- **AND** users can switch between tools without page reload

#### Scenario: Quick scenario selection
- **GIVEN** a solution has predefined scenarios
- **WHEN** the user selects a scenario
- **THEN** the form SHALL pre-fill with scenario-appropriate default values

#### Scenario: Real-time formula preview
- **GIVEN** a user modifies input fields
- **WHEN** any field value changes
- **THEN** the formula preview SHALL update immediately

#### Scenario: Copy to clipboard
- **GIVEN** a formula has been generated
- **WHEN** the user clicks the copy button
- **THEN** the formula string SHALL be copied to clipboard
- **AND** a success indicator SHALL be displayed

---

### Requirement: Solution Page SEO

The system SHALL optimize solution pages for search engines.

#### Scenario: Metadata generation
- **GIVEN** a solution page is requested
- **WHEN** generateMetadata is called
- **THEN** it SHALL return:
  - SEO-optimized title with keywords
  - Meta description (150-160 chars)
  - Open Graph metadata
  - Twitter Card metadata
  - Canonical URL

#### Scenario: Structured data
- **GIVEN** a solution page
- **WHEN** rendered
- **THEN** it SHALL include SoftwareApplication JSON-LD schema
- **AND** BreadcrumbList schema for navigation

---

### Requirement: Homepage Integration

The system SHALL display solution highlights on the homepage.

#### Scenario: Solution cards section
- **GIVEN** a user visits the homepage
- **WHEN** the page renders
- **THEN** it SHALL display a "Popular Tools" section
- **AND** show 6 solution cards in a 3-column grid (desktop)

#### Scenario: Solution card content
- **GIVEN** a solution card is displayed
- **WHEN** inspected
- **THEN** it SHALL show:
  - Icon (from Lucide)
  - Title (shortened)
  - Description
  - Arrow indicator

---

### Requirement: Static Page Generation

The system SHALL statically generate all solution pages at build time.

#### Scenario: generateStaticParams implementation
- **GIVEN** the Next.js build process runs
- **WHEN** `/solutions/[slug]` routes are generated
- **THEN** generateStaticParams SHALL return all 6 solution slugs

#### Scenario: Sitemap inclusion
- **GIVEN** the sitemap is generated
- **WHEN** inspected
- **THEN** it SHALL include all 6 solution URLs with priority 0.9

---

## Solution List (6 Total)

1. **data-cleaning** - Email Extractor & Data Cleanup Tools
2. **loan-calculator** - Loan Payment Calculator (Mortgage, Auto, Personal)
3. **seo-toolkit** - URL Slug Generator & Meta Tag Checker
4. **inventory-manager** - Inventory Reorder Alert & SKU Lookup
5. **subscription-tracker** - Membership Expiry Calculator
6. **grade-calculator** - Letter Grade Converter & Grade Calculator

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
