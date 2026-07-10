import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Excel Formula Comparator — Compare VLOOKUP vs XLOOKUP, SUMIF vs SUMIFS & More',
    description:
        'Compare Excel formulas side-by-side. See syntax, pros/cons, and when to use each formula. Free interactive tool for Excel and Google Sheets users.',
    openGraph: {
        title: 'Excel Formula Comparator — SheetMaster',
        description: 'Compare Excel formulas side-by-side. See syntax, pros/cons, and when to use each formula.',
        url: 'https://www.getsheetmaster.com/tools/formula-comparator',
        type: 'website',
        siteName: 'SheetMaster',
        images: [
            {
                url: '/api/og?title=Excel+Formula+Comparator&description=Compare+formulas+side-by-side',
                width: 1200,
                height: 630,
                alt: 'Excel Formula Comparator - SheetMaster',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Excel Formula Comparator — SheetMaster',
        description: 'Compare Excel formulas side-by-side. Free tool for Excel and Google Sheets.',
        images: ['/api/og?title=Excel+Formula+Comparator&description=Compare+formulas+side-by-side'],
    },
    alternates: {
        canonical: 'https://www.getsheetmaster.com/tools/formula-comparator',
    },
};

interface Comparison {
    formulaA: string;
    formulaB: string;
    whenToUse: string;
    prosA: string[];
    consA: string[];
    prosB: string[];
    consB: string[];
    linkA: string;
    linkB: string;
}

const COMPARISONS: Comparison[] = [
    {
        formulaA: 'VLOOKUP',
        formulaB: 'XLOOKUP',
        whenToUse: 'Use XLOOKUP when available (Excel 365, Google Sheets). Fall back to VLOOKUP for legacy compatibility.',
        prosA: ['Works in all Excel versions', 'Widely known and documented'],
        consA: ['Only looks right', 'Requires column index number', '#N/A errors'],
        prosB: ['Looks in any direction', 'Built-in error handling', 'No column index needed'],
        consB: ['Not available in Excel 2019 or earlier'],
        linkA: '/formulas/vlookup',
        linkB: '/formulas/xlookup',
    },
    {
        formulaA: 'SUMIF',
        formulaB: 'SUMIFS',
        whenToUse: 'Use SUMIF for one condition. Use SUMIFS for two or more conditions (recommended as default).',
        prosA: ['Simpler syntax for single condition'],
        consA: ['Only one condition'],
        prosB: ['Up to 127 criteria pairs', 'Consistent argument order'],
        consB: ['Slightly more complex syntax'],
        linkA: '/formulas/sumif',
        linkB: '/formulas/sumifs',
    },
    {
        formulaA: 'COUNTIF',
        formulaB: 'COUNTIFS',
        whenToUse: 'Use COUNTIF for one condition. Use COUNTIFS for multiple conditions.',
        prosA: ['Simple for single condition'],
        consA: ['Only one condition'],
        prosB: ['Multiple conditions with AND logic'],
        consB: ['Slightly more complex'],
        linkA: '/formulas/countif',
        linkB: '/formulas/countifs',
    },
    {
        formulaA: 'INDEX MATCH',
        formulaB: 'XLOOKUP',
        whenToUse: 'Use XLOOKUP for new work. Use INDEX MATCH for Excel 2019 or earlier.',
        prosA: ['Works in all versions', 'Flexible — look in any direction'],
        consA: ['Complex nested formula', 'Two functions to remember'],
        prosB: ['Simple single-function syntax', 'Built-in error handling'],
        consB: ['Excel 365 / Google Sheets only'],
        linkA: '/formulas/index-match',
        linkB: '/formulas/xlookup',
    },
    {
        formulaA: 'ROUND',
        formulaB: 'ROUNDUP',
        whenToUse: 'Use ROUND for standard rounding. Use ROUNDUP when you need to always round up (e.g., pricing, quantities).',
        prosA: ['Standard mathematical rounding'],
        consA: ['May round down when you expect up'],
        prosB: ['Always rounds away from zero'],
        consB: ['Never rounds down — may overestimate'],
        linkA: '/formulas/round',
        linkB: '/formulas/roundup',
    },
    {
        formulaA: 'SEARCH',
        formulaB: 'FIND',
        whenToUse: 'Use SEARCH for case-insensitive search. Use FIND when case sensitivity matters.',
        prosA: ['Case-insensitive', 'Supports wildcards (*, ?)'],
        consA: ['Cannot do case-sensitive search'],
        prosB: ['Case-sensitive matching'],
        consB: ['No wildcard support', 'Returns #VALUE! if not found'],
        linkA: '/formulas/search',
        linkB: '/formulas/find',
    },
];

export default function FormulaComparator() {
    return (
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-10">
            <header className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Excel Formula Comparator
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Confused about which formula to use? Compare the most popular Excel formulas side by side — syntax, pros/cons, and when to use each.
                </p>
            </header>

            <div className="space-y-8">
                {COMPARISONS.map((comp, idx) => (
                    <div key={idx} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <Link
                                href={comp.linkA}
                                className="text-lg font-bold text-green-700 hover:text-green-800"
                            >
                                {comp.formulaA}
                            </Link>
                            <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">VS</span>
                            <Link
                                href={comp.linkB}
                                className="text-lg font-bold text-green-700 hover:text-green-800"
                            >
                                {comp.formulaB}
                            </Link>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                            <p className="text-sm text-blue-800">
                                <strong>When to use:</strong> {comp.whenToUse}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">{comp.formulaA} — Pros</h3>
                                <ul className="space-y-1">
                                    {comp.prosA.map((p, i) => (
                                        <li key={i} className="text-sm text-green-700">✓ {p}</li>
                                    ))}
                                </ul>
                                <h3 className="font-semibold text-gray-900 mb-2 mt-4">{comp.formulaA} — Cons</h3>
                                <ul className="space-y-1">
                                    {comp.consA.map((c, i) => (
                                        <li key={i} className="text-sm text-red-600">✗ {c}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">{comp.formulaB} — Pros</h3>
                                <ul className="space-y-1">
                                    {comp.prosB.map((p, i) => (
                                        <li key={i} className="text-sm text-green-700">✓ {p}</li>
                                    ))}
                                </ul>
                                <h3 className="font-semibold text-gray-900 mb-2 mt-4">{comp.formulaB} — Cons</h3>
                                <ul className="space-y-1">
                                    {comp.consB.map((c, i) => (
                                        <li key={i} className="text-sm text-red-600">✗ {c}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="mt-4 flex gap-3">
                            <Link
                                href={comp.linkA}
                                className="inline-flex items-center rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 transition-colors"
                            >
                                Generate {comp.formulaA} Formula →
                            </Link>
                            <Link
                                href={comp.linkB}
                                className="inline-flex items-center rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 transition-colors"
                            >
                                Generate {comp.formulaB} Formula →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* CTA */}
            <div className="rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 p-6 text-center">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Need a Specific Formula?</h2>
                <p className="text-gray-600 mb-4">
                    Browse our collection of 50+ free Excel formula generators. No signup required.
                </p>
                <Link
                    href="/formulas"
                    className="inline-flex items-center rounded-lg bg-green-600 px-6 py-3 text-sm font-bold text-white hover:bg-green-700 transition-colors"
                >
                    Browse All Formulas →
                </Link>
            </div>
        </div>
    );
}
