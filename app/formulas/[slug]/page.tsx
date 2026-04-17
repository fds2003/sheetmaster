import Link from 'next/link';
import dynamic from 'next/dynamic';
import { FORMULAS } from '../../../lib/formulas';
import AffiliateBanner from '../../../components/AffiliateBanner';

const FormulaBuilder = dynamic(() => import('../../../components/FormulaBuilder'), {
    loading: () => <div className="h-64 w-full animate-pulse bg-gray-100 rounded-xl border border-gray-200" />
});
const InteractiveFormulaBuilder = dynamic(() => import('../../../components/InteractiveFormulaBuilder'), {
    loading: () => <div className="h-96 w-full animate-pulse bg-gray-100 rounded-xl border border-gray-200" />
});
const InteractiveSumifsBuilder = dynamic(() => import('../../../components/InteractiveSumifsBuilder'), {
    loading: () => <div className="h-[500px] w-full animate-pulse bg-gray-100 rounded-xl border border-gray-200" />
});
import JsonLd from '../../../components/JsonLd';
import Breadcrumbs, { BreadcrumbJsonLd } from '../../../components/Breadcrumbs';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// Utility to inject internal links into formula rich content
// It finds occurrences of formula names (e.g. VLOOKUP, SUMIFS) exactly matched,
// skipping those already inside HTML tags (like <a> or <code>).
function injectInternalLinks(content: string, currentSlug: string): string {
    if (!content) return content;
    
    // Create an array of available formulas sorted by length descending so longer names match first (e.g. INDEX MATCH before INDEX)
    const availableFormulas = FORMULAS
        .filter(f => f.slug !== currentSlug) // Don't link to the current page itself
        .sort((a, b) => b.excelFunction.length - a.excelFunction.length);

    let processedContent = content;

    for (const formula of availableFormulas) {
        // We want to find the exact formula name (case insensitive for matching, but keeping original case in replace)
        // Negative lookbehinds/lookaheads to prevent replacing text inside HTML tags like <a href="..."> or <code...>
        const escapedName = formula.excelFunction.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        
        // This regex ensures:
        // 1. Matches as a whole word (\b)
        // 2. Ignores matches that are inside HTML tags (e.g., href="...", class="...") by checking that the next occurring angle bracket isn't a closing one '>'
        // Note: JS regex in browsers/node doesn't perfectly parse HTML, but this simple heuristic works well for basic rich content.
        const regex = new RegExp("\\\\b(" + escapedName + ")\\\\b(?![^<]*>|[^<>]*<\\\\/(a|code)>)", 'gi');
        
        processedContent = processedContent.replace(regex, (match) => {
            // Check if it's already an anchor tag by looking around in the original content (simple fallback check)
            // But the regex lookahead usually handles this safely.
            return '<a href="/formulas/' + formula.slug + '" class="text-blue-600 hover:text-blue-800 font-medium underline transition-colors" title="Learn more about ' + formula.excelFunction + '">' + match + '</a>';
        });
    }

    return processedContent;
}

const RELATED_BY_SLUG: Record<string, string[]> = {
    vlookup: ['index-match', 'xlookup', 'iferror', 'sumif', 'countif'],
    'index-match': ['vlookup', 'xlookup', 'iferror', 'sumif'],
    xlookup: ['vlookup', 'index-match', 'iferror', 'sumif'],
    if: ['ifs', 'iferror', 'and', 'or', 'sumif'],
    sumif: ['sumifs', 'countif', 'countifs', 'averageif', 'vlookup'],
};
const RELATED_COUNT = 5;

