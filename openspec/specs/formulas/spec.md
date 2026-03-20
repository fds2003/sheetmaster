# Formulas Specification

## Purpose
SheetMaster 的公式生成器功能规范，定义了公式配置、生成逻辑、用户界面等核心功能的需求和行为。

## Current Status (2026-01-06)
- 公式总数: **50 个**
- 分类: Lookup (4), Logic (5), Math (16), Text (16), Date (9)
- 静态生成页面: **50 个**

---
## Requirements
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

### Requirement: Formula Categories

The system SHALL organize formulas into logical categories.

#### Scenario: Lookup category
- **GIVEN** a formula performs data lookup operations
- **WHEN** categorized
- **THEN** it SHALL be in category "Lookup"
- **AND** examples include: VLOOKUP, XLOOKUP, INDEX/MATCH

#### Scenario: Logic category
- **GIVEN** a formula performs logical operations
- **WHEN** categorized
- **THEN** it SHALL be in category "Logic"
- **AND** examples include: IF, IFS, IFERROR, AND, OR

#### Scenario: Math category
- **GIVEN** a formula performs mathematical operations
- **WHEN** categorized
- **THEN** it SHALL be in category "Math"
- **AND** examples include: SUM, SUMIF, SUMIFS, AVERAGE, ROUND, MAX, MIN

#### Scenario: Text category
- **GIVEN** a formula manipulates text strings
- **WHEN** categorized
- **THEN** it SHALL be in category "Text"
- **AND** examples include: CONCATENATE, LEFT, RIGHT, MID, TRIM, SUBSTITUTE

#### Scenario: Date category
- **GIVEN** a formula works with dates
- **WHEN** categorized
- **THEN** it SHALL be in category "Date"
- **AND** examples include: TODAY, NOW, YEAR, MONTH, DAY, EDATE

---

### Requirement: Formula Input Types

The system SHALL support multiple input types for formula parameters.

#### Scenario: Text input type
- **GIVEN** a formula parameter accepts text
- **WHEN** rendered in the UI
- **THEN** it SHALL display a text input field

#### Scenario: Number input type
- **GIVEN** a formula parameter accepts numbers
- **WHEN** rendered in the UI
- **THEN** it SHALL display a number input field

#### Scenario: Range input type
- **GIVEN** a formula parameter accepts cell ranges
- **WHEN** rendered in the UI
- **THEN** it SHALL display a text input with range placeholder (e.g., "A1:A100")

#### Scenario: Select input type
- **GIVEN** a formula parameter has predefined options
- **WHEN** rendered in the UI
- **THEN** it SHALL display a dropdown select with the defined options

#### Scenario: Boolean input type
- **GIVEN** a formula parameter is true/false
- **WHEN** rendered in the UI
- **THEN** it SHALL display a checkbox or toggle

---

### Requirement: Formula Generation

The system SHALL generate valid Excel/Google Sheets formulas from user inputs.

#### Scenario: Basic formula generation
- **GIVEN** a user fills in formula parameters
- **WHEN** the generate function is called
- **THEN** it SHALL return a string starting with "="

#### Scenario: Default values handling
- **GIVEN** a user leaves some fields empty
- **WHEN** the generate function is called
- **THEN** it SHALL use placeholder values or parameter names

#### Scenario: Special characters escaping
- **GIVEN** a formula contains special characters
- **WHEN** the generate function is called
- **THEN** special characters SHALL be properly escaped

---

### Requirement: Formula Builder UI

The system SHALL provide an interactive formula builder interface.

#### Scenario: Dynamic form rendering
- **GIVEN** a user visits a formula page
- **WHEN** the FormulaBuilder component loads
- **THEN** it SHALL render input fields based on the formula's inputs configuration

#### Scenario: Real-time preview
- **GIVEN** a user modifies input fields
- **WHEN** any field value changes
- **THEN** the formula preview SHALL update immediately

#### Scenario: Copy to clipboard
- **GIVEN** a formula has been generated
- **WHEN** the user clicks the copy button
- **THEN** the formula string SHALL be copied to clipboard
- **AND** a success message SHALL be displayed

