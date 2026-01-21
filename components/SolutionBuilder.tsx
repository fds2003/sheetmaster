'use client';

import React, { useState } from 'react';
import { Copy, Check, Lightbulb } from 'lucide-react';
import { SOLUTIONS, SolutionScenario } from '../lib/solutions';

interface SolutionBuilderProps {
    solutionSlug: string;
}

export default function SolutionBuilder({ solutionSlug }: SolutionBuilderProps) {
    const solution = SOLUTIONS.find(s => s.slug === solutionSlug);
    
    const [activeToolId, setActiveToolId] = useState(solution?.tools[0]?.id || '');
    const [values, setValues] = useState<Record<string, string>>({});
    const [copied, setCopied] = useState(false);
    const [activeScenario, setActiveScenario] = useState<string | null>(null);

    if (!solution) {
        return <div className="text-center text-gray-500">Solution not found</div>;
    }

    const activeTool = solution.tools.find(t => t.id === activeToolId) || solution.tools[0];

    const handleInputChange = (id: string, value: string) => {
        setValues((prev) => ({ ...prev, [id]: value }));
        setActiveScenario(null);
    };

    const handleScenarioSelect = (scenario: SolutionScenario) => {
        setValues(scenario.defaultValues);
        setActiveScenario(scenario.id);
    };

    const generatedFormula = activeTool.generate(values);

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedFormula);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            {/* Tool Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
                {solution.tools.map((tool) => (
                    <button
                        key={tool.id}
                        onClick={() => {
                            setActiveToolId(tool.id);
                            setValues({});
                            setActiveScenario(null);
                        }}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            activeToolId === tool.id
                                ? 'bg-green-600 text-white shadow-md'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        {tool.name}
                    </button>
                ))}
            </div>

            {/* Main Builder Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Tool Header */}
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                    <h2 className="text-xl font-bold text-gray-900">{activeTool.name}</h2>
                    <p className="text-sm text-gray-500 mt-1">{activeTool.description}</p>
                </div>

                <div className="p-6 space-y-6">
                    {/* Scenario Quick Select */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Lightbulb className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm font-medium text-gray-700">Quick Scenarios</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {solution.scenarios.map((scenario) => (
                                <button
                                    key={scenario.id}
                                    onClick={() => handleScenarioSelect(scenario)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                                        activeScenario === scenario.id
                                            ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-transparent'
                                    }`}
                                    title={scenario.description}
                                >
                                    {scenario.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Input Form */}
                    <div className="space-y-4">
                        {activeTool.inputs.map((input) => (
                            <div key={input.id} className="space-y-1.5">
                                <label htmlFor={input.id} className="block text-sm font-medium text-gray-700">
                                    {input.label}
                                </label>
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
                        <div className="absolute top-3 right-3">
                            <button
                                onClick={handleCopy}
                                className="p-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-md transition-colors"
                                title="Copy to clipboard"
                            >
                                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                            </button>
                        </div>
                        <div className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">
                            Generated Formula
                        </div>
                        <code className="block font-mono text-lg text-green-400 break-all pr-12">
                            {generatedFormula}
                        </code>
                    </div>

                    {/* Compatibility Note */}
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="inline-flex items-center px-2 py-0.5 rounded bg-green-100 text-green-800 text-xs font-medium">
                            Excel
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-xs font-medium">
                            Google Sheets
                        </span>
                        <span>Compatible</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
