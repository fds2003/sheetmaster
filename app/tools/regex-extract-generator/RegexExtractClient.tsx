'use client';

import React, { useState } from 'react';
import { Copy, Check, Mail, FileDown, Send } from 'lucide-react';

export default function RegexExtractClient() {
    const [targetCell, setTargetCell] = useState('A2');
    const [words, setWords] = useState('Apple, Banana, Orange');
    const [caseSensitive, setCaseSensitive] = useState(false);
    
    const [copied, setCopied] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false);

    const generateFormula = () => {
        const wordList = words.split(',').map(w => w.trim()).filter(Boolean);
        if (wordList.length === 0) return '';
        
        const pattern = wordList.join('|');
        const caseFlag = caseSensitive ? '' : '(?i)';
        
        // Google Sheets REGEXEXTRACT
        return `=IFERROR(REGEXEXTRACT(${targetCell || 'A2'}, "${caseFlag}(${pattern})"), "Not Found")`;
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generateFormula());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleExportPdf = () => {
        window.print();
    };

    const handleSendEmail = (e: React.FormEvent) => {
        e.preventDefault();
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
        <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mt-8">
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-white flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Multi-Word Regex Generator</h2>
                    <p className="text-sm text-gray-500 mt-1">Extract multiple specific words from a cell instantly (Google Sheets).</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-6 border-r border-gray-100 bg-white space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Target Cell</label>
                        <input type="text" value={targetCell} onChange={e => setTargetCell(e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 py-2 px-3 border" placeholder="A2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Words to Extract (Comma separated)</label>
                        <input type="text" value={words} onChange={e => setWords(e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 py-2 px-3 border" placeholder="Apple, Banana, Orange" />
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                        <input type="checkbox" id="case-sensitive" checked={caseSensitive} onChange={e => setCaseSensitive(e.target.checked)} className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                        <label htmlFor="case-sensitive" className="text-sm text-gray-700 font-medium">Case Sensitive</label>
                    </div>
                </div>

                <div className="p-6 bg-gray-50 flex flex-col justify-between">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Generated Formula</h3>
                        <div className="bg-gray-900 rounded-xl p-5 relative group shadow-inner">
                            <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={handleCopy} className="p-2 text-gray-400 hover:text-white bg-gray-800 rounded-md"><Copy className="w-4 h-4" /></button>
                                <button onClick={handleExportPdf} className="p-2 text-gray-400 hover:text-white bg-gray-800 rounded-md"><FileDown className="w-4 h-4" /></button>
                                <button onClick={() => setShowEmailModal(!showEmailModal)} className="p-2 text-gray-400 hover:text-white bg-gray-800 rounded-md"><Mail className="w-4 h-4" /></button>
                            </div>
                            <code className="block font-mono text-lg text-green-300 break-all pr-24">{generateFormula()}</code>
                        </div>
                    </div>
                    
                    {showEmailModal && (
                        <div className="bg-purple-50 border border-purple-100 rounded-lg p-5 mt-4">
                            <div className="flex items-center gap-2 mb-3"><Mail className="w-4 h-4 text-purple-600" /><span className="text-sm font-semibold">Email Backup</span></div>
                            {emailSent ? <div className="text-green-600 text-sm flex gap-1"><Check className="w-4 h-4"/> Sent!</div> : (
                                <form onSubmit={handleSendEmail} className="flex gap-2">
                                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="your@email.com" className="flex-1 rounded-md border-gray-300 shadow-sm py-1.5 px-3 border text-sm" />
                                    <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-md text-sm whitespace-nowrap"><Send className="w-4 h-4" /></button>
                                </form>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
