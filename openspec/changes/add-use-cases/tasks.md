# Tasks: Add use-case (industry) landing pages

## 1. Data and types
- [x] 1.1 Create `lib/use-cases.ts`: define `UseCase` type (slug, title, description, metaDescription?, formulas[], tools[], painPoints?, ctaText?); export `USE_CASES` array with at least 2 entries: `accountants`, `data-analysts` (content per 按顺序可执行方案 2.2).

## 2. Routes and pages
- [x] 2.1 Create `app/use-cases/page.tsx`: list all use-cases as cards linking to `/use-cases/[slug]`; title "Industry Solutions" or "Use Cases"; generateMetadata; canonical and Open Graph.
- [x] 2.2 Create `app/use-cases/[slug]/page.tsx`: generateStaticParams from USE_CASES; generateMetadata(slug); render pain points, recommended formulas (links to /formulas/xxx), recommended tools (links to /tools/xxx or /solutions/xxx); CTA (e.g. "Try [Formula]"); canonical and OG.

## 3. Sitemap and discovery
- [x] 3.1 Update `app/sitemap.ts`: add `/use-cases` and all `/use-cases/[slug]` URLs with priority 0.7.
- [x] 3.2 Optional: In `app/page.tsx`, add a "Use Cases" link or section (e.g. link to /use-cases, or show use-case cards alongside Industry Solutions).
- [x] 3.3 Optional: In `app/layout.tsx` nav, add "Use Cases" link to `/use-cases`.

## 4. Validation
- [x] 4.1 Run `openspec validate add-use-cases --strict` and fix any issues.
- [x] 4.2 Run `npm run build` and confirm no errors; verify `/use-cases`, `/use-cases/accountants`, `/use-cases/data-analysts` are generated.
- [x] 4.3 Confirm sitemap includes /use-cases and /use-cases/[slug] URLs.
