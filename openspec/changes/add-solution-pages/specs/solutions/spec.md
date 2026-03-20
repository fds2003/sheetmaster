# Solutions Specification (Delta)

## ADDED Requirements

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
  - `title`: Page title (中文 SEO 优化标题)
  - `metaDescription`: SEO description
  - `icon`: Lucide icon name
  - `description`: Short description
  - `relatedFormulas`: Array of formula slugs included in this solution
  - `scenarios`: Array of use case scenarios
  - `richContent`: SEO tutorial content (HTML string)

---

### Requirement: Solution Types

The system SHALL support four initial solution types.

#### Scenario: Data Cleaning solution
- **GIVEN** a user needs to clean marketing data
- **WHEN** they visit `/solutions/data-cleaning`
- **THEN** the page SHALL provide:
  - Email extraction tool (REGEXEXTRACT)
  - Domain extraction tool (REGEXEXTRACT)
  - Text normalization tools (TRIM, PROPER)
- **AND** the title SHALL be "一键提取文本中的所有邮箱地址 | 数据清洗工具"

#### Scenario: HR Time Calculator solution
- **GIVEN** a user needs to calculate work time
- **WHEN** they visit `/solutions/hr-time-calculator`
- **THEN** the page SHALL provide:
  - Net workdays calculator (NETWORKDAYS)
  - Work tenure calculator (DATEDIF)
  - Contract expiry calculator (EDATE)
- **AND** the title SHALL be "计算除去周末和法定假日的实际工作天数 | HR工时计算器"

#### Scenario: Loan Calculator solution
- **GIVEN** a user needs to calculate loan payments
- **WHEN** they visit `/solutions/loan-calculator`
- **THEN** the page SHALL provide:
  - Mortgage calculator (PMT with housing params)
  - Car loan calculator (PMT with auto params)
  - Consumer loan calculator (PMT with personal params)
- **AND** the title SHALL be "房贷月供精准计算器 | 车贷/消费贷计算"

#### Scenario: Multi-Criteria Analysis solution
- **GIVEN** a user needs to analyze data with multiple conditions
- **WHEN** they visit `/solutions/multi-criteria-analysis`
- **THEN** the page SHALL provide:
  - Conditional sum tool (SUMIFS)
  - Conditional count tool (COUNTIFS)
  - Error handling wrapper (IFERROR)
- **AND** the title SHALL be "Excel 多条件求和公式生成器 | 数据分析利器"

---

### Requirement: Solution Builder UI

The system SHALL provide an interactive solution builder interface.

#### Scenario: Multi-tool tabs
- **GIVEN** a user visits a solution page
- **WHEN** the SolutionBuilder component loads
- **THEN** it SHALL display tabs for each related formula tool
- **AND** users can switch between tools without page reload

#### Scenario: Scenario selection
- **GIVEN** a solution has multiple use case scenarios
- **WHEN** the user selects a scenario
- **THEN** the form SHALL pre-fill with scenario-appropriate default values
- **AND** display scenario-specific instructions

#### Scenario: Real-time formula preview
- **GIVEN** a user modifies input fields in the solution builder
- **WHEN** any field value changes
- **THEN** the formula preview SHALL update immediately for the active tool

#### Scenario: Copy generated formula
- **GIVEN** a formula has been generated
- **WHEN** the user clicks the copy button
- **THEN** the formula string SHALL be copied to clipboard
- **AND** a success message SHALL be displayed

---

### Requirement: Solution Page SEO

The system SHALL optimize solution pages for search engines.

#### Scenario: Metadata generation
- **GIVEN** a solution page is requested
- **WHEN** generateMetadata is called
- **THEN** it SHALL return:
  - Chinese SEO-optimized title
  - Descriptive meta description (150-160 chars)
  - Open Graph metadata
  - Twitter Card metadata

#### Scenario: Long-tail keyword targeting
- **GIVEN** a solution page metadata
- **WHEN** inspected
- **THEN** the title SHALL include:
  - Primary action keyword (e.g., "一键提取", "计算", "生成")
  - Target object (e.g., "邮箱地址", "工作天数", "月供")
  - Product/category context (e.g., "Excel", "公式")

#### Scenario: Structured data
- **GIVEN** a solution page
- **WHEN** rendered
- **THEN** it SHALL include SoftwareApplication schema
- **AND** BreadcrumbList schema for navigation

---

### Requirement: Homepage Solution Showcase

The system SHALL display solution highlights on the homepage.

#### Scenario: Solution cards section
- **GIVEN** a user visits the homepage
- **WHEN** the page renders
- **THEN** it SHALL display a "热门专题" (Popular Solutions) section
- **AND** show 4 solution cards above the formula grid

#### Scenario: Solution card content
- **GIVEN** a solution card is displayed
- **WHEN** inspected
- **THEN** it SHALL show:
  - Icon (from Lucide)
  - Chinese title
  - Short description
  - "查看详情" call-to-action

#### Scenario: Responsive layout
- **GIVEN** a user views the homepage
- **WHEN** on mobile devices
- **THEN** solution cards SHALL display in 2x2 grid
- **WHEN** on desktop devices
- **THEN** solution cards SHALL display in 1x4 row

---

### Requirement: Static Page Generation

The system SHALL statically generate all solution pages at build time.

#### Scenario: generateStaticParams implementation
- **GIVEN** the Next.js build process runs
- **WHEN** `/solutions/[slug]` routes are generated
- **THEN** generateStaticParams SHALL return all solution slugs from SOLUTIONS array

#### Scenario: Sitemap inclusion
- **GIVEN** the sitemap is generated
- **WHEN** inspected
- **THEN** it SHALL include all 4 solution URLs:
  - `/solutions/data-cleaning`
  - `/solutions/hr-time-calculator`
  - `/solutions/loan-calculator`
  - `/solutions/multi-criteria-analysis`

#### Scenario: 404 handling
- **GIVEN** a user visits an invalid solution slug
- **WHEN** the page attempts to load
- **THEN** the notFound() function SHALL be called

---

## Implementation Files

| Feature | File |
|---------|------|
| Solution Configurations | `lib/solutions.ts` |
| Solution Builder Component | `components/SolutionBuilder.tsx` |
| Solution Card Component | `components/SolutionCard.tsx` |
| Dynamic Solution Page | `app/solutions/[slug]/page.tsx` |
| Homepage (updated) | `app/page.tsx` |
| Sitemap (updated) | `app/sitemap.ts` |
