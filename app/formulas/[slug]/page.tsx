import { FORMULAS } from '../../../lib/formulas';
import FormulaBuilder from '../../../components/FormulaBuilder';
import AffiliateBanner from '../../../components/AffiliateBanner';
import JsonLd from '../../../components/JsonLd';
import Breadcrumbs, { BreadcrumbJsonLd } from '../../../components/Breadcrumbs';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

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

    const title = `Free ${formula.excelFunction} Formula Generator | Excel & Google Sheets`;
    const description = `Generate ${formula.excelFunction} formulas instantly for Excel and Google Sheets. ${formula.description.slice(0, 100)}`;
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

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8">
            <JsonLd name={formula.title} />
            <BreadcrumbJsonLd items={breadcrumbItems} />
            <Breadcrumbs items={breadcrumbItems} />
            <FormulaBuilder formulaSlug={formula.slug} />
            {formula.richContent && (
                <div className="prose prose-slate max-w-none mt-12 pt-12 border-t border-gray-100" dangerouslySetInnerHTML={{ __html: formula.richContent }} />
            )}
            <AffiliateBanner
                title="Want to become an Excel Pro?"
                description="Stop searching for formulas. Master Excel in 30 days with this top-rated course."
                link="https://www.udemy.com/topic/excel/"
            />
        </div>
    );
}
