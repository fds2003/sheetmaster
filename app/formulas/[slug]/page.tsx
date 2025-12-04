import { FORMULAS } from '../../../lib/formulas';
import FormulaBuilder from '../../../components/FormulaBuilder';
import AffiliateBanner from '../../../components/AffiliateBanner';
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

    return {
        title: `Free ${formula.title} for Excel & Google Sheets | SheetMaster`,
        description: `Instantly generate ${formula.excelFunction} formulas. ${formula.description}`,
    };
}

export default function FormulaPage({ params }: { params: { slug: string } }) {
    const formula = FORMULAS.find((f) => f.slug === params.slug);

    if (!formula) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8">
            <FormulaBuilder formulaSlug={formula.slug} />
            {formula.richContent && (
                <div dangerouslySetInnerHTML={{ __html: formula.richContent }} />
            )}
            <AffiliateBanner
                title="Want to become an Excel Pro?"
                description="Stop searching for formulas. Master Excel in 30 days with this top-rated course."
                link="https://www.udemy.com/topic/excel/"
            />
        </div>
    );
}
