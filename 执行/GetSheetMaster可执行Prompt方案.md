# GetSheetMaster 可执行 Prompt 方案

**目标**：基于 SEO 关键词，实现具体功能提升网站流量  
**生成日期**：2026-01-31

---

## 一、Meta 优化 Prompt（立即执行）

### Prompt 1.1：优化公式页面 Meta 标签

```
请帮我优化 getsheetmaster.com 的公式页面 Meta 标签。

当前文件位置：/sheetmaster/lib/formulas.ts

需要优化以下 5 个核心公式的 title 和 metaDescription：

1. VLOOKUP (slug: 'vlookup')
   - 目标关键词：vlookup generator, vlookup formula, free vlookup tool
   - 当前 title: "Free VLOOKUP Formula Generator"
   - 优化后 title: "Free VLOOKUP Generator - Excel & Google Sheets | No Signup"
   - 优化后 metaDescription: "Generate VLOOKUP formulas instantly for Excel and Google Sheets. Free tool with examples, error fixes (#N/A solutions), and step-by-step guide. No signup required."

2. IF (slug: 'if')
   - 目标关键词：if formula excel, if then formula, if statement generator
   - 优化后 title: "IF Formula Generator - Create IF-THEN Statements | Free Tool"
   - 优化后 metaDescription: "Build IF formulas for Excel and Google Sheets. Handle nested IF, IF-AND, IF-OR conditions. Free generator with examples. No signup required."

3. SUMIF (slug: 'sumif')
   - 目标关键词：sumif formula, sumif generator, sum with conditions
   - 优化后 title: "SUMIF Generator - Sum with Conditions | Excel & Google Sheets"
   - 优化后 metaDescription: "Generate SUMIF formulas to sum cells based on criteria. Free tool for Excel and Google Sheets with multiple condition examples."

4. INDEX MATCH (slug: 'index-match')
   - 目标关键词：index match formula, index match generator, index match vs vlookup
   - 优化后 title: "INDEX MATCH Generator - More Powerful Than VLOOKUP | Free"
   - 优化后 metaDescription: "Generate INDEX MATCH formulas - the flexible alternative to VLOOKUP. Look up in any direction, handle multiple criteria. Free Excel & Google Sheets tool."

5. XLOOKUP (slug: 'xlookup')
   - 目标关键词：xlookup formula, xlookup generator, xlookup vs vlookup
   - 优化后 title: "XLOOKUP Generator - Modern VLOOKUP Replacement | Free Tool"
   - 优化后 metaDescription: "Generate XLOOKUP formulas for Excel and Google Sheets. The modern replacement for VLOOKUP with built-in error handling. Free, no signup."

请直接修改 lib/formulas.ts 文件中对应公式的 title 和 metaDescription 字段。
```

---

### Prompt 1.2：优化首页 Meta 和 H1

```
请帮我优化 getsheetmaster.com 首页的 SEO 元素。

文件位置：/sheetmaster/app/page.tsx

需要优化：

1. H1 标签（当前在第 68-70 行）
   当前：SheetMaster - Free Excel Formula Generators
   优化为：Free Excel & Google Sheets Formula Generator - 50+ Tools

2. 副标题 p 标签
   当前：Master Excel & Google Sheets Formulas. Search or select a tool below to generate code instantly.
   优化为：Generate Excel and Google Sheets formulas instantly. VLOOKUP, IF, SUMIF, INDEX MATCH and 50+ formulas. 100% free, no signup required.

3. metadata 对象中的 title 和 description（第 7-9 行）
   优化 title: "Free Excel Formula Generator - 50+ Tools for Excel & Google Sheets | SheetMaster"
   优化 description: "Generate Excel and Google Sheets formulas instantly. Free tools for VLOOKUP, IF, SUMIF, INDEX MATCH, data cleaning, loan calculators and more. No signup required."

请直接修改文件。
```

---

## 二、FAQ Schema 实现 Prompt

### Prompt 2.1：为公式页面添加 FAQ Schema

