import Link from 'next/link';
import { FORMULAS } from '../../../lib/formulas';
import FormulaBuilder from '../../../components/FormulaBuilder';
import InteractiveFormulaBuilder from '../../../components/InteractiveFormulaBuilder';
import AffiliateBanner from '../../../components/AffiliateBanner';
import JsonLd from '../../../components/JsonLd';
import Breadcrumbs, { BreadcrumbJsonLd } from '../../../components/Breadcrumbs';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

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
    const ogImageUrl = `/api/og?title=${encodeURIComponent(formula.excelFunction + ' Formula Generator')}&description=${encodeURIComponent('Generate ' + formula.excelFunction + ' formulas for Excel & Google Sheets')}`;

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
            title: `${formula.excelFunction} Formula Generator`,
            description: `Generate ${formula.excelFunction} formulas for Excel & Google Sheets instantly.`,
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

            {isInteractive ? (
                <InteractiveFormulaBuilder formulaSlug={formula.slug} />
            ) : (
                <FormulaBuilder formulaSlug={formula.slug} />
            )}

            {formula.richContent && (
                <div className="prose prose-slate max-w-none mt-12 pt-12 border-t border-gray-100" dangerouslySetInnerHTML={{ __html: formula.richContent }} />
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
