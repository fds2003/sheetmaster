# resources Specification

## Purpose
TBD - created by archiving change add-growth-features. Update Purpose after archive.
## Requirements
### Requirement: Resources page

The system SHALL provide a Resources page at `/resources` that lists lead magnet(s) and provides a call-to-action for download or subscription.

#### Scenario: Resources page route
- **GIVEN** the site is deployed
- **WHEN** a user requests `/resources`
- **THEN** a page SHALL be returned with status 200

#### Scenario: Lead magnet listing
- **GIVEN** a user visits the Resources page
- **WHEN** the page renders
- **THEN** it SHALL list at least one resource (e.g. "Excel formula cheat sheet PDF" or equivalent)
- **AND** each resource SHALL have a clear call-to-action (e.g. download or subscribe)

#### Scenario: Resources page metadata
- **GIVEN** the Resources page is rendered
- **WHEN** metadata is generated
- **THEN** it SHALL have a title (e.g. "Resources" or "Free Resources") and description suitable for SEO
- **AND** it SHALL have canonical URL and Open Graph tags

