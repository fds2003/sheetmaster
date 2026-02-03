import React from 'react';
import { FormulaConfig } from '../lib/formulas';

interface JsonLdProps {
    formula: FormulaConfig;
}

const JsonLd: React.FC<JsonLdProps> = ({ formula }) => {
    const schemas = [];

    // 1. SoftwareApplication Schema
    const softwareAppSchema = {
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
    schemas.push(softwareAppSchema);

    // 2. HowTo Schema
    if (formula.howToSteps && formula.howToSteps.length > 0) {
        const howToSchema = {
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": `How to use the ${formula.excelFunction} function`,
            "step": formula.howToSteps.map(step => ({
                "@type": "HowToStep",
                "name": step.name,
                "text": step.text,
                "image": step.image,
                "url": step.url
            }))
        };
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
                    "text": item.answer
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
