'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FORMULAS } from '../lib/formulas';
import { Copy, Check, Info, Share2, Link2, Mail, FileDown, Send, ArrowRight, Lock, Crown, Clock } from 'lucide-react';
import { createClient } from '../lib/supabase/client';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

const CsvSandbox = dynamic(() => import('./CsvSandbox'), { ssr: false });

interface InteractiveFormulaBuilderProps {
    formulaSlug: string;
}

export default function InteractiveFormulaBuilder({ formulaSlug }: InteractiveFormulaBuilderProps) {
    const formula = FORMULAS.find((f) => f.slug === formulaSlug);
    const [values, setValues] = useState<Record<string, string>>({});
    const [copied, setCopied] = useState(false);
    const [activeInput, setActiveInput] = useState<string | null>(null);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [isPro, setIsPro] = useState(false);
    const [loadingAuth, setLoadingAuth] = useState(true);
    const [showUpgradeEmailModal, setShowUpgradeEmailModal] = useState(false);
    const [upgradeEmail, setUpgradeEmail] = useState('');
    const [magicLinkSent, setMagicLinkSent] = useState(false);
    const [isSavingVault, setIsSavingVault] = useState(false);
    const [vaultSuccess, setVaultSuccess] = useState(false);
    const [isLoadingVault, setIsLoadingVault] = useState(false);
    const [showSandbox, setShowSandbox] = useState(false);
    const searchParams = useSearchParams();
    const vaultId = searchParams.get('vault');

    useEffect(() => {
        const supabase = createClient();
        
        async function fetchUser() {
            setIsLoadingVault(true);
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                setUserId(session.user.id);
                setUserEmail(session.user.email || null);
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('is_pro')
                    .eq('id', session.user.id)
                    .single();
                if (profile?.is_pro) {
                    setIsPro(true);
                    
                    // If Pro and vaultId exists, fetch the vault data
                    if (vaultId) {
                        const { data: vaultData } = await supabase
                            .from('saved_formulas')
                            .select('settings')
                            .eq('id', vaultId)
                            .eq('user_id', session.user.id)
                            .single();
                            
                        if (vaultData && vaultData.settings) {
                            setValues(vaultData.settings);
                        }
                    }
                }
            }
            setLoadingAuth(false);
            setIsLoadingVault(false);
        }
        fetchUser();
    }, [vaultId]);

    const handleRequestMagicLink = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!upgradeEmail) return;
        const supabase = createClient();
        const { error } = await supabase.auth.signInWithOtp({
            email: upgradeEmail,
            options: { 
                emailRedirectTo: typeof window !== 'undefined' 
                    ? `${window.location.origin}/auth/callback?next=${window.location.pathname}` 
                    : 'http://localhost:3000/auth/callback' 
            }
        });
        if (!error) {
            setMagicLinkSent(true);
        } else {
            alert('Error sending login link: ' + error.message);
        }
    };

    const handleSaveToVault = async () => {
        if (!userId || !isPro) return;
        
        // Use native prompt for MVP naming, or default name
        const configName = prompt('Enter a memorable name for this configuration:', 'Untitled ' + formula.title);
        if (!configName) return; // User cancelled
        
        setIsSavingVault(true);
        const supabase = createClient();
        const { error } = await supabase.from('saved_formulas').insert({
            user_id: userId,
            formula_slug: formula.slug,
            name: configName,
            settings: values
        });
        
        setIsSavingVault(false);
        if (error) {
            alert('Failed to save configuration: ' + error.message);
        } else {
            setVaultSuccess(true);
            setTimeout(() => setVaultSuccess(false), 3000);
        }
    };

    const handleUpgrade = async () => {
        if (!userId) {
            setShowUpgradeEmailModal(true);
            return;
        }
        
        try {
            const res = await fetch('/api/checkout_sessions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, email: userEmail })
            });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else if (data.error) {
                console.error('Checkout error:', data.error);
                alert('Checkout failed: ' + data.error);
            }
        } catch (e: unknown) {
            const error = e as Error;
            alert('Payment failed to initialize: ' + error.message);
        }
    };

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

    // Simplified grid visualization based on formula type
    const renderGridPreview = () => {
        if (formula.slug === 'if') {
            return (
                <div className="border border-gray-200 rounded-lg bg-white overflow-hidden text-sm shadow-sm">
                    <div className="bg-gray-50 px-3 py-2 border-b border-gray-200 text-gray-600 text-xs font-medium">Logical test → two outcomes</div>
                    <div className="p-4 grid grid-cols-2 gap-3">
                        <div className={`rounded-lg border-2 p-3 text-center ${activeInput === 'logical_test' ? 'border-blue-400 bg-blue-50' : 'border-green-200 bg-green-50'}`}>
                            <div className="text-xs text-green-800 mb-1 font-semibold">If TRUE</div>
                            <div className="font-mono text-xs text-gray-700">{values.value_if_true || 'value_if_true'}</div>
                        </div>
                        <div className={`rounded-lg border-2 p-3 text-center ${activeInput === 'logical_test' ? 'border-blue-400 bg-blue-50' : 'border-red-200 bg-red-50'}`}>
                            <div className="text-xs text-red-800 mb-1 font-semibold">If FALSE</div>
                            <div className="font-mono text-xs text-gray-700">{values.value_if_false || 'value_if_false'}</div>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 px-3 pb-3">Focus the <strong>Test</strong> field to see how the condition drives the branch.</p>
                </div>
            );
        }
        if (formula.slug === 'extract-email') {
            return (
                <div className="border border-gray-200 rounded-lg bg-white overflow-hidden text-xs shadow-sm">
                    <div className="bg-amber-50 px-3 py-2 border-b border-amber-100 text-amber-900 text-xs font-medium">REGEX preview</div>
                    <div className="p-4 space-y-3">
                        <div>
                            <div className="text-gray-500 mb-1">Raw text (e.g. A2)</div>
                            <div className="bg-gray-50 border border-gray-200 rounded p-2 font-mono break-all">
                                Contact us at <span className="bg-yellow-100 text-blue-700 font-semibold">hello@example.com</span> today.
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-green-700 font-medium">
                            <span aria-hidden>→</span>
                            <span>Extracted: hello@example.com</span>
                        </div>
                    </div>
                </div>
            );
        }
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
        <>
        <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white flex justify-between items-center">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h1 className="text-2xl font-bold text-gray-900">{formula.title}</h1>
                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">Wizard Mode</span>
                    </div>
                    <p className="text-sm text-gray-500">{formula.description}</p>
                </div>
            </div>

            {isLoadingVault && (
                <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-4 mx-6 rounded flex items-center justify-between">
                    <span className="text-indigo-700 font-medium text-sm flex items-center gap-2">
                        <Clock className="w-4 h-4 animate-spin" /> Loading your saved configuration...
                    </span>
                </div>
            )}

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
                                <button onClick={handleExportPdf} className="p-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-md transition-colors" title="Export PDF">
                                    <FileDown className="w-4 h-4" />
                                </button>
                                <button onClick={() => setShowEmailModal(!showEmailModal)} className="p-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-md transition-colors" title="Email me this formula">
                                    <Mail className="w-4 h-4" />
                                </button>
                                <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-md transition-colors" title="Share to Twitter">
                                    <Share2 className="w-4 h-4" />
                                </a>
                                <button onClick={handleCopyLink} className="p-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-md transition-colors" title="Copy link">
                                    <Link2 className="w-4 h-4" />
                                </button>
                            </div>
                            <code className="block font-mono text-lg text-green-400 break-all pr-44 min-h-[1.75rem]">
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
                    </div>
                </div>
            </div>
            
            {/* Founder Features Paywall */}
            <div className={`p-6 border-t border-gray-100 relative ${isPro ? 'bg-gradient-to-r from-blue-50 to-indigo-50' : 'bg-gray-50'}`}>
                {!isPro && !loadingAuth && (
                    <div className="absolute inset-0 z-10 backdrop-blur-sm bg-white/60 flex flex-col items-center justify-center rounded-b-xl border-t border-gray-200">
                        <Lock className="w-10 h-10 text-gray-400 mb-3" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Unlock Founder Features</h3>
                        <p className="text-gray-600 mb-4 flex items-center gap-2">Get lifetime access to the Data Cleaning Sandbox and Password Vault.</p>
                        
                        {!showUpgradeEmailModal ? (
                            <button onClick={handleUpgrade} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-bold shadow-lg transition-transform hover:scale-105 flex items-center gap-2">
                                <Crown className="w-5 h-5 text-yellow-300" /> Pay Once $4.99
                            </button>
                        ) : (
                            <div className="bg-white p-5 rounded-xl shadow-xl w-full max-w-sm border border-gray-100 flex flex-col mt-2 animate-in fade-in slide-in-from-bottom-4">
                                <form onSubmit={handleRequestMagicLink}>
                                    <h4 className="font-bold text-gray-900 mb-2 text-center">Secure Your Access</h4>
                                    <p className="text-xs text-gray-500 mb-4 text-center">Enter your email to bind your lifetime PRO license.</p>
                                    
                                    {magicLinkSent ? (
                                        <div className="bg-green-50 text-green-700 p-3 rounded text-sm text-center border border-green-200">
                                            ✅ Great! Please check your email inbox (or spam) and click the magic link to continue.
                                        </div>
                                    ) : (
                                        <div className="flex flex-col gap-3">
                                            <input 
                                                type="email" 
                                                required 
                                                value={upgradeEmail} 
                                                onChange={(e) => setUpgradeEmail(e.target.value)} 
                                                placeholder="your@email.com" 
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                            <button type="submit" className="bg-gray-900 hover:bg-black text-white py-2 rounded-lg font-medium w-full transition-colors">
                                                Send Login Link
                                            </button>
                                            <p className="text-xs text-center mt-1"><button type="button" onClick={() => setShowUpgradeEmailModal(false)} className="text-gray-400 hover:underline">Cancel</button></p>
                                        </div>
                                    )}
                                </form>
                            </div>
                        )}
                    </div>
                )}
                
                <h3 className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Crown className="w-4 h-4" /> Founder Features
                </h3>
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${!isPro && !loadingAuth ? 'opacity-30 blur-[2px] pointer-events-none select-none' : ''}`}>
                    <div className={`bg-white p-4 rounded-lg border shadow-sm transition-colors ${showSandbox ? 'border-indigo-500 ring-1 ring-indigo-500' : 'border-indigo-100'}`}>
                        <h4 className="font-bold text-gray-900 mb-1">🧹 Data Cleaning Sandbox</h4>
                        <p className="text-sm text-gray-500 mb-3">Upload your CSV and execute this formula across 10,000+ rows instantly.</p>
                        <button 
                            onClick={() => setShowSandbox(!showSandbox)}
                            className="text-sm bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold py-2 px-4 rounded w-full transition-colors"
                        >
                            {showSandbox ? 'Hide Sandbox' : 'Launch Sandbox'}
                        </button>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm">
                        <h4 className="font-bold text-gray-900 mb-1">💾 Save to Vault</h4>
                        <p className="text-sm text-gray-500 mb-3">Save this exact formula configuration to your personal cloud vault for easy access.</p>
                        <button 
                            onClick={handleSaveToVault} 
                            disabled={isSavingVault || vaultSuccess}
                            className={`text-sm font-semibold py-2 px-4 rounded w-full transition-colors ${
                                vaultSuccess ? 'bg-green-100 text-green-700' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                            }`}
                        >
                            {isSavingVault ? 'Saving...' : vaultSuccess ? '✅ Saved Successfully!' : 'Save Configuration'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Render Sandbox UI */}
            {showSandbox && isPro && (
                <div className="p-6 border-t border-gray-100 bg-gray-50 animate-in fade-in slide-in-from-top-4">
                    <CsvSandbox />
                </div>
            )}

            {/* Formula Logic Breakdown */}
            {formula.formulaLogicBreakdown && (
                <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                    <h3 className="tex-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Formula Logic Breakdown</h3>
                    <div className="space-y-3">
                        {formula.formulaLogicBreakdown.map((item, idx) => (
                            <div key={idx} className="flex flex-col sm:flex-row gap-2 sm:gap-4 p-3 bg-white border border-gray-100 rounded-lg shadow-sm">
                                <div className="sm:w-1/4 font-mono text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded w-fit h-fit whitespace-nowrap">
                                    {item.argument}
                                </div>
                                <div className="sm:w-3/4">
                                    <p className="text-sm text-gray-700">{item.explanation}</p>
                                    <p className="text-xs text-gray-400 mt-1 font-mono">Example: {item.example}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>

        {/* Related Tools */}
        {formula.relatedTools && formula.relatedTools.length > 0 && (
            <div className="w-full max-w-4xl mx-auto mt-8 mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4 px-1">Related Generators</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {formula.relatedTools.map(slug => {
                        const related = FORMULAS.find(f => f.slug === slug);
                        if (!related) return null;
                        return (
                            <Link 
                                key={slug} 
                                href={`/formulas/${slug}`}
                                className="group block p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all"
                            >
                                <div className="font-mono text-sm font-bold text-blue-600 mb-2 group-hover:text-blue-700">{related.excelFunction}</div>
                                <p className="text-xs text-gray-500 line-clamp-2">{related.description}</p>
                                <div className="mt-3 flex items-center text-xs font-semibold text-gray-900 group-hover:text-blue-600">
                                    Use Tool <ArrowRight className="w-3 h-3 ml-1" />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        )}
        </>
    );
}