```
请帮我为 getsheetmaster.com 的公式详情页添加 FAQ Schema 结构化数据。

文件位置：/sheetmaster/app/formulas/[slug]/page.tsx

实现要求：

1. 在页面 head 中添加 JSON-LD 结构化数据
2. 只在公式有 faq 数据时才渲染 Schema
3. 使用 Next.js 的 Script 组件或在 metadata 中添加

代码示例：

```tsx
// 在组件中添加
import Script from 'next/script';

// 在 return 中添加（在 main 内容之前）
{formula.faq && formula.faq.length > 0 && (
  <Script
    id="faq-schema"
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": formula.faq.map(item => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        }))
      })
    }}
  />
)}
```

请修改文件实现此功能。
```

---

### Prompt 2.2：扩展 VLOOKUP 的 FAQ 数据

```
请帮我扩展 VLOOKUP 公式的 FAQ 数据，用于 SEO 优化。

文件位置：/sheetmaster/lib/formulas.ts
找到 slug: 'vlookup' 的公式配置

当前 FAQ 只有 2 个问题，请扩展到 8-10 个，覆盖以下高搜索量问题：

1. "Why is VLOOKUP returning #N/A?" (3,600/月)
   Answer: 详细解释 #N/A 错误的 5 个常见原因和解决方法

2. "Can VLOOKUP look to the left?" (1,200/月)
   Answer: 解释 VLOOKUP 只能向右查找，推荐 INDEX MATCH 或 XLOOKUP

3. "What is the difference between VLOOKUP and XLOOKUP?" (5,000/月)
   Answer: 对比两个函数的主要区别

4. "How to use VLOOKUP with multiple criteria?" (4,400/月)
   Answer: 介绍辅助列方法和数组公式方法

5. "Why is VLOOKUP not working?" (2,900/月)
   Answer: 常见原因：数据类型不匹配、隐藏空格、范围错误等

6. "Is VLOOKUP case sensitive?" 
   Answer: 解释 VLOOKUP 不区分大小写，以及如何实现区分大小写的查找

7. "How to fix VLOOKUP #REF error?"
   Answer: 解释 #REF 错误原因和解决方法

8. "Should I use VLOOKUP or INDEX MATCH?" (6,000/月)
   Answer: 对比两种方法的优缺点和适用场景

请直接修改 formulas.ts 中 VLOOKUP 的 faq 数组，每个 answer 要详细（100-150字），包含实用建议。
```

---

## 三、新增去重工具页 Prompt

### Prompt 3.1：创建去重工具页面

```
请帮我为 getsheetmaster.com 创建一个新的去重工具页面。

目标关键词：
- remove duplicates excel formula (8,100/月)
- how to remove duplicates in excel (90,000/月)
- find duplicates in excel (12,000/月)

需要创建以下文件：

1. /sheetmaster/lib/tools/remove-duplicates.ts - 工具配置

```typescript
export interface RemoveDuplicatesTool {
  id: string;
  name: string;
  description: string;
  inputs: Array<{
    id: string;
    label: string;
    type: 'text' | 'range' | 'number';
    placeholder: string;
  }>;
  generate: (params: Record<string, string>) => string;
}

