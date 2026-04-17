'use client';

import React, { useState } from 'react';
import Papa from 'papaparse';
import { Upload, FileType, CheckCircle, Download, ArrowRight, Settings2, Play } from 'lucide-react';

export default function CsvSandbox() {
    const [mainFile, setMainFile] = useState<File | null>(null);
    const [refFile, setRefFile] = useState<File | null>(null);
    const [mainHeaders, setMainHeaders] = useState<string[]>([]);
    const [refHeaders, setRefHeaders] = useState<string[]>([]);
    
    // Join settings
    const [mainJoinKey, setMainJoinKey] = useState<string>('');
    const [refJoinKey, setRefJoinKey] = useState<string>('');
    const [returnColumn, setReturnColumn] = useState<string>('');
    
    const [isProcessing, setIsProcessing] = useState(false);
    const [resultBlob, setResultBlob] = useState<Blob | null>(null);

    const handleMainFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setMainFile(file);
            Papa.parse(file, {
                preview: 1, // Read only first line to get headers
                complete: (results) => {
                    const headers = results.data[0] as string[];
                    setMainHeaders(headers || []);
                    if (headers && headers.length > 0) setMainJoinKey(headers[0]);
                }
            });
        }
    };

    const handleRefFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setRefFile(file);
            Papa.parse(file, {
                preview: 1,
                complete: (results) => {
                    const headers = results.data[0] as string[];
                    setRefHeaders(headers || []);
                    if (headers && headers.length > 0) {
                        setRefJoinKey(headers[0]);
                        setReturnColumn(headers[headers.length > 1 ? 1 : 0]);
                    }
                }
            });
        }
    };

    const runVlookupEngine = () => {
        if (!mainFile || !refFile || !mainJoinKey || !refJoinKey || !returnColumn) return;
        setIsProcessing(true);

        // Step 1: Parse the reference file and build a fast hash map
        const lookupMap = new Map<string, string>();
        
        Papa.parse(refFile, {
            header: true,
            skipEmptyLines: true,
            complete: (refResults) => {
                refResults.data.forEach((row: any) => {
                    // Normalize keys: trim whitespace, lowercase for robust matching
                    const key = String(row[refJoinKey]).trim().toLowerCase();
                    const value = row[returnColumn];
                    lookupMap.set(key, value);
                });

                // Step 2: Stream the main file and append the matched values
                const processedRows: any[] = [];
                
                Papa.parse(mainFile, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (mainResults) => {
                        mainResults.data.forEach((row: any) => {
                            const key = String(row[mainJoinKey]).trim().toLowerCase();
                            // Perform the lookup (VLOOKUP logic)
                            const matchedValue = lookupMap.get(key) || '#N/A';
                            
                            // Append the new column
                            // e.g., "Matched_Category"
                            const newColumnName = `VLOOKUP_${returnColumn}`;
                            processedRows.push({
                                ...row,
                                [newColumnName]: matchedValue
                            });
                        });

                        // Step 3: Convert back to CSV
                        const csvOutput = Papa.unparse(processedRows);
                        const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
                        setResultBlob(blob);
                        setIsProcessing(false);
                    }
                });
            }
        });
    };

    const downloadResult = () => {
        if (!resultBlob) return;
        const url = URL.createObjectURL(resultBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `sandbox_result_${new Date().getTime()}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="bg-white border rounded-xl shadow-lg border-indigo-200 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-800 to-indigo-900 p-6 text-white">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <Settings2 className="w-6 h-6 text-indigo-300" />
                    Data Cleaning Sandbox
                </h3>
                <p className="text-indigo-200 text-sm mt-1">Execute million-row VLOOKUPs instantly in your browser. No server uploads, 100% private.</p>
            </div>

            <div className="p-6">
                {!resultBlob ? (
                    <div className="space-y-8">
                        {/* File Uploads */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="border border-dashed border-gray-300 p-6 rounded-lg bg-gray-50 text-center relative hover:bg-gray-100 transition-colors">
                                <input type="file" accept=".csv" onChange={handleMainFileUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                {mainFile ? (
                                    <div className="text-gray-900 font-medium flex items-center justify-center gap-2">
                                        <FileType className="w-4 h-4 text-indigo-500" /> {mainFile.name}
                                    </div>
                                ) : (
                                    <>
                                        <div className="text-gray-900 font-bold mb-1">1. Main Table (Target)</div>
                                        <div className="text-sm text-gray-500">Drop your primary .csv file here</div>
                                    </>
                                )}
                            </div>
                            
                            <div className="border border-dashed border-gray-300 p-6 rounded-lg bg-gray-50 text-center relative hover:bg-gray-100 transition-colors">
                                <input type="file" accept=".csv" onChange={handleRefFileUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                {refFile ? (
                                    <div className="text-gray-900 font-medium flex items-center justify-center gap-2">
                                        <FileType className="w-4 h-4 text-indigo-500" /> {refFile.name}
                                    </div>
                                ) : (
                                    <>
                                        <div className="text-gray-900 font-bold mb-1">2. Reference Table (Lookup)</div>
                                        <div className="text-sm text-gray-500">Drop the .csv file with data to pull</div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Mapping Strategy */}
                        {mainFile && refFile && (
                            <div className="bg-indigo-50/50 p-5 rounded-lg border border-indigo-100 animate-in fade-in slide-in-from-bottom-4">
                                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <ArrowRight className="w-4 h-4 text-indigo-500" /> Configure VLOOKUP Join
                                </h4>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 mb-1">Match column in Main Grid:</label>
                                        <select value={mainJoinKey} onChange={e => setMainJoinKey(e.target.value)} className="w-full text-sm rounded border-gray-300 py-1.5 focus:border-indigo-500 focus:ring-indigo-500">
                                            {mainHeaders.map(h => <option key={h} value={h}>{h}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 mb-1">Match column in Ref Grid:</label>
                                        <select value={refJoinKey} onChange={e => setRefJoinKey(e.target.value)} className="w-full text-sm rounded border-gray-300 py-1.5 focus:border-indigo-500 focus:ring-indigo-500">
                                            {refHeaders.map(h => <option key={h} value={h}>{h}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 mb-1">Target Column to Bring Over:</label>
                                        <select value={returnColumn} onChange={e => setReturnColumn(e.target.value)} className="w-full text-sm rounded border-gray-300 py-1.5 focus:border-indigo-500 focus:ring-indigo-500">
                                            {refHeaders.map(h => <option key={h} value={h}>{h}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <button 
                                    onClick={runVlookupEngine} 
                                    disabled={isProcessing}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow transition-colors flex items-center justify-center gap-2"
                                >
                                    {isProcessing ? (
                                        'Processing 10,000+ Rows...'
                                    ) : (
                                        <><Play className="w-5 h-5 fill-white" /> Execute Merge</>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center py-10 animate-in fade-in zoom-in-95">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Processing Complete!</h3>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">
                            Your VLOOKUP merge finished successfully in the browser. A new column <span className="font-mono bg-gray-100 px-1 rounded text-gray-900">VLOOKUP_{returnColumn}</span> has been appended.
                        </p>
                        
                        <div className="flex items-center justify-center gap-4">
                            <button onClick={() => setResultBlob(null)} className="px-6 py-3 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors">
                                Start Over
                            </button>
                            <button onClick={downloadResult} className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-lg flex items-center gap-2">
                                <Download className="w-5 h-5" /> Download Cleaned CSV
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
