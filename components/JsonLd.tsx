import React from 'react';
import { FormulaConfig } from '../lib/formulas';

/** Map formula category to Schema.org applicationSubCategory */
const CATEGORY_MAP: Record<string, string> = {
    'Lookup': 'SpreadsheetLookup',
    'Math': 'SpreadsheetCalculation',
    'Text': 'SpreadsheetTextProcessing',
    'Date': 'SpreadsheetDateCalculation',
    'Logic': 'SpreadsheetLogic',
    'Statistical': 'SpreadsheetStatistical',
};

interface JsonLdProps {
    formula: FormulaConfig;
    /** Canonical URL for this formula page (improves HowTo / SoftwareApplication linkage). */
    pageUrl?: string;
    /** ISO date string e.g. "2026-01-15" for freshness signal */
    dateModified?: string;
}

/** Strip HTML tags for schema.org text fields (FAQ answers may contain markup). */
function plainTextForSchema(htmlOrText: string): string {
    if (!htmlOrText) return '';
    return htmlOrText
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

const JsonLd: React.FC<JsonLdProps> = ({ formula, pageUrl, dateModified }) => {
    const schemas = [];

    // 1. SoftwareApplication Schema
    const softwareAppSchema: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": formula.title,
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": CATEGORY_MAP[formula.category] || 'Utilities',
        "operatingSystem": "Web",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "description": formula.description,
        "featureList": formula.inputs.map(input => input.label).join(", "),
        "author": {
            "@type": "Organization",
            "name": "SheetMaster",
            "url": "https://www.getsheetmaster.com",
        },
        "inLanguage": "en-US",
    };
    if (pageUrl) {
        softwareAppSchema.url = pageUrl;
    }
    if (dateModified) {
        softwareAppSchema.dateModified = dateModified;
    }
    schemas.push(softwareAppSchema);

    // 2. HowTo Schema
    if (formula.howToSteps && formula.howToSteps.length > 0) {
        const howToSchema: Record<string, unknown> = {
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": `How to use the ${formula.excelFunction} function in Excel or Google Sheets`,
            "description": plainTextForSchema(formula.metaDescription || formula.description),
            "inLanguage": "en-US",
            "author": {
                "@type": "Organization",
                "name": "SheetMaster",
                "url": "https://www.getsheetmaster.com",
            },
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
        if (dateModified) {
            howToSchema.dateModified = dateModified;
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
