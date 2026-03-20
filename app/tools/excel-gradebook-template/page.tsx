'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

/**
 * 教师成绩册模板落地页 — "excel gradebook template for teachers"（月搜索量 4,400）
 * 展示交互式成绩册演示，包含自动平均分、字母等级和百分比，
 * 并说明所用的 Excel 公式，引导用户下载模板
 */

interface Student {
  name: string;
  hw1: number;
  hw2: number;
  midterm: number;
  final: number;
}

const INITIAL_STUDENTS: Student[] = [
  { name: 'Alice Johnson', hw1: 92, hw2: 88, midterm: 85, final: 91 },
  { name: 'Bob Smith', hw1: 78, hw2: 82, midterm: 74, final: 79 },
  { name: 'Carol Lee', hw1: 95, hw2: 97, midterm: 93, final: 96 },
  { name: 'David Park', hw1: 65, hw2: 70, midterm: 68, final: 72 },
  { name: 'Emma Wilson', hw1: 55, hw2: 60, midterm: 58, final: 62 },
];

// 权重定义（百分比）
const WEIGHTS = { hw1: 20, hw2: 20, midterm: 25, final: 35 };

const getLetterGrade = (score: number): string => {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
};

const getGradeColor = (grade: string): string => {
  const colors: Record<string, string> = {
    A: 'text-green-700 bg-green-50',
    B: 'text-blue-700 bg-blue-50',
    C: 'text-yellow-700 bg-yellow-50',
    D: 'text-orange-700 bg-orange-50',
    F: 'text-red-700 bg-red-50',
  };
  return colors[grade] ?? 'text-gray-700';
};

