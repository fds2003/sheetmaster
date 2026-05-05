import React from 'react';
import { FormulaConfig } from '../lib/formulas';

interface JsonLdProps {
    formula: FormulaConfig;
    /** Canonical URL for this formula page (improves HowTo / SoftwareApplication linkage). */
    pageUrl?: string;
}

/** Strip HTML tags for schema.org text fields (FAQ answers may contain markup). */
function plainTextForSchema(htmlOrText: string): string {
    if (!htmlOrText) return '';
    return htmlOrText
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

const JsonLd: React.FC<JsonLdProps> = ({ formula, pageUrl }) => {
    const schemas = [];

    // 1. SoftwareApplication Schema
    const softwareAppSchema: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": formula.title,
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "description": formula.description,
        "featureList": formula.inputs.map(input => input.label).join(", ")
    };
    if (pageUrl) {
        softwareAppSchema.url = pageUrl;
    }
    schemas.push(softwareAppSchema);

    // 2. HowTo Schema
    if (formula.howToSteps && formula.howToSteps.length > 0) {
        const howToSchema: Record<string, unknown> = {
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": `How to use the ${formula.excelFunction} function in Excel or Google Sheets`,
            "description": plainTextForSchema(formula.metaDescription || formula.description),
            "step": formula.howToSteps.map((step, index) => ({
                "@type": "HowToStep",
                "position": index + 1,
                "name": step.name,
                "text": step.text,
                ...(step.image ? { image: step.image } : {}),
                ...(step.url ? { url: step.url } : {})
            }))
        };
        if (pageUrl) {
            howToSchema.url = pageUrl;
        }
        schemas.push(howToSchema);
    }

    // 3. FAQPage Schema
    if (formula.faq && formula.faq.length > 0) {
        const faqSchema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": formula.faq.map(item => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": plainTextForSchema(item.answer)
                }
            }))
        };
        schemas.push(faqSchema);
    }

    return (
        <>
            {schemas.map((schema, index) => (
                <script
                    key={index}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}
        </>
    );
};

export default JsonLd;
