import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { SOLUTIONS } from '../../../lib/solutions';
import SolutionBuilder from '../../../components/SolutionBuilder';
import Breadcrumbs, { BreadcrumbJsonLd } from '../../../components/Breadcrumbs';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return SOLUTIONS.map((solution) => ({
        slug: solution.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const solution = SOLUTIONS.find((s) => s.slug === slug);

    if (!solution) {
        return {
            title: 'Solution Not Found',
        };
    }

    const ogImageUrl = `https://www.getsheetmaster.com/api/og?title=${encodeURIComponent(solution.title)}&description=${encodeURIComponent(solution.description)}`;

    return {
        title: solution.title,
        description: solution.metaDescription,
        keywords: ['Excel', 'Google Sheets', 'formula generator', solution.title.split('|')[0].trim()],
        openGraph: {
            title: solution.title,
            description: solution.metaDescription,
            url: `https://www.getsheetmaster.com/solutions/${slug}`,
            siteName: 'SheetMaster',
            images: [
                {
                    url: ogImageUrl,
                    width: 1200,
                    height: 630,
                    alt: solution.title,
                },
            ],
            locale: 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: solution.title,
            description: solution.metaDescription,
            images: [ogImageUrl],
        },
        alternates: {
            canonical: `https://www.getsheetmaster.com/solutions/${slug}`,
        },
    };
}

export default async function SolutionPage({ params }: PageProps) {
    const { slug } = await params;
    const solution = SOLUTIONS.find((s) => s.slug === slug);

    if (!solution) {
        notFound();
    }

    const breadcrumbs = [
        { name: 'Home', href: '/' },
        { name: 'Tools', href: '/solutions' },
        { name: solution.title.split('|')[0].trim() },
    ];

    return (
        <>
            <BreadcrumbJsonLd items={breadcrumbs} />
            
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'SoftwareApplication',
                        name: solution.title,
                        description: solution.metaDescription,
                        url: `https://www.getsheetmaster.com/solutions/${slug}`,
                        applicationCategory: 'BusinessApplication',
                        operatingSystem: 'Web',
                        offers: {
                            '@type': 'Offer',
                            price: '0',
                            priceCurrency: 'USD',
                        },
                    }),
                }}
            />

            <div className="py-8">
                <Breadcrumbs items={breadcrumbs} />

                <header className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {solution.title.split('|')[0].trim()}
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        {solution.description}
                    </p>
                </header>

                <SolutionBuilder solutionSlug={slug} />

                {/* Rich Content */}
                {solution.richContent && (
                    <div 
                        className="mt-12 max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-8"
                        dangerouslySetInnerHTML={{ __html: solution.richContent }}
                    />
                )}

                {/* Related Formulas */}
                <div className="mt-12 max-w-3xl mx-auto">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Related Formula Tools</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {solution.tools.map((tool) => (
                            <a
                                key={tool.id}
                                href={`/formulas/${tool.formulaSlug}`}
                                className="px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:text-green-600 transition-colors text-center"
                            >
                                {tool.name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
