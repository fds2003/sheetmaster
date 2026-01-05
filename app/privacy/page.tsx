import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'Privacy Policy for SheetMaster - Learn how we collect, use, and protect your personal information.',
    alternates: {
        canonical: 'https://getsheetmaster.com/privacy',
    },
    openGraph: {
        title: 'Privacy Policy | SheetMaster',
        description: 'Privacy Policy for SheetMaster - Learn how we collect, use, and protect your personal information.',
        url: 'https://getsheetmaster.com/privacy',
        type: 'website',
        siteName: 'SheetMaster',
    },
};

export default function PrivacyPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-8">
                Privacy Policy
            </h1>

            <div className="prose prose-gray max-w-none">
                <p className="text-lg text-gray-600 mb-6">
                    Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Your privacy is important to us. This Privacy Policy explains how SheetMaster (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;)
                        collects, uses, and protects your personal information when you use our website and services.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        We may collect the following types of information:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>Usage data and analytics to improve our services</li>
                        <li>Browser type and device information</li>
                        <li>IP address and location data</li>
                        <li>Cookies and similar tracking technologies</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        We use the collected information to:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>Provide and maintain our services</li>
                        <li>Improve user experience and functionality</li>
                        <li>Analyze usage patterns and trends</li>
                        <li>Communicate with you about updates and changes</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
                    <p className="text-gray-600 leading-relaxed">
                        We implement appropriate security measures to protect your personal information. However,
                        no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Services</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Our website may contain links to third-party websites or services. We are not responsible for
                        the privacy practices of these external sites.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
                    <p className="text-gray-600 leading-relaxed">
                        If you have any questions about this Privacy Policy, please contact us through our website.
                    </p>
                </section>
            </div>
        </div>
    );
}
