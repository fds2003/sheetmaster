export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  content?: string;
  /**
   * NOTE: FAQPage JSON-LD 所用的结构化问答数据。
   * 格式与文章 content 中的 FAQ 内容保持一致，
   * 搜索引擎可能将其渲染为富摘要（FAQ rich result）。
   */
  faqs?: Array<{ question: string; answer: string }>;
  /** 博客 → 公式生成器主 CTA（每篇最多一条按钮；可选次要文字链） */
  toolCta?: {
    href: string;
    label: string;
    subLink?: { href: string; label: string };
  };
}

export const BLOG_POSTS: Post[] = [
  {
    slug: 'excel-formula-get-first-word',
    title: 'Excel Formula to Get First Word from Cell (3 Easy Ways)',
    description: 'Learn how to extract the first word from a cell in Excel using LEFT, FIND, IFERROR, and the new TEXTBEFORE function in Excel 365. Step-by-step guide with examples.',
    date: '2026-03-20',
    toolCta: {
      href: '/formulas/get-first-word',
      label: 'Open Get First Word formula generator',
    },
    faqs: [
      { question: 'What is the Excel formula to get the first word?', answer: '=LEFT(A2, FIND(" ", A2)-1). This extracts everything before the first space.' },
      { question: 'How do I handle cells that only contain one word?', answer: 'Use =IFERROR(LEFT(A2, FIND(" ", A2)-1), A2). If no space is found, it returns the whole cell.' },
      { question: 'What is the easiest way in Excel 365?', answer: 'Use =TEXTBEFORE(A2, " "). It is the most modern and readable method.' },
    ],
    content: `<p>Extracting the first word from a cell is a common task when cleaning data, such as separating first names from full names or product categories from SKUs. Here are the three best ways to do it in Excel.</p>

<h2>Method 1: The Classic LEFT & FIND Formula</h2>
<p>This is the most compatible method and works in all versions of Excel (and Google Sheets).</p>
<pre><code>=LEFT(A2, FIND(" ", A2)-1)</code></pre>
<p><strong>How it works:</strong></p>
<ul>
  <li><code>FIND(" ", A2)</code> locates the position of the first space.</li>
  <li><code>-1</code> ensures we don't include the space itself.</li>
  <li><code>LEFT(A2, ...)</code> extracts that number of characters from the start.</li>
</ul>

<h2>Method 2: The "One-Word Proof" Formula (Recommended)</h2>
<p>The basic formula above will return a <code>#VALUE!</code> error if the cell contains only one word (because there is no space to find). Use <code>IFERROR</code> to fix this:</p>
<pre><code>=IFERROR(LEFT(A2, FIND(" ", A2)-1), A2)</code></pre>
<p>If no space is found, <code>IFERROR</code> simply returns the original text in <code>A2</code>.</p>

<h2>Method 3: Excel 365 — TEXTBEFORE (Cleanest)</h2>
<p>If you are using Microsoft 365 or Excel 2024, there is a much simpler function designed specifically for this:</p>
<pre><code>=TEXTBEFORE(A2, " ")</code></pre>
<p>This does exactly what it says: it returns all text before the specified delimiter (the space). If you want it to handle single words without an error, add the optional arguments:</p>
<pre><code>=TEXTBEFORE(A2, " ", , , , A2)</code></pre>

<h2>Comparison Summary</h2>
<table>
  <thead>
    <tr>
      <th>Requirement</th>
      <th>Best Formula</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Maximum Compatibility</td>
      <td><code>=LEFT(A2, FIND(" ", A2)-1)</code></td>
    </tr>
    <tr>
      <td>Handles Single Words</td>
      <td><code>=IFERROR(...)</code> Version</td>
    </tr>
    <tr>
      <td>Simplicity (Excel 365)</td>
      <td><code>=TEXTBEFORE(A2, " ")</code></td>
    </tr>
  </tbody>
</table>

<p>Need more help with text? Try our <a href="/tools/split-text">Split Text Tool</a> or our <a href="/formulas/left">LEFT Formula Generator</a>.</p>`,
  },

  // ── 新增文章（按搜索量降序） ──────────────────────────────────────────────

  {
    slug: 'calculate-percentage-increase-excel-formula',
    title: 'Calculate Percentage Increase in Excel: Formula + Examples',
    description: 'Learn the Excel formula to calculate percentage increase between two numbers. Step-by-step guide with real examples for sales, revenue, and growth tracking.',
    date: '2026-03-19',
    faqs: [
      { question: 'What is the Excel formula for percentage increase?', answer: '=(New-Old)/Old. Format the cell as Percentage (Ctrl+Shift+%) to see the % symbol.' },
      { question: 'How do I calculate year-over-year growth in Excel?', answer: 'Use =(This Year - Last Year) / Last Year. Works for any time period.' },
      { question: 'Why does my percentage show as a decimal?', answer: 'Select the cell and press Ctrl+Shift+% to apply Percentage formatting.' },
    ],
    content: `<p>Calculating percentage increase in Excel is one of the most common tasks in finance, sales reporting, and data analysis. The formula is simple once you understand it.</p>

<h2>The Basic Percentage Increase Formula</h2>
<p>The formula to calculate percentage increase between an old value and a new value is:</p>
<pre><code>=(New Value - Old Value) / Old Value</code></pre>
<p>Format the result cell as a Percentage (Ctrl+Shift+%) to display it correctly.</p>

<h2>Step-by-Step Example</h2>
<p>Say last month's sales (B2) were $10,000 and this month's (C2) are $12,500:</p>
<pre><code>=(C2-B2)/B2   → 25%</code></pre>

<h2>Calculate Percentage Increase for an Entire Column</h2>
<p>If your old values are in column B and new values in column C, enter this in D2 and drag down:</p>
<pre><code>=(C2-B2)/B2</code></pre>

<h2>Handle Negative Numbers (Avoid #DIV/0!)</h2>
<p>If the old value might be zero, wrap it with IFERROR:</p>
<pre><code>=IFERROR((C2-B2)/B2, "N/A")</code></pre>

<h2>Show Percentage Increase or Decrease with a Label</h2>
<p>Use IF to add a label:</p>
<pre><code>=IF((C2-B2)/B2>0,"▲ "&TEXT((C2-B2)/B2,"0.0%"),"▼ "&TEXT(ABS((C2-B2)/B2),"0.0%"))</code></pre>

<h2>Frequently Asked Questions</h2>
<h3>What is the Excel formula for percentage increase?</h3>
<p>=(New-Old)/Old. Format the cell as Percentage to see the % symbol.</p>
<h3>How do I calculate year-over-year growth in Excel?</h3>
<p>Same formula: =(This Year - Last Year) / Last Year. Works for any time period.</p>
<h3>Why does my percentage show as a decimal?</h3>
<p>Select the cell and press Ctrl+Shift+% to apply Percentage formatting.</p>

<p>Need more formula help? Try our <a href="/formulas/if">IF Formula Generator</a> or explore our <a href="/blog">formula guides</a> for more tips.</p>`,
  },

  {
    slug: 'excel-find-duplicates-two-columns',
    title: 'Excel Formula to Find Duplicates in Two Columns (Step-by-Step)',
    description: 'Find duplicate values across two columns in Excel using COUNTIF, VLOOKUP, and conditional formatting. Includes formulas to highlight and extract duplicates.',
    date: '2026-03-18',
    faqs: [
      { question: 'How do I find duplicates between two columns in Excel?', answer: 'Use =COUNTIF($B:$B, A2)>0 in a helper column, or use Conditional Formatting with the same formula.' },
      { question: 'What is the fastest way to compare two columns in Excel?', answer: 'Conditional Formatting is the fastest for visual review. COUNTIF is best for filtering programmatically.' },
    ],
    content: `<p>Finding duplicates across two columns is a critical skill for data cleaning. Excel gives you several approaches depending on whether you want to highlight, list, or remove duplicates.</p>

<h2>Method 1: COUNTIF — Mark Duplicates with a TRUE/FALSE Flag</h2>
<p>If Column A has your first list and Column B has the second, put this in C2:</p>
<pre><code>=COUNTIF($B:$B, A2)>0</code></pre>
<p>This returns TRUE for every value in A that also exists in B.</p>

<h2>Method 2: VLOOKUP — Find Matching Values</h2>
<pre><code>=IFERROR(VLOOKUP(A2, $B:$B, 1, 0), "Not Found")</code></pre>
<p>Shows the matched value if found, or "Not Found" if not.</p>

<h2>Method 3: Conditional Formatting — Highlight Duplicates Visually</h2>
<ol>
  <li>Select Column A (e.g., A2:A100)</li>
  <li>Go to Home → Conditional Formatting → New Rule</li>
  <li>Choose "Use a formula" and enter: <code>=COUNTIF($B:$B,A2)>0</code></li>
  <li>Pick a highlight color and click OK</li>
</ol>

<h2>Method 4: MATCH — Exact Position of Duplicate</h2>
<pre><code>=IFERROR(MATCH(A2,$B:$B,0),"No match")</code></pre>
<p>Returns the row number in Column B where the match is found.</p>

<h2>Extract Only the Duplicates (Array Formula)</h2>
<p>In Excel 365 / Google Sheets, use FILTER:</p>
<pre><code>=FILTER(A2:A100, COUNTIF(B2:B100, A2:A100)>0)</code></pre>

<h2>FAQ</h2>
<h3>How do I find duplicates between two columns in Excel?</h3>
<p>Use =COUNTIF($B:$B, A2)>0 in a helper column, or use Conditional Formatting with the same formula.</p>
<h3>What is the fastest way to compare two columns in Excel?</h3>
<p>Conditional Formatting is the fastest for visual review. COUNTIF is best for filtering programmatically.</p>

<p>Also useful: our <a href="/tools/remove-duplicates">Remove Duplicates Tool</a> and the <a href="/formulas/vlookup">VLOOKUP Generator</a>.</p>`,
  },

  {
    slug: 'calculate-business-days-excel',
    title: 'Calculate Business Days Between Two Dates in Excel (NETWORKDAYS)',
    description: 'Use the NETWORKDAYS and NETWORKDAYS.INTL functions to calculate the number of business days between two dates in Excel. Includes examples and holiday handling.',
    date: '2026-03-17',
    toolCta: {
      href: '/formulas/networkdays',
      label: 'Open NETWORKDAYS formula generator',
    },
    faqs: [
      { question: 'What is the Excel formula to calculate business days?', answer: '=NETWORKDAYS(start_date, end_date) counts workdays including both start and end dates.' },
      { question: 'Does NETWORKDAYS include the start and end date?', answer: 'Yes, both dates are included in the count if they fall on a workday.' },
      { question: 'How do I exclude holidays from NETWORKDAYS?', answer: 'Add your holiday dates as a cell range in the third argument: =NETWORKDAYS(A2, B2, holidays_range).' },
    ],
    content: `<p>Excel's NETWORKDAYS function makes it easy to count working days between two dates, automatically excluding weekends. You can also exclude custom holidays.</p>

<h2>Basic Formula: NETWORKDAYS</h2>
<pre><code>=NETWORKDAYS(start_date, end_date)</code></pre>
<p>Example: Days between Jan 1 and Jan 31, 2026 (excluding weekends):</p>
<pre><code>=NETWORKDAYS("2026-01-01", "2026-01-31")   → 22</code></pre>

<h2>Exclude Holidays Too</h2>
<p>Add a list of holiday dates in a range (e.g., E2:E10) and include it as the third argument:</p>
<pre><code>=NETWORKDAYS(A2, B2, $E$2:$E$10)</code></pre>

<h2>Custom Weekend Days: NETWORKDAYS.INTL</h2>
<p>If your work week is different (e.g., Sunday–Thursday), use NETWORKDAYS.INTL:</p>
<pre><code>=NETWORKDAYS.INTL(A2, B2, "0000011")</code></pre>
<p>The 7-character string represents Mon–Sun. "1" = weekend, "0" = workday. "0000011" means Sat+Sun are weekends.</p>

<h2>Count Business Days Excluding Only Specific Days</h2>
<table>
  <thead><tr><th>Weekend Code</th><th>Days Off</th></tr></thead>
  <tbody>
    <tr><td>1</td><td>Saturday, Sunday</td></tr>
    <tr><td>2</td><td>Sunday, Monday</td></tr>
    <tr><td>11</td><td>Sunday only</td></tr>
    <tr><td>12</td><td>Monday only</td></tr>
  </tbody>
</table>

<h2>Add Business Days to a Date (WORKDAY)</h2>
<pre><code>=WORKDAY(start_date, days, [holidays])</code></pre>
<p>Example: What date is 10 business days after today?</p>
<pre><code>=WORKDAY(TODAY(), 10)</code></pre>

<h2>FAQ</h2>
<h3>What is the Excel formula to calculate business days?</h3>
<p>=NETWORKDAYS(start_date, end_date) counts workdays including both start and end dates.</p>
<h3>Does NETWORKDAYS include the start and end date?</h3>
<p>Yes, both dates are included in the count if they fall on a workday.</p>
<h3>How do I exclude holidays from NETWORKDAYS?</h3>
<p>Add your holiday dates as a cell range in the third argument: =NETWORKDAYS(A2, B2, holidays_range).</p>

<p>For more date formulas, see our <a href="/tools/excel-age-calculator">Excel Age Calculator</a> and <a href="/blog">formula blog</a>.</p>`,
  },

  {
    slug: 'convert-minutes-to-hours-excel',
    title: 'Convert Minutes to Hours and Minutes in Excel (3 Easy Methods)',
    description: 'Learn how to convert minutes to hours and minutes in Excel using division, TEXT function, and time formatting. Works with both small and large minute values.',
    date: '2026-03-16',
    faqs: [
      { question: 'How do I convert minutes to hours in Excel?', answer: 'Divide by 60 for decimal hours (=A2/60), or divide by 1440 and format as h:mm for hours:minutes display.' },
      { question: 'How do I show time as 1h 30m in Excel?', answer: '=INT(A2/60)&"h "&MOD(A2,60)&"m"' },
      { question: 'Why does Excel show #### when I enter time?', answer: 'The column is too narrow. Widen it, or the value is negative (Excel cannot display negative times by default).' },
    ],
    content: `<p>Converting minutes to hours and minutes in Excel is simple once you know how Excel stores time internally. Here are three reliable methods.</p>

<h2>Method 1: Division (Quickest)</h2>
<p>Excel stores time as a fraction of 24 hours. To convert minutes to an Excel time value:</p>
<pre><code>=A2/1440</code></pre>
<p>Then format the cell as <strong>h:mm</strong> (Custom number format). For example, 90 minutes → 1:30.</p>

<h2>Method 2: TEXT Function (Display Only)</h2>
<p>Use TEXT to return a formatted string directly:</p>
<pre><code>=TEXT(A2/1440,"h:mm")</code></pre>
<p>Output: "1:30" as text. Good for display, but cannot be used in further calculations.</p>

<h2>Method 3: INT and MOD (Separate Hours and Minutes)</h2>
<p>To get hours and minutes as separate numbers:</p>
<pre><code>Hours:   =INT(A2/60)
Minutes: =MOD(A2,60)</code></pre>
<p>Then combine with TEXT:</p>
<pre><code>=INT(A2/60)&" hrs "&MOD(A2,60)&" mins"</code></pre>
<p>Output: "1 hrs 30 mins"</p>

<h2>Convert Large Values (Over 24 Hours)</h2>
<p>For totals over 24 hours (e.g., project tracking), use the custom format <strong>[h]:mm</strong> — the square brackets prevent the hour from resetting at 24.</p>

<h2>FAQ</h2>
<h3>How do I convert minutes to hours in Excel?</h3>
<p>Divide by 60 for decimal hours (=A2/60), or divide by 1440 and format as h:mm for hours:minutes display.</p>
<h3>How do I show time as 1h 30m in Excel?</h3>
<p>=INT(A2/60)&"h "&MOD(A2,60)&"m"</p>
<h3>Why does Excel show #### when I enter time?</h3>
<p>The column is too narrow. Widen it, or the value is negative (Excel can't display negative times by default).</p>`,
  },

  {
    slug: 'excel-capitalize-first-letter',
    title: 'Excel Formula to Capitalize First Letter Only (3 Methods)',
    description: 'Use PROPER, or a custom formula combining UPPER, LEFT, LOWER, and MID to capitalize only the first letter of a word or sentence in Excel.',
    date: '2026-03-15',
    faqs: [
      { question: 'What is the Excel formula to capitalize only the first letter?', answer: '=UPPER(LEFT(A2,1))&LOWER(MID(A2,2,LEN(A2)-1))' },
      { question: 'How do I capitalize the first letter of each word in Excel?', answer: 'Use =PROPER(A2). It capitalizes the first letter of every word.' },
      { question: 'Does Excel have a sentence case function?', answer: 'No built-in sentence case function exists. Use =UPPER(LEFT(A2,1))&LOWER(MID(A2,2,LEN(A2)-1)) instead.' },
    ],
    content: `<p>Excel has no single built-in function for "sentence case" (first letter only capitalized), but you can achieve it with a combination of text functions.</p>

<h2>Method 1: PROPER — Capitalizes Every Word</h2>
<pre><code>=PROPER(A2)</code></pre>
<p>Note: PROPER capitalizes the first letter of <em>every</em> word. "hello world" → "Hello World". Great for names, but not for sentences.</p>

<h2>Method 2: Capitalize Only the First Letter of the Entire String</h2>
<pre><code>=UPPER(LEFT(A2,1))&LOWER(MID(A2,2,LEN(A2)-1))</code></pre>
<p>Breakdown:</p>
<ul>
  <li><code>UPPER(LEFT(A2,1))</code> — takes the first character and uppercases it</li>
  <li><code>LOWER(MID(A2,2,LEN(A2)-1))</code> — lowercases everything from the second character onward</li>
</ul>
<p>Example: "hello world" → "Hello world"</p>

<h2>Method 3: Capitalize Each Word's First Letter (PROPER Alternative)</h2>
<p>PROPER is the clean option for names. To fix "mcdonald" or "o'brien" type edge cases, combine with SUBSTITUTE:</p>
<pre><code>=SUBSTITUTE(PROPER(A2),"'S","'s")</code></pre>

<h2>Capitalize First Letter After a Space (First Word Only, Custom)</h2>
<p>If you only want to capitalize the very first word and leave the rest unchanged:</p>
<pre><code>=UPPER(LEFT(TRIM(A2),1))&MID(TRIM(A2),2,LEN(TRIM(A2)))</code></pre>

<h2>FAQ</h2>
<h3>What is the Excel formula to capitalize only the first letter?</h3>
<p>=UPPER(LEFT(A2,1))&LOWER(MID(A2,2,LEN(A2)-1))</p>
<h3>How do I capitalize the first letter of each word in Excel?</h3>
<p>Use =PROPER(A2). It capitalizes the first letter of every word.</p>
<h3>Does Excel have a sentence case function?</h3>
<p>No built-in sentence case function exists. Use =UPPER(LEFT(A2,1))&LOWER(MID(A2,2,LEN(A2)-1)) instead.</p>

<p>Need more text manipulation? Try our <a href="/tools/split-text">Split Text Tool</a> or read about <a href="/blog/excel-extract-last-name">extracting last names from full names</a>.</p>`,
  },

  {
    slug: 'excel-highlight-row-contains-text',
    title: 'How to Highlight an Entire Row if a Cell Contains Text in Excel',
    description: 'Use Conditional Formatting with SEARCH or ISNUMBER+SEARCH to highlight entire rows when a cell contains specific text in Excel. Step-by-step tutorial.',
    date: '2026-03-14',
    faqs: [
      { question: 'Why does my Conditional Formatting only highlight one cell?', answer: 'Make sure you selected the entire row range before creating the rule, and that the column reference uses a $ before the letter (e.g., $B2, not B2).' },
      { question: 'How do I highlight a row if a cell is not empty?', answer: 'Use the formula =$B2<>"" to highlight rows where column B has any value.' },
      { question: 'How do I highlight rows with multiple conditions?', answer: 'Use AND() or OR() inside your formula: =AND($B2="Done", $C2>10)' },
    ],
    content: `<p>Highlighting entire rows based on a cell's content makes data patterns immediately visible. Here's how to do it with Conditional Formatting.</p>

<h2>Step 1: Select Your Data Range</h2>
<p>Select the full range you want to potentially highlight (e.g., A2:E100, not just one column).</p>

<h2>Step 2: Open Conditional Formatting</h2>
<p>Go to <strong>Home → Conditional Formatting → New Rule → Use a formula to determine which cells to format</strong>.</p>

<h2>Step 3: Write the Formula</h2>
<p>To highlight rows where column B contains the word "Pending":</p>
<pre><code>=$B2="Pending"</code></pre>
<p>Lock the column with $ but leave the row number free — this applies across the entire row.</p>

<h2>Highlight Row if Cell Contains Partial Text (Case-Insensitive)</h2>
<pre><code>=ISNUMBER(SEARCH("pending",$B2))</code></pre>
<p>SEARCH is case-insensitive and returns the position of the text, or an error if not found. ISNUMBER converts that to TRUE/FALSE.</p>

<h2>Highlight Row if Cell Contains Any of Multiple Words</h2>
<pre><code>=OR(ISNUMBER(SEARCH("Pending",$B2)),ISNUMBER(SEARCH("Review",$B2)))</code></pre>

<h2>Highlight Row Based on Multiple Column Conditions</h2>
<pre><code>=AND($C2="High",$D2<TODAY())</code></pre>
<p>Highlights rows where priority is "High" AND the due date has passed.</p>

<h2>Step 4: Choose Your Highlight Color</h2>
<p>Click <strong>Format → Fill</strong>, pick a color, and click OK twice.</p>

<h2>FAQ</h2>
<h3>Why does my Conditional Formatting only highlight one cell?</h3>
<p>Make sure you selected the entire row range before creating the rule, and that the column reference uses a $ before the letter (e.g., $B2, not B2).</p>
<h3>How do I highlight a row if a cell is not empty?</h3>
<p>Use the formula =$B2&lt;&gt;"" to highlight rows where column B has any value.</p>
<h3>How do I highlight rows with multiple conditions?</h3>
<p>Use AND() or OR() inside your formula: =AND($B2="Done", $C2>10)</p>`,
  },

  {
    slug: 'excel-weighted-grade-formula',
    title: 'Excel Weighted Grade Formula: Calculate Weighted Average Easily',
    description: 'Learn how to calculate weighted grades in Excel using SUMPRODUCT. Includes examples for courses with different credit hours or assignment weights.',
    date: '2026-03-13',
    faqs: [
      { question: 'What is the Excel formula for weighted average grade?', answer: '=SUMPRODUCT(scores, weights)/SUM(weights)' },
      { question: 'How do I calculate GPA in Excel?', answer: 'Assign numeric GPA points (A=4.0, B=3.0, etc.) and multiply by credit hours, then sum and divide by total credits.' },
      { question: 'What is the difference between AVERAGE and weighted average?', answer: 'AVERAGE treats all values equally. Weighted average multiplies each value by its importance before averaging.' },
    ],
    content: `<p>A weighted grade gives more importance to some scores than others — for example, a final exam worth 40% vs. homework worth 10%. Excel's SUMPRODUCT function handles this perfectly.</p>

<h2>The SUMPRODUCT Formula for Weighted Grades</h2>
<pre><code>=SUMPRODUCT(grades_range, weights_range) / SUM(weights_range)</code></pre>

<h2>Example: Weighted Course Grade</h2>
<p>Say your assignments are:</p>
<table>
  <thead><tr><th>Assignment</th><th>Score</th><th>Weight (%)</th></tr></thead>
  <tbody>
    <tr><td>Homework</td><td>85</td><td>20</td></tr>
    <tr><td>Midterm</td><td>78</td><td>30</td></tr>
    <tr><td>Final Exam</td><td>92</td><td>50</td></tr>
  </tbody>
</table>
<p>Put scores in B2:B4 and weights in C2:C4. The weighted average formula:</p>
<pre><code>=SUMPRODUCT(B2:B4, C2:C4) / SUM(C2:C4)   → 86.5</code></pre>

<h2>Assign Letter Grades with IFS</h2>
<pre><code>=IFS(A2>=90,"A", A2>=80,"B", A2>=70,"C", A2>=60,"D", TRUE,"F")</code></pre>

<h2>When Weights Don't Add Up to 100%</h2>
<p>Dividing by SUM(weights) automatically normalizes — so even if weights sum to 80%, the formula still gives the correct weighted average.</p>

<h2>FAQ</h2>
<h3>What is the Excel formula for weighted average grade?</h3>
<p>=SUMPRODUCT(scores, weights)/SUM(weights)</p>
<h3>How do I calculate GPA in Excel?</h3>
<p>Assign numeric GPA points (A=4.0, B=3.0, etc.) and multiply by credit hours, then sum and divide by total credits. See our <a href="/tools/gpa-calculator-excel">GPA Calculator tool</a>.</p>
<h3>What is the difference between AVERAGE and weighted average?</h3>
<p>AVERAGE treats all values equally. Weighted average multiplies each value by its importance before averaging.</p>

<p>Also try our <a href="/tools/excel-gradebook-template">Excel Gradebook Template for Teachers</a>.</p>`,
  },

  {
    slug: 'excel-pass-fail-percentage-formula',
    title: 'Excel Formula for Pass or Fail Based on Percentage (IF Function)',
    description: 'Use the IF function in Excel to automatically show Pass or Fail based on a percentage score. Includes examples with custom thresholds and letter grades.',
    date: '2026-03-12',
    faqs: [
      { question: 'What Excel formula shows Pass or Fail?', answer: '=IF(A2>=60,"Pass","Fail") — adjust 60 to your threshold.' },
      { question: 'Can I use Pass/Fail with a percentage cell?', answer: 'Yes. If A2 already contains a percentage like 72%, use =IF(A2>=60%,"Pass","Fail") or =IF(A2>=0.6,"Pass","Fail").' },
      { question: 'How do I use IFS for multiple grade levels?', answer: '=IFS(A2>=90,"A",A2>=80,"B",A2>=70,"C",A2>=60,"D",TRUE,"F")' },
    ],
    content: `<p>The Excel IF function is perfect for automatically labeling scores as "Pass" or "Fail" based on a percentage threshold. Here's how to set it up.</p>

<h2>Basic Pass/Fail Formula</h2>
<pre><code>=IF(A2>=60,"Pass","Fail")</code></pre>
<p>If the score in A2 is 60 or above, it returns "Pass". Otherwise "Fail". Change 60 to your threshold.</p>

<h2>Pass/Fail Based on Percentage in Another Cell</h2>
<p>If your score is raw (e.g., 45 out of 75) and the passing mark is 60%:</p>
<pre><code>=IF(A2/B2>=0.6,"Pass","Fail")</code></pre>
<p>Where A2 is the score and B2 is the total marks.</p>

<h2>Show Percentage AND Pass/Fail Together</h2>
<pre><code>=TEXT(A2/B2,"0%")&" - "&IF(A2/B2>=0.6,"Pass","Fail")</code></pre>
<p>Output: "72% - Pass"</p>

<h2>Multiple Thresholds: Distinction / Merit / Pass / Fail</h2>
<pre><code>=IFS(A2>=80,"Distinction", A2>=70,"Merit", A2>=60,"Pass", TRUE,"Fail")</code></pre>

<h2>Conditional Formatting: Color Pass Green, Fail Red</h2>
<ol>
  <li>Select your Pass/Fail column</li>
  <li>Home → Conditional Formatting → Highlight Cells Rules → Text that Contains</li>
  <li>Type "Pass" → choose green fill; repeat with "Fail" → red fill</li>
</ol>

<h2>FAQ</h2>
<h3>What Excel formula shows Pass or Fail?</h3>
<p>=IF(A2>=60,"Pass","Fail") — adjust 60 to your threshold.</p>
<h3>Can I use Pass/Fail with a percentage cell?</h3>
<p>Yes. If A2 already contains a percentage like 72%, use =IF(A2>=60%,"Pass","Fail") or =IF(A2>=0.6,"Pass","Fail").</p>
<h3>How do I use IFS for multiple grade levels?</h3>
<p>=IFS(A2>=90,"A",A2>=80,"B",A2>=70,"C",A2>=60,"D",TRUE,"F")</p>

<p>Related: <a href="/blog/excel-weighted-grade-formula">Excel Weighted Grade Formula</a> and <a href="/tools/excel-gradebook-template">Gradebook Template for Teachers</a>.</p>`,
  },

  {
    slug: 'excel-extract-last-name',
    title: 'Excel Formula to Extract Last Name from Full Name',
    description: 'Use Excel text formulas (RIGHT, LEN, FIND, SUBSTITUTE) to extract the last name from a full name. Works with "First Last" and "Last, First" formats.',
    date: '2026-03-11',
    faqs: [
      { question: 'How do I extract the last name from a full name in Excel?', answer: '=RIGHT(A2, LEN(A2)-FIND(" ",A2)) works for "First Last" format.' },
      { question: 'How do I split first and last name into separate columns?', answer: 'Use Data → Text to Columns → Delimited → Space. Or use Flash Fill (Ctrl+E).' },
      { question: 'What if the name has a middle name?', answer: 'Use the SUBSTITUTE formula that finds the last space, or use TEXTSPLIT in Excel 365.' },
    ],
    content: `<p>Splitting names in Excel is a common data cleaning task. Here are formulas for the most common name formats.</p>

<h2>Format: "First Last" — Extract Last Name</h2>
<pre><code>=RIGHT(A2, LEN(A2)-FIND(" ",A2))</code></pre>
<p>This finds the space, then extracts everything to the right of it.</p>

<h2>Format: "First Middle Last" — Extract Last Name Only</h2>
<pre><code>=RIGHT(A2, LEN(A2)-FIND("*",SUBSTITUTE(A2," ","*",LEN(A2)-LEN(SUBSTITUTE(A2," ","")))))</code></pre>
<p>This replaces the <em>last</em> space with a marker (*) and extracts everything after it. Works for any number of name parts.</p>

<h2>Format: "Last, First" — Extract Last Name</h2>
<pre><code>=LEFT(A2, FIND(",",A2)-1)</code></pre>

<h2>Extract First Name Too</h2>
<pre><code>=LEFT(A2, FIND(" ",A2)-1)</code></pre>

<h2>Excel 365: Use TEXTSPLIT (Easiest Method)</h2>
<pre><code>=TEXTSPLIT(A2," ")</code></pre>
<p>This splits the name into separate cells by space. For the last element, combine with INDEX:</p>
<pre><code>=INDEX(TEXTSPLIT(A2," "),COUNTA(TEXTSPLIT(A2," ")))</code></pre>

<h2>Flash Fill (No Formula Needed)</h2>
<p>Type the last name of the first entry in an adjacent column, then press Ctrl+E. Excel will auto-fill the pattern.</p>

<h2>FAQ</h2>
<h3>How do I extract the last name from a full name in Excel?</h3>
<p>=RIGHT(A2, LEN(A2)-FIND(" ",A2)) works for "First Last" format.</p>
<h3>How do I split first and last name into separate columns?</h3>
<p>Use Data → Text to Columns → Delimited → Space. Or use Flash Fill (Ctrl+E).</p>
<h3>What if the name has a middle name?</h3>
<p>Use the SUBSTITUTE formula above that finds the last space, or use TEXTSPLIT in Excel 365.</p>

<p>Related: <a href="/blog/excel-capitalize-first-letter">Capitalize First Letter in Excel</a> and <a href="/blog/excel-extract-text-between-characters">Extract Text Between Characters</a>.</p>`,
  },

  {
    slug: 'excel-extract-text-between-characters',
    title: 'Excel Extract Text Between Two Characters (MID + FIND Formula)',
    description: 'Use Excel formulas with MID, FIND, and SEARCH to extract text between two characters like brackets, parentheses, or custom delimiters.',
    date: '2026-03-10',
    faqs: [
      { question: 'How do I extract text between two characters in Excel?', answer: 'Use =MID(A2, FIND(char1,A2)+1, FIND(char2,A2)-FIND(char1,A2)-1)' },
      { question: 'What if there are multiple occurrences of the delimiter?', answer: 'FIND returns the first occurrence. Use FIND with a start position argument to find the second: FIND(char, A2, FIND(char,A2)+1)' },
      { question: 'Is there an easier way in Excel 365?', answer: 'Yes: =TEXTBEFORE(TEXTAFTER(A2, open_char), close_char)' },
    ],
    content: `<p>Extracting text that appears between two specific characters (like brackets, parentheses, or custom delimiters) is a common parsing task. Here's how to do it in Excel.</p>

<h2>Extract Text Between Two Identical Characters</h2>
<p>To extract text between two asterisks in "Order *ABC123* confirmed":</p>
<pre><code>=MID(A2, FIND("*",A2)+1, FIND("*",A2,FIND("*",A2)+1)-FIND("*",A2)-1)</code></pre>

<h2>Extract Text Between Parentheses ( )</h2>
<pre><code>=MID(A2, FIND("(",A2)+1, FIND(")",A2)-FIND("(",A2)-1)</code></pre>
<p>Example: "Product (XYZ-001) Available" → "XYZ-001"</p>

<h2>Extract Text Between Square Brackets [ ]</h2>
<pre><code>=MID(A2, FIND("[",A2)+1, FIND("]",A2)-FIND("[",A2)-1)</code></pre>

<h2>Extract Text Between Two Different Characters</h2>
<p>To extract text between "&lt;" and "&gt;" (HTML-style tags):</p>
<pre><code>=MID(A2, FIND("<",A2)+1, FIND(">",A2)-FIND("<",A2)-1)</code></pre>

<h2>Handle Missing Delimiters with IFERROR</h2>
<pre><code>=IFERROR(MID(A2, FIND("(",A2)+1, FIND(")",A2)-FIND("(",A2)-1), "")</code></pre>
<p>Returns blank if the delimiter isn't found, preventing ugly #VALUE! errors.</p>

<h2>Excel 365: TEXTBEFORE and TEXTAFTER (Cleaner)</h2>
<pre><code>=TEXTBEFORE(TEXTAFTER(A2,"("),")")</code></pre>
<p>Much more readable — TEXTAFTER extracts after "(", then TEXTBEFORE cuts before ")".</p>

<h2>FAQ</h2>
<h3>How do I extract text between two characters in Excel?</h3>
<p>Use =MID(A2, FIND(char1,A2)+1, FIND(char2,A2)-FIND(char1,A2)-1)</p>
<h3>What if there are multiple occurrences of the delimiter?</h3>
<p>FIND returns the first occurrence. Use FIND with a start position argument to find the second: FIND(char, A2, FIND(char,A2)+1)</p>
<h3>Is there an easier way in Excel 365?</h3>
<p>Yes: =TEXTBEFORE(TEXTAFTER(A2, open_char), close_char)</p>

<p>Related: <a href="/blog/excel-extract-last-name">Extract Last Name from Full Name</a> and <a href="/blog/excel-extract-domain-from-email">Extract Domain from Email</a>.</p>`,
  },

  {
    slug: 'excel-extract-domain-from-email',
    title: 'Excel Formula to Extract Domain from Email Address',
    description: 'Use Excel text formulas (RIGHT, LEN, FIND) or TEXTAFTER to extract the domain name from an email address. Includes examples and error handling.',
    date: '2026-03-09',
    faqs: [
      { question: 'How do I extract the domain from an email in Excel?', answer: '=RIGHT(A2, LEN(A2)-FIND("@",A2)) returns "example.com" from "user@example.com".' },
      { question: 'What Excel version has TEXTAFTER?', answer: 'TEXTAFTER is available in Excel 365 (Microsoft 365 subscription) and Excel 2024.' },
      { question: 'How can I remove duplicate domains after extracting them?', answer: 'Use Data → Remove Duplicates in Excel, or the Remove Duplicates tool on the SheetMaster website.' },
    ],
    content: `<p>Extracting the domain part from email addresses is a common data preparation task in marketing and CRM work. Excel makes it easy with text functions.</p>

<h2>Basic Formula: Extract Domain After @</h2>
<pre><code>=RIGHT(A2, LEN(A2)-FIND("@",A2))</code></pre>
<p>Example: "john@example.com" → "example.com"</p>

<h2>Excel 365: TEXTAFTER (Cleanest Method)</h2>
<pre><code>=TEXTAFTER(A2,"@")</code></pre>
<p>Extracts everything after the @ symbol. Simple and readable.</p>

<h2>Extract Domain Without TLD (e.g., "example" from "example.com")</h2>
<pre><code>=MID(A2, FIND("@",A2)+1, FIND(".",A2,FIND("@",A2))-FIND("@",A2)-1)</code></pre>
<p>Gets the text between @ and the next dot.</p>

<h2>Handle Missing @ Symbol</h2>
<pre><code>=IFERROR(RIGHT(A2, LEN(A2)-FIND("@",A2)), "Invalid email")</code></pre>

<h2>Extract for Multiple Emails (Array Use)</h2>
<p>These formulas work for an entire column — just drag down from the first cell.</p>

<h2>Count Emails by Domain</h2>
<p>Once you've extracted domains, use COUNTIF:</p>
<pre><code>=COUNTIF($B:$B, "gmail.com")</code></pre>

<h2>FAQ</h2>
<h3>How do I extract the domain from an email in Excel?</h3>
<p>=RIGHT(A2, LEN(A2)-FIND("@",A2)) returns "example.com" from "user@example.com".</p>
<h3>What Excel version has TEXTAFTER?</h3>
<p>TEXTAFTER is available in Excel 365 (Microsoft 365 subscription) and Excel 2024.</p>
<h3>How can I remove duplicate domains after extracting them?</h3>
<p>Use our <a href="/tools/remove-duplicates">Remove Duplicates Tool</a> or Data → Remove Duplicates in Excel.</p>

<p>Related: <a href="/blog/excel-extract-text-between-characters">Extract Text Between Characters</a> and <a href="/blog/excel-extract-last-name">Extract Last Name from Full Name</a>.</p>`,
  },

  {
    slug: 'excel-countdown-timer-formula',
    title: 'Excel Countdown Timer Formula: Days, Hours, and Minutes Until a Date',
    description: 'Build an Excel countdown timer using TODAY(), NOW(), and text formulas. Count days, hours, and minutes remaining until a deadline or event.',
    date: '2026-03-08',
    faqs: [
      { question: 'How do I create a countdown timer in Excel?', answer: 'Use =A2-TODAY() for days remaining, or =INT(A2-NOW())&" days, "&HOUR(A2-NOW())&" hrs" for a detailed countdown.' },
      { question: 'Does Excel update the countdown automatically?', answer: 'Only when the workbook recalculates. TODAY() updates on open; use F9 to force update for NOW().' },
      { question: 'How do I count only working days in the countdown?', answer: '=NETWORKDAYS(TODAY(), A2)-1 counts remaining business days excluding weekends.' },
    ],
    content: `<p>While Excel isn't a real-time clock, you can build powerful countdown formulas that show the time remaining until any future date — perfect for project deadlines, event planning, and expiration tracking.</p>

<h2>Days Remaining Until a Date</h2>
<pre><code>=A2-TODAY()</code></pre>
<p>Where A2 is your target date. Format the result as a Number (not Date) to see the number of days. Negative values mean the date has passed.</p>

<h2>Days, Hours, and Minutes Remaining (Text Display)</h2>
<pre><code>=INT(A2-NOW())&" days, "&HOUR(A2-NOW())&" hrs, "&MINUTE(A2-NOW())&" min"</code></pre>
<p>Example output: "14 days, 3 hrs, 27 min"</p>
<p>Note: This uses NOW() which updates whenever the sheet recalculates (on open or F9).</p>

<h2>Countdown in Business Days</h2>
<pre><code>=NETWORKDAYS(TODAY(),A2)-1</code></pre>
<p>Subtract 1 because NETWORKDAYS includes today.</p>

<h2>Show "Overdue" If the Date Has Passed</h2>
<pre><code>=IF(A2<TODAY(),"Overdue by "&TODAY()-A2&" days", A2-TODAY()&" days remaining")</code></pre>

<h2>Countdown Clock (Requires Manual Refresh)</h2>
<p>Excel doesn't auto-refresh in real time. Press F9 or Ctrl+Alt+F9 to force recalculation and update NOW()-based formulas.</p>

<h2>Conditional Formatting: Color Code by Urgency</h2>
<ul>
  <li>Red: =A2-TODAY()&lt;=3 (3 days or less)</li>
  <li>Yellow: =AND(A2-TODAY()&gt;3, A2-TODAY()&lt;=7)</li>
  <li>Green: =A2-TODAY()&gt;7</li>
</ul>

<h2>FAQ</h2>
<h3>How do I create a countdown timer in Excel?</h3>
<p>Use =A2-TODAY() for days remaining, or =INT(A2-NOW())&" days, "&HOUR(A2-NOW())&" hrs" for a detailed countdown.</p>
<h3>Does Excel update the countdown automatically?</h3>
<p>Only when the workbook recalculates. TODAY() updates on open; use F9 to force update for NOW().</p>
<h3>How do I count only working days in the countdown?</h3>
<p>=NETWORKDAYS(TODAY(), A2)-1 counts remaining business days excluding weekends.</p>

<p>Related: <a href="/blog/calculate-business-days-excel">Calculate Business Days Between Dates</a> and <a href="/tools/excel-age-calculator">Excel Age Calculator</a>.</p>`,
  },

  // ── 原有文章 ─────────────────────────────────────────────────────────────

  {
    slug: 'vlookup-vs-xlookup-2026',
    title: 'VLOOKUP vs XLOOKUP: Which Should You Use in 2026?',
    description: 'Compare VLOOKUP and XLOOKUP: syntax, use cases, and when to use each in Excel and Google Sheets.',
    date: '2026-01-15',
    toolCta: {
      href: '/formulas/xlookup',
      label: 'Open XLOOKUP formula generator',
      subLink: { href: '/compare/vlookup-vs-xlookup', label: 'Side-by-side comparison page' },
    },
    content: '<p>VLOOKUP has been the go-to lookup function for decades, but XLOOKUP is now available in Excel 365 and Google Sheets. This guide compares both so you can choose the right one.</p><h2>Key differences</h2><p>VLOOKUP only looks right and requires a column index number. XLOOKUP looks in any direction, uses separate lookup and return arrays, and supports built-in if-not-found.</p><p>Use our <a href="/formulas/vlookup">VLOOKUP Generator</a> or <a href="/formulas/xlookup">XLOOKUP Generator</a> to build formulas instantly.</p>',
  },
  {
    slug: '5-excel-formulas-clean-data',
    title: '5 Excel Formulas That Clean Messy Data 10x Faster',
    description: 'Use TRIM, PROPER, SUBSTITUTE, and more to clean text and data in Excel and Google Sheets.',
    date: '2026-01-12',
    content: '<p>Messy data slows you down. These five formulas help you clean text, fix capitalization, and remove extra spaces in seconds.</p><p>Try our <a href="/solutions/data-cleaning">Data Cleaning tools</a> for email extraction, domain extraction, and text normalization.</p>',
  },
  {
    slug: 'index-match-complete-guide',
    title: 'INDEX MATCH Complete Guide: Why It\'s More Powerful Than VLOOKUP',
    description: 'Learn INDEX MATCH for Excel and Google Sheets: look left, avoid column index errors, and build flexible lookups.',
    date: '2026-01-10',
    toolCta: {
      href: '/formulas/index-match',
      label: 'Open INDEX MATCH formula generator',
    },
    content: '<p>INDEX MATCH combines INDEX and MATCH to look up values in any column and return from any other column—including to the left.</p><p>Generate your formula with our <a href="/formulas/index-match">INDEX MATCH Generator</a>.</p>',
  },
  {
    slug: 'excel-formulas-ecommerce-inventory',
    title: 'Excel Formulas for E-commerce Inventory Management',
    description: 'SKU lookup, reorder alerts, and inventory formulas for Excel and Google Sheets.',
    date: '2026-01-08',
    content: '<p>Manage inventory with VLOOKUP for SKU lookup, IF for reorder alerts, and SUMIF for totals by product.</p><p>See our <a href="/solutions/inventory-manager">Inventory Manager</a> solution for ready-made tools.</p>',
  },
  {
    slug: 'sumif-vs-sumifs',
    title: 'SUMIF vs SUMIFS: When to Use Each (+Examples)',
    description:
      'SUMIF vs SUMIFS explained: comparison table, syntax, and examples. When one condition is enough vs when you need SUMIFS—plus our SUMIFS formula generator.',
    date: '2026-01-05',
    toolCta: {
      href: '/formulas/sumifs',
      label: 'Open SUMIFS formula generator',
    },
    content: `<p>If you are comparing <strong>SUMIF vs SUMIFS</strong> for a report or dashboard, the rule is simple: <strong>SUMIF</strong> supports one condition; <strong>SUMIFS</strong> supports one or more conditions and uses a clearer argument order for new formulas. Both work in Excel and Google Sheets.</p>

<h2>SUMIF vs SUMIFS: comparison table</h2>
<table>
  <thead>
    <tr>
      <th>Topic</th>
      <th>SUMIF</th>
      <th>SUMIFS</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Number of conditions</td>
      <td>Exactly one</td>
      <td>One or more (pairs)</td>
    </tr>
    <tr>
      <td>Syntax shape</td>
      <td><code>range, criteria, [sum_range]</code></td>
      <td><code>sum_range, criteria_range1, criteria1, …</code></td>
    </tr>
    <tr>
      <td>Typical use</td>
      <td>Sum where one column matches (e.g. status = Paid)</td>
      <td>Sum where region, month, and product must all match</td>
    </tr>
    <tr>
      <td>Logic between criteria</td>
      <td>N/A (single test)</td>
      <td>All criteria must pass (AND). Use multiple formulas or helpers for OR.</td>
    </tr>
  </tbody>
</table>

<h2>When to use SUMIF</h2>
<p>Use SUMIF when a single column decides inclusion—for example, sum amounts in column C where column B equals <code>"Paid"</code>:</p>
<pre><code>=SUMIF(B:B, "Paid", C:C)</code></pre>

<h2>When to use SUMIFS</h2>
<p>Use SUMIFS when you filter on two or more columns at once. Example: sum column D where column A is <code>"West"</code> and column B is <code>"Jan"</code>:</p>
<pre><code>=SUMIFS(D:D, A:A, "West", B:B, "Jan")</code></pre>
<p>You can also use SUMIFS with <strong>only one</strong> criteria pair; many teams standardize on SUMIFS everywhere so argument order stays consistent.</p>

<h2>Syntax cheat sheet</h2>
<p><strong>SUMIF:</strong> <code>=SUMIF(range, criteria, [sum_range])</code> — if <code>sum_range</code> is omitted, Excel sums <code>range</code>.</p>
<p><strong>SUMIFS:</strong> <code>=SUMIFS(sum_range, criteria_range1, criteria1, [criteria_range2, criteria2], …)</code> — notice <code>sum_range</code> comes first.</p>

<h2>Next step: build SUMIFS without typos</h2>
<p>For fields you can fill in and a copy-ready formula, open our <a href="/formulas/sumifs">SUMIFS formula generator</a>. It follows the same <strong>excel sumifs syntax</strong> order Excel expects: sum range first, then repeating criteria range / criteria pairs.</p>
<p>Need only one condition? You can still use the <a href="/formulas/sumif">SUMIF generator</a>—or stay on <a href="/formulas/sumifs">SUMIFS</a> with a single pair for consistency.</p>`,
  },
];
