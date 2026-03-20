## ADDED Requirements

### Requirement: Post data source

The system SHALL provide a single source of truth for blog posts (e.g. `lib/posts.ts`) with at least slug, title, description, date, and optional content.

#### Scenario: Post type definition
- **GIVEN** the blog feature is implemented
- **WHEN** post data is read
- **THEN** each post SHALL have at least: slug, title, description, date
- **AND** each post MAY have content or body for the full article

#### Scenario: Initial posts
- **GIVEN** the blog is launched
- **WHEN** the post list is requested
- **THEN** there SHALL be at least five initial posts (e.g. VLOOKUP vs XLOOKUP, Excel formulas that clean data, INDEX MATCH guide, E-commerce formulas, SUMIF vs SUMIFS)

---

### Requirement: Blog list page

The system SHALL provide a blog list page at `/blog` that displays all posts with title, description, and date.

#### Scenario: List page displays posts
- **GIVEN** a user visits `/blog`
- **WHEN** the page renders
- **THEN** it SHALL display a list of posts with title, description (or excerpt), and date

#### Scenario: List page metadata
- **GIVEN** the blog list page is rendered
- **WHEN** metadata is generated
- **THEN** it SHALL have a title and description suitable for SEO
- **AND** it SHALL have canonical URL and Open Graph tags

#### Scenario: Links to post pages
- **GIVEN** the blog list page is displayed
- **WHEN** the user clicks a post
- **THEN** they SHALL navigate to `/blog/[slug]` for that post

---

### Requirement: Blog post page

The system SHALL provide a blog post page at `/blog/[slug]` that renders the full post content with static generation.

#### Scenario: Post page renders content
- **GIVEN** a valid post slug
- **WHEN** a user visits `/blog/[slug]`
- **THEN** the page SHALL display the post title and full content (or body)

#### Scenario: Post page metadata
- **GIVEN** a blog post page is rendered
- **WHEN** metadata is generated
- **THEN** the title and description SHALL be derived from the post (e.g. post.title, post.description)
- **AND** canonical URL and Open Graph SHALL point to that post URL

#### Scenario: Static generation
- **GIVEN** posts are defined in the data source
- **WHEN** the build runs
- **THEN** generateStaticParams SHALL return all post slugs
- **AND** each `/blog/[slug]` page SHALL be statically generated

#### Scenario: Invalid slug
- **GIVEN** a user visits `/blog/[slug]` with an unknown slug
- **WHEN** the page attempts to load
- **THEN** notFound() SHALL be called
