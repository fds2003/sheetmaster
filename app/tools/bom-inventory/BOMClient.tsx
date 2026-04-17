'use client';

import React, { useState } from 'react';
import { Copy, Check, FileDown, Download } from 'lucide-react';

export default function BOMClient() {
    const [copied, setCopied] = useState(false);

    const generatedFormula = `=MMULT(TRANSPOSE(SalesQtyRange), BOMMatrixRange)`;

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedFormula);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mt-8">
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-white flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">BOM Dynamic Deduction Formula</h2>
                    <p className="text-sm text-gray-500 mt-1">Calculate raw materials consumed (e.g., 2 buns, 1 meat) from finished goods sold (e.g., 1 Burger).</p>
                </div>
            </div>

            <div className="p-6 bg-white space-y-6">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">The MMULT approach</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Instead of writing hundreds of <code>VLOOKUP</code> or <code>SUMIFS</code> combinations, the most powerful way to deduct raw materials based on a Bill of Materials (BOM) is matrix multiplication (<code>MMULT</code>).
                    </p>
                    
                    <div className="bg-gray-900 rounded-xl p-5 relative group shadow-inner">
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={handleCopy} className="p-2 text-gray-400 hover:text-white bg-gray-800 rounded-md"><Copy className="w-4 h-4" /></button>
                        </div>
                        <code className="block font-mono text-lg text-green-300 break-all">{generatedFormula}</code>
                    </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Download the Full Template</h3>
                    <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <h4 className="font-medium text-emerald-900">SheetMaster BOM Inventory Tracker</h4>
                            <p className="text-sm text-emerald-700 mt-1">Includes the exact Matrix Multiplication setup, safety stock alerts, and finished goods inputs.</p>
                        </div>
                        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap shadow-sm">
                            <Download className="w-4 h-4" /> Download Template
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
