'use client';

import React, { useState } from 'react';
import { FORMULAS } from '../lib/formulas';
import { Copy, Check, Info, Share2, Link2 } from 'lucide-react';

interface InteractiveFormulaBuilderProps {
    formulaSlug: string;
}

export default function InteractiveFormulaBuilder({ formulaSlug }: InteractiveFormulaBuilderProps) {
    const formula = FORMULAS.find((f) => f.slug === formulaSlug);
    const [values, setValues] = useState<Record<string, string>>({});
    const [copied, setCopied] = useState(false);
    const [activeInput, setActiveInput] = useState<string | null>(null);

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

    // Simplified grid visualization based on formula type
    const renderGridPreview = () => {
        if (formula.slug === 'vlookup' || formula.slug === 'xlookup' || formula.slug === 'index-match') {
            return (
                <div className="border border-gray-200 rounded text-xs font-mono bg-white overflow-hidden shadow-sm">
                    <div className="grid grid-cols-5 bg-gray-50 border-b border-gray-200">
                        <div className="p-2 border-r text-center text-gray-400">#</div>
                        <div className="p-2 border-r text-center font-bold">A</div>
                        <div className="p-2 border-r text-center font-bold">B</div>
                        <div className="p-2 border-r text-center font-bold">C</div>
                        <div className="p-2 text-center font-bold">D</div>
                    </div>
                    {[1, 2, 3, 4].map((row) => (
                        <div key={row} className="grid grid-cols-5 border-b border-gray-100 last:border-0">
                            <div className="p-2 border-r bg-gray-50 text-center text-gray-400">{row}</div>
                            <div className={`p-2 border-r ${activeInput === 'lookup_value' && row === 2 ? 'bg-blue-100 ring-2 ring-blue-400 inset-0 z-10' : ''}`}>
                                {row === 2 ? 'ID-123' : ''}
                            </div>
                            <div className={`p-2 border-r ${activeInput === 'table_array' ? 'bg-green-50' : ''}`}>Item {row}</div>
                            <div className={`p-2 border-r ${activeInput === 'table_array' ? 'bg-green-50' : ''} ${activeInput === 'col_index' ? 'bg-yellow-100 ring-2 ring-yellow-400' : ''}`}>
                                ${row * 100}
                            </div>
                            <div className="p-2"></div>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white flex justify-between items-center">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-2xl font-bold text-gray-900">{formula.title}</h2>
                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">Wizard Mode</span>
                    </div>
                    <p className="text-sm text-gray-500">{formula.description}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left: Input Form */}
                <div className="p-6 space-y-6 border-r border-gray-100">
                    <h3 className="tex-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Configuration</h3>
                    <div className="space-y-5">
                        {formula.inputs.map((input) => (
                            <div key={input.id} className="space-y-1.5 group">
                                <label htmlFor={input.id} className="flex items-center gap-2 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                                    {input.label}
                                    <Info className="w-3.5 h-3.5 text-gray-400" />
                                </label>

                                {input.type === 'select' ? (
                                    <select
                                        id={input.id}
                                        value={values[input.id] || ''}
                                        onChange={(e) => handleInputChange(input.id, e.target.value)}
                                        onFocus={() => setActiveInput(input.id)}
                                        onBlur={() => setActiveInput(null)}
                                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2.5 px-3 border transition-shadow"
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
                                        onFocus={() => setActiveInput(input.id)}
                                        onBlur={() => setActiveInput(null)}
                                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2.5 px-3 border transition-shadow"
                                    />
                                )}
                                <p className="text-xs text-gray-400">{input.tooltip}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Preview & Result */}
                <div className="p-6 bg-gray-50/50 space-y-8 flex flex-col">
                    <div>
                        <h3 className="tex-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Visual Helper</h3>
                        {renderGridPreview() || (
                            <div className="h-40 flex items-center justify-center border border-dashed border-gray-300 rounded-lg text-gray-400 text-sm">
                                Visual preview not available for this formula
                            </div>
                        )}
                    </div>

                    <div className="mt-auto">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="tex-sm font-semibold text-gray-500 uppercase tracking-wider">Result Function</h3>
                            {copied && <span className="text-xs text-green-600 font-medium flex items-center gap-1"><Check className="w-3 h-3" /> Copied!</span>}
                        </div>
                        <div className="bg-gray-900 rounded-lg p-4 relative group shadow-md transition-all hover:shadow-lg">
                            <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={handleCopy} className="p-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-md transition-colors" title="Copy formula">
                                    <Copy className="w-4 h-4" />
                                </button>
                                <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-md transition-colors" title="Share to Twitter">
                                    <Share2 className="w-4 h-4" />
                                </a>
                                <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-md transition-colors" title="Share to LinkedIn">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                                </a>
                                <button onClick={handleCopyLink} className="p-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-md transition-colors" title="Copy link">
                                    <Link2 className="w-4 h-4" />
                                </button>
                            </div>
                            <code className="block font-mono text-lg text-green-400 break-all pr-32 min-h-[1.75rem]">
                                {generatedFormula}
                            </code>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
