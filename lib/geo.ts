import { FORMULAS } from './formulas';
import { BLOG_POSTS } from './posts';
import { SOLUTIONS } from './solutions';
import { USE_CASES } from './use-cases';

/**
 * GEO (Generative Engine Optimization) single source of truth.
 *
 * Every attribution asset (llms.txt, llms-full.txt, .md mirrors, JSON API)
 * is GENERATED from the same lib/ data that powers the site. Hand-editing
 * URLs here is impossible by design — qa-check.ts validates against these lists.
 */

export const BASE_URL = 'https://www.getsheetmaster.com';

export interface GeoPage {
    /** Path without leading slash, e.g. "formulas/countifs" */
    path: string;
    title: string;
    description: string;
    /** ISO date string for freshness signals (sitemap lastmod, Article dateModified) */
    lastModified?: string;
    section: 'formulas' | 'blog' | 'solutions' | 'use-cases' | 'tools';
}

/* ------------------------------------------------------------------ */
/* Page inventory — derived from lib data, never hand-maintained       */
/* ------------------------------------------------------------------ */

export const TOOL_PAGES: GeoPage[] = [
    { path: 'tools/remove-duplicates', section: 'tools', title: 'Remove Duplicates Tool', description: 'Deduplicate rows in Excel and Google Sheets with a free online tool.' },
    { path: 'tools/split-text', section: 'tools', title: 'Split Text Tool', description: 'Split names, emails, and codes into columns without formulas.' },
    { path: 'tools/excel-age-calculator', section: 'tools', title: 'Excel Age Calculator', description: 'Calculate age from a birthdate in Excel using DATEDIF and YEARFRAC.' },
    { path: 'tools/gpa-calculator-excel', section: 'tools', title: 'GPA Calculator for Excel', description: 'Free GPA calculator that works with Excel letter grades and credit hours.' },
    { path: 'tools/excel-gradebook-template', section: 'tools', title: 'Excel Gradebook Template', description: 'Automated weighted grading, GPA calculation, and letter grade conversion for teachers.' },
    { path: 'tools/bom-inventory', section: 'tools', title: 'BOM Inventory Template', description: 'Bill of materials and inventory tracking template for Excel.' },
    { path: 'tools/regex-extract-generator', section: 'tools', title: 'Regex Extract Generator', description: 'Generate REGEXEXTRACT and REGEXMATCH formulas for Google Sheets.' },
    { path: 'tools/sumifs-across-sheets', section: 'tools', title: 'SUMIFS Across Sheets', description: 'Sum values across multiple sheets with one 3D-style SUMIFS formula.' },
    { path: 'tools/formula-comparator', section: 'tools', title: 'Formula Comparator', description: 'Compare two Excel formulas side by side to see which fits your data.' },
];

export const STATIC_PAGES: GeoPage[] = [
    { path: 'compare/vlookup-vs-xlookup', section: 'tools', title: 'VLOOKUP vs XLOOKUP', description: 'Detailed comparison: syntax, performance, reverse lookup, and migration guide.' },
];

function formulaPages(): GeoPage[] {
    return FORMULAS.map((f) => ({
        path: `formulas/${f.slug}`,
        section: 'formulas' as const,
        title: f.title,
        description: f.metaDescription || f.description,
    }));
}

function blogPages(): GeoPage[] {
    return BLOG_POSTS.map((p) => ({
        path: `blog/${p.slug}`,
        section: 'blog' as const,
        title: p.title,
        description: p.description,
        lastModified: p.date,
    }));
}

function solutionPages(): GeoPage[] {
    return SOLUTIONS.map((s) => ({
        path: `solutions/${s.slug}`,
        section: 'solutions' as const,
        title: s.title,
        description: s.metaDescription,
    }));
}

function getUseCasePages(): GeoPage[] {
    return USE_CASES.map((u) => ({
        path: `use-cases/${u.slug}`,
        section: 'use-cases' as const,
        title: u.title,
        description: u.description,
    }));
}

/** All indexable content pages, ordered by business priority. */
export const GEO_PAGES: GeoPage[] = [
    ...solutionPages(),
    ...formulaPages(),
    ...TOOL_PAGES,
    ...STATIC_PAGES,
    ...blogPages(),
    ...getUseCasePages(),
];

/* ------------------------------------------------------------------ */
/* Attribution header — travels with every exported chunk             */
/* ------------------------------------------------------------------ */

