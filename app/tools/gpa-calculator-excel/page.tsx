'use client';

import { useState } from 'react';
import Link from 'next/link';

/**
 * GPA 计算器关键词落地页 — "gpa calculator excel template"（月搜索量 3,600）
 * 交互式演示：用户输入课程信息，实时显示加权 GPA 及对应的 Excel 公式
 */

interface Course {
  name: string;
  grade: string;
  credits: number;
}

const GRADE_POINTS: Record<string, number> = {
  'A+': 4.0, A: 4.0, 'A-': 3.7,
  'B+': 3.3, B: 3.0, 'B-': 2.7,
  'C+': 2.3, C: 2.0, 'C-': 1.7,
  'D+': 1.3, D: 1.0, 'D-': 0.7,
  F: 0.0,
};

const DEFAULT_COURSES: Course[] = [
  { name: 'Mathematics', grade: 'A', credits: 3 },
  { name: 'English', grade: 'B+', credits: 3 },
  { name: 'Science', grade: 'A-', credits: 4 },
  { name: 'History', grade: 'B', credits: 3 },
];

export default function GpaCalculatorPage() {
  const [courses, setCourses] = useState<Course[]>(DEFAULT_COURSES);

  const updateCourse = (index: number, field: keyof Course, value: string | number) => {
    setCourses((prev) =>
      prev.map((c, i) => (i === index ? { ...c, [field]: value } : c))
    );
  };

  const addCourse = () => {
    setCourses((prev) => [...prev, { name: '', grade: 'A', credits: 3 }]);
  };

  const removeCourse = (index: number) => {
    setCourses((prev) => prev.filter((_, i) => i !== index));
  };

  // 计算加权 GPA
  const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);
  const weightedSum = courses.reduce((sum, c) => sum + (GRADE_POINTS[c.grade] ?? 0) * c.credits, 0);
  const gpa = totalCredits > 0 ? weightedSum / totalCredits : 0;

  return (
    <div className="max-w-3xl mx-auto">
      {/* 面包屑 */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-green-600">Home</Link>
        <span className="mx-1">/</span>
        <span className="text-gray-900">GPA Calculator Excel Template</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        GPA Calculator Excel Template
      </h1>
      <p className="text-gray-600 mb-8">
        Calculate your GPA instantly — and see the exact Excel SUMPRODUCT formula to recreate it in your own spreadsheet.
      </p>

      {/* 交互式 GPA 计算器 */}
      <div className="rounded-xl border border-green-200 bg-green-50/50 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Interactive GPA Calculator</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-green-200">
                <th className="text-left py-2 pr-3 font-medium text-gray-700">Course</th>
                <th className="text-left py-2 pr-3 font-medium text-gray-700">Grade</th>
                <th className="text-left py-2 pr-3 font-medium text-gray-700">Credits</th>
                <th className="text-left py-2 font-medium text-gray-700">Points</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-green-100">
              {courses.map((course, i) => (
                <tr key={i}>
                  <td className="py-2 pr-3">
                    <input
                      type="text"
                      value={course.name}
                      onChange={(e) => updateCourse(i, 'name', e.target.value)}
                      placeholder={`Course ${i + 1}`}
                      className="w-full rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                  </td>
                  <td className="py-2 pr-3">
                    <select
                      value={course.grade}
                      onChange={(e) => updateCourse(i, 'grade', e.target.value)}
                      className="rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                    >
                      {Object.keys(GRADE_POINTS).map((g) => (
                        <option key={g} value={g}>{g} ({GRADE_POINTS[g].toFixed(1)})</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-2 pr-3">
                    <input
                      type="number"
                      min={1}
                      max={6}
                      value={course.credits}
                      onChange={(e) => updateCourse(i, 'credits', Number(e.target.value))}
                      className="w-16 rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                  </td>
                  <td className="py-2 pr-3 text-gray-700 font-mono">
                    {((GRADE_POINTS[course.grade] ?? 0) * course.credits).toFixed(1)}
                  </td>
                  <td className="py-2">
                    <button
                      onClick={() => removeCourse(i)}
                      className="text-red-400 hover:text-red-600 text-lg leading-none"
                      aria-label="Remove course"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <button
            onClick={addCourse}
            className="text-sm text-green-700 hover:text-green-900 font-medium"
          >
            + Add Course
          </button>
          <div className="text-right">
            <p className="text-sm text-gray-600">Total Credits: <strong>{totalCredits}</strong></p>
            <p className="text-2xl font-bold text-green-700">GPA: {gpa.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Excel 公式区域 */}
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">The Excel Formulas to Build This</h2>
        <p className="text-sm text-gray-600 mb-4">
          If grades (as points) are in column B and credit hours in column C, starting from row 2:
        </p>
        <div className="space-y-3">
          {[
            { label: 'Weighted GPA (SUMPRODUCT)', formula: '=SUMPRODUCT(B2:B10, C2:C10) / SUM(C2:C10)' },
            { label: 'Total credits', formula: '=SUM(C2:C10)' },
            { label: 'Total grade points', formula: '=SUMPRODUCT(B2:B10, C2:C10)' },
          ].map(({ label, formula }) => (
            <div key={label} className="rounded-lg bg-white border border-gray-200 p-3">
              <p className="text-xs text-gray-500 mb-1">{label}</p>
              <code className="text-sm font-mono text-gray-800">{formula}</code>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-gray-500">
          Tip: Use a lookup table to convert letter grades to points automatically with VLOOKUP.
        </p>
      </div>

      {/* SEO 内容 */}
      <div className="prose prose-slate max-w-none">
        <h2>How to Build a GPA Calculator in Excel</h2>
        <p>
          A GPA (Grade Point Average) is calculated by multiplying each course&apos;s grade points by its credit hours,
          summing the results, and dividing by total credits. This is called a weighted average — and SUMPRODUCT is the
          perfect Excel function for it.
        </p>

        <h3>Setting Up Your Excel GPA Spreadsheet</h3>
        <ol>
          <li>Column A: Course name</li>
          <li>Column B: Grade points (A=4.0, B=3.0, etc.)</li>
          <li>Column C: Credit hours</li>
          <li>Column D: =B2*C2 (quality points per course)</li>
          <li>GPA: =SUM(D2:D10)/SUM(C2:C10)</li>
        </ol>

        <h3>Convert Letter Grades to Grade Points Automatically</h3>
        <p>Create a lookup table on a separate sheet:</p>
        <pre><code>=VLOOKUP(A2, GradeLookup!$A:$B, 2, 0)</code></pre>

        <h3>Frequently Asked Questions</h3>
        <h4>How do I calculate GPA in Excel?</h4>
        <p>Use =SUMPRODUCT(grade_points, credit_hours) / SUM(credit_hours). This gives the weighted GPA.</p>
        <h4>What is a GPA calculator Excel template?</h4>
        <p>A spreadsheet with formulas pre-built to calculate weighted GPA from course grades and credit hours.</p>
        <h4>How do I get the Excel template?</h4>
        <p>
          Subscribe to our mailing list via the <Link href="/resources" className="text-green-600 hover:underline">Resources page</Link> to
          download our free Excel GPA template.
        </p>
      </div>

      {/* 内链 */}
      <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-5">
        <h3 className="font-semibold text-gray-900 mb-3">Related Tools</h3>
        <ul className="space-y-2 text-sm text-green-700">
          <li><Link href="/tools/excel-gradebook-template" className="hover:underline">→ Excel Gradebook Template for Teachers</Link></li>
          <li><Link href="/blog/excel-weighted-grade-formula" className="hover:underline">→ Excel Weighted Grade Formula Guide</Link></li>
          <li><Link href="/blog/excel-pass-fail-percentage-formula" className="hover:underline">→ Excel Pass or Fail Formula</Link></li>
        </ul>
      </div>
    </div>
  );
}
