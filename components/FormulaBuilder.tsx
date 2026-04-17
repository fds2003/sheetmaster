'use client';

import React, { useState } from 'react';
import { FORMULAS } from '../lib/formulas';
import { Copy, Check, Share2, Link2, Mail, FileDown, Send } from 'lucide-react';

interface FormulaBuilderProps {
    formulaSlug: string;
}

export default function FormulaBuilder({ formulaSlug }: FormulaBuilderProps) {
    const formula = FORMULAS.find((f) => f.slug === formulaSlug);
    const [values, setValues] = useState<Record<string, string>>({});
    const [copied, setCopied] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false);

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

    const handleCopyLink = () => {
        const url = typeof window !== 'undefined' ? window.location.href : pageUrl;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleExportPdf = () => {
        if (typeof window !== 'undefined') {
            window.print();
        }
    };

    const handleSendEmail = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock sending email to our backend system for lead capture
        if (email) {
            setEmailSent(true);
            setTimeout(() => {
                setShowEmailModal(false);
                setEmailSent(false);
                setEmail('');
            }, 3000);
        }
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
                        <button
                            onClick={handleExportPdf}
                            className="p-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-md transition-colors"
                            title="Export PDF"
                        >
                            <FileDown className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setShowEmailModal(!showEmailModal)}
                            className="p-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-md transition-colors"
                            title="Email me this formula"
                        >
                            <Mail className="w-4 h-4" />
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
                    <code className="block font-mono text-lg text-green-400 break-all pr-44">
                        {generatedFormula}
                    </code>
                </div>

                {/* Email Lead Capture Modal Overlay (inline) */}
                {showEmailModal && (
                    <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-5 mt-4 transition-all animate-in fade-in slide-in-from-top-4">
                        <div className="flex items-center gap-3 mb-3">
                            <Mail className="w-5 h-5 text-blue-600" />
                            <h4 className="text-sm font-semibold text-gray-900">Email me this formula for backup</h4>
                        </div>
                        {emailSent ? (
                            <div className="flex items-center gap-2 text-green-600 text-sm font-medium p-2 bg-green-50 rounded-md border border-green-200">
                                <Check className="w-4 h-4" /> Formula sent to your inbox!
                            </div>
                        ) : (
                            <form onSubmit={handleSendEmail} className="flex gap-2">
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    required
                                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border"
                                />
                                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2">
                                    <Send className="w-4 h-4" /> Send
                                </button>
                            </form>
                        )}
                        <p className="text-xs text-gray-500 mt-2">We will never spam you. Save your formula history instantly.</p>
                    </div>
                )}

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
