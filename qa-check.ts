import { FORMULAS } from './lib/formulas';
import { BLOG_POSTS } from './lib/posts';
import { SOLUTIONS } from './lib/solutions';
import { USE_CASES } from './lib/use-cases';
import { GEO_PAGES, TOOL_PAGES, STATIC_PAGES, generateLlmsTxt, generateLlmsFullTxt, allGeoPaths } from './lib/geo';

console.log('Starting QA Check...');

const slugs = new Set();
const ids = new Set();
let errors = 0;

FORMULAS.forEach((formula, index) => {
    // Check Slug Uniqueness
    if (slugs.has(formula.slug)) {
        console.error(`[ERROR] Duplicate slug found: ${formula.slug}`);
        errors++;
    }
    slugs.add(formula.slug);

    // Check ID Uniqueness (if relevant, though slug is the main ID here)
    // The prompt mentions "unique id", but in our interface it's "slug". 
    // The inputs have "id", let's check those too within each formula.
    const inputIds = new Set();
    formula.inputs.forEach(input => {
        if (inputIds.has(input.id)) {
            console.error(`[ERROR] Duplicate input ID '${input.id}' in formula '${formula.slug}'`);
            errors++;
        }
        inputIds.add(input.id);
    });

    // Check generate function returns string
    try {
        const mockParams: Record<string, string> = {};
        formula.inputs.forEach(input => {
            mockParams[input.id] = 'test';
        });
        const result = formula.generate(mockParams);
        if (typeof result !== 'string') {
            console.error(`[ERROR] Generate function for '${formula.slug}' did not return a string.`);
            errors++;
        }
        if (!result.startsWith('=')) {
            console.warn(`[WARN] Generate function for '${formula.slug}' result does not start with '=': ${result}`);
        }
    } catch (e) {
        console.error(`[ERROR] Generate function for '${formula.slug}' threw an error:`, e);
        errors++;
    }
});

// ============================================================
// GEO asset validation: every URL referenced in llms.txt / sitemap
// must resolve to a real slug. Hand-maintained lists drift;
// this test makes dead links impossible.
// ============================================================
const realPaths = new Set<string>();
FORMULAS.forEach((f) => realPaths.add(`formulas/${f.slug}`));
BLOG_POSTS.forEach((p) => realPaths.add(`blog/${p.slug}`));
SOLUTIONS.forEach((s) => realPaths.add(`solutions/${s.slug}`));
USE_CASES.forEach((u) => realPaths.add(`use-cases/${u.slug}`));
TOOL_PAGES.forEach((t) => realPaths.add(t.path));
STATIC_PAGES.forEach((s) => realPaths.add(s.path));

// 1. GEO inventory must exactly match the real slug universe
allGeoPaths().forEach((path) => {
    if (!realPaths.has(path)) {
        console.error(`[ERROR] GEO page references non-existent path: ${path}`);
        errors++;
    }
});
realPaths.forEach((path) => {
    if (!GEO_PAGES.some((g) => g.path === path)) {
        console.warn(`[WARN] Real page missing from GEO inventory: ${path}`);
    }
});

// 2. llms.txt must only reference real URLs
const llmsTxt = generateLlmsTxt();
const lines = llmsTxt.split('\n');
const urlPattern = /https:\/\/www\.getsheetmaster\.com\/([^\s):`]+)/g;
for (const line of lines) {
    // Skip the documentation lines that describe URL *patterns*
    if (line.includes('<page-path>')) continue;
    let match: RegExpExecArray | null;
    urlPattern.lastIndex = 0;
    while ((match = urlPattern.exec(line)) !== null) {
        const path = match[1].replace(/\/$/, '');
        if (path !== '' && !realPaths.has(path) && path !== 'llms-full.txt') {
            console.error(`[ERROR] llms.txt references non-existent URL path: /${path}`);
            errors++;
        }
    }
}

// 3. llms-full.txt must contain attribution and cover the corpus
const llmsFull = generateLlmsFullTxt();
if (!llmsFull.includes('getsheetmaster.com')) {
    console.error('[ERROR] llms-full.txt missing source attribution');
    errors++;
}
const missingFromFull = Array.from(realPaths).filter((p) => !llmsFull.includes(`/${p}`));
if (missingFromFull.length > 0) {
    console.warn(`[WARN] ${missingFromFull.length} pages missing from llms-full.txt: ${missingFromFull.slice(0, 5).join(', ')}`);
}

// 4. Markdown mirrors must be non-empty for every formula and blog page
FORMULAS.forEach((f) => {
    const md = require('./lib/geo').pageToMarkdown(`formulas/${f.slug}`) as string | null;
    if (!md || md.length < 100) {
        console.error(`[ERROR] Empty markdown mirror for formulas/${f.slug}`);
        errors++;
    }
});
BLOG_POSTS.forEach((p) => {
    const md = require('./lib/geo').pageToMarkdown(`blog/${p.slug}`) as string | null;
    if (!md || md.length < 100) {
        console.error(`[ERROR] Empty markdown mirror for blog/${p.slug}`);
        errors++;
    }
});

if (errors === 0) {
    console.log('✅ QA Check Passed: All formulas and GEO assets are valid.');
    process.exit(0);
} else {
    console.error(`❌ QA Check Failed with ${errors} errors.`);
    process.exit(1);
}