#### Scenario: Excel/Sheets toggle
- **GIVEN** the formula builder UI
- **WHEN** rendered
- **THEN** it SHALL include a toggle for Excel/Google Sheets compatibility indication

---

### Requirement: Static Page Generation

The system SHALL statically generate all formula pages at build time.

#### Scenario: generateStaticParams implementation
- **GIVEN** the Next.js build process runs
- **WHEN** `/formulas/[slug]` routes are generated
- **THEN** generateStaticParams SHALL return all formula slugs from FORMULAS array

#### Scenario: Page count verification
- **GIVEN** the build completes successfully
- **WHEN** checking generated pages
- **THEN** there SHALL be exactly 50 formula pages generated

#### Scenario: 404 handling
- **GIVEN** a user visits an invalid formula slug
- **WHEN** the page attempts to load
- **THEN** the notFound() function SHALL be called

---

### Requirement: Homepage Formula Grid

The system SHALL display all formulas on the homepage in a responsive grid.

#### Scenario: Formula card display
- **GIVEN** a user visits the homepage
- **WHEN** the page renders
- **THEN** all 50 formulas SHALL be displayed as clickable cards

#### Scenario: Card information
- **GIVEN** a formula card is displayed
- **WHEN** inspected
- **THEN** it SHALL show:
  - Category badge
  - Formula name (excelFunction)
  - Short description
  - Navigation arrow

#### Scenario: Responsive grid layout
- **GIVEN** a user views the homepage
- **WHEN** on mobile devices
- **THEN** the grid SHALL display 1 column
- **WHEN** on tablet devices
- **THEN** the grid SHALL display 2 columns
- **WHEN** on desktop devices
- **THEN** the grid SHALL display 3 columns

#### Scenario: Formula search integration
- **GIVEN** a user enters a search term in the SearchBar
- **WHEN** the FormulaGrid receives the search query
- **THEN** it SHALL filter formulas by name, description, or category
- **AND** display a count of matching formulas

---

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

## Formula List (50 Total)

### Lookup (4)
1. vlookup - VLOOKUP
2. xlookup - XLOOKUP
3. index-match - INDEX/MATCH

### Logic (5)
4. if - IF
5. ifs - IFS
6. iferror - IFERROR
7. and - AND
8. or - OR

### Math (16)
9. sum - SUM
10. sumif - SUMIF
11. sumifs - SUMIFS
12. countif - COUNTIF
13. countifs - COUNTIFS
14. average - AVERAGE
15. averageif - AVERAGEIF
16. max - MAX
17. min - MIN
18. round - ROUND
19. roundup - ROUNDUP
20. rounddown - ROUNDDOWN
21. abs - ABS
22. pmt - PMT
23. counta - COUNTA
24. countblank - COUNTBLANK

### Text (16)
25. concatenate - CONCATENATE
26. left - LEFT
27. right - RIGHT
28. mid - MID
29. trim - TRIM
30. upper - UPPER
31. lower - LOWER
32. proper - PROPER
33. substitute - SUBSTITUTE
34. len - LEN
35. find - FIND
36. search - SEARCH
37. text - TEXT
38. extract-email - REGEXEXTRACT (Email)
39. extract-domain - REGEXEXTRACT (Domain)
40. get-first-word - LEFT & FIND
41. remove-first-3-chars - RIGHT & LEN

### Date (9)
42. today - TODAY
43. now - NOW
44. year - YEAR
45. month - MONTH
46. day - DAY
47. datedif - DATEDIF
48. edate - EDATE
49. eomonth - EOMONTH
50. networkdays - NETWORKDAYS

---

## Implementation Files

| Feature | File |
|---------|------|
| Formula Configurations | `lib/formulas.ts` |
| Formula Builder Component | `components/FormulaBuilder.tsx` |
| Search Bar Component | `components/SearchBar.tsx` |
| Formula Grid Component | `components/FormulaGrid.tsx` |
| Dynamic Formula Page | `app/formulas/[slug]/page.tsx` |
| Homepage | `app/page.tsx` |