export const REMOVE_DUPLICATES_CONFIG = {
  slug: 'remove-duplicates',
  title: 'Remove Duplicates in Excel - Free Formula Generator',
  metaDescription: 'Remove duplicate values in Excel and Google Sheets with formulas. Extract unique values, find duplicates, keep first or latest. Free tool with examples.',
  description: 'Remove duplicates, extract unique values, and find duplicate entries in your spreadsheet data.',
  tools: [
    {
      id: 'unique-values',
      name: 'Extract Unique Values',
      description: 'Get a list of unique values from a range (removes all duplicates)',
      inputs: [
        { id: 'range', label: 'Data Range', type: 'range', placeholder: 'e.g., A2:A100' }
      ],
      generate: (p) => `=UNIQUE(${p.range || 'A2:A100'})`
    },
    {
      id: 'count-duplicates',
      name: 'Count Duplicates',
      description: 'Count how many times each value appears',
      inputs: [
        { id: 'range', label: 'Data Range', type: 'range', placeholder: 'e.g., A:A' },
        { id: 'cell', label: 'Cell to Check', type: 'text', placeholder: 'e.g., A2' }
      ],
      generate: (p) => `=COUNTIF(${p.range || 'A:A'}, ${p.cell || 'A2'})`
    },
    {
      id: 'find-duplicates',
      name: 'Find Duplicates (TRUE/FALSE)',
      description: 'Mark cells that have duplicate values',
      inputs: [
        { id: 'range', label: 'Data Range', type: 'range', placeholder: 'e.g., $A$2:$A$100' },
        { id: 'cell', label: 'Current Cell', type: 'text', placeholder: 'e.g., A2' }
      ],
      generate: (p) => `=COUNTIF(${p.range || '$A$2:$A$100'}, ${p.cell || 'A2'})>1`
    },
    {
      id: 'remove-keep-first',
      name: 'Remove Duplicates (Keep First)',
      description: 'Filter to show only first occurrence of each value',
      inputs: [
        { id: 'data_range', label: 'Full Data Range', type: 'range', placeholder: 'e.g., A2:C100' },
        { id: 'key_column', label: 'Key Column', type: 'range', placeholder: 'e.g., A2:A100' }
      ],
      generate: (p) => `=FILTER(${p.data_range || 'A2:C100'}, COUNTIF(INDIRECT("A1:"&ADDRESS(ROW(${p.key_column || 'A2:A100'}),1)), ${p.key_column || 'A2:A100'})=1)`
    },
    {
      id: 'highlight-first-duplicate',
      name: 'Is First Occurrence?',
      description: 'Returns TRUE if this is the first time the value appears',
      inputs: [
        { id: 'range', label: 'Data Range (from start)', type: 'range', placeholder: 'e.g., $A$2:A2' },
        { id: 'cell', label: 'Current Cell', type: 'text', placeholder: 'e.g., A2' }
      ],
      generate: (p) => `=COUNTIF(${p.range || '$A$2:A2'}, ${p.cell || 'A2'})=1`
    }
  ],
  richContent: `
<div class="prose max-w-none">
  <h2 class="text-2xl font-bold mb-4">How to Remove Duplicates in Excel with Formulas</h2>
  <p class="mb-4">While Excel's "Remove Duplicates" button is quick, formulas give you more control. You can extract unique values to a new column, find duplicates without deleting them, or keep specific occurrences based on criteria.</p>
  
  <h3 class="text-xl font-semibold mb-2">Method 1: UNIQUE Function (Excel 365 / Google Sheets)</h3>
  <p class="mb-4">The simplest way to get unique values. Just use <code>=UNIQUE(A2:A100)</code> and it returns a clean list with no duplicates.</p>
  
  <h3 class="text-xl font-semibold mb-2">Method 2: COUNTIF to Find Duplicates</h3>
  <p class="mb-4">Use <code>=COUNTIF(A:A, A2)>1</code> to mark duplicates as TRUE. This doesn't delete anything - it just flags them so you can review before removing.</p>
  
  <h3 class="text-xl font-semibold mb-2">When to Use Formulas vs. Remove Duplicates Button</h3>
  <table class="w-full border-collapse border border-gray-300 mb-4">
    <tr class="bg-gray-100">
      <th class="border border-gray-300 p-2 text-left">Use Formulas When</th>
      <th class="border border-gray-300 p-2 text-left">Use Button When</th>
    </tr>
    <tr>
      <td class="border border-gray-300 p-2">You need to keep original data intact</td>
      <td class="border border-gray-300 p-2">Quick one-time cleanup</td>
    </tr>
    <tr>
      <td class="border border-gray-300 p-2">Data updates regularly</td>
      <td class="border border-gray-300 p-2">Static data that won't change</td>
    </tr>
    <tr>
      <td class="border border-gray-300 p-2">Need to review duplicates first</td>
      <td class="border border-gray-300 p-2">100% sure you want to delete</td>
    </tr>
  </table>
  
  <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-4">
    <p class="text-sm text-yellow-800"><strong>⚠️ Pro Tip:</strong> Always work on a copy of your data when removing duplicates. Use UNIQUE() to extract to a new column rather than deleting original rows.</p>
  </div>
</div>
  `,
  faq: [
    {
      question: "How do I remove duplicates in Excel without deleting rows?",
      answer: "Use the UNIQUE function: =UNIQUE(A2:A100). This extracts unique values to a new location without touching your original data. Your source data stays intact while you get a clean list in another column."
    },
    {
      question: "How do I find duplicates in Excel?",
      answer: "Use COUNTIF to flag duplicates: =COUNTIF(A:A, A2)>1. This returns TRUE for any value that appears more than once. You can then filter or conditionally format these cells to review them."
    },
    {
      question: "Can I remove duplicates but keep the last occurrence?",
      answer: "Yes, but it requires a helper column. Sort your data by date descending first, then use UNIQUE() which keeps the first occurrence (which is now the latest). Alternatively, use a combination of SORT and UNIQUE: =UNIQUE(SORT(A2:C100, 3, -1)) where column 3 is your date column."
    },
    {
      question: "Why is UNIQUE not working in my Excel?",
      answer: "The UNIQUE function requires Excel 365 or Excel 2021. If you have an older version, use this alternative: In column B, enter =IF(COUNTIF($A$2:A2,A2)=1,A2,\"\") and then filter out blanks."
    },
    {
      question: "How do I count duplicate values in Excel?",
      answer: "Use =COUNTIF(range, value) to count occurrences. For example, =COUNTIF(A:A, A2) tells you how many times the value in A2 appears. If the result is greater than 1, it's a duplicate."
    }
  ]
};
```

2. /sheetmaster/app/tools/remove-duplicates/page.tsx - 页面组件

请创建一个与 /solutions/[slug]/page.tsx 类似的页面结构，但使用 REMOVE_DUPLICATES_CONFIG 作为数据源。页面应包含：
- SEO 优化的 metadata
- 工具生成器（多个工具卡片）
- Rich Content 区域
- FAQ 区域（带 Schema）

请创建完整的文件。
```

