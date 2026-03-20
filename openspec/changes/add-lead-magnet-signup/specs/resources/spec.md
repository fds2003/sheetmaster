## MODIFIED Requirements

### Requirement: Resources page

The system SHALL provide a Resources page at `/resources` that lists lead magnet(s), provides a call-to-action for download or subscription, and includes a subscription form for the lead magnet (e.g. email signup to receive the PDF).

#### Scenario: Resources page route
- **GIVEN** the site is deployed
- **WHEN** a user requests `/resources`
- **THEN** a page SHALL be returned with status 200

#### Scenario: Lead magnet listing
- **GIVEN** a user visits the Resources page
- **WHEN** the page renders
- **THEN** it SHALL list at least one resource (e.g. "Excel formula cheat sheet PDF" or equivalent)
- **AND** each resource SHALL have a clear call-to-action (e.g. download or subscribe)

#### Scenario: Subscription form for lead magnet
- **GIVEN** a user visits the Resources page
- **WHEN** the page renders
- **THEN** it SHALL display a subscription block with: a headline (e.g. "Download the Ultimate Excel Cheat Sheet (Top 50 Formulas)"), a sub-headline (e.g. "Join 5,000+ pros saving 2 hours a week."), an email input, and a submit button (e.g. "Send me the PDF")
- **AND** the form SHALL submit to a configurable endpoint (e.g. Mailchimp signup URL or custom API) as documented in the Lead Magnet对接说明

#### Scenario: Resources page metadata
- **GIVEN** the Resources page is rendered
- **WHEN** metadata is generated
- **THEN** it SHALL have a title (e.g. "Resources" or "Free Resources") and description suitable for SEO
- **AND** it SHALL have canonical URL and Open Graph tags
