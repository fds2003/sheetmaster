# Tasks: Add boutique formula page quality

## P0 — Unique Meta, OG=Meta, Hero 10 FAQ

- [x] 1.1 Audit and customize `title` and `metaDescription` for all formulas in `lib/formulas.ts` so each has a unique, function-specific description (no template-only substitution of function name). Start with Hero 10 if needed, then extend to remaining formulas.
- [x] 1.2 In `app/formulas/[slug]/page.tsx` `generateMetadata`, set `openGraph.description` and `twitter.description` to `formula.metaDescription` (or equivalent). Ensure OG image description parameter uses metaDescription or short title-based copy, not generic "Generate X formulas...".
- [x] 1.3 In `lib/formulas.ts`, ensure Hero 10 formulas (vlookup, if, sumif, index-match, xlookup, sumifs, countif, countifs, iferror, concatenate) each have a `faq` array with at least five question/answer pairs that are formula-specific (e.g. VLOOKUP: Why #N/A? Can VLOOKUP look left?; IF: nesting limits). Remove or replace any generic "What is X?" style questions.

## P1 — Common Errors block

- [x] 2.1 Extend FormulaConfig in `lib/formulas.ts` with optional `commonErrors?: Array<{ title?: string; causes: string[]; fixes: string[] }>` (or equivalent structure).
- [x] 2.2 In `app/formulas/[slug]/page.tsx`, render a "Common Errors & Fixes" block when the formula has `commonErrors` configured. Content MUST be formula-specific (e.g. VLOOKUP: format mismatch, column index; INDEX MATCH: range height mismatch).
- [x] 2.3 Add `commonErrors` data for at least Hero 10 formulas (or a subset as first iteration), with causes and fixes per formula.

## Validation

- [x] 3.1 Run `openspec validate add-boutique-formula-quality --strict` and fix any issues.
- [x] 3.2 Run `npm run build` and confirm no errors. Spot-check formula pages: unique title/description in HTML, OG/Twitter description from metaDescription, FAQPage JSON-LD present for Hero 10, Common Errors block visible when configured.
