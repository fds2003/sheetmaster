'use client';

import React, { useState } from 'react';
import { Copy, Check, Info, Share2, Link2, PlusCircle, Trash2 } from 'lucide-react';

interface InteractiveSumifsBuilderProps {
    formulaSlug?: string;
}

interface Condition {
    id: string;
    range: string;
    criteria: string;
}

export default function InteractiveSumifsBuilder({ formulaSlug = 'sumifs' }: InteractiveSumifsBuilderProps) {
    const [copied, setCopied] = useState(false);
    const [sumRange, setSumRange] = useState('');
    const [conditions, setConditions] = useState<Condition[]>([
        { id: '1', range: '', criteria: '' }
    ]);

    const addCondition = () => {
        setConditions(prev => [
            ...prev,
            { id: Date.now().toString(), range: '', criteria: '' }
        ]);
    };

    const removeCondition = (id: string) => {
        if (conditions.length <= 1) return; // Keep at least one condition
        setConditions(prev => prev.filter(c => c.id !== id));
    };

    const updateCondition = (id: string, field: 'range' | 'criteria', value: string) => {
        setConditions(prev => prev.map(c =>
            c.id === id ? { ...c, [field]: value } : c
        ));
    };

    const generatedFormula = () => {
        const sr = sumRange || 'sum_range';

        // Build the criteria parts
        const criteriaParts = conditions.map((c, index) => {
            const cr = c.range || `criteria_range${index + 1}`;
            const cv = c.criteria || `criteria${index + 1}`;
            return `${cr}, ${cv}`;
        }).join(', ');

        return `=SUMIFS(${sr}, ${criteriaParts})`;
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedFormula());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const pageUrl = `https://www.getsheetmaster.com/formulas/${formulaSlug}`;
    const shareText = `Just generated a complex SUMIFS formula with SheetMaster. Try it free: getsheetmaster.com`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pageUrl)}`;
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`;

    const handleCopyLink = () => {
        const url = typeof window !== 'undefined' ? window.location.href : pageUrl;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // SUMIFS specific visual helper
    const renderVisualHelper = () => {
        return (
            <div className="border border-gray-200 rounded text-xs font-mono bg-white overflow-hidden shadow-sm relative">
                <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 hidden sm:block"></div>

                {/* Header */}
                <div className="grid grid-cols-5 bg-gray-50 border-b border-gray-200 whitespace-nowrap overflow-x-auto no-scrollbar">
                    <div className="p-2 border-r text-center text-gray-400 min-w-[30px]">#</div>
                    <div className="p-2 border-r text-center font-bold text-gray-700 min-w-[80px]">Date</div>
                    <div className="p-2 border-r text-center font-bold text-gray-700 min-w-[80px]">Region</div>
                    <div className="p-2 border-r text-center font-bold text-gray-700 min-w-[80px]">Sales</div>
                    <div className="p-2 text-center text-gray-400 italic">...</div>
                </div>

                {/* Rows */}
                <div className="grid grid-cols-5 border-b border-gray-100 whitespace-nowrap overflow-x-auto no-scrollbar">
                    <div className="p-2 border-r bg-gray-50 text-center text-gray-400 min-w-[30px]">1</div>
                    <div className="p-2 border-r text-center bg-blue-50/50">2026-03-01</div>
                    <div className="p-2 border-r text-center bg-blue-50/50">North</div>
                    <div className="p-2 border-r text-center bg-green-50/50 font-medium">$500</div>
                    <div className="p-2"></div>
                </div>

                <div className="grid grid-cols-5 border-b border-gray-100 whitespace-nowrap overflow-x-auto no-scrollbar">
                    <div className="p-2 border-r bg-gray-50 text-center text-gray-400 min-w-[30px]">2</div>
                    <div className="p-2 border-r text-center text-gray-400">2026-03-02</div>
                    <div className="p-2 border-r text-center text-gray-400">South</div>
                    <div className="p-2 border-r text-center text-gray-400">$300</div>
                    <div className="p-2"></div>
                </div>

                <div className="grid grid-cols-5 border-b border-gray-100 whitespace-nowrap overflow-x-auto no-scrollbar">
                    <div className="p-2 border-r bg-gray-50 text-center text-gray-400 min-w-[30px]">3</div>
                    <div className="p-2 border-r text-center bg-blue-50/50">2026-03-05</div>
                    <div className="p-2 border-r text-center bg-blue-50/50">North</div>
                    <div className="p-2 border-r text-center bg-green-50/50 font-medium">$850</div>
                    <div className="p-2"></div>
                </div>

                {/* Legend */}
                <div className="p-3 bg-gray-50 text-xs border-t border-gray-200 flex flex-col sm:flex-row gap-2 sm:gap-4 flex-wrap">
                    <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-green-100 border border-green-300 rounded-sm" /> <span>Sum Range (Result)</span></div>
                    <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-blue-100 border border-blue-300 rounded-sm" /> <span>Criteria Ranges (Filters)</span></div>
                </div>
            </div>
        );
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white flex justify-between items-center">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-2xl font-bold text-gray-900">SUMIFS Generator</h2>
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">Multi-Condition Mode</span>
                    </div>
                    <p className="text-sm text-gray-500">Add as many conditions as you need to filter the sum range.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left: Input Form */}
                <div className="p-6 border-r border-gray-100 bg-white">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-5 flex items-center gap-2">
                        <span>1. Define Ranges & Criteria</span>
                        <div className="flex-1 h-px bg-gray-100"></div>
                    </h3>

                    <div className="space-y-6">
                        {/* 1. Sum Range - FIXED */}
                        <div className="p-4 bg-green-50/30 border border-green-100 rounded-lg">
                            <label htmlFor="sum-range" className="flex items-center gap-2 text-sm font-bold text-green-800 mb-2">
                                Sum Range
                                <span className="bg-green-100 text-green-700 text-[10px] uppercase px-1.5 py-0.5 rounded font-bold tracking-wider">Required First</span>
                            </label>
                            <input
                                type="text"
                                id="sum-range"
                                placeholder="e.g., C:C or C2:C100 (Column to Add)"
                                value={sumRange}
                                onChange={(e) => setSumRange(e.target.value)}
                                className="block w-full rounded-lg border-green-200 bg-white shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm py-2.5 px-3 border transition-shadow"
                            />
                            <p className="text-xs text-green-600/80 mt-1.5 font-medium flex items-center gap-1">
                                <Info className="w-3.5 h-3.5" /> Unlike SUMIF, the sum range always comes first in SUMIFS.
                            </p>
                        </div>

                        {/* 2. Dynamic Conditions */}
                        <div className="space-y-4 pt-2">
                            {conditions.map((condition, index) => (
                                <div key={condition.id} className="relative p-4 bg-blue-50/30 border border-blue-100 rounded-lg group transition-all">
                                    {/* Number Badge */}
                                    <div className="absolute -left-2.5 -top-2.5 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold border border-white shadow-sm">
                                        {index + 1}
                                    </div>

                                    {/* Delete Button (show if > 1 condition) */}
                                    {conditions.length > 1 && (
                                        <button
                                            onClick={() => removeCondition(condition.id)}
                                            className="absolute top-3 right-3 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                            title="Remove condition"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}

                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <div>
                                            <label className="block text-xs font-semibold text-blue-800 mb-1">Criteria Range {index + 1}</label>
                                            <input
                                                type="text"
                                                placeholder="e.g., A:A"
                                                value={condition.range}
                                                onChange={(e) => updateCondition(condition.id, 'range', e.target.value)}
                                                className="block w-full rounded-md border-blue-200 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-2.5 border"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-blue-800 mb-1">Criteria {index + 1}</label>
                                            <input
                                                type="text"
                                                placeholder='e.g., "Apple" or ">100"'
                                                value={condition.criteria}
                                                onChange={(e) => updateCondition(condition.id, 'criteria', e.target.value)}
                                                className="block w-full rounded-md border-blue-200 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-2.5 border"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Add Condition Button */}
                            <button
                                onClick={addCondition}
                                className="w-full flex items-center justify-center gap-2 py-3 px-4 border-2 border-dashed border-gray-200 rounded-lg text-sm font-medium text-gray-500 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50/50 transition-all"
                            >
                                <PlusCircle className="w-4 h-4" />
                                Add Another Condition
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right: Preview & Result */}
                <div className="p-6 bg-gray-50/80 space-y-8 flex flex-col">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <span>2. Visual Helper</span>
                            <div className="flex-1 h-px bg-gray-200"></div>
                        </h3>
                        {renderVisualHelper()}
                    </div>

                    <div className="mt-auto pt-6">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">3. Copy Formula</h3>
                            {copied && <span className="text-xs text-green-600 font-bold bg-green-100 px-2 py-1 rounded flex items-center gap-1.5"><Check className="w-3.5 h-3.5" /> Copied to clipboard!</span>}
                        </div>
                        <div className="bg-gray-900 rounded-xl p-5 relative group shadow-md transition-all hover:shadow-lg border border-gray-800">
                            <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={handleCopy} className="p-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 hover:shadow-sm rounded-md transition-all border border-transparent hover:border-gray-600" title="Copy formula">
                                    <Copy className="w-4 h-4" />
                                </button>
                                <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 hover:shadow-sm rounded-md transition-all border border-transparent hover:border-gray-600" title="Share to Twitter">
                                    <Share2 className="w-4 h-4" />
                                </a>
                                <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 hover:shadow-sm rounded-md transition-all border border-transparent hover:border-gray-600" title="Share to LinkedIn">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                </a>
                                <button onClick={handleCopyLink} className="p-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 hover:shadow-sm rounded-md transition-all border border-transparent hover:border-gray-600" title="Copy link">
                                    <Link2 className="w-4 h-4" />
                                </button>
                            </div>
                            <code className="block font-mono text-lg text-green-300 break-all pr-32 min-h-[1.75rem] font-medium leading-relaxed">
                                {generatedFormula()}
                            </code>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
