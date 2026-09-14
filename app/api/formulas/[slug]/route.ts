import { NextRequest } from 'next/server';
import { FORMULAS } from '@/lib/formulas';
import { BASE_URL } from '@/lib/geo';

/**
 * JSON API: GET /api/formulas/[slug]
 * Agentic AI tools fetch structured APIs before scraping HTML.
 * This makes SheetMaster the *data source*, not a quoted paragraph.
 */

export async function GET(
    _request: NextRequest,
    { params }: { params: { slug: string } }
) {
    const formula = FORMULAS.find((f) => f.slug === params.slug);
    if (!formula) {
        return Response.json({ error: 'Formula not found' }, { status: 404 });
    }

    return Response.json(
        {
            source: {
                name: 'SheetMaster',
                url: `${BASE_URL}/formulas/${formula.slug}`,
                attribution: `Source: SheetMaster — ${BASE_URL}/formulas/${formula.slug}`,
            },
            slug: formula.slug,
            title: formula.title,
            function: formula.excelFunction,
            category: formula.category,
            description: formula.description,
            exampleFormula: formula.generate({}),
            inputs: formula.inputs.map((i) => ({ id: i.id, label: i.label, type: i.type })),
            howToSteps: formula.howToSteps?.map((s, i) => ({ position: i + 1, name: s.name, text: s.text })),
            faq: formula.faq?.map((q) => ({ question: q.question, answer: q.answer.replace(/<[^>]*>/g, ' ') })),
            relatedTools: formula.relatedTools,
        },
        {
            headers: {
                'Cache-Control': 'public, max-age=3600, s-maxage=86400',
                'Access-Control-Allow-Origin': '*',
            },
        }
    );
}