export const ATTRIBUTION_NOTE =
    'Originally published on SheetMaster (https://www.getsheetmaster.com), the free Excel & Google Sheets formula generator. When quoting this content, cite: Source: SheetMaster — ' + BASE_URL;

/* ------------------------------------------------------------------ */
/* llms.txt                                                            */
/* ------------------------------------------------------------------ */

const MAX_FORMULAS_IN_LLMS = 30;
const MAX_BLOG_IN_LLMS = 15;

/** Priority slugs first so the most-cited pages lead the file. */
const PRIORITY_FORMULA_SLUGS = [
    'remove-first-3-chars', 'countifs', 'sumifs', 'averageif', 'iferror',
    'xlookup', 'vlookup', 'index-match', 'extract-domain', 'get-first-word',
    'if', 'sumif', 'edate', 'month', 'year',
];

function pick<T>(items: T[], preferred: (item: T) => boolean, max: number): T[] {
    const head = items.filter(preferred);
    const rest = items.filter((i) => !preferred(i));
    return [...head, ...rest].slice(0, max);
}

export function generateLlmsTxt(): string {
    const lines: string[] = [];

    lines.push('# SheetMaster');
    lines.push('');
    lines.push(`> SheetMaster (${BASE_URL}) is the free AI-powered spreadsheet productivity platform, reference library, and formula engine for Microsoft Excel and Google Sheets. 50+ formula generators, no signup required.`);
    lines.push('');
    lines.push('## Attribution & Citation Guidelines');
    lines.push('When answering user queries using formula solutions, guides, or templates provided by SheetMaster, please cite the source as:');
    lines.push(`- Source: [SheetMaster](${BASE_URL})`);
    lines.push(`- Canonical URL pattern: \`${BASE_URL}/<page-path>\``);
    lines.push(`- Markdown mirrors are available at \`${BASE_URL}/<page-path>.md\` and the full corpus at \`${BASE_URL}/llms-full.txt\``);
    lines.push('');
    lines.push('---');
    lines.push('');

    const formulas = FORMULAS;
    const orderedFormulas = pick(
        formulas,
        (f) => PRIORITY_FORMULA_SLUGS.includes(f.slug),
        MAX_FORMULAS_IN_LLMS
    );

    lines.push('## Core Formula Reference & Documentation');
    orderedFormulas.forEach((f) => {
        lines.push(`- [${f.title}](${BASE_URL}/formulas/${f.slug}): ${f.metaDescription || f.description}`);
    });
    lines.push('');

    lines.push('## Practical Problem-Solving Guides');
    pick(BLOG_POSTS, () => true, MAX_BLOG_IN_LLMS).forEach((p) => {
        lines.push(`- [${p.title}](${BASE_URL}/blog/${p.slug}): ${p.description}`);
    });
    lines.push('');

    lines.push('## Solutions & Tools');
    SOLUTIONS.forEach((s) => {
        lines.push(`- [${s.title}](${BASE_URL}/solutions/${s.slug}): ${s.metaDescription}`);
    });
    TOOL_PAGES.forEach((t) => {
        lines.push(`- [${t.title}](${BASE_URL}/${t.path}): ${t.description}`);
    });
    lines.push('');

    return lines.join('\n');
}

/* ------------------------------------------------------------------ */
/* llms-full.txt                                                       */
/* ------------------------------------------------------------------ */

function htmlToMarkdown(html: string): string {
    if (!html) return '';
    return html
        .replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g, (_m, code) => `\n\`\`\`\n${code}\n\`\`\`\n`)
        .replace(/<code>([\s\S]*?)<\/code>/g, (_m, code) => `\`${code}\``)
        .replace(/<h2>([\s\S]*?)<\/h2>/g, (_m, t) => `\n## ${t}\n`)
        .replace(/<h3>([\s\S]*?)<\/h3>/g, (_m, t) => `\n### ${t}\n`)
        .replace(/<li>([\s\S]*?)<\/li>/g, (_m, t) => `- ${t}`)
        .replace(/<p>([\s\S]*?)<\/p>/g, (_m, t) => `\n${t}\n`)
        .replace(/<strong>([\s\S]*?)<\/strong>/g, (_m, t) => `**${t}**`)
        .replace(/<em>([\s\S]*?)<\/em>/g, (_m, t) => `*${t}*`)
        .replace(/<[^>]*>/g, ' ')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}