export async function generateStaticParams() {
    return FORMULAS.map((formula) => ({
        slug: formula.slug,
    }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const formula = FORMULAS.find((f) => f.slug === params.slug);

    if (!formula) {
        return {
            title: 'Formula Not Found | SheetMaster',
            description: 'The requested formula generator could not be found.',
        };
    }

    const title = formula.title;
    const description = formula.metaDescription;
    const url = `https://www.getsheetmaster.com/formulas/${params.slug}`;
    const ogDescriptionForImage = description.length > 120 ? description.slice(0, 117) + '...' : description;
    const ogImageUrl = `/api/og?title=${encodeURIComponent(formula.excelFunction + ' Formula Generator')}&description=${encodeURIComponent(ogDescriptionForImage)}`;

    return {
        title,
        description,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description,
            url,
            type: 'website',
            siteName: 'SheetMaster',
            images: [
                {
                    url: ogImageUrl,
                    width: 1200,
                    height: 630,
                    alt: `${formula.excelFunction} Formula Generator - SheetMaster`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ogImageUrl],
        },
    };
}

export default function FormulaPage({ params }: { params: { slug: string } }) {
    const formula = FORMULAS.find((f) => f.slug === params.slug);

    if (!formula) {
        notFound();
    }

    const breadcrumbItems = [
        { name: 'Formulas', href: '/' },
        { name: formula.excelFunction },
    ];

    // Top formulas that get the enhanced interactive experience
    const interactiveSlugs = ['vlookup', 'xlookup', 'index-match', 'if', 'extract-email', 'extract-domain'];
    const isInteractive = interactiveSlugs.includes(formula.slug);

    const relatedSlugs = RELATED_BY_SLUG[formula.slug] ?? FORMULAS.filter((f) => f.slug !== formula.slug && f.category === formula.category).slice(0, RELATED_COUNT).map((f) => f.slug);
    const relatedFormulas = (Array.isArray(relatedSlugs) ? relatedSlugs : []).map((slug) => FORMULAS.find((f) => f.slug === slug)).filter(Boolean) as typeof FORMULAS;
    const relatedToShow = relatedFormulas.length ? relatedFormulas : FORMULAS.filter((f) => f.slug !== formula.slug).slice(0, RELATED_COUNT);

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8">
            <JsonLd formula={formula} />
            <BreadcrumbJsonLd items={breadcrumbItems} />
            <Breadcrumbs items={breadcrumbItems} />

            {formula.slug === 'sumifs' ? (
                <InteractiveSumifsBuilder formulaSlug={formula.slug} />
            ) : isInteractive ? (
                <InteractiveFormulaBuilder formulaSlug={formula.slug} />
            ) : (
                <FormulaBuilder formulaSlug={formula.slug} />
            )}

            {formula.richContent && (
                <div 
                    className="prose prose-slate max-w-none mt-12 pt-12 border-t border-gray-100" 
                    dangerouslySetInnerHTML={{ __html: injectInternalLinks(formula.richContent, formula.slug) }} 
                />
            )}
            {formula.commonErrors && formula.commonErrors.length > 0 && (
                <div className="mt-12 pt-12 border-t border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Common Errors & Fixes</h2>
                    <ul className="space-y-6">
                        {formula.commonErrors.map((err, i) => (
                            <li key={i} className="rounded-lg border border-gray-200 bg-gray-50/50 p-4">
                                {err.title && <h3 className="text-base font-medium text-gray-900 mb-2">{err.title}</h3>}
                                <div className="space-y-2 text-sm">
                                    {err.causes.length > 0 && (
                                        <div>
                                            <span className="font-medium text-gray-700">Causes: </span>
                                            <ul className="list-disc pl-5 mt-1 text-gray-600">
                                                {err.causes.map((c, j) => (
                                                    <li key={j}>{c}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {err.fixes.length > 0 && (
                                        <div>
                                            <span className="font-medium text-gray-700">Fixes: </span>
                                            <ul className="list-disc pl-5 mt-1 text-gray-600">
                                                {err.fixes.map((f, j) => (
                                                    <li key={j}>{f}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            
            {/* Visual FAQ Section for SEO and User Guidance */}
            {formula.faq && formula.faq.length > 0 && (
                <div className="mt-12 pt-12 border-t border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        {formula.faq.map((faqItem, i) => (
                            <div key={i} className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faqItem.question}</h3>
                                <div 
                                    className="text-gray-600 prose prose-sm max-w-none" 
                                    dangerouslySetInnerHTML={{ __html: faqItem.answer }} 
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {relatedToShow.length > 0 && (
                <div className="pt-8 border-t border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Related Formulas</h2>
                    <div className="flex flex-wrap gap-2">
                        {relatedToShow.map((f) => (
                            <Link key={f.slug} href={`/formulas/${f.slug}`} className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-colors">
                                {f.excelFunction}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
            <AffiliateBanner
                title="Want to become an Excel Pro?"
                description="Stop searching for formulas. Master Excel in 30 days with this top-rated course."
                link="https://www.udemy.com/topic/excel/"
            />
        </div>
    );
}