export default function ExcelGradebookTemplatePage() {
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);

  const updateScore = (index: number, field: keyof Omit<Student, 'name'>, value: number) => {
    setStudents((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [field]: Math.min(100, Math.max(0, value)) } : s))
    );
  };

  const computedRows = useMemo(
    () =>
      students.map((s) => {
        const weighted =
          (s.hw1 * WEIGHTS.hw1 +
            s.hw2 * WEIGHTS.hw2 +
            s.midterm * WEIGHTS.midterm +
            s.final * WEIGHTS.final) /
          100;
        return { ...s, weighted, grade: getLetterGrade(weighted) };
      }),
    [students]
  );

  const classAvg = computedRows.reduce((sum, r) => sum + r.weighted, 0) / computedRows.length;

  return (
    <div className="max-w-4xl mx-auto">
      {/* 面包屑 */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-green-600">Home</Link>
        <span className="mx-1">/</span>
        <span className="text-gray-900">Excel Gradebook Template for Teachers</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Excel Gradebook Template for Teachers
      </h1>
      <p className="text-gray-600 mb-8">
        A free interactive Excel gradebook that automatically calculates weighted averages, letter grades, and class statistics.
        Edit scores below to see formulas in action — then get the template for your class.
      </p>

      {/* 权重说明 */}
      <div className="flex flex-wrap gap-3 mb-4">
        {Object.entries(WEIGHTS).map(([key, w]) => (
          <span key={key} className="rounded-full bg-green-100 text-green-800 text-xs font-medium px-3 py-1">
            {key === 'hw1' ? 'HW 1' : key === 'hw2' ? 'HW 2' : key === 'midterm' ? 'Midterm' : 'Final'}: {w}%
          </span>
        ))}
      </div>

      {/* 交互式成绩册 */}
      <div className="rounded-xl border border-gray-200 overflow-x-auto mb-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Student</th>
              <th className="text-center py-3 px-2 font-medium text-gray-700">HW 1 (20%)</th>
              <th className="text-center py-3 px-2 font-medium text-gray-700">HW 2 (20%)</th>
              <th className="text-center py-3 px-2 font-medium text-gray-700">Midterm (25%)</th>
              <th className="text-center py-3 px-2 font-medium text-gray-700">Final (35%)</th>
              <th className="text-center py-3 px-2 font-semibold text-gray-900">Weighted %</th>
              <th className="text-center py-3 px-3 font-semibold text-gray-900">Grade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {computedRows.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="py-2 px-4 font-medium text-gray-900">{row.name}</td>
                {(['hw1', 'hw2', 'midterm', 'final'] as const).map((field) => (
                  <td key={field} className="py-2 px-2 text-center">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={row[field]}
                      onChange={(e) => updateScore(i, field, Number(e.target.value))}
                      className="w-14 text-center rounded border border-gray-200 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                  </td>
                ))}
                <td className="py-2 px-2 text-center font-semibold text-gray-900">
                  {row.weighted.toFixed(1)}%
                </td>
                <td className="py-2 px-3 text-center">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${getGradeColor(row.grade)}`}>
                    {row.grade}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50 border-t border-gray-200">
            <tr>
              <td colSpan={5} className="py-2 px-4 text-right text-sm font-medium text-gray-700">Class Average:</td>
              <td className="py-2 px-2 text-center text-sm font-bold text-gray-900">{classAvg.toFixed(1)}%</td>
              <td className="py-2 px-3 text-center">
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${getGradeColor(getLetterGrade(classAvg))}`}>
                  {getLetterGrade(classAvg)}
                </span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Lead Magnet */}
      <div className="rounded-xl border border-green-200 bg-green-50/50 p-6 mb-8 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Get the Free Excel Gradebook Template</h2>
        <p className="text-gray-600 text-sm mb-4">
          Download the fully formatted .xlsx template with all formulas pre-built, including VLOOKUP grade lookup,
          conditional formatting, and a class summary dashboard.
        </p>
        <Link
          href="/resources"
          className="inline-block rounded-lg bg-green-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-green-700 transition-colors"
        >
          Download Free Template →
        </Link>
      </div>

      {/* Excel 公式说明 */}
      <div className="prose prose-slate max-w-none">
        <h2>Excel Formulas Used in This Gradebook</h2>

        <h3>1. Weighted Average</h3>
        <pre><code>=B2*0.2 + C2*0.2 + D2*0.25 + E2*0.35</code></pre>
        <p>Or use SUMPRODUCT for flexible weight management:</p>
        <pre><code>=SUMPRODUCT(B2:E2, {"{0.2, 0.2, 0.25, 0.35}"})</code></pre>

        <h3>2. Letter Grade from Score</h3>
        <pre><code>=IFS(F2&gt;=90,&quot;A&quot;, F2&gt;=80,&quot;B&quot;, F2&gt;=70,&quot;C&quot;, F2&gt;=60,&quot;D&quot;, TRUE,&quot;F&quot;)</code></pre>

        <h3>3. Class Average</h3>
        <pre><code>=AVERAGE(F2:F30)</code></pre>

        <h3>4. Count by Grade</h3>
        <pre><code>=COUNTIF(G2:G30,&quot;A&quot;)</code></pre>

        <h3>5. Conditional Formatting for Failing Grades</h3>
        <p>Select the grade column → Conditional Formatting → New Rule → Formula:</p>
        <pre><code>=G2=&quot;F&quot;</code></pre>
        <p>Set a red fill to highlight failing students automatically.</p>

        <h3>Frequently Asked Questions</h3>
        <h4>What is an Excel gradebook template for teachers?</h4>
        <p>A pre-built Excel spreadsheet with formulas to track student scores, automatically calculate weighted averages and letter grades, and display class statistics.</p>
        <h4>How do I calculate weighted grades in Excel?</h4>
        <p>Multiply each score by its weight percentage and sum the results: =(HW*0.2)+(Midterm*0.3)+(Final*0.5). See our <Link href="/blog/excel-weighted-grade-formula" className="text-green-600 hover:underline">weighted grade formula guide</Link>.</p>
        <h4>Can I use this template in Google Sheets?</h4>
        <p>Yes. All formulas used (IFS, AVERAGE, COUNTIF, SUMPRODUCT) are fully compatible with Google Sheets.</p>
      </div>

      {/* 内链 */}
      <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-5">
        <h3 className="font-semibold text-gray-900 mb-3">Related Resources</h3>
        <ul className="space-y-2 text-sm text-green-700">
          <li><Link href="/tools/gpa-calculator-excel" className="hover:underline">→ GPA Calculator Excel Template</Link></li>
          <li><Link href="/blog/excel-weighted-grade-formula" className="hover:underline">→ Excel Weighted Grade Formula</Link></li>
          <li><Link href="/blog/excel-pass-fail-percentage-formula" className="hover:underline">→ Pass or Fail Formula in Excel</Link></li>
          <li><Link href="/resources" className="hover:underline">→ Download Free Excel Templates</Link></li>
        </ul>
      </div>
    </div>
  );
}
