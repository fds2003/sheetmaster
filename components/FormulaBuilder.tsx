'use client';

import React, { useState } from 'react';
import { FORMULAS } from '../lib/formulas';
import { Copy, Check, Share2, Link2 } from 'lucide-react';

interface FormulaBuilderProps {
    formulaSlug: string;
}

export default function FormulaBuilder({ formulaSlug }: FormulaBuilderProps) {
    const formula = FORMULAS.find((f) => f.slug === formulaSlug);
    const [values, setValues] = useState<Record<string, string>>({});
    const [copied, setCopied] = useState(false);

    if (!formula) {
        return <div>Formula not found</div>;
    }

    const handleInputChange = (id: string, value: string) => {
        setValues((prev) => ({ ...prev, [id]: value }));
    };

    const generatedFormula = formula.generate(values);

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedFormula);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const pageUrl = `https://www.getsheetmaster.com/formulas/${formulaSlug}`;
    const shareText = `Just generated this ${formula.excelFunction} formula with SheetMaster. Try it free: getsheetmaster.com`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pageUrl)}`;
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`;

    const handleCopyLink = () => {
        const url = typeof window !== 'undefined' ? window.location.href : pageUrl;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">{formula.title}</h2>
                    <p className="text-sm text-gray-500 mt-1">{formula.description}</p>
                </div>
            </div>

            <div className="p-6 space-y-8">
                {/* Input Form */}
                <div className="space-y-5">
                    {formula.inputs.map((input) => (
                        <div key={input.id} className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <label htmlFor={input.id} className="block text-sm font-medium text-gray-700">
                                    {input.label}
                                </label>
                                {input.tooltip && (
                                    <span className="text-xs text-gray-400 cursor-help" title={input.tooltip}>
                                        What is this?
                                    </span>
                                )}
                            </div>

                            {input.type === 'select' ? (
                                <select
                                    id={input.id}
                                    value={values[input.id] || ''}
                                    onChange={(e) => handleInputChange(input.id, e.target.value)}
                                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm py-2.5 px-3 border"
                                >
                                    <option value="" disabled>Select an option</option>
                                    {input.options?.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type={input.type === 'number' ? 'number' : 'text'}
                                    id={input.id}
                                    placeholder={input.placeholder}
                                    value={values[input.id] || ''}
                                    onChange={(e) => handleInputChange(input.id, e.target.value)}
                                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm py-2.5 px-3 border"
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Result Preview */}
                <div className="bg-gray-900 rounded-lg p-4 relative group">
                    <div className="absolute top-3 right-3 flex items-center gap-1">
                        <button
                            onClick={handleCopy}
                            className="p-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-md transition-colors"
                            title="Copy formula"
                        >
                            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                        <a
                            href={twitterUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-md transition-colors"
                            title="Share to Twitter"
                        >
                            <Share2 className="w-4 h-4" />
                        </a>
                        <a
                            href={linkedInUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-md transition-colors"
                            title="Share to LinkedIn"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        </a>
                        <button
                            onClick={handleCopyLink}
                            className="p-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-md transition-colors"
                            title="Copy link"
                        >
                            <Link2 className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">
                        Generated Formula
                    </div>
                    <code className="block font-mono text-lg text-green-400 break-all pr-32">
                        {generatedFormula}
                    </code>
                </div>

                {/* Learning Resources - Affiliate Section */}
                <div className="bg-gradient-to-r from-blue-50 to-yellow-50 rounded-lg p-6 border border-blue-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Learning Resources</h3>
                    <p className="text-gray-700 mb-4">
                        Want to master Excel? Check out this Top-Rated Course.
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors">
                        View Course
                    </button>
                </div>
            </div>
        </div>
    );
}
