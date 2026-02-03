import Link from 'next/link';
import { USE_CASES } from '@/lib/use-cases';
import { FORMULAS } from '@/lib/formulas';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return USE_CASES.map((uc) => ({ slug: uc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const useCase = USE_CASES.find((uc) => uc.slug === slug);
  if (!useCase) {
    return { title: 'Use Case Not Found | SheetMaster' };
  }
  const title = useCase.title;
  const description = useCase.metaDescription ?? useCase.description;
  const url = `https://www.getsheetmaster.com/use-cases/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | SheetMaster`,
      description,
      url,
      type: 'website',
      siteName: 'SheetMaster',
    },
  };
}

export default async function UseCaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const useCase = USE_CASES.find((uc) => uc.slug === slug);
  if (!useCase) notFound();

  const formulaList = useCase.formulas
    .map((s) => FORMULAS.find((f) => f.slug === s))
    .filter((f): f is (typeof FORMULAS)[number] => Boolean(f));

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{useCase.title}</h1>
      <p className="text-gray-600 mb-8">{useCase.description}</p>

      {useCase.painPoints && useCase.painPoints.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Common needs</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            {useCase.painPoints.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Recommended formulas</h2>
        <div className="flex flex-wrap gap-2">
          {formulaList.map((f) => (
            <Link
              key={f.slug}
              href={`/formulas/${f.slug}`}
              className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:border-green-300 transition-colors"
            >
              {f.excelFunction}
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Recommended tools</h2>
        <ul className="space-y-2">
          {useCase.tools.map((t) => (
            <li key={t.href}>
              <Link
                href={t.href}
                className="text-green-600 hover:text-green-700 font-medium hover:underline"
              >
                {t.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {useCase.ctaText && (
        <p className="text-gray-600">
          <Link
            href={formulaList[0] ? `/formulas/${formulaList[0].slug}` : '/formulas'}
            className="inline-flex items-center rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-700 transition-colors"
          >
            {useCase.ctaText}
          </Link>
        </p>
      )}
    </div>
  );
}
