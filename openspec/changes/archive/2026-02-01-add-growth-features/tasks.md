# Tasks: Add growth features

## 1. Phase 1 — SEO and homepage (no new routes)
- [x] 1.1 Update global description in `app/layout.tsx`: remove "AI-powered", use "No AI, no signup" (or equivalent); align openGraph and twitter description.
- [x] 1.2 In `app/page.tsx`: set H1 to "Free Excel & Google Sheets Formula Generator - 50+ Tools"; subtitle add "No signup, instant results."
- [x] 1.3 In `app/page.tsx`: add "Why SheetMaster?" section (3 value props: Free/No signup, Not AI/full control, Learn every formula) between Hero and Solutions.
- [x] 1.4 In `app/page.tsx`: add "Most Popular Formulas" section linking to vlookup, if, sumif, index-match, xlookup before FormulaGrid.
- [x] 1.5 In `app/page.tsx`: rename or subtitle Solutions block to "Industry Solutions" with short subtitle.
- [x] 1.6 In `lib/formulas.ts`: for slugs vlookup, if, sumif, index-match, xlookup — set title and metaDescription per 落实需求清单 (F1–F5).
- [x] 1.7 In `lib/formulas.ts`: for the same five formulas, add `faq: FormulaFAQ[]` with at least 5 Q&A each (e.g. What does VLOOKUP do? Why #N/A? Can VLOOKUP look left?).

## 2. Phase 2 — Blog
- [x] 2.1 Create `lib/posts.ts`: define Post type (slug, title, description, date, content?); add 5 initial posts (titles per 落实需求清单 P2).
- [x] 2.2 Create `app/blog/page.tsx`: list posts (title, description, date); generateMetadata; canonical and OG.
- [x] 2.3 Create `app/blog/[slug]/page.tsx`: generateStaticParams from posts; generateMetadata(slug); render post content; optional Article JSON-LD.
- [x] 2.4 Update `app/sitemap.ts`: add `/blog` and all `/blog/[slug]` URLs with priority 0.7.

## 3. Phase 3 — Navigation, resources, share, related formulas
- [x] 3.1 In `app/layout.tsx`: add nav links for Blog (`/blog`) and Resources (`/resources`).
- [x] 3.2 Create `app/resources/page.tsx`: title "Resources" or "Free Resources"; list lead magnet(s) (e.g. Excel formula cheat sheet PDF); CTA for download/subscribe; metadata, canonical, OG.
- [x] 3.3 Update `app/sitemap.ts`: add `/resources`.
- [x] 3.4 In FormulaBuilder and/or InteractiveFormulaBuilder: add Share to Twitter, Share to LinkedIn, Copy Link next to Copy button; use fixed copy including getsheetmaster.com.
- [x] 3.5 In `app/formulas/[slug]/page.tsx`: add "Related Formulas" block at bottom (3–5 links by category or predefined map, e.g. vlookup → index-match, xlookup, iferror).

## 4. Phase 4 — Tools and compare pages
- [x] 4.1 Create `/tools/remove-duplicates`: page + optional `lib/tools/remove-duplicates.ts`; sub-tools (Unique, Keep First, Keep Latest, Count Duplicates, Highlight Duplicates); title/metaDescription for "remove duplicates excel formula" / "how to remove duplicates in excel".
- [x] 4.2 Create `/tools/split-text`: page + optional `lib/tools/split-text.ts`; sub-tools (TEXTSPLIT, Extract First/Last Name, Split by comma); title/metaDescription for "split text in excel" / "text to columns excel formula".
- [x] 4.3 Create `/compare/vlookup-vs-xlookup`: comparison table, use cases, links to /formulas/vlookup and /formulas/xlookup; metadata for "vlookup vs xlookup".
- [x] 4.4 Update `app/sitemap.ts`: add `/tools/remove-duplicates`, `/tools/split-text`, `/compare/vlookup-vs-xlookup`.

## 5. Validation
- [x] 5.1 Run `npm run build` and confirm no errors; verify new routes are generated.
- [x] 5.2 Confirm sitemap includes blog, resources, tools, and compare URLs.
- [x] 5.3 Confirm core formula pages (e.g. /formulas/vlookup) have updated title, meta description, and FAQPage JSON-LD in page source.
