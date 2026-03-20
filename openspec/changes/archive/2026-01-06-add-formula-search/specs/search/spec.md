# Search Specification

## ADDED Requirements

### Requirement: Search Input Component

The system SHALL provide a search input component on the homepage for filtering formulas.

#### Scenario: Search input display
- **GIVEN** a user visits the homepage
- **WHEN** the page renders
- **THEN** a search input SHALL be displayed below the Hero section
- **AND** the input SHALL have a search icon
- **AND** the input SHALL have placeholder text "Search formulas... (e.g., VLOOKUP, SUM)"

#### Scenario: Search input interaction
- **GIVEN** a user focuses on the search input
- **WHEN** they type a search term
- **THEN** the formula grid SHALL filter in real-time

#### Scenario: Clear search
- **GIVEN** a user has entered a search term
- **WHEN** they click the clear button (X icon)
- **THEN** the search input SHALL be cleared
- **AND** all formulas SHALL be displayed again

---

### Requirement: Formula Search Filtering

The system SHALL filter formulas based on user search input.

#### Scenario: Search by formula name
- **GIVEN** a user enters "VLOOKUP" in the search input
- **WHEN** the search is processed
- **THEN** only formulas with "VLOOKUP" in the excelFunction field SHALL be displayed

#### Scenario: Search by description
- **GIVEN** a user enters "lookup" in the search input
- **WHEN** the search is processed
- **THEN** formulas with "lookup" in the description SHALL be displayed

#### Scenario: Search by category
- **GIVEN** a user enters "Text" in the search input
- **WHEN** the search is processed
- **THEN** all formulas in the "Text" category SHALL be displayed

#### Scenario: Case-insensitive search
- **GIVEN** a user enters "sumif" (lowercase)
- **WHEN** the search is processed
- **THEN** SUMIF and SUMIFS formulas SHALL be displayed

#### Scenario: Partial match
- **GIVEN** a user enters "sum"
- **WHEN** the search is processed
- **THEN** SUM, SUMIF, SUMIFS formulas SHALL be displayed

---

### Requirement: No Results Handling

The system SHALL display a friendly message when no formulas match the search.

#### Scenario: No results found
- **GIVEN** a user enters a search term with no matches (e.g., "xyz123")
- **WHEN** the search is processed
- **THEN** a message SHALL be displayed: "No formulas found for 'xyz123'"
- **AND** a suggestion SHALL be shown: "Try searching for VLOOKUP, SUM, or IF"

---

### Requirement: Search Results Count

The system SHALL display the count of matching formulas.

#### Scenario: Display results count
- **GIVEN** a user enters a search term
- **WHEN** formulas are filtered
- **THEN** the count SHALL be displayed (e.g., "Showing 5 of 50 formulas")

#### Scenario: Display all count
- **GIVEN** the search input is empty
- **WHEN** all formulas are displayed
- **THEN** the count SHALL show "Showing all 50 formulas"

