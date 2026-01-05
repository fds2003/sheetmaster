import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service',
    description: 'Terms of Service for SheetMaster - Free Excel and Google Sheets formula generators.',
    alternates: {
        canonical: 'https://getsheetmaster.com/terms',
    },
    openGraph: {
        title: 'Terms of Service | SheetMaster',
        description: 'Terms of Service for SheetMaster - Free Excel and Google Sheets formula generators.',
        url: 'https://getsheetmaster.com/terms',
        type: 'website',
        siteName: 'SheetMaster',
    },
};

export default function TermsPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-8">
                Terms of Service
            </h1>

            <div className="prose prose-gray max-w-none">
                <p className="text-lg text-gray-600 mb-6">
                    Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Agreement to Terms</h2>
                    <p className="text-gray-600 leading-relaxed">
                        By accessing and using SheetMaster, you agree to be bound by these Terms of Service and all
                        applicable laws and regulations. If you do not agree with any of these terms, you are prohibited
                        from using this site.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Use License</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        Permission is granted to temporarily use SheetMaster for personal, non-commercial purposes.
                        This license shall automatically terminate if you violate any of these restrictions.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        You may not:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>Modify or copy the materials</li>
                        <li>Use the materials for any commercial purpose</li>
                        <li>Attempt to reverse engineer any software</li>
                        <li>Remove any copyright or proprietary notations</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Disclaimer</h2>
                    <p className="text-gray-600 leading-relaxed">
                        The materials on SheetMaster are provided on an &apos;as is&apos; basis. We make no warranties, expressed
                        or implied, and hereby disclaim all other warranties including, without limitation, implied
                        warranties of merchantability, fitness for a particular purpose, or non-infringement.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitations</h2>
                    <p className="text-gray-600 leading-relaxed">
                        In no event shall SheetMaster or its suppliers be liable for any damages (including, without
                        limitation, damages for loss of data or profit, or due to business interruption) arising out
                        of the use or inability to use the materials on SheetMaster.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Accuracy of Materials</h2>
                    <p className="text-gray-600 leading-relaxed">
                        The materials appearing on SheetMaster could include technical, typographical, or photographic
                        errors. We do not warrant that any of the materials are accurate, complete, or current.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Modifications</h2>
                    <p className="text-gray-600 leading-relaxed">
                        We may revise these Terms of Service at any time without notice. By using this website, you
                        are agreeing to be bound by the current version of these Terms of Service.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                    <p className="text-gray-600 leading-relaxed">
                        If you have any questions about these Terms of Service, please contact us through our website.
                    </p>
                </section>
            </div>
        </div>
    );
}
