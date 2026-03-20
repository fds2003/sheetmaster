'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

/**
 * 年龄计算器工具页 — 针对关键词 "excel age calculator from date of birth"（月搜索量 12,000）
 * 用户输入出生日期后，即时生成对应的 Excel DATEDIF 公式
 */

// NOTE: Next.js 不支持在 'use client' 组件中直接导出 metadata，
// 需要通过父 layout 或独立 metadata 文件处理。此处将 metadata 作为注释保留。
// title: 'Excel Age Calculator from Date of Birth | SheetMaster'
// description: 'Free Excel age calculator. Enter a date of birth and instantly get the Excel DATEDIF formula to calculate age in years, months, and days.'

export default function ExcelAgeCalculatorPage() {
  const [dob, setDob] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  // 根据出生日期生成对应的 Excel 公式
  const generateFormulas = (dateCell: string) => ({
    years: `=DATEDIF(${dateCell}, TODAY(), "Y")`,
    months: `=DATEDIF(${dateCell}, TODAY(), "YM")`,
    days: `=DATEDIF(${dateCell}, TODAY(), "MD")`,
    full: `=DATEDIF(${dateCell}, TODAY(), "Y") & " years, " & DATEDIF(${dateCell}, TODAY(), "YM") & " months, " & DATEDIF(${dateCell}, TODAY(), "MD") & " days"`,
    yearsDecimal: `=DATEDIF(${dateCell}, TODAY(), "Y") + DATEDIF(${dateCell}, TODAY(), "YM")/12`,
  });

  const formulas = generateFormulas(dob ? `"${dob}"` : 'A2');

  const copyToClipboard = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* 面包屑 */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-green-600">Home</Link>
        <span className="mx-1">/</span>
        <Link href="/tools/remove-duplicates" className="hover:text-green-600">Tools</Link>
        <span className="mx-1">/</span>
        <span className="text-gray-900">Excel Age Calculator</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Excel Age Calculator from Date of Birth
      </h1>
      <p className="text-gray-600 mb-8">
        Enter a date of birth below to instantly generate the Excel DATEDIF formula to calculate age in years, months, and days.
      </p>

      {/* 交互式计算器 */}
      <div className="rounded-xl border border-green-200 bg-green-50/50 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Generate Your Age Formula</h2>
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="flex-1">
            <label htmlFor="dob-input" className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth (or leave blank to use cell A2)
            </label>
            <input
              id="dob-input"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <div className="space-y-3">
          {[
            { label: 'Age in complete years', key: 'years', formula: formulas.years },
            { label: 'Remaining months (after full years)', key: 'months', formula: formulas.months },
            { label: 'Remaining days (after full months)', key: 'days', formula: formulas.days },
            { label: 'Full age as text', key: 'full', formula: formulas.full },
            { label: 'Age in decimal years', key: 'yearsDecimal', formula: formulas.yearsDecimal },
          ].map(({ label, key, formula }) => (
            <div key={key} className="rounded-lg bg-white border border-gray-200 p-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 mb-1">{label}</p>
                  <code className="block text-sm font-mono text-gray-800 truncate">{formula}</code>
                </div>
                <button
                  onClick={() => copyToClipboard(formula, key)}
                  className="shrink-0 rounded-md bg-green-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-700 transition-colors"
                >
                  {copied === key ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 使用说明 */}
      <div className="prose prose-slate max-w-none">
        <h2>How to Use the DATEDIF Formula in Excel</h2>
        <p>
          Excel&apos;s <code>DATEDIF</code> function calculates the difference between two dates.
          It&apos;s a hidden function — it works but doesn&apos;t appear in Excel&apos;s autocomplete.
        </p>
        <h3>Syntax</h3>
        <pre><code>=DATEDIF(start_date, end_date, unit)</code></pre>
        <table>
          <thead><tr><th>Unit</th><th>Returns</th></tr></thead>
          <tbody>
            <tr><td>&quot;Y&quot;</td><td>Complete years</td></tr>
            <tr><td>&quot;M&quot;</td><td>Complete months</td></tr>
            <tr><td>&quot;D&quot;</td><td>Complete days</td></tr>
            <tr><td>&quot;YM&quot;</td><td>Months, ignoring years</td></tr>
            <tr><td>&quot;YD&quot;</td><td>Days, ignoring years</td></tr>
            <tr><td>&quot;MD&quot;</td><td>Days, ignoring months and years</td></tr>
          </tbody>
        </table>

        <h3>Step-by-Step: Age from Date of Birth</h3>
        <ol>
          <li>Put the date of birth in cell <strong>A2</strong> (formatted as a date)</li>
          <li>In B2, enter: <code>=DATEDIF(A2, TODAY(), &quot;Y&quot;)</code></li>
          <li>The result is the person&apos;s current age in complete years</li>
        </ol>

        <h3>Calculate Age on a Specific Date</h3>
        <p>Replace <code>TODAY()</code> with any date to calculate age as of a specific date:</p>
        <pre><code>=DATEDIF(A2, &quot;2026-01-01&quot;, &quot;Y&quot;)</code></pre>

        <h3>Frequently Asked Questions</h3>
        <h4>What is the Excel formula to calculate age from date of birth?</h4>
        <p>=DATEDIF(A2, TODAY(), &quot;Y&quot;) where A2 contains the date of birth.</p>
        <h4>Why doesn&apos;t DATEDIF appear in Excel&apos;s formula list?</h4>
        <p>DATEDIF is an undocumented legacy function inherited from Lotus 1-2-3. It works in all modern Excel versions but won&apos;t appear in autocomplete suggestions.</p>
        <h4>How do I calculate someone&apos;s age including months?</h4>
        <p>Use: =DATEDIF(A2,TODAY(),&quot;Y&quot;)&amp;&quot; years, &quot;&amp;DATEDIF(A2,TODAY(),&quot;YM&quot;)&amp;&quot; months&quot;</p>
      </div>

      {/* 内链 */}
      <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-5">
        <h3 className="font-semibold text-gray-900 mb-3">Related Tools &amp; Guides</h3>
        <ul className="space-y-2 text-sm text-green-700">
          <li><Link href="/blog/calculate-business-days-excel" className="hover:underline">→ Calculate Business Days Between Two Dates</Link></li>
          <li><Link href="/blog/excel-countdown-timer-formula" className="hover:underline">→ Excel Countdown Timer Formula</Link></li>
          <li><Link href="/tools/excel-gradebook-template" className="hover:underline">→ Excel Gradebook Template for Teachers</Link></li>
        </ul>
      </div>
    </div>
  );
}
