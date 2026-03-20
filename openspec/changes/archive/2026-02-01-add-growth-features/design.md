# Design: Add growth features

## Context
- Next.js App Router; SSG for formulas/solutions; sitemap and robots already include formulas and solutions.
- New routes (blog, resources, tools, compare) must be statically generatable and included in sitemap.
- Positioning: "No AI, no signup" — global copy must avoid "AI-powered".

## Goals / Non-Goals
- **Goals**: Blog list/post pages with `lib/posts.ts`; Resources page for lead magnet; dedicated tool pages (remove-duplicates, split-text) and one comparison page (vlookup-vs-xlookup); homepage modules and nav links; formula page share + related formulas; core formula meta/FAQ data and FAQPage schema.
- **Non-Goals**: Mailchimp/email backend implementation (Resources page may link or embed; no backend in this change); formula explainer or use-cases in this change.

## Decisions
- **Blog**: Single data source `lib/posts.ts` with type `Post { slug, title, description, date, content? }`. List at `/blog`, post at `/blog/[slug]`. Sitemap includes `/blog` and all `/blog/[slug]` with priority 0.7.
- **Resources**: Single static page `/resources` with metadata and CTA; no new backend; optional embed/link for email capture later.
- **Tools**: Two dedicated pages under `/tools/` (remove-duplicates, split-text); each page owns its sub-tools and formula generation (config in `lib/tools/` or inline in page).
- **Compare**: One static comparison page `/compare/vlookup-vs-xlookup`; link to existing formula pages rather than embedding builders in first iteration if simpler.
- **Nav**: Add links to Blog and Resources in existing layout nav; no dropdown for this change.
- **Formula FAQ**: Core formulas (vlookup, if, sumif, index-match, xlookup) get `faq: FormulaFAQ[]` in `lib/formulas.ts`; existing JsonLd component already emits FAQPage when `formula.faq` is present.

## Risks / Trade-offs
- **Content volume**: Blog and tool pages add maintenance; keep initial set small (5 posts, 2 tool pages, 1 compare page).
- **Thin content**: Avoid many low-quality pages; each new page must have unique, useful content and metadata.

## Migration Plan
- No breaking changes. New routes and layout/nav changes deploy together; sitemap regenerates at build.

## Open Questions
- None for proposal; email capture UX for Resources can be deferred.