---

## 四、新增博客栏目 Prompt

### Prompt 4.1：创建博客基础结构

```
请帮我为 getsheetmaster.com 创建博客栏目。

需要创建以下文件结构：

1. /sheetmaster/lib/posts.ts - 文章数据类型和内容

```typescript
export interface BlogPost {
  slug: string;
  title: string;
  metaDescription: string;
  excerpt: string;
  content: string; // Markdown 或 HTML
  publishedAt: string;
  updatedAt?: string;
  author: string;
  category: 'tutorial' | 'comparison' | 'tips' | 'guide';
  tags: string[];
  relatedFormulas: string[]; // 关联的公式 slug
  readingTime: number; // 分钟
}

export const BLOG_POSTS: BlogPost[] = [
  // 第一篇文章示例
  {
    slug: 'vlookup-vs-xlookup-comparison',
    title: 'VLOOKUP vs XLOOKUP: Which Should You Use in 2026?',
    metaDescription: 'Compare VLOOKUP and XLOOKUP side by side. Learn when to use each function, key differences, and why XLOOKUP is the modern replacement for VLOOKUP.',
    excerpt: 'XLOOKUP was designed to fix VLOOKUP\'s limitations. But should you switch? We compare both functions with real examples.',
    category: 'comparison',
    tags: ['vlookup', 'xlookup', 'lookup functions', 'excel 365'],
    relatedFormulas: ['vlookup', 'xlookup', 'index-match'],
    publishedAt: '2026-01-31',
    author: 'SheetMaster Team',
    readingTime: 8,
    content: `
# VLOOKUP vs XLOOKUP: The Complete Comparison

If you've been using Excel for a while, you probably know VLOOKUP like the back of your hand. But Microsoft introduced XLOOKUP in 2019, calling it the "modern replacement" for VLOOKUP. So should you make the switch?

## Quick Comparison Table

| Feature | VLOOKUP | XLOOKUP |
|---------|---------|---------|
| Lookup Direction | Right only | Any direction |
| Default Match Type | Approximate | Exact |
| Error Handling | Requires IFERROR | Built-in |
| Column Position | Hardcoded number | Direct reference |
| Multiple Results | No | Yes (with array) |

## When to Use VLOOKUP

VLOOKUP still works perfectly fine for simple lookups where:
- Your lookup column is on the left
- You don't need to return multiple columns
- You're sharing files with people using older Excel versions

## When to Use XLOOKUP

Switch to XLOOKUP when:
- You need to look up values to the LEFT
- You want cleaner formulas without IFERROR wrappers
- You're working in Excel 365 or Google Sheets
- You need to return multiple values

## The Bottom Line

If you have Excel 365 or work primarily in Google Sheets, start using XLOOKUP. It's simpler, more powerful, and handles errors better. But if you share files with people on older Excel versions, stick with VLOOKUP for compatibility.

[Try our free VLOOKUP Generator](/formulas/vlookup) | [Try our XLOOKUP Generator](/formulas/xlookup)
    `
  }
];
```

2. /sheetmaster/app/blog/page.tsx - 博客列表页

```tsx
import { BLOG_POSTS } from '@/lib/posts';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Excel & Google Sheets Tutorials | SheetMaster Blog',
  description: 'Learn Excel and Google Sheets with free tutorials. VLOOKUP guides, formula comparisons, tips and tricks for beginners and experts.',
};