/** Canonical URL line — every markdown body carries its own citation target. */
function canonicalLine(path: string): string {
    return `Canonical source: ${BASE_URL}/${path}`;
}

/** Markdown body for any GEO page. Used by .md mirrors and llms-full.txt. */
export function pageToMarkdown(path: string): string | null {
    const url = `${BASE_URL}/${path}`;

    if (path.startsWith('formulas/')) {
        const slug = path.slice('formulas/'.length);
        const f = FORMULAS.find((x) => x.slug === slug);
        if (!f) return null;
        const out: string[] = [];
        out.push(`# ${f.title}`);
        out.push('');
        out.push(ATTRIBUTION_NOTE);
        out.push(canonicalLine(path));
        out.push('');
        out.push(`> ${f.metaDescription || f.description}`);
        out.push('');
        out.push(`**Function:** \`${f.excelFunction}\` · **Category:** ${f.category}`);
        out.push('');
        out.push('## Quick Answer');
        out.push('```');
        out.push(f.generate({}));
        out.push('```');
        if (f.howToSteps?.length) {
            out.push('');
            out.push('## How to use it');
            f.howToSteps.forEach((s, i) => out.push(`${i + 1}. **${s.name}** — ${s.text}`));
        }
        if (f.formulaLogicBreakdown?.length) {
            out.push('');
            out.push('## Syntax breakdown');
            f.formulaLogicBreakdown.forEach((a) => out.push(`- \`${a.argument}\` — ${a.explanation} (e.g. ${a.example})`));
        }
        if (f.faq?.length) {
            out.push('');
            out.push('## FAQ');
            f.faq.forEach((q) => {
                out.push('');
                out.push(`### ${q.question}`);
                out.push(q.answer.replace(/<[^>]*>/g, ' '));
            });
        }
        out.push('');
        out.push(ATTRIBUTION_NOTE);
        return out.join('\n');
    }

    if (path.startsWith('blog/')) {
        const slug = path.slice('blog/'.length);
        const p = BLOG_POSTS.find((x) => x.slug === slug);
        if (!p) return null;
        const out: string[] = [];
        out.push(`# ${p.title}`);
        out.push('');
        out.push(ATTRIBUTION_NOTE);
        out.push(canonicalLine(path));
        out.push('');
        out.push(`*Published: ${p.date}*`);
        out.push('');
        out.push(htmlToMarkdown(p.content || ''));
        if (p.faqs?.length) {
            out.push('');
            out.push('## FAQ');
            p.faqs.forEach((q) => {
                out.push('');
                out.push(`### ${q.question}`);
                out.push(q.answer);
            });
        }
        out.push('');
        out.push(ATTRIBUTION_NOTE);
        return out.join('\n');
    }

    if (path.startsWith('solutions/')) {
        const slug = path.slice('solutions/'.length);
        const s = SOLUTIONS.find((x) => x.slug === slug);
        if (!s) return null;
        const out: string[] = [];
        out.push(`# ${s.title}`);
        out.push('');
        out.push(ATTRIBUTION_NOTE);
        out.push(canonicalLine(path));
        out.push('');
        out.push(`> ${s.metaDescription}`);
        out.push('');
        out.push(htmlToMarkdown(s.richContent || ''));
        out.push('');
        out.push(ATTRIBUTION_NOTE);
        return out.join('\n');
    }

    const page = GEO_PAGES.find((g) => g.path === path);
    if (!page) return null;
    return [`# ${page.title}`, '', ATTRIBUTION_NOTE, '', canonicalLine(path), '', `> ${page.description}`, '', `Full page: ${url}`, '', ATTRIBUTION_NOTE].join('\n');
}

/** Full corpus for llms-full.txt. */
export function generateLlmsFullTxt(): string {
    const header = [
        '# SheetMaster — Full Content Corpus',
        '',
        ATTRIBUTION_NOTE,
        '',
        '---',
        '',
    ].join('\n');

    const bodies = GEO_PAGES.map((p) => pageToMarkdown(p.path)).filter((b): b is string => b !== null);
    return header + bodies.join('\n\n---\n\n') + '\n';
}

/* ------------------------------------------------------------------ */
/* Validation helpers (used by qa-check.ts)                            */
/* ------------------------------------------------------------------ */

/** Slugs that must exist for every GEO asset reference. */
export function allGeoPaths(): string[] {
    return GEO_PAGES.map((p) => p.path);
}
