import { FORMULAS } from '../../../lib/formulas';
import FormulaBuilder from '../../../components/FormulaBuilder';
import AffiliateBanner from '../../../components/AffiliateBanner';
import JsonLd from '../../../components/JsonLd';
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

    const title = `Free ${formula.title} Generator for Excel & Google Sheets | SheetMaster`;
    const description = `Quickly generate complex ${formula.title} formulas. Save time on data cleaning and analysis with SheetMaster's AI-ready tools.`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'website',
        },
    };
}

export default function FormulaPage({ params }: { params: { slug: string } }) {
    const formula = FORMULAS.find((f) => f.slug === params.slug);

    if (!formula) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8">
            <JsonLd name={formula.title} />
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