export default function BlogPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Excel & Google Sheets Blog</h1>
      <p className="text-xl text-gray-600 mb-8">
        Tutorials, tips, and formula comparisons to level up your spreadsheet skills.
      </p>
      
      <div className="grid gap-6">
        {BLOG_POSTS.map((post) => (
          <Link 
            key={post.slug} 
            href={`/blog/${post.slug}`}
            className="block p-6 border rounded-lg hover:shadow-lg transition-shadow"
          >
            <span className="text-sm text-green-600 font-medium uppercase">
              {post.category}
            </span>
            <h2 className="text-2xl font-bold mt-2 mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <div className="flex items-center text-sm text-gray-500">
              <span>{post.readingTime} min read</span>
              <span className="mx-2">•</span>
              <span>{post.publishedAt}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

3. /sheetmaster/app/blog/[slug]/page.tsx - 文章详情页

请创建包含以下功能的文章页：
- 动态 metadata（SEO 优化）
- 文章内容渲染（支持 Markdown）
- 相关公式工具链接
- 文章 Schema 结构化数据
- 相关文章推荐

请创建完整的文件结构。
```

---

### Prompt 4.2：创建第一批博客文章内容

```
请帮我创建 5 篇高优先级的博客文章内容，添加到 /sheetmaster/lib/posts.ts 的 BLOG_POSTS 数组中。

文章要求：
- 每篇 1200-1800 字
- 包含实际公式示例
- 包含常见问题和解决方案
- 内链到相关的公式生成器页面
- SEO 优化（关键词自然分布）

需要创建的 5 篇文章：

1. "How to Use VLOOKUP: Complete Beginner's Guide"
   - 目标关键词：how to use vlookup (60,000/月)
   - 内容：VLOOKUP 基础教程，包含 5 个实际案例
   - 内链：/formulas/vlookup, /formulas/xlookup, /formulas/index-match

2. "10 Excel Formulas Every Beginner Should Know"
   - 目标关键词：excel formulas for beginners (8,000/月)
   - 内容：SUM, AVERAGE, IF, VLOOKUP, COUNTIF 等基础公式介绍
   - 内链：对应的 10 个公式页面

3. "Why Is My VLOOKUP Returning #N/A? Complete Fix Guide"
   - 目标关键词：vlookup returning #n/a (3,600/月)
   - 内容：#N/A 错误的 7 个原因和解决方法
   - 内链：/formulas/vlookup, /formulas/iferror

4. "INDEX MATCH vs VLOOKUP: Which Should You Use?"
   - 目标关键词：index match vs vlookup (6,000/月)
   - 内容：详细对比两种方法的优缺点
   - 内链：/formulas/index-match, /formulas/vlookup

5. "SUMIF vs SUMIFS: When to Use Each Formula"
   - 目标关键词：sumif vs sumifs (2,100/月)
   - 内容：对比单条件和多条件求和
   - 内链：/formulas/sumif, /formulas/sumifs

每篇文章格式：
{
  slug: 'url-friendly-slug',
  title: 'SEO Optimized Title',
  metaDescription: '155 字符以内的描述',
  excerpt: '50字摘要',
  category: 'tutorial' | 'comparison',
  tags: ['相关标签'],
  relatedFormulas: ['公式slug'],
  publishedAt: '2026-01-31',
  author: 'SheetMaster Team',
  readingTime: 8,
  content: `完整的 Markdown 内容`
}

请生成完整的文章内容。
```

---

## 五、新增对比页面 Prompt

### Prompt 5.1：创建 VLOOKUP vs XLOOKUP 对比页

```
请帮我创建一个交互式的公式对比页面。

文件位置：/sheetmaster/app/compare/vlookup-vs-xlookup/page.tsx

目标关键词：vlookup vs xlookup (5,000/月)

页面要求：

1. SEO 优化的 metadata
   - title: "VLOOKUP vs XLOOKUP: Complete Comparison Guide | SheetMaster"
   - description: "Compare VLOOKUP and XLOOKUP side by side. See the differences, learn when to use each, and try both formulas with our free generators."

2. 页面结构：
   - Hero Section: 标题 + 简介
   - 对比表格: 功能对比（5-8 个维度）
   - 交互式示例: 同一数据用两种方法实现
   - 嵌入两个公式生成器（引用现有组件）
   - 适用场景说明
   - FAQ Section（带 Schema）
   - 相关文章推荐

3. 对比维度：
   | 功能 | VLOOKUP | XLOOKUP |
   |------|---------|---------|
   | 查找方向 | 只能向右 | 任意方向 |
   | 默认匹配类型 | 近似匹配 | 精确匹配 |
   | 错误处理 | 需要 IFERROR | 内置参数 |
   | 返回多列 | 不支持 | 支持 |
   | 语法复杂度 | 需记住列号 | 直接选择范围 |
   | Excel 版本要求 | 所有版本 | Excel 365+ |
   | Google Sheets | 支持 | 支持 |

4. 代码实现提示：
   - 复用 /formulas/[slug] 页面的公式生成器组件
   - 使用 FORMULAS 中的 vlookup 和 xlookup 配置

请创建完整的页面文件。
```

---

## 六、新增 Lead Magnet 资源页 Prompt

### Prompt 6.1：创建资源下载页面

```
请帮我创建一个 Lead Magnet 资源下载页面。

文件位置：/sheetmaster/app/resources/page.tsx

目标关键词：
- excel formulas cheat sheet (14,000/月)
- excel templates free download (8,000/月)

页面要求：

1. SEO 优化的 metadata
   - title: "Free Excel Resources: Cheat Sheets & Templates | SheetMaster"
   - description: "Download free Excel formula cheat sheets, templates, and guides. VLOOKUP reference card, data cleaning templates, and more. No signup required."

2. 页面结构：

```tsx
export default function ResourcesPage() {
  return (
    <div>
      <h1>Free Excel & Google Sheets Resources</h1>
      <p>Download cheat sheets, templates, and guides to level up your spreadsheet skills.</p>
      
      {/* 资源分类 */}
      <section>
        <h2>📄 Cheat Sheets</h2>
        {/* 资源卡片 */}
      </section>
      
      <section>
        <h2>📊 Templates</h2>
        {/* 资源卡片 */}
      </section>
      
      <section>
        <h2>📚 Guides</h2>
        {/* 资源卡片 */}
      </section>
    </div>
  );
}
```

3. 资源列表：

Cheat Sheets:
- Excel Formulas Cheat Sheet (50 formulas, 4-page PDF)
- VLOOKUP Quick Reference Card (1-page PDF)
- Date Functions Cheat Sheet (1-page PDF)

Templates:
- Data Cleaning Template (Excel file)
- Inventory Tracker Template (Excel file)
- Loan Calculator Template (Excel file)

Guides:
- VLOOKUP Complete Guide (10-page PDF)
- Beginner's Guide to Excel Formulas (15-page PDF)

4. 下载方式选项：
   - 方案 A：直接下载（无需邮箱）- 快速获取流量
   - 方案 B：邮箱订阅下载 - 建立用户列表

先实现方案 A（直接下载），在 /public/resources/ 目录下放置文件。

请创建完整的页面和组件。
```

---

## 七、新增行业专题页 Prompt

### Prompt 7.1：创建会计师 Excel 公式专题页

```
请帮我创建一个针对会计师的 Excel 公式专题页。

文件位置：/sheetmaster/app/use-cases/accountants/page.tsx

目标关键词：excel formulas for accountants (1,200/月)

页面内容：

1. SEO 优化的 metadata
   - title: "Excel Formulas for Accountants - 15 Essential Functions | SheetMaster"
   - description: "Master Excel formulas for accounting: SUMIFS for reports, VLOOKUP for data matching, PMT for loans, and more. Free tools with examples."

2. 页面结构：
   - Hero: "Excel Formulas Every Accountant Needs"
   - 痛点描述：手动计算的问题
   - 推荐公式列表（15个）+ 链接到对应工具
   - 实际应用案例（3个）
   - 可下载的会计模板（Lead Magnet）

3. 推荐公式列表：

| 公式 | 用途 | 页面链接 |
|------|------|---------|
| SUMIFS | 多条件汇总报表 | /formulas/sumifs |
| VLOOKUP | 账户代码匹配 | /formulas/vlookup |
| IF | 条件判断（过期/正常） | /formulas/if |
| PMT | 贷款月供计算 | /formulas/pmt |
| ROUND | 金额四舍五入 | /formulas/round |
| DATEDIF | 计算账龄 | /formulas/datedif |
| COUNTIFS | 统计特定条件记录数 | /formulas/countifs |
| IFERROR | 处理查找错误 | /formulas/iferror |
| TEXT | 格式化日期/金额 | /formulas/text |
| EOMONTH | 月末日期（结账用） | /formulas/eomonth |

4. 案例示例：
   - 案例1：应收账款账龄分析
   - 案例2：部门费用汇总报表
   - 案例3：银行对账自动匹配

请创建完整的页面文件。
```

---

## 八、用户体验功能 Prompt

### Prompt 8.1：添加公式收藏夹功能

```
请帮我为 getsheetmaster.com 添加公式收藏夹功能。

功能要求：
- 使用 localStorage 存储，无需注册
- 用户可以收藏生成的公式
- 在 /favorites 页面查看所有收藏
- 支持删除收藏

需要创建/修改的文件：

1. /sheetmaster/lib/favorites.ts - 收藏夹工具函数

```typescript
export interface FavoriteFormula {
  id: string;
  formulaSlug: string;
  formulaName: string;
  generatedFormula: string;
  savedAt: string;
  params: Record<string, string>;
}

export function getFavorites(): FavoriteFormula[] {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem('sheetmaster_favorites');
  return saved ? JSON.parse(saved) : [];
}

export function addFavorite(formula: Omit<FavoriteFormula, 'id' | 'savedAt'>): void {
  const favorites = getFavorites();
  const newFavorite: FavoriteFormula = {
    ...formula,
    id: Date.now().toString(),
    savedAt: new Date().toISOString()
  };
  favorites.push(newFavorite);
  localStorage.setItem('sheetmaster_favorites', JSON.stringify(favorites));
}

export function removeFavorite(id: string): void {
  const favorites = getFavorites().filter(f => f.id !== id);
  localStorage.setItem('sheetmaster_favorites', JSON.stringify(favorites));
}
```

2. /sheetmaster/components/FavoriteButton.tsx - 收藏按钮组件

```tsx
'use client';
import { useState } from 'react';
import { Star } from 'lucide-react';
import { addFavorite } from '@/lib/favorites';

interface FavoriteButtonProps {
  formulaSlug: string;
  formulaName: string;
  generatedFormula: string;
  params: Record<string, string>;
}

export default function FavoriteButton({ 
  formulaSlug, 
  formulaName, 
  generatedFormula, 
  params 
}: FavoriteButtonProps) {
  const [saved, setSaved] = useState(false);
  
  const handleSave = () => {
    addFavorite({ formulaSlug, formulaName, generatedFormula, params });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
  
  return (
    <button
      onClick={handleSave}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
        saved 
          ? 'bg-yellow-100 text-yellow-700' 
          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
      }`}
    >
      <Star className={`w-4 h-4 ${saved ? 'fill-yellow-500' : ''}`} />
      {saved ? 'Saved!' : 'Save Formula'}
    </button>
  );
}
```

3. /sheetmaster/app/favorites/page.tsx - 收藏夹页面

请创建完整的收藏夹页面，显示所有收藏的公式，支持删除和重新使用。

4. 修改公式生成器组件，在生成结果旁边添加 FavoriteButton

请创建完整的文件。
```

---

### Prompt 8.2：添加社交分享按钮

```
请帮我为公式生成结果添加社交分享功能。

需要创建 /sheetmaster/components/ShareButtons.tsx：

```tsx
'use client';

interface ShareButtonsProps {
  formula: string;
  formulaName: string;
  pageUrl: string;
}

export default function ShareButtons({ formula, formulaName, pageUrl }: ShareButtonsProps) {
  const shareText = `Just generated this ${formulaName} formula with SheetMaster 👇\n\n${formula}\n\nTry it free:`;
  
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pageUrl)}`;
  
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`;
  
  const copyLink = () => {
    navigator.clipboard.writeText(`${shareText} ${pageUrl}`);
    alert('Link copied to clipboard!');
  };
  
  return (
    <div className="flex items-center gap-2 mt-4">
      <span className="text-sm text-gray-500">Share:</span>
      
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 transition-colors"
        title="Share on Twitter"
      >
        {/* Twitter/X icon */}
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </a>
      
      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 transition-colors"
        title="Share on LinkedIn"
      >
        {/* LinkedIn icon */}
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      </a>
      
      <button
        onClick={copyLink}
        className="p-2 rounded-full bg-gray-100 hover:bg-green-100 transition-colors"
        title="Copy link"
      >
        {/* Link icon */}
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
        </svg>
      </button>
    </div>
  );
}
```

请创建完整的组件，并说明如何集成到现有的公式生成器页面中。
```

---

## 九、执行检查清单

### Week 1-2 检查清单

- [ ] 执行 Prompt 1.1：优化 5 个核心公式 Meta
- [ ] 执行 Prompt 1.2：优化首页 H1 和 Meta
- [ ] 执行 Prompt 2.1：添加 FAQ Schema
- [ ] 执行 Prompt 2.2：扩展 VLOOKUP FAQ
- [ ] 提交 sitemap 到 Google Search Console
- [ ] 设置 GA4 事件追踪

### Week 3-4 检查清单

- [ ] 执行 Prompt 3.1：创建去重工具页
- [ ] 执行 Prompt 5.1：创建对比页面
- [ ] 执行 Prompt 8.1：添加收藏夹功能
- [ ] 执行 Prompt 8.2：添加分享按钮

### Month 2 检查清单

- [ ] 执行 Prompt 4.1：创建博客基础结构
- [ ] 执行 Prompt 4.2：发布 5 篇博客文章
- [ ] 执行 Prompt 6.1：创建资源下载页

### Month 3 检查清单

- [ ] 执行 Prompt 7.1：创建行业专题页
- [ ] 创建更多对比页面
- [ ] 创建更多博客内容

---

*文档生成时间：2026-01-31*
