export type FormulaInputType = 'text' | 'number' | 'range' | 'boolean' | 'select';

export interface FormulaInput {
    id: string;
    label: string;
    placeholder?: string;
    type: FormulaInputType;
    options?: { label: string; value: string }[];
    tooltip?: string;
}

export interface FormulaStep {
    name: string;
    text: string;
    image?: string;
    url?: string;
}

export interface FormulaFAQ {
    question: string;
    answer: string;
}

export interface FormulaCommonError {
    title?: string;
    causes: string[];
    fixes: string[];
}

export interface FormulaConfig {
    slug: string;
    title: string;
    metaDescription: string;
    excelFunction: string;
    category: string;
    description: string;
    inputs: FormulaInput[];
    generate: (params: Record<string, string>) => string;
    richContent?: string;
    howToSteps?: FormulaStep[];
    faq?: FormulaFAQ[];
    commonErrors?: FormulaCommonError[];
    formulaLogicBreakdown?: { argument: string; explanation: string; example: string }[];
    relatedTools?: string[];
}

export const FORMULAS: FormulaConfig[] = [
    // 1. VLOOKUP
    {
        slug: 'vlookup',
        title: "VLOOKUP in Excel: Step-by-Step Formula & Generator",
        metaDescription: "Generate VLOOKUP formulas to search table columns vertically. Fix #N/A errors and find exact matches with our free interactive formula builder.",
        excelFunction: 'VLOOKUP',
        category: 'Lookup',
        description: 'Looks for a value in the leftmost column of a table, and then returns a value in the same row from a column you specify.',
        inputs: [
            { id: 'lookup_value', label: 'Value to Look For', type: 'text', placeholder: 'e.g., A2' },
            { id: 'table_array', label: 'Search Range', type: 'range', placeholder: 'e.g., Sheet2!A:E' },
            { id: 'col_index', label: 'Return Column Number', type: 'number', placeholder: 'e.g., 3' },
            {
                id: 'range_lookup',
                label: 'Match Type',
                type: 'select',
                options: [
                    { label: 'Exact Match (False)', value: 'FALSE' },
                    { label: 'Approximate Match (True)', value: 'TRUE' }
                ]
            },
        ],
        generate: (p) => `=VLOOKUP(${p.lookup_value || 'lookup_value'}, ${p.table_array || 'table_array'}, ${p.col_index || 'col_index'}, ${p.range_lookup || 'FALSE'})`,
        richContent: `
   <div class="prose prose-slate max-w-none mt-12 border-t pt-8 text-left">
     <h2 class="text-2xl font-bold mb-4">How to Use VLOOKUP in Excel: Step-by-Step Guide</h2>
     <p class="mb-4">The <strong>VLOOKUP</strong> (Vertical Lookup) function is the backbone of data merging in Excel and Google Sheets. Whether you are reconciling invoices, searching for employee IDs, or matching product prices, mastering VLOOKUP will save you hours of manual work.</p>

     <h3 class="text-xl font-semibold mb-2">VLOOKUP Syntax Explained</h3>
     <p class="mb-4">The VLOOKUP formula follows this structure:</p>
     <pre class="bg-gray-50 p-3 rounded-lg text-sm mb-4"><code>=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])</code></pre>
     <ul class="list-disc pl-5 mb-4">
       <li><strong>lookup_value</strong> — the value you want to search for (e.g., <code>A2</code> or <code>"Apple"</code>)</li>
       <li><strong>table_array</strong> — the entire range containing both the lookup column and the result column (e.g., <code>$A$2:$D$100</code>)</li>
       <li><strong>col_index_num</strong> — the column number in the table_array that holds the return value (1 = first column, 2 = second, etc.)</li>
       <li><strong>range_lookup</strong> — <code>FALSE</code> for exact match, <code>TRUE</code> for approximate match. Always use <code>FALSE</code> for IDs and exact values.</li>
     </ul>

     <h3 class="text-xl font-semibold mb-2">Real-World VLOOKUP Example: Employee Lookup</h3>
     <p class="mb-4">Imagine you have an employee table in cells <code>A2:D10</code>:</p>
     <pre class="bg-gray-50 p-3 rounded-lg text-sm mb-4"><code>| A          | B          | C          | D          |
|------------|------------|------------|------------|
| EmployeeID | FirstName  | LastName   | Department |
| 101        | Alice      | Johnson    | Sales      |
| 102        | Bob        | Smith      | Marketing  |
| 103        | Carol      | Davis      | Engineering|</code></pre>
     <p class="mb-4">To find Carol's department using her employee ID <code>103</code> in cell <code>G2</code>:</p>
     <pre class="bg-gray-50 p-3 rounded-lg text-sm mb-4"><code>=VLOOKUP(G2, A2:D10, 4, FALSE)</code></pre>
     <p class="mb-4">This tells Excel: "Find <code>103</code> in column A, go to the 4th column of the range (column D), and return the value from that row." The result is <strong>"Engineering"</strong>.</p>

     <h3 class="text-xl font-semibold mb-2">Step-by-Step VLOOKUP Walkthrough</h3>
     <ol class="list-decimal pl-5 mb-4 space-y-2">
       <li><strong>Identify the lookup value.</strong> Put the value you want to search for in a cell (e.g., type <code>103</code> into <code>G2</code>).</li>
       <li><strong>Select the table array.</strong> Highlight the entire data range including both the lookup column and the return column. Always use absolute references like <code>$A$2:$D$10</code> so the range doesn't shift when you copy the formula.</li>
       <li><strong>Count the return column.</strong> In our table, Department is the 4th column of the range <code>A2:D10</code>, so <code>col_index_num = 4</code>.</li>
       <li><strong>Set match type to FALSE.</strong> For exact matches on IDs, names, or codes, always use <code>FALSE</code>. Use <code>TRUE</code> only for grade brackets, tax tables, or price tiers where you want the nearest match.</li>
       <li><strong>Press Enter and verify.</strong> The formula returns the department. Copy it down to look up all employees at once.</li>
     </ol>

     <h3 class="text-xl font-semibold mb-2">Common Pitfalls to Avoid</h3>
     <ul class="list-disc pl-5 mb-4">
       <li><strong>The Left-to-Right Rule:</strong> VLOOKUP can only search for a value in the leftmost column of your range. If your lookup value is to the right of your result, VLOOKUP won't work — use XLOOKUP or INDEX/MATCH instead.</li>
       <li><strong>Approximate vs. Exact Match:</strong> Always use <code>FALSE</code> or <code>0</code> as the last argument for exact matches (IDs, names, SKUs). Using <code>TRUE</code> on unsorted data returns random-looking results.</li>
       <li><strong>Static Column Index:</strong> Hardcoding <code>3</code> as col_index_num breaks if you insert a new column in the table_array. Use named ranges or switch to XLOOKUP for dynamic column references.</li>
       <li><strong>Missing Absolute References:</strong> Without <code>$</code> signs (e.g., <code>$A$2:$D$10</code>), copying the formula down shifts the table array and produces wrong results.</li>
       <li><strong>Data Type Mismatch:</strong> A number stored as text (e.g., <code>"123"</code> vs <code>123</code>) will cause #N/A. Use <code>VALUE()</code> or <code>TEXT()</code> to align types.</li>
     </ul>

     <h3 class="text-xl font-semibold mb-2">VLOOKUP vs XLOOKUP vs INDEX MATCH</h3>
     <div class="overflow-x-auto mb-4">
       <table class="min-w-full border-collapse border border-gray-300 text-sm">
         <thead>
           <tr class="bg-gray-100">
             <th class="border border-gray-300 p-2 font-semibold">Feature</th>
             <th class="border border-gray-300 p-2 font-semibold">VLOOKUP</th>
             <th class="border border-gray-300 p-2 font-semibold">INDEX MATCH</th>
             <th class="border border-gray-300 p-2 font-semibold">XLOOKUP</th>
           </tr>
         </thead>
         <tbody>
           <tr>
             <td class="border border-gray-300 p-2">Lookup direction</td>
             <td class="border border-gray-300 p-2">Right only</td>
             <td class="border border-gray-300 p-2">Any direction</td>
             <td class="border border-gray-300 p-2">Any direction</td>
           </tr>
           <tr>
             <td class="border border-gray-300 p-2">Column insertion safe?</td>
             <td class="border border-gray-300 p-2">No (breaks index)</td>
             <td class="border border-gray-300 p-2">Yes</td>
             <td class="border border-gray-300 p-2">Yes</td>
           </tr>
           <tr>
             <td class="border border-gray-300 p-2">Default value on miss</td>
             <td class="border border-gray-300 p-2">#N/A</td>
             <td class="border border-gray-300 p-2">#N/A</td>
             <td class="border border-gray-300 p-2">Custom (if_not_found)</td>
           </tr>
           <tr>
             <td class="border border-gray-300 p-2">Return entire row</td>
             <td class="border border-gray-300 p-2">No</td>
             <td class="border border-gray-300 p-2">No</td>
             <td class="border border-gray-300 p-2">Yes (return array)</td>
           </tr>
           <tr>
             <td class="border border-gray-300 p-2">Case sensitivity</td>
             <td class="border border-gray-300 p-2">No</td>
             <td class="border border-gray-300 p-2">With EXACT()</td>
             <td class="border border-gray-300 p-2">With EXACT()</td>
           </tr>
           <tr>
             <td class="border border-gray-300 p-2">Ease of use</td>
             <td class="border border-gray-300 p-2">Easy</td>
             <td class="border border-gray-300 p-2">Moderate</td>
             <td class="border border-gray-300 p-2">Easy</td>
           </tr>
           <tr>
             <td class="border border-gray-300 p-2">Available in</td>
             <td class="border border-gray-300 p-2">All Excel versions</td>
             <td class="border border-gray-300 p-2">All Excel versions</td>
             <td class="border border-gray-300 p-2">Excel 365 / 2021</td>
           </tr>
         </tbody>
       </table>
     </div>
     <p class="mb-4"><strong>Bottom line:</strong> Use VLOOKUP for quick one-off lookups in stable tables. Use INDEX MATCH when you need flexibility or lookups to the left. Use XLOOKUP if you have Excel 365 — it is the most powerful and intuitive option.</p>

     <h3 class="text-xl font-semibold mb-2">Using VLOOKUP Across Multiple Sheets</h3>
     <p class="mb-4">You can VLOOKUP into another worksheet by referencing the sheet name in the table_array:</p>
     <pre class="bg-gray-50 p-3 rounded-lg text-sm mb-4"><code>=VLOOKUP(A2, 'Sheet2'!$A$2:$D$100, 4, FALSE)</code></pre>
     <p class="mb-4">For a different workbook (assuming it is open):</p>
     <pre class="bg-gray-50 p-3 rounded-lg text-sm mb-4"><code>=VLOOKUP(A2, '[SalesData.xlsx]Orders'!$A$2:$D$100, 4, FALSE)</code></pre>
     <p class="mb-4"><strong>Important:</strong> If you close the external workbook, the formula continues to work with cached values. Re-open the source file to refresh.</p>

     <h3 class="text-xl font-semibold mb-2">5 VLOOKUP Edge Cases You Should Know</h3>
     <ul class="list-disc pl-5 mb-4">
       <li><strong>#N/A when value exists:</strong> The lookup value might have trailing spaces. Wrap lookup_value in <code>TRIM()</code>: <code>=VLOOKUP(TRIM(A2), $A$2:$D$10, 4, FALSE)</code>.</li>
       <li><strong>Matching partial text with wildcards:</strong> Use <code>*</code> for any sequence of characters: <code>=VLOOKUP("*"&amp;TRIM(A2)&amp;"*", $A$2:$D$10, 4, FALSE)</code>. This finds cells that contain the search term anywhere.</li>
       <li><strong>VLOOKUP returning 0 instead of blank:</strong> If the result cell is empty, VLOOKUP returns 0. Wrap with <code>IF</code>: <code>=IF(VLOOKUP(...)="", "", VLOOKUP(...))</code> or use <code>IFERROR</code> for a cleaner fallback.</li>
       <li><strong>VLOOKUP with dynamic column index using MATCH:</strong> Combine VLOOKUP with MATCH to make the column index dynamic: <code>=VLOOKUP(A2, $A$2:$D$10, MATCH("Department", $A$1:$D$1, 0), FALSE)</code>. This finds "Department" in the header row and returns the correct column number automatically.</li>
       <li><strong>VLOOKUP with IFERROR for clean output:</strong> Wrap VLOOKUP in <code>IFERROR</code> to display a friendly message instead of #N/A: <code>=IFERROR(VLOOKUP(A2, $A$2:$D$10, 4, FALSE), "Not Found")</code>.</li>
     </ul>

     <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-100 mt-6">
       <p class="text-sm text-yellow-800"><strong>Pro Tip:</strong> Before writing VLOOKUP, always check that your lookup column is the first column in the range. If it isn't, switch to <a href="/formulas/xlookup" class="text-blue-600 underline font-semibold">XLOOKUP</a> or <a href="/formulas/index-match" class="text-blue-600 underline font-semibold">INDEX MATCH</a> — both can search any column in any direction.</p>
     </div>
     <div class="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-4">
       <p class="text-sm text-blue-800"><strong>Pro Tip #2:</strong> Lock your table_array with absolute references (<code>$A$2:$D$10</code>) before dragging the formula down. For even better maintainability, convert your data range into an Excel Table (<kbd>Ctrl+T</kbd>) so you can use structured references like <code>Table1[#All]</code> that never break.</p>
     </div>
   </div>
   `,
        howToSteps: [
        {
                name: "Specify Lookup Value",
                text: "Select the cell containing the key or ID you want to look up."
        },
        {
                name: "Define Table Range",
                text: "Highlight the data table starting with the column containing the lookup value."
        },
        {
                name: "Enter Column Index",
                text: "Count and enter the column number from left to return data from."
        },
        {
                name: "Set Match Type to Exact (FALSE)",
                text: "Enter FALSE or 0 for an exact match, then press Enter."
        }
],
        faq: [
            { question: "Why is VLOOKUP returning #N/A?", answer: "This usually means the lookup value does not exist in the first column of your table array, or there is a mismatch in data types (e.g., number vs text stored as number). Check for hidden spaces, leading zeros, or use TRIM and VALUE to normalize data." },
            { question: "Can VLOOKUP look to the left?", answer: "No, VLOOKUP can only look to the right. Use XLOOKUP or INDEX/MATCH to look to the left or in any column." },
            { question: "What is the difference between VLOOKUP and XLOOKUP?", answer: "VLOOKUP only looks right and requires a column index number. XLOOKUP looks in any direction, uses separate lookup and return arrays, and supports built-in if-not-found and default values." },
            { question: "How to use VLOOKUP with multiple criteria?", answer: "Add a helper column that concatenates the criteria columns, then use VLOOKUP on that column. In Excel 365 you can also use XLOOKUP with multiple conditions." },
            { question: "Why is VLOOKUP not working?", answer: "Common causes: data type mismatch (number vs text), extra spaces (use TRIM), wrong column index, or range_lookup set to TRUE when you need exact match. Use FALSE for exact match." },
            { question: "Is VLOOKUP case sensitive?", answer: "No, VLOOKUP is not case sensitive. To do a case-sensitive lookup, use INDEX with MATCH and EXACT, or XLOOKUP with EXACT." },
            { question: "How to fix VLOOKUP #REF error?", answer: "#REF usually means the column index number is greater than the columns in your range, or the range was deleted. Check that col_index_num does not exceed the number of columns in table_array." },
            { question: "Should I use VLOOKUP or INDEX MATCH?", answer: "Use INDEX MATCH when you need to look left, when columns might be inserted, or for clearer formulas. Use VLOOKUP for simple right-only lookups where the table rarely changes." },
            { question: "How to use VLOOKUP with wildcard characters?", answer: "Use * (asterisk) for any sequence of characters and ? (question mark) for a single character. Example: =VLOOKUP(\"*\"&A2&\"*\", $A$2:$D$10, 4, FALSE) finds a cell that contains the value in A2 anywhere in the text. This is useful for partial name matches or fuzzy lookups." },
            { question: "Why is VLOOKUP returning the wrong column?", answer: "col_index_num is 1-based — the first column of your table_array is 1, not 0. If you insert or delete columns inside the range, the column index shifts. To avoid this, use MATCH to find the column dynamically: =VLOOKUP(A2, $A$2:$D$10, MATCH(\"Department\", $A$1:$D$1, 0), FALSE)." },
            { question: "How to use VLOOKUP across different worksheets?", answer: "Reference the sheet name followed by an exclamation mark: =VLOOKUP(A2, 'Sheet2'!$A$2:$D$100, 4, FALSE). For external workbooks: =VLOOKUP(A2, '[SalesData.xlsx]Orders'!$A$2:$D$100, 4, FALSE). The referenced workbook must be open for the formula to update." }
        ],
        commonErrors: [
            { title: 'VLOOKUP returns #N/A', causes: ['Lookup value not in the first column of table_array.', 'Data type mismatch (number vs text, e.g. 123 vs "123").', 'Extra spaces or different formatting in lookup value or table.'], fixes: ['Ensure the column you search is the leftmost in table_array.', 'Use TRIM and VALUE or TEXT to align types; check for leading zeros.', 'Use TRIM on both sides or normalize with VALUE/TEXT.'] },
            { title: 'Wrong column returned', causes: ['col_index_num is 1-based; counting from 1, not 0.', 'Inserted columns shifted the return column; index not updated.'], fixes: ['Count columns from the first column of table_array (1 = first column).', 'Use INDEX/MATCH or XLOOKUP to avoid column index breakage.'] },
        ],
        formulaLogicBreakdown: [
            { argument: 'lookup_value', explanation: 'The exact value you want to search for in your table.', example: 'e.g., A2 or "Apple"' },
            { argument: 'table_array', explanation: 'The range containing both the lookup column (must be the left-most column) and the return column.', example: 'e.g., Sheet2!A:E' },
            { argument: 'col_index_num', explanation: 'The column number in the table_array that contains the value you want to return. Count starting from 1 for the leftmost column.', example: 'e.g., 3' },
            { argument: 'range_lookup', explanation: 'Determines if you want an exact match (FALSE/0) or approximate match (TRUE/1). 99% of the time, you want FALSE.', example: 'e.g., FALSE' },
        ],
        relatedTools: ['xlookup', 'index-match', 'iferror', 'sumif', 'countif'],
    },

    // 2. IF
    {
        slug: 'if',
        title: "IF Function in Excel: Conditional Logic Formula Builder",
        metaDescription: "Build IF formulas for conditional logic in Excel & Google Sheets. Handle nested IFs, true/false tests, and custom outputs with our free generator.",
        excelFunction: 'IF',
        category: 'Logic',
        description: 'Checks whether a condition is met, and returns one value if true and another value if false.',
        inputs: [
            { id: 'logical_test', label: 'Test', type: 'text', placeholder: 'e.g., A1>10' },
            { id: 'value_if_true', label: 'If True', type: 'text', placeholder: 'e.g., "Pass"' },
            { id: 'value_if_false', label: 'If False', type: 'text', placeholder: 'e.g., "Fail"' },
        ],
        generate: (p) => `=IF(${p.logical_test || 'condition'}, ${p.value_if_true || 'value_if_true'}, ${p.value_if_false || 'value_if_false'})`,
        richContent: `
<div class="prose max-w-none mt-8">
  <h2>How to Use the IF Function in Excel and Google Sheets</h2>
  <p>The <strong>IF function</strong> is one of the most powerful and widely used tools in spreadsheet applications. It allows you to create logical comparisons between a value and what you expect. In its simplest form, the IF function says: "IF something is true, do something; otherwise, do something else."</p>
  
  <h3>Basic Syntax of IF</h3>
  <p>The syntax for the IF function is: <code>=IF(logical_test, value_if_true, [value_if_false])</code>.</p>
  <ul>
    <li><strong>logical_test</strong>: The condition you want to check (e.g., A1 > 10).</li>
    <li><strong>value_if_true</strong>: The value that is returned if the condition is met.</li>
    <li><strong>value_if_false</strong>: The value returned if the condition is not met.</li>
  </ul>

  <h3>Real-World Example: Grading Student Scores</h3>
  <p>Let's walk through a practical example. Imagine you're a teacher grading a class. Column A has student names, and Column B has their scores out of 100. You want to automatically assign a <strong>Pass</strong> or <strong>Fail</strong> grade.</p>
  <ol>
    <li><strong>Define your condition:</strong> A score of 60 or higher is passing. Your logical test is <code>B2&gt;=60</code>.</li>
    <li><strong>Set the true result:</strong> If the score is 60 or above, display <code>"Pass"</code>.</li>
    <li><strong>Set the false result:</strong> If below 60, display <code>"Fail"</code>.</li>
  </ol>
  <p><strong>Complete formula:</strong> <code>=IF(B2&gt;=60, "Pass", "Fail")</code></p>
  <p>Copy this formula down column C and each student instantly gets a Pass/Fail grade. To add letter grades (A, B, C, D, F), replace the single IF with a <strong>nested IF</strong> — see the section below.</p>

  <h3>Common Errors to Watch Out For</h3>
  <p>When working with the IF function, you might encounter some common pitfalls:</p>
  <ol>
    <li><strong>Missing Quotes</strong>: If you want to return text, it must be enclosed in double quotes (e.g., "Pass").</li>
    <li><strong>Incorrect Logical Operators</strong>: Ensure you are using the right symbols: <code>&gt;</code>, <code>&lt;</code>, <code>=</code>, <code>&gt;=</code>, <code>&lt;=</code>, or <code>&lt;&gt;</code> (not equal).</li>
    <li><strong>#NAME? Error</strong>: This often happens if you've misspelled the function name or forgotten quotes around a text string.</li>
  </ol>

  <h3>Mastering Nested IF Examples</h3>
  <p>Sometimes you need to test more than one condition. This is where <strong>Nested IFs</strong> come in. You can place one IF function inside another to handle multiple outcomes.</p>
  <p>For example, to grade a score in cell A1:</p>
  <pre><code>=IF(A1>=90, "A", IF(A1>=80, "B", IF(A1>=70, "C", "F")))</code></pre>
  <p>In this example, the formula checks for 90 first, then 80, then 70, before defaulting to "F". While powerful, try to keep nested IFs simple to avoid confusion, or consider using the <code>IFS</code> function in newer versions of Excel and Google Sheets.</p>

  <h3>Using IF with AND and OR</h3>
  <p>Combine IF with <strong>AND</strong> or <strong>OR</strong> when you need to evaluate multiple conditions at once.</p>
  <p><strong>IF with AND:</strong> All conditions must be true for the result to show.</p>
  <pre><code>=IF(AND(A1&gt;=60, B1="Yes"), "Eligible", "Not Eligible")</code></pre>
  <p>This checks if A1 is at least 60 <em>and</em> B1 is "Yes" before returning "Eligible".</p>
  <p><strong>IF with OR:</strong> Any single condition being true triggers the result.</p>
  <pre><code>=IF(OR(A1="Admin", A1="Manager"), "Access Granted", "Access Denied")</code></pre>
  <p>You can even mix AND and OR: <code>=IF(AND(OR(A1="East", A1="West"), B1&gt;100), "Target Met", "Review")</code>.</p>

  <h3>Common IF Mistakes and How to Fix Them</h3>
  <p>Even experienced users run into trouble with IF. Here are the most frequent issues:</p>
  <ul>
    <li><strong>Text not in quotes:</strong> Excel treats unquoted text as a named range. Always use <code>"text"</code>, not <code>text</code>.</li>
    <li><strong>Wrong condition order in nested IF:</strong> Excel evaluates left to right and returns the first match. Put the most specific condition first.</li>
    <li><strong>Using text for numbers:</strong> <code>=IF(A1="100", ...)</code> treats 100 as text. Omit quotes for numeric comparisons: <code>=IF(A1=100, ...)</code>.</li>
    <li><strong>Hidden spaces in cells:</strong> A cell <em>looks</em> empty but contains a space. Use <code>=IF(TRIM(A1)="", "Empty", A1)</code> to handle this.</li>
  </ul>

  <div class="bg-green-50 p-4 rounded-lg border border-green-100 mt-6">
    <p class="text-sm text-green-800"><strong>Pro Tip:</strong> If you're using Excel 2016 or newer (or any Google Sheets), prefer the <code>IFS</code> function over deeply nested IF statements. <code>IFS</code> lets you list multiple condition-result pairs without nesting parentheses: <code>=IFS(A1&gt;=90, "A", A1&gt;=80, "B", A1&gt;=70, "C", TRUE, "F")</code>. It's cleaner, harder to break, and much easier for others to read.</p>
  </div>

  <h3>Why Use SheetMaster's IF Generator?</h3>
  <p>Building complex logical statements manually can be prone to syntax errors, especially with parentheses. Our generator handles the formatting for you, ensuring your formula works perfectly the first time you paste it into your sheet. Save time and reduce frustration by letting our expert-crafted tools handle the heavy lifting of data analysis.</p>
</div>`,
        howToSteps: [
        {
                name: "Set Logical Test",
                text: "Define the condition to test (e.g., A2 >= 60 or B2 = 'Yes')."
        },
        {
                name: "Specify Value if True",
                text: "Enter what Excel should return when the condition is met."
        },
        {
                name: "Specify Value if False",
                text: "Enter what Excel should return when the condition fails."
        }
],
        faq: [
            { question: "How to create an IF statement in Excel?", answer: "Start with =IF(logical_test, value_if_true, value_if_false). Example: =IF(A1>60, \"Pass\", \"Fail\"). The logical_test is your condition — if it's true, Excel shows value_if_true; otherwise value_if_false. Use our generator above to build one in seconds." },
            { question: "Can I use multiple IF statements?", answer: "Yes, you can nest IF statements inside each other to test multiple conditions, or use the IFS function for cleaner syntax." },
            { question: "How do I check for text?", answer: "Put text inside double quotes, like \"Yes\" or \"No\". Numbers do not need quotes." },
            { question: "What does the IF function do in Excel?", answer: "IF checks a condition and returns one value when true and another when false. Syntax: =IF(condition, value_if_true, value_if_false)." },
            { question: "How do I use IF with AND or OR?", answer: "Put AND() or OR() in the logical_test: =IF(AND(A1>0, B1<10), \"Yes\", \"No\") or =IF(OR(A1=1, A1=2), \"OK\", \"No\")." },
            { question: "Why does IF return #NAME?", answer: "Usually a typo in the function name or unquoted text. Text must be in double quotes; numbers and cell references do not need quotes." },
            { question: "Can I use IF with dates in Excel?", answer: "Yes. Use DATE() or DATEVALUE() inside your logical test: =IF(A1>DATE(2024,1,1), \"After Jan 1\", \"Before\"). For cell references containing dates, compare directly: =IF(B1>TODAY(), \"Future\", \"Past\")." },
            { question: "What is the limit for nested IF functions?", answer: "Excel 2007 and newer allows up to 64 nested IFs, but exceeding 7-10 makes formulas hard to read and debug. For cleaner multi-condition logic, use IFS (Excel 2016+) or SWITCH instead." },
            { question: "Why is my IF function returning the wrong value?", answer: "Common causes: (1) Text not in double quotes — use \"Yes\" not Yes. (2) Cells that look empty but contain spaces — use TRIM() or LEN() to check. (3) Number stored as text — use VALUE() to convert. (4) Wrong order of nested conditions — the first true condition wins, so check the most specific conditions first." }
        ],
        commonErrors: [
            { title: 'IF returns #NAME? or wrong result', causes: ['Text in value_if_true/value_if_false not in double quotes.', 'Misspelled function name (IF not IFF).', 'Too many nested IFs; limit in Excel is 64.'], fixes: ['Put all literal text in quotes: "Pass", "Fail".', 'Check spelling; use IFS for many conditions instead of nesting.', 'Use IFS or SWITCH for cleaner multi-condition logic.'] },
        ],
        formulaLogicBreakdown: [
            { argument: 'logical_test', explanation: 'The condition or criteria you are evaluating to see if it is true or false.', example: 'e.g., A1>10 or B2="Closed"' },
            { argument: 'value_if_true', explanation: 'The result returned if the logical_test evaluates to TRUE. Text must be in double quotes.', example: 'e.g., "Pass" or A1*0.1' },
            { argument: 'value_if_false', explanation: 'The result returned if the logical_test evaluates to FALSE. Text must be in double quotes.', example: 'e.g., "Fail" or 0' },
        ],
        relatedTools: ['ifs', 'iferror', 'and', 'or', 'vlookup', 'xlookup'],
    },

    // 3. SUMIF
    {
        slug: 'sumif',
        title: "SUMIF in Excel: Sum with One Condition (Free Guide)",
        metaDescription: "Calculate conditional sums in Excel using SUMIF. Add numbers based on text, dates, or numbers with our free interactive formula builder.",
        excelFunction: 'SUMIF',
        category: 'Math',
        description: 'Adds the cells specified by a given condition or criteria.',
        inputs: [
            { id: 'range', label: 'Range to check', type: 'range', placeholder: 'e.g., A1:A10' },
            { id: 'criteria', label: 'Criteria', type: 'text', placeholder: 'e.g., ">100" or "Apple"' },
            { id: 'sum_range', label: 'Range to sum - optional', type: 'range', placeholder: 'e.g., B1:B10' },
        ],
        generate: (p) => {
            const range = p.range || 'range';
            const criteria = p.criteria || 'criteria';
            const sumRange = p.sum_range ? `, ${p.sum_range}` : '';
            return `=SUMIF(${range}, ${criteria}${sumRange})`;
        },
        relatedTools: ['sumifs', 'countif', 'averageif', 'if', 'sum'],
        richContent: `
<div class="prose prose-slate max-w-none mt-12 border-t pt-8 text-left">
  <h2 class="text-2xl font-bold mb-4">How to Use SUMIF in Excel and Google Sheets</h2>
  <p class="mb-4">The <strong>SUMIF</strong> function sums numeric values that meet a single condition — like "sum all sales where the region is North" or "sum expenses over $500." It is one of the most practical tools for financial analysis, sales reporting, and budget tracking.</p>

  <h3 class="text-xl font-semibold mb-2">SUMIF Syntax</h3>
  <p class="mb-4"><code>=SUMIF(range, criteria, [sum_range])</code></p>
  <ul class="list-disc pl-5 mb-4 space-y-1">
    <li><strong>range</strong> — The cells you want to evaluate against the criteria.</li>
    <li><strong>criteria</strong> — The condition that determines which cells to sum (text, number, expression, or cell reference).</li>
    <li><strong>sum_range</strong> — The actual cells to sum. If omitted, SUMIF sums the range itself.</li>
  </ul>

  <h3 class="text-xl font-semibold mb-2">Step-by-Step Example: Sum Sales by Region</h3>
  <p class="mb-3">Suppose you have a sales table:</p>
  <div class="overflow-x-auto mb-4">
    <table class="min-w-full border-collapse border border-gray-300 text-sm">
      <thead><tr class="bg-gray-100"><th class="border border-gray-300 px-3 py-2 font-semibold">A (Region)</th><th class="border border-gray-300 px-3 py-2 font-semibold">B (Sales)</th></tr></thead>
      <tbody>
        <tr><td class="border border-gray-300 px-3 py-1">North</td><td class="border border-gray-300 px-3 py-1">1,200</td></tr>
        <tr><td class="border border-gray-300 px-3 py-1">South</td><td class="border border-gray-300 px-3 py-1">850</td></tr>
        <tr><td class="border border-gray-300 px-3 py-1">North</td><td class="border border-gray-300 px-3 py-1">2,300</td></tr>
        <tr><td class="border border-gray-300 px-3 py-1">East</td><td class="border border-gray-300 px-3 py-1">1,100</td></tr>
        <tr><td class="border border-gray-300 px-3 py-1">North</td><td class="border border-gray-300 px-3 py-1">950</td></tr>
      </tbody>
    </table>
  </div>
  <p class="mb-2"><strong>Goal:</strong> Total sales for the North region.</p>
  <ol class="list-decimal pl-5 mb-4 space-y-1">
    <li>Click cell <strong>D2</strong> (or any empty cell).</li>
    <li>Enter: <code>=SUMIF(A2:A6, "North", B2:B6)</code></li>
    <li>Press <strong>Enter</strong>. The result is <strong>4,450</strong> (1,200 + 2,300 + 950).</li>
  </ol>
  <p class="mb-4">To make the criteria dynamic, put "North" in cell <strong>E1</strong> and use: <code>=SUMIF(A2:A6, E1, B2:B6)</code>. Update E1 to "South" and the result instantly changes to 850.</p>

  <h3 class="text-xl font-semibold mb-2">More Real-World SUMIF Examples</h3>
  <p class="mb-2"><strong>Sum amounts greater than 500:</strong></p>
  <pre class="bg-gray-50 p-3 rounded-lg text-sm mb-4"><code>=SUMIF(B:B, ">500")</code></pre>
  <p class="mb-2"><strong>Sum with a cell reference as criteria:</strong></p>
  <pre class="bg-gray-50 p-3 rounded-lg text-sm mb-4"><code>=SUMIF(A:A, E1, B:B)</code></pre>
  <p class="mb-2"><strong>Sum excluding a specific item:</strong></p>
  <pre class="bg-gray-50 p-3 rounded-lg text-sm mb-4"><code>=SUMIF(A:A, "<>Widget", B:B)</code></pre>
  <p class="mb-2"><strong>Sum with comparison operator + cell reference:</strong></p>
  <pre class="bg-gray-50 p-3 rounded-lg text-sm mb-4"><code>=SUMIF(C:C, ">="&D1, B:B)</code></pre>

  <h3 class="text-xl font-semibold mb-2">Using Wildcards with SUMIF</h3>
  <p class="mb-2">Wildcards let you match partial text:</p>
  <ul class="list-disc pl-5 mb-4 space-y-1">
    <li><code>*</code> (asterisk) — matches any sequence of characters. <code>=SUMIF(A:A, "*East*", B:B)</code> sums all rows where column A contains "East" anywhere (includes "Northeast", "Eastern").</li>
    <li><code>?</code> (question mark) — matches any single character. <code>=SUMIF(A:A, "??-100", B:B)</code> matches "AB-100" but not "ABC-100".</li>
    <li><code>~</code> (tilde) — escape wildcards. <code>=SUMIF(A:A, "~*", B:B)</code> sums rows where column A contains a literal asterisk.</li>
  </ul>

  <h3 class="text-xl font-semibold mb-2">Summing with Date Criteria</h3>
  <p class="mb-2">SUMIF handles date conditions using <code>DATE()</code> or cell references:</p>
  <pre class="bg-gray-50 p-3 rounded-lg text-sm mb-4"><code>=SUMIF(A:A, ">="&DATE(2025,1,1), B:B)</code></pre>
  <p class="mb-2">This sums all values in column B where the date in column A is on or after January 1, 2025. For a two-date range (between start and end), use SUMIFS:</p>
  <pre class="bg-gray-50 p-3 rounded-lg text-sm mb-4"><code>=SUMIFS(B:B, A:A, ">="&E1, A:A, "<="&F1)</code></pre>

  <h3 class="text-xl font-semibold mb-2">SUMIF vs SUMIFS: When to Use Each</h3>
  <div class="overflow-x-auto mb-4">
    <table class="min-w-full border-collapse border border-gray-300 text-sm">
      <thead><tr class="bg-gray-100"><th class="border border-gray-300 px-3 py-2 font-semibold">Feature</th><th class="border border-gray-300 px-3 py-2 font-semibold">SUMIF</th><th class="border border-gray-300 px-3 py-2 font-semibold">SUMIFS</th></tr></thead>
      <tbody>
        <tr><td class="border border-gray-300 px-3 py-1 font-medium">Conditions</td><td class="border border-gray-300 px-3 py-1">1</td><td class="border border-gray-300 px-3 py-1">Up to 127</td></tr>
        <tr><td class="border border-gray-300 px-3 py-1 font-medium">Argument order</td><td class="border border-gray-300 px-3 py-1">range, criteria, sum_range</td><td class="border border-gray-300 px-3 py-1">sum_range, criteria_range1, criteria1, ...</td></tr>
        <tr><td class="border border-gray-300 px-3 py-1 font-medium">Sum_range optional?</td><td class="border border-gray-300 px-3 py-1">Yes</td><td class="border border-gray-300 px-3 py-1">No (required)</td></tr>
        <tr><td class="border border-gray-300 px-3 py-1 font-medium">Best for</td><td class="border border-gray-300 px-3 py-1">Simple single-condition sums</td><td class="border border-gray-300 px-3 py-1">Multi-condition sums (e.g., region + product + date)</td></tr>
      </tbody>
    </table>
  </div>

  <h3 class="text-xl font-semibold mb-2">Common SUMIF Edge Cases</h3>
  <ul class="list-disc pl-5 mb-4 space-y-1">
    <li><strong>Data type mismatch:</strong> Numbers stored as text won't match numeric criteria. Use <code>VALUE()</code> or <code>TEXT()</code> to align types.</li>
    <li><strong>Sum_range sizes differ:</strong> If sum_range is smaller than range, SUMIF only sums the overlapping top-left portion. Always match sizes.</li>
    <li><strong>Leading/trailing spaces:</strong> <code>=SUMIF(A:A, "Apple", B:B)</code> won't match " Apple". Use <code>TRIM()</code> on your data or criteria: <code>"="&TRIM(E1)</code>.</li>
    <li><strong>Case sensitivity:</strong> SUMIF is not case-sensitive. "APPLE", "Apple", and "apple" all match.</li>
    <li><strong>Criteria longer than 255 characters:</strong> SUMIF rejects criteria strings longer than 255 characters. For longer patterns, use a helper column or switch to SUMIFS with SUMPRODUCT.</li>
  </ul>

  <div class="bg-green-50 p-4 rounded-lg border border-green-100 mt-6">
    <p class="text-sm text-green-800"><strong>Pro Tip:</strong> Use wildcards for flexible matching. <code>=SUMIF(A:A, "*Widget*", B:B)</code> sums all rows where column A contains "Widget" anywhere in the text. Combine with a cell reference: <code>=SUMIF(A:A, "*"&amp;E1&amp;"*", B:B)</code> — typing "Widget" in E1 instantly updates the sum.</p>
  </div>
</div>`,
        howToSteps: [
        {
                name: "Select Criteria Range",
                text: "Choose the range of cells evaluated against your criteria."
        },
        {
                name: "Define Criteria",
                text: "Enter the condition (e.g., '>100', 'Apple', or cell reference B2)."
        },
        {
                name: "Select Sum Range",
                text: "Select the range of numeric cells to sum up, then press Enter."
        }
],
        faq: [
            { question: "What is the difference between SUMIF and SUMIFS?", answer: "SUMIF handles a single condition. SUMIFS handles multiple conditions (up to 127) and puts the sum_range first. Use SUMIF for simple one-criteria sums. Use SUMIFS when you need to sum by multiple criteria like region AND product AND date range." },
            { question: "Can SUMIF use wildcards?", answer: "Yes. Use * (asterisk) for any sequence of characters and ? (question mark) for a single character. Example: =SUMIF(A:A,\"*apple*\",B:B) sums column B where column A contains \"apple\" anywhere. Use ~ to escape wildcards: =SUMIF(A:A,\"~*\",B:B) sums rows with a literal asterisk." },
            { question: "How do I sum with a date criteria?", answer: "Use a cell reference or DATE() in criteria: =SUMIF(A:A,\">=\"&DATE(2025,1,1),B:B) sums B where A is on or after Jan 1, 2025. For a date range (between two dates), use SUMIFS with two conditions: =SUMIFS(B:B,A:A,\">=\"&E1,A:A,\"<=\"&F1)." },
            { question: "Why does SUMIF return 0?", answer: "Common causes: (1) Criteria not matching data type — text stored as numbers or vice versa. Use quotes for text criteria. (2) Extra spaces in cells — use TRIM(). (3) Sum_range misaligned with range — ensure they are the same size. (4) Criteria string exceeds 255 characters." },
            { question: "How do I sum blank or non-blank cells with SUMIF?", answer: "To sum values where a cell is blank, use \"=\" as criteria: =SUMIF(A:A,\"=\",B:B). For non-blank cells, use \"<>\": =SUMIF(A:A,\"<>\",B:B). Both treat truly empty cells and cells containing only spaces differently — consider combining with TRIM for clean results." },
            { question: "When should I use SUMIF vs COUNTIF?", answer: "Use SUMIF to add numeric values that meet a condition. Use COUNTIF to count how many cells meet a condition. Both use the same criteria syntax with text, numbers, wildcards, and date comparisons." },
            { question: "How do I use a cell reference as the criteria in SUMIF?", answer: "Concatenate the operator with the cell reference using &: =SUMIF(A:A,\">\"&E1,B:B). For exact match, reference the cell directly: =SUMIF(A:A,E1,B:B). This lets you change the criteria without editing the formula." },
            { question: "Why is SUMIF returning a wrong sum instead of an error?", answer: "SUMIF silently skips mismatches instead of erroring. Check these: (1) sum_range and range must be the same size — different sizes use only the overlapping portion. (2) Numeric values stored as text are ignored. (3) Hidden characters in criteria or data cells — use LEN() to verify character counts." }
        ],
        commonErrors: [
            { title: 'SUMIF returns 0 or wrong sum', causes: ['Criteria not in quotes for text (e.g. "Apple" not Apple).', 'Sum_range and range different sizes; only overlapping rows are summed.', 'Number stored as text in range; criteria does not match.'], fixes: ['Use quotes for text: ">100", "Sales".', 'Make sum_range same size as range, or omit sum_range to sum range.', 'Align data types; use VALUE or TEXT as needed.'] },
        ],
    },

    // 4. COUNTIF
    {
        slug: 'countif',
        title: "COUNTIF in Excel: Count Cells by Criteria (Easy Guide)",
        metaDescription: "Count cells that match specific criteria in Excel & Sheets. Count text, numbers, dates, or blanks with our free interactive formula generator.",
        excelFunction: 'COUNTIF',
        category: 'Math',
        description: 'Counts the number of cells within a range that meet the given condition.',
        inputs: [
            { id: 'range', label: 'Range to Count', type: 'range', placeholder: 'e.g., A1:A10' },
            { id: 'criteria', label: 'Criteria', type: 'text', placeholder: 'e.g., ">100" or "Completed"' },
        ],
        generate: (p) => `=COUNTIF(${p.range || 'range'}, ${p.criteria || 'criteria'})`,
        relatedTools: ['countifs', 'sumif', 'averageif', 'counta', 'countblank'],
        richContent: `
<div class="prose prose-slate max-w-none mt-12 border-t pt-8 text-left">
  <h2 class="text-2xl font-bold mb-4">How to Use COUNTIF in Excel and Google Sheets</h2>
  <p class="mb-4">The <strong>COUNTIF</strong> function counts cells that meet a single condition — like how many orders exceed $1,000, how many tasks are marked "Complete," or how many entries fall within a date range. It is essential for data analysis, quality control, and reporting.</p>

  <h3 class="text-xl font-semibold mb-2">COUNTIF Syntax</h3>
  <p class="mb-4"><code>=COUNTIF(range, criteria)</code></p>
  <ul class="list-disc pl-5 mb-4 space-y-1">
    <li><strong>range</strong> — The range of cells you want to count.</li>
    <li><strong>criteria</strong> — The condition that determines which cells to count (text, number, expression, or cell reference).</li>
  </ul>

  <h3 class="text-xl font-semibold mb-2">Step-by-Step Example: Count Orders by Status</h3>
  <p class="mb-3">Suppose you have an order log:</p>
  <div class="overflow-x-auto mb-4">
    <table class="min-w-full border-collapse border border-gray-300 text-sm">
      <thead><tr class="bg-gray-100"><th class="border border-gray-300 px-3 py-2 font-semibold">A (Order ID)</th><th class="border border-gray-300 px-3 py-2 font-semibold">B (Status)</th><th class="border border-gray-300 px-3 py-2 font-semibold">C (Amount)</th></tr></thead>
      <tbody>
        <tr><td class="border border-gray-300 px-3 py-1">1001</td><td class="border border-gray-300 px-3 py-1">Completed</td><td class="border border-gray-300 px-3 py-1">1,200</td></tr>
        <tr><td class="border border-gray-300 px-3 py-1">1002</td><td class="border border-gray-300 px-3 py-1">Pending</td><td class="border border-gray-300 px-3 py-1">850</td></tr>
        <tr><td class="border border-gray-300 px-3 py-1">1003</td><td class="border border-gray-300 px-3 py-1">Completed</td><td class="border border-gray-300 px-3 py-1">2,300</td></tr>
        <tr><td class="border border-gray-300 px-3 py-1">1004</td><td class="border border-gray-300 px-3 py-1">Cancelled</td><td class="border border-gray-300 px-3 py-1">0</td></tr>
        <tr><td class="border border-gray-300 px-3 py-1">1005</td><td class="border border-gray-300 px-3 py-1">Completed</td><td class="border border-gray-300 px-3 py-1">950</td></tr>
        <tr><td class="border border-gray-300 px-3 py-1">1006</td><td class="border border-gray-300 px-3 py-1">Pending</td><td class="border border-gray-300 px-3 py-1">1,500</td></tr>
      </tbody>
    </table>
  </div>
  <p class="mb-2"><strong>Goal:</strong> How many orders are "Completed"?</p>
  <ol class="list-decimal pl-5 mb-4 space-y-1">
    <li>Click cell <strong>E2</strong> (or any empty cell).</li>
    <li>Enter: <code>=COUNTIF(B2:B7, "Completed")</code></li>
    <li>Press <strong>Enter</strong>. The result is <strong>3</strong> (rows 1001, 1003, 1005).</li>
  </ol>
  <p class="mb-4">To count "Pending" orders, change the criteria: <code>=COUNTIF(B2:B7, "Pending")</code> — returns 2. For a dynamic criteria, put "Completed" in cell <strong>F1</strong> and use: <code>=COUNTIF(B2:B7, F1)</code>.</p>

  <h3 class="text-xl font-semibold mb-2">Common COUNTIF Patterns</h3>
  <ul class="list-disc pl-5 mb-4 space-y-1">
    <li><strong>Count exact text:</strong> <code>=COUNTIF(A:A, "Completed")</code></li>
    <li><strong>Count numbers greater than:</strong> <code>=COUNTIF(B:B, ">1000")</code></li>
    <li><strong>Count numbers less than or equal:</strong> <code>=COUNTIF(B:B, "<=500")</code></li>
    <li><strong>Count not equal to:</strong> <code>=COUNTIF(B:B, "<>Cancelled")</code></li>
    <li><strong>Count blank cells:</strong> <code>=COUNTIF(A:A, "")</code></li>
    <li><strong>Count non-blank cells:</strong> <code>=COUNTIF(A:A, "<>")</code></li>
    <li><strong>Count with cell reference:</strong> <code>=COUNTIF(B:B, ">"&E1)</code></li>
  </ul>

  <h3 class="text-xl font-semibold mb-2">Count Blank and Non-Blank Cells</h3>
  <p class="mb-2">Two essential patterns for data quality checks:</p>
  <ul class="list-disc pl-5 mb-4 space-y-1">
    <li><strong>Count truly blank cells:</strong> <code>=COUNTIF(A:A, "")</code> — counts cells that are completely empty.</li>
    <li><strong>Count non-blank cells (cells with any value):</strong> <code>=COUNTIF(A:A, "<>")</code> — counts cells that contain text, numbers, dates, or errors. Note: cells with spaces are not blank and will be counted.</li>
    <li><strong>Count cells that look blank but contain spaces:</strong> <code>=COUNTIF(A:A, " *")</code> or combine with a helper column using <code>TRIM()</code>.</li>
  </ul>

  <h3 class="text-xl font-semibold mb-2">Using Wildcards with COUNTIF</h3>
  <p class="mb-2">Wildcards enable powerful partial matching:</p>
  <ul class="list-disc pl-5 mb-4 space-y-1">
    <li><code>*</code> (asterisk) — matches any sequence of characters. <code>=COUNTIF(A:A, "*East*")</code> counts all cells containing "East" — including "Northeast" and "Eastern".</li>
    <li><code>?</code> (question mark) — matches any single character. <code>=COUNTIF(A:A, "???-100")</code> matches "ABC-100" but not "AB-100".</li>
    <li><code>~</code> (tilde) — escape wildcards. <code>=COUNTIF(A:A, "~?")</code> counts cells containing a literal question mark.</li>
    <li><strong>Count cells starting with:</strong> <code>=COUNTIF(A:A, "East*")</code> counts cells that begin with "East".</li>
    <li><strong>Count cells ending with:</strong> <code>=COUNTIF(A:A, "*ing")</code> counts cells ending with "ing".</li>
  </ul>

  <h3 class="text-xl font-semibold mb-2">COUNTIF with Date Criteria</h3>
  <p class="mb-2">COUNTIF works with dates just like numbers. Use <code>DATE()</code> or a cell reference:</p>
  <pre class="bg-gray-50 p-3 rounded-lg text-sm mb-4"><code>=COUNTIF(A:A, ">="&DATE(2026,1,1))</code></pre>
  <p class="mb-2">This counts all dates on or after January 1, 2026. For a date range, use COUNTIFS:</p>
  <pre class="bg-gray-50 p-3 rounded-lg text-sm mb-4"><code>=COUNTIFS(A:A, ">="&E1, A:A, "<="&F1)</code></pre>
  <p class="mb-2">To count dates from today backwards:</p>
  <pre class="bg-gray-50 p-3 rounded-lg text-sm mb-4"><code>=COUNTIF(A:A, ">="&TODAY()-30)</code></pre>

  <h3 class="text-xl font-semibold mb-2">COUNTIF vs COUNTIFS: When to Use Each</h3>
  <div class="overflow-x-auto mb-4">
    <table class="min-w-full border-collapse border border-gray-300 text-sm">
      <thead><tr class="bg-gray-100"><th class="border border-gray-300 px-3 py-2 font-semibold">Feature</th><th class="border border-gray-300 px-3 py-2 font-semibold">COUNTIF</th><th class="border border-gray-300 px-3 py-2 font-semibold">COUNTIFS</th></tr></thead>
      <tbody>
        <tr><td class="border border-gray-300 px-3 py-1 font-medium">Conditions</td><td class="border border-gray-300 px-3 py-1">1</td><td class="border border-gray-300 px-3 py-1">Up to 127</td></tr>
        <tr><td class="border border-gray-300 px-3 py-1 font-medium">Argument order</td><td class="border border-gray-300 px-3 py-1">range, criteria</td><td class="border border-gray-300 px-3 py-1">criteria_range1, criteria1, criteria_range2, criteria2, ...</td></tr>
        <tr><td class="border border-gray-300 px-3 py-1 font-medium">OR logic across columns</td><td class="border border-gray-300 px-3 py-1">Add two COUNTIFs: =COUNTIF(...)+COUNTIF(...)</td><td class="border border-gray-300 px-3 py-1">Not natively supported (use COUNTIF + COUNTIF pattern)</td></tr>
        <tr><td class="border border-gray-300 px-3 py-1 font-medium">Best for</td><td class="border border-gray-300 px-3 py-1">Simple single-condition counts</td><td class="border border-gray-300 px-3 py-1">Multi-condition counts (e.g., status + date range)</td></tr>
      </tbody>
    </table>
  </div>

  <h3 class="text-xl font-semibold mb-2">Common COUNTIF Edge Cases</h3>
  <ul class="list-disc pl-5 mb-4 space-y-1">
    <li><strong>Data type mismatch:</strong> Numbers stored as text won't match numeric criteria. Use <code>VALUE()</code> or align data types.</li>
    <li><strong>Leading/trailing spaces:</strong> A cell with "Completed " (trailing space) won't match "Completed". Use <code>TRIM()</code> on your data.</li>
    <li><strong>Case sensitivity:</strong> COUNTIF is not case-sensitive. "COMPLETED", "Completed", and "completed" all match the same count.</li>
    <li><strong>Criteria length limit:</strong> COUNTIF criteria strings cannot exceed 255 characters. For longer patterns, use a helper column with <code>SEARCH()</code> or switch to SUMPRODUCT.</li>
    <li><strong>Counting with OR logic:</strong> COUNTIF handles a single condition. For OR across values (e.g., count "Completed" OR "Pending"), add two COUNTIFs: <code>=COUNTIF(B:B, "Completed") + COUNTIF(B:B, "Pending")</code>.</li>
  </ul>

  <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-100 mt-6">
    <p class="text-sm text-yellow-800"><strong>Pro Tip:</strong> For multiple conditions on different columns, upgrade to <a href="/formulas/countifs" class="text-blue-600 underline font-semibold">COUNTIFS</a>. The syntax is <code>=COUNTIFS(criteria_range1, criteria1, criteria_range2, criteria2)</code>. For example, count orders that are "Completed" AND over $1,000: <code>=COUNTIFS(B:B, "Completed", C:C, ">1000")</code>. COUNTIFS puts the sum_range first — opposite of SUMIF.</p>
  </div>
</div>`,
        howToSteps: [
        {
                name: "Select Range",
                text: "Highlight the cells you want to evaluate and count."
        },
        {
                name: "Define Criteria",
                text: "Enter your condition (e.g., 'Completed', '>50', or '<>0')."
        },
        {
                name: "Generate & Apply",
                text: "Copy the =COUNTIF(range, criteria) formula into your sheet."
        }
],
        faq: [
            { question: 'Can COUNTIF handle multiple criteria?', answer: 'No — COUNTIF handles only one condition at a time. For multiple criteria (e.g., "count rows where A>100 AND B=\\"Yes\\""), use COUNTIFS instead. To count with OR logic across different values, add two COUNTIFs together: =COUNTIF(A:A,"X")+COUNTIF(A:A,"Y"). For OR within the same column use the same approach: =COUNTIF(B:B,"Completed")+COUNTIF(B:B,"Pending").' },
            { question: 'Why does COUNTIF return 0 when I expect a count?', answer: 'Check that your criteria match the data type (number vs text). Use quotes for text: "Completed" or "=100". For numbers use ">50" or "=100". Dates may need DATE() or a cell reference. Also watch for extra spaces — "Completed " won\'t match "Completed". Use TRIM() on your data to clean leading/trailing spaces.' },
            { question: 'How do I count blank or non-blank cells?', answer: 'Use criteria "" for blanks: =COUNTIF(A:A,""). For non-blanks use "<>": =COUNTIF(A:A,"<>"). Note that cells containing spaces or formulas that return "" look blank but are NOT counted by the blank pattern. For truly empty cells only, use =COUNTBLANK(A:A).' },
            { question: 'What is the difference between COUNTIF and COUNTIFS?', answer: 'COUNTIF has one condition and uses (range, criteria) syntax. COUNTIFS supports multiple conditions (up to 127) using (criteria_range1, criteria1, criteria_range2, criteria2, ...) syntax. Use COUNTIFS when you need to count only when two or more conditions are met across different columns.' },
            { question: 'Can COUNTIF use wildcards?', answer: 'Yes. Use * for any sequence of characters, ? for a single character, and ~ to escape wildcards. Examples: =COUNTIF(A:A,"*apple*") counts cells containing "apple". =COUNTIF(A:A,"???-100") matches three-character prefixes like "ABC-100". =COUNTIF(A:A,"~*") counts literal asterisks.' },
            { question: 'How do I count cells with a date in a range?', answer: 'Use criteria with DATE(): =COUNTIF(A:A,">="&DATE(2026,1,1)) counts dates on or after Jan 1, 2026. For relative dates: =COUNTIF(A:A,">="&TODAY()-7) counts entries in the last 7 days. For two-date ranges, use COUNTIFS: =COUNTIFS(A:A,">="&E1,A:A,"<="&F1).' },
            { question: 'How do I count cells that contain specific text (not exact match)?', answer: 'Wrap the text with wildcards: =COUNTIF(A:A,"*specific text*") counts cells containing "specific text" anywhere. Use a cell reference: =COUNTIF(A:A,"*"&E1&"*") — typing the search term in E1 makes it reusable across multiple formulas.' },
            { question: 'Why is COUNTIF counting cells that don\'t appear to match?', answer: 'Common hidden causes: (1) Numbers formatted as text that visually look like numbers — use ISNUMBER() to check. (2) Invisible characters from other systems — use TRIM() and CLEAN(). (3) Dates stored as text — use DATEVALUE() to convert. (4) COUNTIF is not case-sensitive, so "Yes" matches "yes" and "YES".' }
        ],
        commonErrors: [
            { title: 'COUNTIF returns 0 or wrong count', causes: ['Criteria not in quotes for text (e.g. "Yes" not Yes).', 'Data type mismatch: numbers stored as text or vice versa.', 'Extra spaces in cells; criteria does not match exactly.'], fixes: ['Wrap text criteria in double quotes: "Completed", ">100".', 'Use TRIM on data or match the stored format.', 'For numbers, use "=100" or ">50" as the criteria string.'] },
        ],
    },

    // 5. CONCATENATE
    {
        slug: 'concatenate',
        title: "CONCATENATE in Excel: Combine Text Cells & Strings",
        metaDescription: "Merge text from multiple cells in Excel using CONCATENATE or the & operator. Add spaces, commas, and formatting with our free formula generator.",
        excelFunction: 'CONCATENATE',
        category: 'Text',
        description: 'Joins several text strings into one text string.',
        inputs: [
            { id: 'text1', label: 'Text 1', type: 'text', placeholder: 'e.g., A1' },
            { id: 'text2', label: 'Text 2', type: 'text', placeholder: 'e.g., B1' },
            { id: 'text3', label: 'Text 3 (Optional)', type: 'text', placeholder: 'e.g., " - "' },
        ],
        generate: (p) => {
            const parts = [p.text1, p.text2, p.text3].filter(Boolean);
            if (parts.length === 0) return '=CONCATENATE()';

            const t1 = p.text1 || 'text1';
            const t2 = p.text2 || 'text2';
            const t3 = p.text3;

            let formulaArgs = `${t1}, ", ", ${t2}`;
            if (t3) {
                formulaArgs += `, ", ", ${t3}`;
            }
            return `=CONCATENATE(${formulaArgs})`;
        },
        richContent: `
<div class="prose prose-slate max-w-none mt-12 border-t pt-8 text-left">
  <h2 class="text-2xl font-bold mb-4">How to Use CONCATENATE in Excel — Step by Step</h2>
  <p class="mb-4">The <strong>CONCATENATE</strong> function combines text from multiple cells into one. It is indispensable for formatting full names, building addresses, generating email addresses, and any scenario where you need to merge column values into a readable string.</p>

  <h3 class="text-xl font-semibold mb-2">Step-by-Step Walkthrough: Combine First & Last Names</h3>
  <p class="mb-2">Suppose you have first names in column A and last names in column B. You want full names in column C.</p>
  <div class="overflow-x-auto mb-4">
    <table class="min-w-full text-sm border-collapse border border-gray-200">
      <thead><tr class="bg-gray-50"><th class="border border-gray-200 p-2 text-left">A (First Name)</th><th class="border border-gray-200 p-2 text-left">B (Last Name)</th><th class="border border-gray-200 p-2 text-left">C (Formula)</th><th class="border border-gray-200 p-2 text-left">Result</th></tr></thead>
      <tbody>
        <tr><td class="border border-gray-200 p-2">John</td><td class="border border-gray-200 p-2">Smith</td><td class="border border-gray-200 p-2"><code>=CONCATENATE(A2, " ", B2)</code></td><td class="border border-gray-200 p-2 font-semibold">John Smith</td></tr>
        <tr><td class="border border-gray-200 p-2">Jane</td><td class="border border-gray-200 p-2">Doe</td><td class="border border-gray-200 p-2"><code>=CONCATENATE(A3, " ", B3)</code></td><td class="border border-gray-200 p-2 font-semibold">Jane Doe</td></tr>
        <tr><td class="border border-gray-200 p-2">Bob</td><td class="border border-gray-200 p-2">Johnson</td><td class="border border-gray-200 p-2"><code>=CONCATENATE(A4, ", ", B4)</code></td><td class="border border-gray-200 p-2 font-semibold">Johnson, Bob</td></tr>
      </tbody>
    </table>
  </div>

  <h3 class="text-xl font-semibold mb-2">Practical CONCATENATE Examples</h3>
  <p class="mb-2"><strong>Combine first and last name with space:</strong></p>
  <pre class="bg-gray-50 p-3 rounded-lg text-sm mb-4"><code>=CONCATENATE(A1, " ", B1)</code></pre>
  <p class="mb-2"><strong>Build a full address:</strong></p>
  <pre class="bg-gray-50 p-3 rounded-lg text-sm mb-4"><code>=CONCATENATE(A1, ", ", B1, ", ", C1, " ", D1)</code></pre>
  <p class="mb-2"><strong>Format a number with text:</strong></p>
  <pre class="bg-gray-50 p-3 rounded-lg text-sm mb-4"><code>=CONCATENATE("Total: $", TEXT(A1, "#,##0.00"))</code></pre>
  <p class="mb-2"><strong>Generate an email address:</strong></p>
  <pre class="bg-gray-50 p-3 rounded-lg text-sm mb-4"><code>=CONCATENATE(LOWER(A1), ".", LOWER(B1), "@company.com")</code></pre>

  <h3 class="text-xl font-semibold mb-2">Adding Separators and Spaces</h3>
  <p class="mb-4">To add spaces, commas, or any text between values, include them as separate arguments wrapped in quotes:</p>
  <ul class="list-disc pl-5 mb-4 space-y-1">
    <li><strong>Space:</strong> <code>=CONCATENATE(A1, " ", B1)</code> → "John Smith"</li>
    <li><strong>Comma + space:</strong> <code>=CONCATENATE(B1, ", ", A1)</code> → "Smith, John"</li>
    <li><strong>Dash:</strong> <code>=CONCATENATE(A1, " - ", B1)</code> → "Sales - Report"</li>
    <li><strong>Line break:</strong> <code>=CONCATENATE(A1, CHAR(10), B1)</code> (turn on Wrap Text)</li>
  </ul>

  <h3 class="text-xl font-semibold mb-2">Handling Dates and Numbers</h3>
  <p class="mb-4">CONCATENATE converts everything to text. Raw dates become serial numbers (e.g. 45678) and numbers lose formatting. Use <code>TEXT()</code> to control the output:</p>
  <pre class="bg-gray-50 p-3 rounded-lg text-sm mb-4"><code>=CONCATENATE("Order date: ", TEXT(A1, "mm/dd/yyyy"))</code></pre>
  <pre class="bg-gray-50 p-3 rounded-lg text-sm mb-4"><code>=CONCATENATE("Amount: $", TEXT(B1, "#,##0.00"))</code></pre>

  <h3 class="text-xl font-semibold mb-2">CONCATENATE vs TEXTJOIN vs Ampersand (&)</h3>
  <div class="overflow-x-auto mb-4">
    <table class="min-w-full text-sm border-collapse border border-gray-200">
      <thead><tr class="bg-gray-50"><th class="border border-gray-200 p-2 text-left">Feature</th><th class="border border-gray-200 p-2 text-left">CONCATENATE</th><th class="border border-gray-200 p-2 text-left">Ampersand (&amp;)</th><th class="border border-gray-200 p-2 text-left">TEXTJOIN</th></tr></thead>
      <tbody>
        <tr><td class="border border-gray-200 p-2">Syntax</td><td class="border border-gray-200 p-2"><code>=CONCATENATE(A1, " ", B1)</code></td><td class="border border-gray-200 p-2"><code>=A1&" "&B1</code></td><td class="border border-gray-200 p-2"><code>=TEXTJOIN(" ", TRUE, A1:A5)</code></td></tr>
        <tr><td class="border border-gray-200 p-2">Delimiter</td><td class="border border-gray-200 p-2 text-yellow-600">Repeat between each value</td><td class="border border-gray-200 p-2 text-yellow-600">Repeat between each value</td><td class="border border-gray-200 p-2 text-green-600">Set once</td></tr>
        <tr><td class="border border-gray-200 p-2">Skip empty cells</td><td class="border border-gray-200 p-2 text-red-600">No</td><td class="border border-gray-200 p-2 text-red-600">No</td><td class="border border-gray-200 p-2 text-green-600">Yes (2nd argument)</td></tr>
        <tr><td class="border border-gray-200 p-2">Range support</td><td class="border border-gray-200 p-2 text-red-600">No, cell-by-cell</td><td class="border border-gray-200 p-2 text-red-600">No, cell-by-cell</td><td class="border border-gray-200 p-2 text-green-600">Yes, A1:A5</td></tr>
        <tr><td class="border border-gray-200 p-2">Compatibility</td><td class="border border-gray-200 p-2 text-green-600">All versions</td><td class="border border-gray-200 p-2 text-green-600">All versions</td><td class="border border-gray-200 p-2">Excel 2019+ / Sheets</td></tr>
        <tr><td class="border border-gray-200 p-2">Best for</td><td class="border border-gray-200 p-2">Fixed joins (name, address)</td><td class="border border-gray-200 p-2">Simple 2-3 value joins</td><td class="border border-gray-200 p-2">Lists, variable-length data</td></tr>
      </tbody>
    </table>
  </div>

  <div class="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-6">
    <p class="text-sm text-blue-800"><strong>Pro Tip:</strong> Use TEXTJOIN instead of CONCATENATE when joining a range of cells. TEXTJOIN lets you set a delimiter once and automatically skips blanks — perfect for mailing lists, tags, and report summaries. For simple 2-3 value joins, the ampersand (&amp;) operator is fastest to type: <code>=A1&" "&B1</code>.</p>
  </div>
</div>`,
        howToSteps: [
        {
                name: "Select First Text Cell",
                text: "Click the first cell you want to combine."
        },
        {
                name: "Insert Delimiter/Space",
                text: "Add separator characters enclosed in quotation marks like \" \" or \", \"."
        },
        {
                name: "Add Remaining Cells",
                text: "Include subsequent cells and press Enter to merge."
        }
],
        faq: [
            { question: 'How do I add a space or separator between concatenated values?', answer: 'Include a string argument for the separator between each pair of cell references. Use ", " for comma-space, " " for space-only, " - " for dash separators. Example: =CONCATENATE(A1, " - ", B1).' },
            { question: 'CONCATENATE vs TEXTJOIN — what is the difference?', answer: 'CONCATENATE joins arguments one at a time, repeating the delimiter between each. TEXTJOIN lets you set a delimiter once and can skip empty cells (TRUE argument). For a range like A1:A10, TEXTJOIN is far simpler: =TEXTJOIN(", ", TRUE, A1:A10).' },
            { question: 'Why does CONCATENATE show a number without formatting?', answer: 'Concatenation converts numbers to plain text, losing formatting like decimals and commas. Use TEXT() to preserve formatting: =CONCATENATE(TEXT(A1,"$#,##0.00"), " per unit").' },
            { question: 'How do I concatenate a date with text?', answer: 'Wrap the date in TEXT() with a format code: =CONCATENATE(TEXT(A1,"yyyy-mm-dd"), " report"). Without TEXT(), dates appear as serial numbers like 45678. Common formats: "mm/dd/yyyy", "dd-mmm-yyyy", "mmmm dd, yyyy".' },
            { question: 'Can I use CONCATENATE with more than 3 items?', answer: 'Yes. Add as many arguments as needed: =CONCATENATE(A1, " ", B1, ", ", C1, " ", D1). Each value and separator must be its own argument. For long lists, TEXTJOIN is easier.' },
            { question: 'Can I use line breaks in CONCATENATE?', answer: 'Yes. Use CHAR(10) for a line break in Excel (turn on Wrap Text) or CHAR(13) for carriage return: =CONCATENATE(A1, CHAR(10), B1). In Google Sheets, use CHAR(10) as well.' },
            { question: 'What is the difference between CONCATENATE and CONCAT?', answer: 'CONCAT is the modern replacement introduced in Excel 2016. It works the same as CONCATENATE but also supports range references like A1:A5. However, CONCAT does not accept a delimiter parameter — use TEXTJOIN if you need delimiters across a range.' },
            { question: 'Why is my CONCATENATE formula showing #NAME? or not working?', answer: '#NAME? usually means quotes are missing around text strings. Always wrap literal text and separators in double quotes: "Hello", NOT Hello. Also check for extra spaces or commas in the wrong place between arguments.' },
        ],
        commonErrors: [
            { title: 'No space or wrong separator between values', causes: ['Forgetting to add a separator string between references.', 'Using a number instead of quoted text for the separator.'], fixes: ['Add ", " or " - " (or any separator in quotes) between each pair of values.', 'Always put literal text in double quotes.'] },
        ],
    },

    // 6. INDEX/MATCH
    {
        slug: 'index-match',
        title: "INDEX MATCH in Excel: Flexible 2-Way Lookup Guide",
        metaDescription: "Master INDEX MATCH in Excel for flexible left-lookups and 2-way table queries. Faster and more robust than VLOOKUP with our free generator.",
        excelFunction: 'INDEX/MATCH',
        category: 'Lookup',
        description: 'A more flexible alternative to VLOOKUP. Returns the value of an element in a table or an array, selected by the row and column number indexes.',
        inputs: [
            { id: 'return_range', label: 'Column to Return Value From', type: 'range', placeholder: 'e.g., C:C' },
            { id: 'lookup_value', label: 'Value to Look For', type: 'text', placeholder: 'e.g., A2' },
            { id: 'lookup_range', label: 'Column to Search In', type: 'range', placeholder: 'e.g., B:B' },
            {
                id: 'match_type',
                label: 'Match Type',
                type: 'select',
                options: [
                    { label: 'Exact Match (0)', value: '0' },
                    { label: 'Less Than (-1)', value: '-1' },
                    { label: 'Greater Than (1)', value: '1' }
                ]
            },
        ],
        generate: (p) => {
            const returnRange = p.return_range || 'return_range';
            const lookupValue = p.lookup_value || 'lookup_value';
            const lookupRange = p.lookup_range || 'lookup_range';
            const matchType = p.match_type || '0';
            return `=INDEX(${returnRange}, MATCH(${lookupValue}, ${lookupRange}, ${matchType}))`;
        },
        richContent: `
<div class="prose prose-slate max-w-none mt-12 border-t pt-8 text-left">
  <h2 class="text-2xl font-bold mb-4">INDEX MATCH: The Ultimate VLOOKUP Alternative</h2>
  <p class="mb-4">The <strong>INDEX MATCH</strong> combination is widely considered the most flexible lookup method in Excel and Google Sheets. It overcomes VLOOKUP's biggest limitations: it can look left, doesn't break when columns are inserted, and handles large datasets more efficiently.</p>

  <h3 class="text-xl font-semibold mb-2">How INDEX MATCH Works Together</h3>
  <p class="mb-4">INDEX MATCH is actually two functions working in tandem: <strong>MATCH</strong> finds the row number where your lookup value appears, and <strong>INDEX</strong> returns the value from that row in your target column. Together they achieve what VLOOKUP does — but with no column order restrictions.</p>

  <h3 class="text-xl font-semibold mb-2">Step-by-Step: Look Up an Employee's Department (Real Example)</h3>
  <p class="mb-2">Let's walk through a concrete example. Suppose you have this employee table:</p>
  <div class="overflow-x-auto mb-4">
    <table class="min-w-full text-sm border-collapse border border-gray-200">
      <thead><tr class="bg-gray-50"><th class="border border-gray-200 p-2 text-left">A (Employee ID)</th><th class="border border-gray-200 p-2 text-left">B (Name)</th><th class="border border-gray-200 p-2 text-left">C (Department)</th><th class="border border-gray-200 p-2 text-left">D (Salary)</th></tr></thead>
      <tbody>
        <tr><td class="border border-gray-200 p-2">E-101</td><td class="border border-gray-200 p-2">Alice</td><td class="border border-gray-200 p-2">Sales</td><td class="border border-gray-200 p-2">65,000</td></tr>
        <tr><td class="border border-gray-200 p-2">E-102</td><td class="border border-gray-200 p-2">Bob</td><td class="border border-gray-200 p-2">Marketing</td><td class="border border-gray-200 p-2">72,000</td></tr>
        <tr><td class="border border-gray-200 p-2">E-103</td><td class="border border-gray-200 p-2">Charlie</td><td class="border border-gray-200 p-2">Engineering</td><td class="border border-gray-200 p-2">95,000</td></tr>
        <tr><td class="border border-gray-200 p-2">E-104</td><td class="border border-gray-200 p-2">Diana</td><td class="border border-gray-200 p-2">HR</td><td class="border border-gray-200 p-2">58,000</td></tr>
      </tbody>
    </table>
  </div>
  <p class="mb-2">You want to find Diana's department (column C) by searching for <strong>E-104</strong> in column A. Here's the step-by-step:</p>
  <ol class="list-decimal pl-5 mb-4 space-y-1">
    <li><strong>MATCH</strong> looks up <code>E-104</code> in column A:A and returns row position <strong>4</strong> (the 4th row where E-104 sits).</li>
    <li><strong>INDEX</strong> uses that row 4 and column C:C to return <code>HR</code>.</li>
    <li>The combined formula: <code class="bg-gray-100 px-1 rounded font-mono text-xs">=INDEX(C:C, MATCH("E-104", A:A, 0))</code></li>
  </ol>
  <p class="mb-4">Unlike VLOOKUP, this works because INDEX MATCH doesn't care which side of the lookup column the return column is on. The lookup column is A, the return column is C — and that's perfectly fine.</p>

  <h3 class="text-xl font-semibold mb-2">INDEX MATCH vs VLOOKUP vs XLOOKUP</h3>
  <div class="overflow-x-auto mb-4">
    <table class="min-w-full text-sm border-collapse border border-gray-200">
      <thead><tr class="bg-gray-50"><th class="border border-gray-200 p-2 text-left">Feature</th><th class="border border-gray-200 p-2 text-left">INDEX MATCH</th><th class="border border-gray-200 p-2 text-left">VLOOKUP</th><th class="border border-gray-200 p-2 text-left">XLOOKUP</th></tr></thead>
      <tbody>
        <tr><td class="border border-gray-200 p-2">Look left</td><td class="border border-gray-200 p-2 text-green-600">✅ Yes</td><td class="border border-gray-200 p-2 text-red-600">❌ No</td><td class="border border-gray-200 p-2 text-green-600">✅ Yes</td></tr>
        <tr><td class="border border-gray-200 p-2">Insert-safe</td><td class="border border-gray-200 p-2 text-green-600">✅ Yes</td><td class="border border-gray-200 p-2 text-red-600">❌ No</td><td class="border border-gray-200 p-2 text-green-600">✅ Yes</td></tr>
        <tr><td class="border border-gray-200 p-2">Handle not found</td><td class="border border-gray-200 p-2 text-yellow-600">⚠️ IFERROR</td><td class="border border-gray-200 p-2 text-yellow-600">⚠️ IFERROR</td><td class="border border-gray-200 p-2 text-green-600">✅ Built-in</td></tr>
        <tr><td class="border border-gray-200 p-2">Backward compatible</td><td class="border border-gray-200 p-2 text-green-600">✅ All versions</td><td class="border border-gray-200 p-2 text-green-600">✅ All versions</td><td class="border border-gray-200 p-2 text-red-600">❌ Excel 2021+</td></tr>
        <tr><td class="border border-gray-200 p-2">Approximate match</td><td class="border border-gray-200 p-2 text-green-600">✅ Yes (match_type -1/1)</td><td class="border border-gray-200 p-2 text-green-600">✅ Yes (range_lookup TRUE)</td><td class="border border-gray-200 p-2 text-green-600">✅ Yes (match_mode)</td></tr>
      </tbody>
    </table>
  </div>

  <h3 class="text-xl font-semibold mb-2">Edge Cases and Troubleshooting</h3>
  <ul class="list-disc pl-5 mb-4 space-y-2">
    <li><strong>#N/A errors:</strong> Most common cause — the lookup value doesn't exist. Check for data type mismatches (text "100" vs number 100), extra spaces (use TRIM), or invisible characters (use CLEAN). Wrap with IFERROR to show a friendly message: <code>=IFERROR(INDEX(C:C, MATCH(A2, A:A, 0)), "Not Found")</code>.</li>
    <li><strong>Wrong result (not #N/A):</strong> The match_type might be wrong. If your data is unsorted, use 0 for exact match. If you use -1 or 1, the lookup range MUST be sorted ascending or descending respectively.</li>
    <li><strong>Range size mismatch:</strong> Your INDEX range and MATCH range must be the same height (same number of rows). If A:A has 1,048,576 rows and C1:C100 has only 100, MATCH might return a row beyond the INDEX range.</li>
    <li><strong>Performance on large data:</strong> INDEX MATCH is faster than VLOOKUP because it only evaluates two columns (lookup and return), while VLOOKUP loads the entire table array. For datasets over 10,000 rows, the speed difference is noticeable.</li>
  </ul>

  <h3 class="text-xl font-semibold mb-2">Advanced: INDEX MATCH with Multiple Criteria</h3>
  <p class="mb-4">You can match on multiple columns by concatenating criteria within the MATCH function using an array formula:</p>
  <pre class="bg-gray-50 p-3 rounded-lg text-sm mb-4"><code>=INDEX(C:C, MATCH(1, (A:A=E2)*(B:B=F2), 0))</code></pre>
  <p class="mb-4">In Excel, press <strong>Ctrl+Shift+Enter</strong> for array formulas. In Google Sheets, wrap with <code>ARRAYFORMULA()</code>.</p>

  <div class="bg-green-50 p-4 rounded-lg border border-green-100 mt-6">
    <p class="text-sm text-green-800"><strong>Pro Tip:</strong> For a cleaner approach on large datasets, create a helper column (e.g. <code>=A2&amp;"|"&amp;B2</code>) that concatenates your criteria, then use INDEX MATCH against that helper column with a single lookup value. This avoids slow array formulas and works in all Excel versions. If you use Excel 365 or Google Sheets, consider <a href="/formulas/xlookup" class="text-blue-600 underline font-semibold">XLOOKUP</a> or <a href="/formulas/filter" class="text-blue-600 underline font-semibold">FILTER</a> instead — they handle multiple criteria natively.</p>
  </div>
</div>`,
        faq: [
            { question: "What does INDEX MATCH do?", answer: "INDEX returns a value from a range by position; MATCH finds the position of a value. Combined, they look up a value and return from another column—and can look to the left, unlike VLOOKUP." },
            { question: "Why use INDEX MATCH instead of VLOOKUP?", answer: "INDEX MATCH can look left, is not broken when you insert columns, and often performs better on large data. It is more flexible than VLOOKUP." },
            { question: "How do I use INDEX MATCH with multiple criteria?", answer: "Use MATCH with an array formula or helper column that concatenates criteria. In Excel 365 you can use XLOOKUP with multiple conditions more easily." },
            { question: "What is the MATCH type (0, -1, 1)?", answer: "0 = exact match. -1 = find smallest value >= lookup (ascending). 1 = find largest value <= lookup (descending). Use 0 for most lookups." },
            { question: "Why is INDEX MATCH returning #N/A?", answer: "MATCH returns #N/A when the lookup value is not found. Check for data type mismatch (number vs text), extra spaces, or use IFERROR to handle not found." },
            { question: "Can INDEX MATCH handle dates and wildcards?", answer: "Yes. For dates, enter the date directly or use a cell reference: =INDEX(C:C, MATCH(DATE(2025,1,1), A:A, 0)). Wildcards like * and ? work in MATCH only for exact match (0) with text: =INDEX(C:C, MATCH(\"*east*\", A:A, 0)) finds cells containing 'east'." },
            { question: "Can INDEX MATCH work with cross-sheet references?", answer: "Yes. Reference other sheets directly: =INDEX(Sheet2!C:C, MATCH(A2, Sheet2!A:A, 0)). Both INDEX and MATCH can reference ranges on different sheets or even different workbooks." },
            { question: "When should I use INDEX MATCH vs XLOOKUP?", answer: "Use INDEX MATCH when compatibility matters — it works in Excel 2010-2019 and all Google Sheets versions. Use XLOOKUP if your audience uses Excel 365 or newer — it has cleaner syntax, built-in error handling, and default exact match." }
        ],
        commonErrors: [
            { title: 'INDEX MATCH returns #N/A or wrong value', causes: ['Lookup range and return range have different heights (rows).', 'MATCH type wrong: use 0 for exact match; -1/1 for sorted lookup.', 'Data type mismatch between lookup value and lookup range.'], fixes: ['Use same-sized single-column ranges for lookup_range and return_range.', 'Use 0 for exact match in most cases.', 'Normalize types with TRIM, VALUE, or TEXT.'] },
        ],
        howToSteps: [
        {
                name: "Select Return Array (INDEX)",
                text: "Choose the column containing the data you want to retrieve."
        },
        {
                name: "Configure MATCH Function",
                text: "Specify the lookup value and the lookup column array."
        },
        {
                name: "Set Exact Match (0)",
                text: "Use 0 as the third argument in MATCH for an exact match."
        }
],
    },

    // 7. XLOOKUP
    {
        slug: 'xlookup',
        title: "XLOOKUP in Excel: Modern Lookup Formula Generator",
        metaDescription: "Generate XLOOKUP formulas instantly for Excel & Google Sheets. Look up left, right, top, or bottom with built-in #N/A error handling.",
        excelFunction: 'XLOOKUP',
        category: 'Lookup',
        description: 'Searches a range or an array, and then returns the item corresponding to the first match it finds. If no match exists, then XLOOKUP can return the closest (approximate) match.',
        inputs: [
            { id: 'lookup_value', label: 'Lookup Value', type: 'text', placeholder: 'e.g., A2' },
            { id: 'lookup_array', label: 'Lookup Array', type: 'range', placeholder: 'e.g., B:B' },
            { id: 'return_array', label: 'Return Array', type: 'range', placeholder: 'e.g., C:C' },
            { id: 'if_not_found', label: 'If Not Found (Optional)', type: 'text', placeholder: 'e.g., "Not Found"' },
        ],
        generate: (p) => {
            const args = [
                p.lookup_value || 'lookup_value',
                p.lookup_array || 'lookup_array',
                p.return_array || 'return_array'
            ];
            if (p.if_not_found) args.push(p.if_not_found);
            return `=XLOOKUP(${args.join(', ')})`;
        },
        richContent: `
   <div class="prose prose-slate max-w-none mt-12 border-t pt-8 text-left">
     <h2 class="text-2xl font-bold mb-4">Why XLOOKUP is the Modern Replacement for VLOOKUP</h2>
     <p class="mb-4">Introduced in 2019 to solve the limitations of older functions, <strong>XLOOKUP</strong> is more powerful, flexible, and easier to use. It works in any direction (left, right, up, down) and defaults to exact match — no more #N/A surprises from unsorted data.</p>
     
     <h3 class="text-xl font-semibold mb-2">Key Advantages of XLOOKUP</h3>
     <ul class="list-disc pl-5 mb-4">
       <li><strong>No More Column Counting:</strong> You select the lookup array and the return array separately. Never count columns again.</li>
       <li><strong>Horizontal and Vertical Lookups:</strong> XLOOKUP replaces both VLOOKUP and HLOOKUP with one unified function.</li>
       <li><strong>Built-in Error Handling:</strong> Pass a custom message (e.g., "Not Found") as the fourth argument instead of wrapping everything in IFERROR.</li>
       <li><strong>Reverse Search:</strong> Use search_mode = -1 to find the last match instead of the first.</li>
     </ul>
     
     <h3 class="text-xl font-semibold mb-2">Step-by-Step: Look Up an Employee's Department</h3>
     <p class="mb-2">Let's walk through a real example. Suppose you have employee IDs in column A and department names in column C. You want to find which department employee <strong>E-104</strong> belongs to.</p>
     <ol class="list-decimal pl-5 mb-4 space-y-1">
       <li><strong>Pick the lookup value</strong> — the employee ID you're searching for: <code class="bg-gray-100 px-1 rounded font-mono text-xs">E-104</code> (or a cell reference like <code class="bg-gray-100 px-1 rounded font-mono text-xs">A2</code>)</li>
       <li><strong>Set the lookup array</strong> — the column containing all employee IDs: <code class="bg-gray-100 px-1 rounded font-mono text-xs">A:A</code></li>
       <li><strong>Set the return array</strong> — the column with department names: <code class="bg-gray-100 px-1 rounded font-mono text-xs">C:C</code></li>
       <li><strong>Add a fallback (optional)</strong> — return "Not Found" if the ID doesn't exist</li>
     </ol>
     <p class="mb-4">The complete formula: <code class="bg-gray-100 p-1 rounded font-mono text-sm">=XLOOKUP("E-104", A:A, C:C, "Not Found")</code></p>
     <p class="mb-6">Unlike VLOOKUP, XLOOKUP works even if the department column is to the <em>left</em> of the employee ID column — no column reordering needed.</p>

     <h3 class="text-xl font-semibold mb-2">XLOOKUP vs VLOOKUP vs INDEX MATCH — Which Should You Use?</h3>
     <div class="overflow-x-auto mb-6">
       <table class="min-w-full border-collapse border border-gray-300 text-sm">
         <thead>
           <tr class="bg-gray-100">
             <th class="border border-gray-300 px-3 py-2 font-semibold text-left">Feature</th>
             <th class="border border-gray-300 px-3 py-2 font-semibold text-left">XLOOKUP</th>
             <th class="border border-gray-300 px-3 py-2 font-semibold text-left">VLOOKUP</th>
             <th class="border border-gray-300 px-3 py-2 font-semibold text-left">INDEX MATCH</th>
           </tr>
         </thead>
         <tbody>
           <tr>
             <td class="border border-gray-300 px-3 py-2">Lookup direction</td>
             <td class="border border-gray-300 px-3 py-2">Any (left, right, above, below)</td>
             <td class="border border-gray-300 px-3 py-2">Right only</td>
             <td class="border border-gray-300 px-3 py-2">Any</td>
           </tr>
           <tr>
             <td class="border border-gray-300 px-3 py-2">Exact match default</td>
             <td class="border border-gray-300 px-3 py-2">✅ Yes</td>
             <td class="border border-gray-300 px-3 py-2">❌ No (FALSE required)</td>
             <td class="border border-gray-300 px-3 py-2">✅ Yes (with 0)</td>
           </tr>
           <tr>
             <td class="border border-gray-300 px-3 py-2">Built-in error handling</td>
             <td class="border border-gray-300 px-3 py-2">✅ Yes (4th argument)</td>
             <td class="border border-gray-300 px-3 py-2">❌ Needs IFERROR wrapper</td>
             <td class="border border-gray-300 px-3 py-2">❌ Needs IFERROR wrapper</td>
           </tr>
           <tr>
             <td class="border border-gray-300 px-3 py-2">Reverse search (last match)</td>
             <td class="border border-gray-300 px-3 py-2">✅ Yes (search_mode=-1)</td>
             <td class="border border-gray-300 px-3 py-2">❌ No</td>
             <td class="border border-gray-300 px-3 py-2">❌ Manual workaround</td>
           </tr>
           <tr>
             <td class="border border-gray-300 px-3 py-2">Return multiple values</td>
             <td class="border border-gray-300 px-3 py-2">✅ Yes (with array formula)</td>
             <td class="border border-gray-300 px-3 py-2">❌ No</td>
             <td class="border border-gray-300 px-3 py-2">⚠️ Complex array formula</td>
           </tr>
           <tr>
             <td class="border border-gray-300 px-3 py-2">Works in older Excel</td>
             <td class="border border-gray-300 px-3 py-2">❌ Excel 365 only</td>
             <td class="border border-gray-300 px-3 py-2">✅ All versions</td>
             <td class="border border-gray-300 px-3 py-2">✅ All versions</td>
           </tr>
         </tbody>
       </table>
     </div>

     <h3 class="text-xl font-semibold mb-2">Handling Errors with XLOOKUP (if_not_found)</h3>
     <p class="mb-2">The <code class="bg-gray-100 px-1 rounded font-mono text-xs">if_not_found</code> parameter is XLOOKUP's built-in safety net. Instead of getting an ugly #N/A error, you control what appears:</p>
     <ul class="list-disc pl-5 mb-4">
       <li><strong>Show custom text:</strong> <code class="bg-gray-100 px-1 rounded font-mono text-xs">=XLOOKUP(A2, B:B, C:C, "Not in database")</code></li>
       <li><strong>Return a blank cell:</strong> <code class="bg-gray-100 px-1 rounded font-mono text-xs">=XLOOKUP(A2, B:B, C:C, "")</code> — cleaner than <code class="bg-gray-100 px-1 rounded font-mono text-xs">IFERROR(XLOOKUP(...), "")</code></li>
       <li><strong>Chain with other formulas:</strong> <code class="bg-gray-100 px-1 rounded font-mono text-xs">=XLOOKUP(A2, B:B, C:C, "Check ID " & A2 & " — not found")</code></li>
     </ul>
     <p class="mb-6">This single feature eliminates the need for IFERROR wrappers in most lookup scenarios.</p>

     <h3 class="text-xl font-semibold mb-2">XLOOKUP with Multiple Criteria</h3>
     <p class="mb-2">Need to match on more than one condition? Use the <code class="bg-gray-100 px-1 rounded font-mono text-xs">&amp;</code> operator to build a composite key:</p>
     <div class="bg-gray-50 border-l-4 border-indigo-500 p-3 mb-4 font-mono text-sm">
       =XLOOKUP(A2 &amp; B2, A:A &amp; B:B, C:C)
     </div>
     <p class="mb-2">In this formula:</p>
     <ul class="list-disc pl-5 mb-4">
       <li><code class="bg-gray-100 px-1 rounded font-mono text-xs">A2 &amp; B2</code> concatenates the two lookup values (e.g., "SalesEast")</li>
       <li><code class="bg-gray-100 px-1 rounded font-mono text-xs">A:A &amp; B:B</code> builds the same composite key for every row in the lookup table</li>
       <li>XLOOKUP finds the row where both conditions match</li>
     </ul>
     <p class="mb-6"><strong>Note:</strong> In older Excel versions you may need to press <kbd class="bg-gray-200 px-1 rounded">Ctrl</kbd>+<kbd class="bg-gray-200 px-1 rounded">Shift</kbd>+<kbd class="bg-gray-200 px-1 rounded">Enter</kbd> for array formulas. Excel 365 and Google Sheets handle them natively.</p>

     <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r">
       <p class="text-sm text-yellow-900"><strong>⭐ Pro Tip:</strong> When working with large datasets (10,000+ rows), XLOOKUP is faster than INDEX MATCH because it's single-function and optimized by Excel's calculation engine. For multi-condition lookups, consider using <strong>XLOOKUP with &amp;</strong> concatenation — it's much simpler than the equivalent INDEX MATCH array formula. For even more complex criteria, <a href="/formulas/filter" class="text-blue-600 underline font-semibold">FILTER</a> is the better choice.</p>
     </div>

     <h3 class="text-xl font-semibold mb-2">Formula Syntax Reference</h3>
     <p class="mb-4"><code class="bg-gray-100 p-1 rounded font-mono text-sm">=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])</code></p>
   </div>
   `,
        faq: [
            { question: 'What is the difference between XLOOKUP and VLOOKUP?', answer: 'XLOOKUP is the modern replacement: it searches in any direction (left, right, up, down), defaults to exact match, has built-in error handling with the if_not_found argument, and doesn\'t break when columns are inserted/deleted.' },
            { question: 'How do I handle #N/A errors with XLOOKUP?', answer: 'XLOOKUP has a built-in if_not_found argument: =XLOOKUP(lookup_value, lookup_array, return_array, "Not Found"). This eliminates the need for wrapping in IFERROR().' },
            { question: 'Can XLOOKUP return multiple values (array result)?', answer: 'Yes. If your return_array spans multiple columns, XLOOKUP returns an array. For example, =XLOOKUP(G2,A:A,C:E) returns values from columns C, D, and E for the matching row in column A.' }
        ],
        commonErrors: [
            { title: 'XLOOKUP returns #N/A', causes: ['Lookup value not in lookup_array.', 'Lookup and return arrays different lengths.', 'Data type or format mismatch.'], fixes: ['Use fourth argument (if_not_found) to return a default.', 'Ensure lookup_array and return_array have the same number of rows.', 'Use TRIM, VALUE, or TEXT to align formats.'] },
        ],
        howToSteps: [
        {
                name: "Enter Lookup Value",
                text: "Select the cell value you want to search for."
        },
        {
                name: "Select Lookup Array",
                text: "Choose the column or row to search within."
        },
        {
                name: "Select Return Array",
                text: "Choose the column or row to return values from."
        },
        {
                name: "Optional If Not Found",
                text: "Provide fallback text (e.g., 'Not Found') if no match exists."
        }
],
        formulaLogicBreakdown: [
            { argument: 'lookup_value', explanation: 'What you are looking for.', example: 'e.g., A2' },
            { argument: 'lookup_array', explanation: 'The single column or row where the lookup_value should be found.', example: 'e.g., B:B' },
            { argument: 'return_array', explanation: 'The single column or row containing the value you want to return.', example: 'e.g., C:C' },
            { argument: 'if_not_found', explanation: 'Optional. The value to return if no match is found, eliminating the need for IFERROR.', example: 'e.g., "Not Found"' },
            { argument: 'match_mode', explanation: 'Optional. 0 for exact match (default), -1 for exact or next smaller, 1 for exact or next larger.', example: 'e.g., 0' },
            { argument: 'search_mode', explanation: 'Optional. 1 to search first-to-last (default), -1 to search last-to-first.', example: 'e.g., 1' },
        ],
        relatedTools: ['vlookup', 'index-match', 'iferror', 'sumif', 'countif'],
    },

    // 8. TRIM
    {
        slug: 'trim',
        title: "TRIM in Excel: Remove Extra & Leading Spaces",
        metaDescription: "Remove leading, trailing, and double spaces in Excel with the TRIM formula. Clean imported spreadsheets instantly with our free builder.",
        excelFunction: 'TRIM',
        category: 'Text',
        description: 'Removes all spaces from text except for single spaces between words.',
        inputs: [{ id: 'text', label: 'Text', type: 'text', placeholder: 'e.g., A1' }],
        generate: (p) => `=TRIM(${p.text || 'text'})`,
        howToSteps: [
        {
                name: "Select Target Cell",
                text: "Click the empty cell where you want the cleaned text to appear."
        },
        {
                name: "Enter TRIM Formula",
                text: "Type =TRIM(A2) replacing A2 with your target text cell."
        },
        {
                name: "Apply to Range",
                text: "Press Enter and drag the fill handle down to clean all rows."
        }
],
        richContent: `<div class="space-y-6">
      <h2>How to Use the TRIM Function in Excel</h2>
      <p>The <strong>TRIM</strong> function removes extra spaces from text, leaving only single spaces between words and eliminating leading/trailing spaces.</p>
      <h3>Syntax & Arguments</h3>
      <p><code>=TRIM(text)</code></p>
      <ul>
        <li><strong>text</strong> (Required): The text or cell reference you want to remove extra spaces from.</li>
      </ul>
      <h3>Example: Cleaning Messy Text</h3>
      <table class="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden text-sm">
        <thead class="bg-gray-50">
          <tr><th class="px-4 py-2 text-left">Original Text (A2)</th><th class="px-4 py-2 text-left">Formula</th><th class="px-4 py-2 text-left">Result</th></tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr><td class="px-4 py-2 font-mono">"  John   Doe  "</td><td class="px-4 py-2 font-mono">=TRIM(A2)</td><td class="px-4 py-2 font-mono">"John Doe"</td></tr>
          <tr><td class="px-4 py-2 font-mono">" SKU-1294  "</td><td class="px-4 py-2 font-mono">=TRIM(A3)</td><td class="px-4 py-2 font-mono">"SKU-1294"</td></tr>
        </tbody>
      </table>
      <h3>Pro Tip: Non-Breaking Spaces (&nbsp;)</h3>
      <p>If TRIM does not remove spaces copied from websites, they are likely non-breaking spaces (ASCII 160). Use <code>=TRIM(CLEAN(SUBSTITUTE(A2, CHAR(160), " ")))</code> to remove them.</p>
    </div>`,
        faq: [
            { question: 'Does TRIM remove line breaks?', answer: 'No, TRIM only removes extra spaces between words and leading/trailing spaces. Use CLEAN to remove non-printing characters and line breaks.' },
            { question: 'What is the difference between TRIM and CLEAN?', answer: 'TRIM removes extra spaces. CLEAN removes non-printable characters (line breaks, tabs, etc.). Use both: =TRIM(CLEAN(A1)) for thorough cleaning.' },
            { question: 'Does TRIM work in Google Sheets?', answer: 'Yes, TRIM works identically in Google Sheets with the same syntax.' }
        ],
        commonErrors: [
            { title: 'TRIM not removing all spaces', causes: ['Non-breaking spaces (CHAR(160)) are not removed by TRIM.', 'Line breaks or tab characters between words.'], fixes: ['Use SUBSTITUTE to replace CHAR(160) with space first, then TRIM.', 'Use CLEAN before TRIM to remove line breaks.'] }
        ]
    },

    // 9. UPPER
    {
        slug: 'upper',
        title: "UPPER in Excel: Convert Text to Uppercase Letters",
        metaDescription: "Convert lowercase text to ALL CAPS in Excel with the UPPER formula. Standardize codes, IDs, and names instantly with our free formula generator.",
        excelFunction: 'UPPER',
        category: 'Text',
        description: 'Converts text to uppercase.',
        inputs: [{ id: 'text', label: 'Text', type: 'text', placeholder: 'e.g., A1' }],
        generate: (p) => `=UPPER(${p.text || 'text'})`,
        howToSteps: [
        {
                name: "Select Result Cell",
                text: "Click the cell where you want capitalized text to output."
        },
        {
                name: "Enter UPPER Formula",
                text: "Type =UPPER(A2) where A2 is your input text cell."
        },
        {
                name: "Copy Down",
                text: "Press Enter and double-click the fill handle to apply to the entire column."
        }
],
        richContent: `<div class="space-y-6">
      <h2>How to Convert Text to Uppercase in Excel</h2>
      <p>The <strong>UPPER</strong> function converts all characters in a text string to capital letters. Numbers and punctuation marks remain unaffected.</p>
      <h3>Syntax & Arguments</h3>
      <p><code>=UPPER(text)</code></p>
      <ul>
        <li><strong>text</strong> (Required): The text string or cell reference to capitalize.</li>
      </ul>
      <h3>Common Use Cases</h3>
      <ul>
        <li>Standardizing state/country abbreviations (e.g., "ny" → "NY")</li>
        <li>Formatting SKU numbers, coupon codes, and serial numbers</li>
      </ul>
    </div>`,
        faq: [
            { question: 'Does UPPER work with accented characters?', answer: 'Yes, UPPER converts accented characters like é to É and ñ to Ñ. It handles all Unicode letters properly.' },
            { question: 'What is the difference between UPPER, LOWER, and PROPER?', answer: 'UPPER makes all letters uppercase. LOWER makes all letters lowercase. PROPER capitalizes the first letter of each word.' },
            { question: 'Does UPPER work in Google Sheets?', answer: 'Yes, UPPER works identically in Google Sheets with the same syntax.' }
        ],
        commonErrors: [
            { title: 'Text not converting to uppercase', causes: ['The cell contains numbers or special characters (UPPER ignores non-text).', 'The formula is referencing the wrong cell.'], fixes: ['Ensure the cell contains text values, not just numbers.', 'Double-check the cell reference in the formula.'] }
        ]
    },

    // 10. LOWER
    {
        slug: 'lower',
        title: "LOWER in Excel: Convert Text to Lowercase Letters",
        metaDescription: "Convert uppercase text to lowercase in Excel using the LOWER formula. Clean emails, usernames, and URLs instantly with our free builder.",
        excelFunction: 'LOWER',
        category: 'Text',
        description: 'Converts all uppercase letters in a text string to lowercase.',
        inputs: [{ id: 'text', label: 'Text', type: 'text', placeholder: 'e.g., A1' }],
        generate: (p) => `=LOWER(${p.text || 'text'})`,
        howToSteps: [
        {
                name: "Select Target Cell",
                text: "Click the empty cell where you want lowercase text."
        },
        {
                name: "Enter LOWER Formula",
                text: "Type =LOWER(A2) where A2 contains your uppercase text."
        },
        {
                name: "Fill Column",
                text: "Press Enter and copy the formula down your sheet."
        }
],
        richContent: `<div class="space-y-6">
      <h2>How to Convert Text to Lowercase in Excel</h2>
      <p>The <strong>LOWER</strong> function changes all uppercase characters in a text string to lowercase letters.</p>
      <h3>Syntax</h3>
      <p><code>=LOWER(text)</code></p>
      <h3>Example: Email Normalization</h3>
      <p>Email addresses are case-insensitive. Standardizing them with <code>=LOWER(TRIM(A2))</code> prevents duplicate records during VLOOKUP or database imports.</p>
    </div>`,
        faq: [
            { question: 'Does LOWER affect numbers?', answer: 'No, LOWER only affects letter characters. Numbers and special characters remain unchanged.' },
            { question: 'LOWER vs UPPER vs PROPER — when to use each?', answer: 'Use LOWER to standardize text to lowercase, UPPER for all caps headings, and PROPER for names and titles.' },
            { question: 'Does LOWER work in Google Sheets?', answer: 'Yes, LOWER works identically in Google Sheets with the same syntax.' }
        ],
        commonErrors: [
            { title: 'Text not changing to lowercase', causes: ['The cell contains only numbers or symbols.', 'Text is already lowercase so no change is visible.'], fixes: ['Verify the cell actually contains uppercase letters.', 'Test with a known mixed-case value like "Test123".'] }
        ]
    },

    // 11. PROPER
    {
        slug: 'proper',
        title: "PROPER in Excel: Capitalize First Letter of Each Word",
        metaDescription: "Capitalize the first letter of each word in Excel with the PROPER function. Fix messy names, titles, and addresses with our free formula generator.",
        excelFunction: 'PROPER',
        category: 'Text',
        description: 'Capitalizes the first letter in each word of a text value.',
        inputs: [{ id: 'text', label: 'Text', type: 'text', placeholder: 'e.g., A1' }],
        generate: (p) => `=PROPER(${p.text || 'text'})`,
        howToSteps: [
        {
                name: "Select Output Cell",
                text: "Choose the cell where formatted Title Case text will appear."
        },
        {
                name: "Enter PROPER Formula",
                text: "Type =PROPER(A2) referencing your target text cell."
        },
        {
                name: "Apply to Dataset",
                text: "Press Enter and drag down to format all customer names."
        }
],
        richContent: `<div class="space-y-6">
      <h2>How to Capitalize the First Letter of Each Word in Excel</h2>
      <p>The <strong>PROPER</strong> function converts text to title case: capitalizing the first letter of every word and converting all other letters to lowercase.</p>
      <h3>Syntax</h3>
      <p><code>=PROPER(text)</code></p>
      <h3>Example</h3>
      <table class="min-w-full divide-y divide-gray-200 border text-sm">
        <thead class="bg-gray-50"><tr><th class="p-2 text-left">Input</th><th class="p-2 text-left">Formula</th><th class="p-2 text-left">Result</th></tr></thead>
        <tbody>
          <tr><td class="p-2 font-mono">"jane doe"</td><td class="p-2 font-mono">=PROPER(A2)</td><td class="p-2 font-mono">"Jane Doe"</td></tr>
          <tr><td class="p-2 font-mono">"NEW YORK CITY"</td><td class="p-2 font-mono">=PROPER(A3)</td><td class="p-2 font-mono">"New York City"</td></tr>
        </tbody>
      </table>
    </div>`,
        faq: [
            { question: 'How does PROPER handle apostrophes like O\'Brien?', answer: 'PROPER capitalizes the letter after the apostrophe, so O\'brien becomes O\'Brien. This is actually correct for most Irish and Scottish surnames.' },
            { question: 'Does PROPER handle mixed case?', answer: 'Yes, PROPER ignores the original case and capitalizes the first letter of each word, making all other letters lowercase.' },
            { question: 'Does PROPER work in Google Sheets?', answer: 'Yes, PROPER works identically in Google Sheets with the same syntax.' }
        ],
        commonErrors: [
            { title: 'Wrong capitalization result', causes: ['PROPER capitalizes every word — including prepositions like "of" or "and".', 'PROPER cannot distinguish proper names from regular words (e.g. "mcdonald" becomes "Mcdonald").'], fixes: ['Manually fix small words that should stay lowercase.', 'For complex name capitalization, consider a lookup table or manual correction.'] }
        ]
    },

    // 12. LEFT
    {
        slug: 'left',
        title: "LEFT Function in Excel: Extract Characters from Start",
        metaDescription: "Extract a specific number of characters from the beginning of text in Excel. Generate LEFT formulas for prefixes, codes, and IDs with our free tool.",
        excelFunction: 'LEFT',
        category: 'Text',
        description: 'Returns the first character or characters in a text string, based on the number of characters you specify.',
        inputs: [
            { id: 'text', label: 'Text', type: 'text', placeholder: 'e.g., A1' },
            { id: 'num_chars', label: 'Number of Characters', type: 'number', placeholder: 'e.g., 5' },
        ],
        generate: (p) => `=LEFT(${p.text || 'text'}, ${p.num_chars || '1'})`,
        howToSteps: [
        {
                name: "Select Target Cell",
                text: "Click where you want the extracted prefix to appear."
        },
        {
                name: "Enter LEFT Formula",
                text: "Type =LEFT(text, num_chars) e.g., =LEFT(A2, 3)."
        },
        {
                name: "Execute & Copy",
                text: "Press Enter and double-click to fill down the column."
        }
],
        richContent: `<div class="space-y-6">
      <h2>How to Extract Characters from the Left in Excel</h2>
      <p>The <strong>LEFT</strong> function returns the specified number of characters starting from the very first character on the left side of a text string.</p>
      <h3>Syntax & Arguments</h3>
      <p><code>=LEFT(text, [num_chars])</code></p>
      <ul>
        <li><strong>text</strong> (Required): The text string containing the characters you want to extract.</li>
        <li><strong>num_chars</strong> (Optional): The number of characters to extract (default is 1).</li>
      </ul>
      <h3>Examples</h3>
      <table class="min-w-full divide-y divide-gray-200 border text-sm">
        <thead class="bg-gray-50"><tr><th class="p-2 text-left">Text (A2)</th><th class="p-2 text-left">Formula</th><th class="p-2 text-left">Extracted Result</th></tr></thead>
        <tbody>
          <tr><td class="p-2 font-mono">"US-98234"</td><td class="p-2 font-mono">=LEFT(A2, 2)</td><td class="p-2 font-mono">"US"</td></tr>
          <tr><td class="p-2 font-mono">"2026-Q3"</td><td class="p-2 font-mono">=LEFT(A3, 4)</td><td class="p-2 font-mono">"2026"</td></tr>
        </tbody>
      </table>
    </div>`,
        faq: [
            { question: 'What does LEFT return if num_chars is omitted?', answer: 'LEFT returns just the first character by default. So LEFT(A1) is the same as LEFT(A1, 1).' },
            { question: 'What happens if num_chars is more than the text length?', answer: 'LEFT returns the entire text string. For example, LEFT("Hello", 10) returns "Hello" without any errors.' },
            { question: 'Does LEFT work in Google Sheets?', answer: 'Yes, LEFT works identically in Google Sheets with the same syntax.' }
        ],
        commonErrors: [
            { title: 'LEFT returns fewer characters than expected', causes: ['The cell contains extra spaces at the beginning (leading spaces).', 'Non-printing characters exist before the visible text.'], fixes: ['Use TRIM(A1) to remove leading spaces.', 'Use CLEAN(A1) to remove non-printable characters before using LEFT.'] }
        ]
    },

    // 13. RIGHT
    {
        slug: 'right',
        title: "RIGHT Function in Excel: Extract Characters from End",
        metaDescription: "Extract characters from the end of a text string in Excel using the RIGHT formula. Pull suffixes, file extensions, and digits with our free builder.",
        excelFunction: 'RIGHT',
        category: 'Text',
        description: 'Returns the last character or characters in a text string, based on the number of characters you specify.',
        inputs: [
            { id: 'text', label: 'Text', type: 'text', placeholder: 'e.g., A1' },
            { id: 'num_chars', label: 'Number of Characters', type: 'number', placeholder: 'e.g., 5' },
        ],
        generate: (p) => `=RIGHT(${p.text || 'text'}, ${p.num_chars || '1'})`,
        howToSteps: [
        {
                name: "Select Output Cell",
                text: "Click the cell for the extracted suffix or trailing digits."
        },
        {
                name: "Enter RIGHT Formula",
                text: "Type =RIGHT(text, num_chars) e.g., =RIGHT(A2, 4)."
        },
        {
                name: "Press Enter",
                text: "Hit Enter and copy the formula down your sheet."
        }
],
        richContent: `<div class="space-y-6">
      <h2>How to Extract Characters from the Right in Excel</h2>
      <p>The <strong>RIGHT</strong> function returns a specified number of characters from the end (right side) of a text string.</p>
      <h3>Syntax</h3>
      <p><code>=RIGHT(text, [num_chars])</code></p>
      <h3>Example: Extracting Last 4 Digits</h3>
      <p>To extract the last 4 digits of a credit card or phone number in cell A2: <code>=RIGHT(A2, 4)</code></p>
    </div>`,
        faq: [
            { question: 'How do I use RIGHT to extract text after a specific character?', answer: 'Combine RIGHT with FIND: =RIGHT(A1, LEN(A1) - FIND("@", A1)) extracts everything after the @ symbol in an email.' },
            { question: 'What happens if num_chars is negative?', answer: 'RIGHT returns a #VALUE! error if num_chars is negative. Always use a positive number.' },
            { question: 'Does RIGHT work in Google Sheets?', answer: 'Yes, RIGHT works identically in Google Sheets with the same syntax.' }
        ],
        commonErrors: [
            { title: 'RIGHT returns wrong characters', causes: ['Incorrect num_chars value — counting from the end is counterintuitive.', 'Trailing spaces in the text are included in the count.'], fixes: ['Use LEN to verify text length first.', 'Use TRIM to remove trailing spaces before applying RIGHT.'] }
        ]
    },

    // 14. DATEDIF
    {
        slug: 'datedif',
        title: "DATEDIF in Excel: Calculate Difference Between Dates",
        metaDescription: "Calculate the exact number of days, months, or years between two dates in Excel. Generate DATEDIF formulas for age and tenure with our free tool.",
        excelFunction: 'DATEDIF',
        category: 'Date',
        description: 'Calculates the number of days, months, or years between two dates.',
        inputs: [
            { id: 'start_date', label: 'Start Date', type: 'text', placeholder: 'e.g., A1' },
            { id: 'end_date', label: 'End Date', type: 'text', placeholder: 'e.g., B1' },
            {
                id: 'unit',
                label: 'Unit',
                type: 'select',
                options: [
                    { label: 'Years ("Y")', value: '"Y"' },
                    { label: 'Months ("M")', value: '"M"' },
                    { label: 'Days ("D")', value: '"D"' },
                ]
            },
        ],
        generate: (p) => `=DATEDIF(${p.start_date || 'start_date'}, ${p.end_date || 'end_date'}, ${p.unit || '"Y"'})`,
        howToSteps: [
        {
                name: "Specify Start Date",
                text: "Enter the earlier date cell reference (e.g., A2)."
        },
        {
                name: "Specify End Date",
                text: "Enter the later date cell reference or TODAY() (e.g., B2)."
        },
        {
                name: "Select Unit Code",
                text: "Use \"Y\" for years, \"M\" for months, or \"D\" for days."
        }
],
        richContent: `<div class="space-y-6">
      <h2>How to Calculate Date Differences with DATEDIF</h2>
      <p>The <strong>DATEDIF</strong> function computes the difference between two dates in days, completed months, or completed years.</p>
      <h3>Syntax & Unit Codes</h3>
      <p><code>=DATEDIF(start_date, end_date, unit)</code></p>
      <ul>
        <li><code>"Y"</code>: Number of complete years</li>
        <li><code>"M"</code>: Number of complete months</li>
        <li><code>"D"</code>: Number of days</li>
        <li><code>"YM"</code>: Months ignoring years (useful for "X years and Y months")</li>
      </ul>
      <h3>Example: Age Calculation</h3>
      <p><code>=DATEDIF(B2, TODAY(), "Y") & " Years, " & DATEDIF(B2, TODAY(), "YM") & " Months"</code></p>
    </div>`,
        faq: [
            {
                question: 'Why is DATEDIF not showing up in my Excel?',
                answer: 'DATEDIF is a hidden function in modern Excel. It still works but does not appear in the formula autocomplete. Type =DATEDIF( manually and it will work.'
            },
            {
                question: 'What DATEDIF units are available?',
                answer: '"Y" for complete years, "M" for complete months, "D" for days, "YM" for months ignoring years, "YD" for days ignoring years, and "MD" for days ignoring months and years.'
            },
            {
                question: 'Does DATEDIF work in Google Sheets?',
                answer: 'Yes, DATEDIF works in Google Sheets with the same syntax. All unit types (Y, M, D, YM, YD, MD) are supported.'
            }
        ],
        commonErrors: [
            {
                title: '#NUM! error',
                causes: ['Start date is later than end date. DATEDIF does not handle reversed dates.'],
                fixes: ['Use =IF(start &gt; end, -DATEDIF(end, start, unit), DATEDIF(start, end, unit)) for signed results, or swap the arguments.']
            }
        ]
    },

    // 15. NOW
    {
        slug: 'now',
        title: "NOW Function in Excel: Current Date & Timestamp",
        metaDescription: "Insert auto-updating current date and time in Excel using the NOW function. Build timestamps and elapsed time trackers with our free generator.",
        excelFunction: 'NOW',
        category: 'Date',
        description: 'Returns the serial number of the current date and time.',
        inputs: [],
        generate: () => `=NOW()`,
        howToSteps: [
        {
                name: "Select Output Cell",
                text: "Click the cell where you want the live timestamp."
        },
        {
                name: "Enter NOW Formula",
                text: "Type =NOW() without any arguments inside parentheses."
        },
        {
                name: "Format Cell",
                text: "Press Enter and set Cell Format to Date & Time (Ctrl+1)."
        }
],
        richContent: `<div class="space-y-6">
      <h2>How to Use NOW in Excel (Current Date & Time)</h2>
      <p>The <strong>NOW</strong> function returns the current computer date and time, updating automatically whenever the sheet recalculates.</p>
      <h3>Syntax</h3>
      <p><code>=NOW()</code></p>
      <h3>Static Timestamp Shortcut</h3>
      <p>If you need a <em>permanent</em> timestamp that never changes, use keyboard shortcut <code>Ctrl + Shift + ;</code> (Time) or <code>Ctrl + ;</code> (Date) instead of the volatile formula.</p>
    </div>`,
        faq: [
            { question: 'Why does NOW update every time I open the spreadsheet?', answer: 'NOW is a volatile function — it recalculates whenever the worksheet recalculates. The result changes to the current date and time each time.' },
            { question: 'How do I freeze the value from NOW?', answer: 'Copy the cell and paste as values (Ctrl+Shift+V) to convert the formula to a static date/time. Alternatively, use Ctrl+; for the date and Ctrl+Shift+; for the time.' },
            { question: 'Does NOW work in Google Sheets?', answer: 'Yes, NOW works identically in Google Sheets. It also updates when the sheet recalculates or is reopened.' }
        ],
        commonErrors: [
            { title: 'NOW is not showing the correct time', causes: ['The cell is formatted to show only the date, hiding the time portion.', 'The system clock is incorrect.', 'Manual calculation mode is enabled (F9 to recalculate).'], fixes: ['Format the cell as "YYYY-MM-DD HH:MM:SS" to see both date and time.', 'Check your system clock settings.', 'Press F9 to force recalculation if manual mode is on.'] }
        ]
    },

    // 16. TODAY
    {
        slug: 'today',
        title: "TODAY in Excel: Insert Live Current Date Formula",
        metaDescription: "Get the current date automatically in Excel with the TODAY formula. Calculate days remaining, deadlines, and age with our free formula generator.",
        excelFunction: 'TODAY',
        category: 'Date',
        description: 'Returns the serial number of the current date.',
        inputs: [],
        generate: () => `=TODAY()`,
        howToSteps: [
        {
                name: "Click Target Cell",
                text: "Select the cell where you want today's date."
        },
        {
                name: "Type =TODAY()",
                text: "Enter =TODAY() and press Enter."
        },
        {
                name: "Use in Date Math",
                text: "Combine with other dates (e.g., =A2-TODAY() for countdown days)."
        }
],
        richContent: `<div class="space-y-6">
      <h2>How to Insert Today's Date in Excel</h2>
      <p>The <strong>TODAY</strong> function returns today's date, refreshing automatically on sheet open or calculation.</p>
      <h3>Syntax</h3>
      <p><code>=TODAY()</code></p>
      <h3>Common Calculations</h3>
      <ul>
        <li><strong>Days Until Deadline:</strong> <code>=Due_Date - TODAY()</code></li>
        <li><strong>Age in Years:</strong> <code>=INT((TODAY() - Birth_Date) / 365.25)</code></li>
      </ul>
    </div>`,
        faq: [
            { question: 'What is the difference between TODAY and NOW?', answer: 'TODAY returns just the current date (no time component). NOW returns both the current date and time. TODAY is a volatile function like NOW.' },
            { question: 'How do I calculate the number of days until a future date?', answer: 'Use a difference formula: =A1 - TODAY() where A1 contains the future date. The result is the number of days remaining.' },
            { question: 'Does TODAY work in Google Sheets?', answer: 'Yes, TODAY works identically in Google Sheets. It updates when the sheet recalculates.' }
        ],
        commonErrors: [
            { title: 'TODAY returns a serial number instead of a date', causes: ['The cell is formatted as General or Number instead of Date.', 'The column is not wide enough to display the full date.'], fixes: ['Format the cell as a date: right-click > Format Cells > Date.', 'Widen the column or change the date format.'] }
        ]
    },

    // 17. NETWORKDAYS
    {
        slug: 'networkdays',
        title: "NETWORKDAYS in Excel: Calculate Work Days & Holidays",
        metaDescription: "Calculate the exact number of working days between two dates in Excel. Exclude weekends and custom holidays with our free formula builder.",
        excelFunction: 'NETWORKDAYS',
        category: 'Date',
        description: 'Returns the number of whole working days between start_date and end_date.',
        inputs: [
            { id: 'start_date', label: 'Start Date', type: 'text', placeholder: 'e.g., A1' },
            { id: 'end_date', label: 'End Date', type: 'text', placeholder: 'e.g., B1' },
            { id: 'holidays', label: 'Holidays (Optional)', type: 'range', placeholder: 'e.g., H1:H10' },
        ],
        generate: (p) => {
            const args = [p.start_date || 'start_date', p.end_date || 'end_date'];
            if (p.holidays) args.push(p.holidays);
            return `=NETWORKDAYS(${args.join(', ')})`;
        },
        howToSteps: [
        {
                name: "Specify Start Date",
                text: "Select the project start date cell (e.g., A2)."
        },
        {
                name: "Specify End Date",
                text: "Select the project end date cell (e.g., B2)."
        },
        {
                name: "Optional Holidays Range",
                text: "Provide a range containing holiday dates (e.g., H2:H10)."
        }
],
        richContent: `<div class="space-y-6">
      <h2>How to Calculate Working Days with NETWORKDAYS</h2>
      <p>The <strong>NETWORKDAYS</strong> function calculates full working days between two dates, automatically excluding Saturdays, Sundays, and optional holidays.</p>
      <h3>Syntax</h3>
      <p><code>=NETWORKDAYS(start_date, end_date, [holidays])</code></p>
      <h3>Example</h3>
      <p><code>=NETWORKDAYS(A2, B2, $H$2:$H$10)</code> returns net working business days for accurate payroll and SLA tracking.</p>
    </div>`,
        faq: [
            {
                question: 'Does NETWORKDAYS include weekends?',
                answer: 'No, NETWORKDAYS automatically excludes Saturdays and Sundays. Only weekdays (Monday-Friday) are counted as working days.'
            },
            {
                question: 'How do I add holidays to NETWORKDAYS?',
                answer: 'Add a range of holiday dates as the third argument. For example: =NETWORKDAYS(A1, B1, H1:H10) where H1:H10 contains your holiday dates.'
            }
        ]
    },

    // 18. PMT
    {
        slug: 'pmt',
        title: "PMT Function in Excel: Loan & Mortgage Payment Calculator",
        metaDescription: "Calculate monthly loan payments in Excel using the PMT formula. Compute mortgage, auto, and interest payments with our free interactive generator.",
        excelFunction: 'PMT',
        category: 'Math', // Changed from Financial to Math as per type definition, or need to add Financial type
        description: 'Calculates the payment for a loan based on constant payments and a constant interest rate.',
        inputs: [
            { id: 'rate', label: 'Interest Rate', type: 'text', placeholder: 'e.g., 5%/12' },
            { id: 'nper', label: 'Number of Payments', type: 'text', placeholder: 'e.g., 60' },
            { id: 'pv', label: 'Present Value (Loan Amount)', type: 'text', placeholder: 'e.g., 10000' },
        ],
        generate: (p) => `=PMT(${p.rate || 'rate'}, ${p.nper || 'nper'}, ${p.pv || 'pv'})`,
        howToSteps: [
        {
                name: "Enter Monthly Rate",
                text: "Provide annual interest rate divided by 12 (e.g., 6%/12)."
        },
        {
                name: "Enter Total Periods",
                text: "Provide total months (e.g., 30 years * 12 = 360)."
        },
        {
                name: "Enter Loan Amount (PV)",
                text: "Enter loan principal (use negative e.g., -250000 for positive output)."
        }
],
        richContent: `<div class="space-y-6">
      <h2>How to Calculate Loan Payments with PMT in Excel</h2>
      <p>The <strong>PMT</strong> function calculates the payment for a loan based on constant payments and a constant interest rate.</p>
      <h3>Syntax & Arguments</h3>
      <p><code>=PMT(rate, nper, pv, [fv], [type])</code></p>
      <ul>
        <li><strong>rate</strong>: Interest rate per period (Annual Rate / 12 for monthly payments)</li>
        <li><strong>nper</strong>: Total number of payment periods (Years * 12)</li>
        <li><strong>pv</strong>: Present value or principal loan amount</li>
      </ul>
      <h3>Example Formula</h3>
      <p><code>=PMT(5%/12, 360, -300000)</code> calculates the monthly payment on a $300,000 30-year fixed mortgage at 5% interest ($1,610.46/mo).</p>
    </div>`,
        faq: [
            {
                question: 'What does PMT calculate?',
                answer: 'PMT calculates the constant periodic payment for a loan, such as the monthly payment for a mortgage or car loan.'
            },
            {
                question: 'How do I convert an annual rate to a monthly rate for PMT?',
                answer: 'Divide the annual rate by 12. For example, 6% annual becomes 6%/12. Also multiply the number of years by 12 for the nper.'
            },
            {
                question: 'Why is the PMT result negative?',
                answer: 'PMT returns a negative number by convention because it represents an outgoing payment (cash outflow). To get a positive result, use -PMT(...) or negate the loan amount.'
            }
        ],
        commonErrors: [
            {
                title: 'Payment seems too high or too low',
                causes: ['Annual rate not converted to monthly rate.', 'Number of payments not matching the rate period.'],
                fixes: ['Convert annual rate: rate/12 for monthly payments.', 'Match nper to rate: 12 months × years for monthly payments, or use 12 for 12 monthly payments.']
            }
        ]
    },

    // 19. AND
    {
        slug: 'and',
        title: "AND Function in Excel: Test Multiple Conditions Together",
        metaDescription: "Check if all conditions are true in Excel using the AND formula. Combine with IF to build powerful multi-condition validation logic easily.",
        excelFunction: 'AND',
        category: 'Logic',
        description: 'Returns TRUE if all its arguments are TRUE; returns FALSE if one or more argument is FALSE.',
        inputs: [
            { id: 'logical1', label: 'Condition 1', type: 'text', placeholder: 'e.g., A1>0' },
            { id: 'logical2', label: 'Condition 2', type: 'text', placeholder: 'e.g., B1<10' },
        ],
        generate: (p) => `=AND(${p.logical1 || 'logical1'}, ${p.logical2 || 'logical2'})`,
        howToSteps: [
        {
                name: "Enter First Condition",
                text: "Specify your first logical test (e.g., A2 > 50)."
        },
        {
                name: "Add Second Condition",
                text: "Add more comma-separated conditions (e.g., B2 = 'Approved')."
        },
        {
                name: "Nest inside IF",
                text: "Wrap with IF for custom responses: =IF(AND(A2>50, B2='Approved'), 'Pass', 'Fail')."
        }
],
        richContent: `<div class="space-y-6">
      <h2>How to Use the AND Function in Excel</h2>
      <p>The <strong>AND</strong> function returns TRUE if all its arguments evaluate to TRUE; it returns FALSE if one or more arguments evaluate to FALSE.</p>
      <h3>Syntax</h3>
      <p><code>=AND(logical1, [logical2], ...)</code></p>
      <h3>Combining with IF</h3>
      <p><code>=IF(AND(Score>=70, Attendance>=80%), "Eligible", "Ineligible")</code></p>
    </div>`,
        faq: [
            { question: 'How many conditions can AND check?', answer: 'AND can check up to 255 conditions in Excel (Excel 2007+). Google Sheets also supports multiple conditions.' },
            { question: 'Does AND evaluate all conditions or stop early?', answer: 'Excel AND evaluates all arguments regardless. Google Sheets uses short-circuit evaluation, stopping at the first FALSE.' },
            { question: 'What is the difference between AND and nested IF?', answer: 'AND returns TRUE/FALSE directly. Combined with IF, =IF(AND(A1>0, B1<10), "Yes", "No") is cleaner than nested IFs.' }
        ],
        commonErrors: [
            { title: 'AND returns FALSE when I expect TRUE', causes: ['One or more conditions are not being met.', 'Numbers stored as text do not match numeric comparisons.', 'Cell references are incorrect or pointing to empty cells.'], fixes: ['Test each condition separately to find the failing one.', 'Use VALUE() to convert text to numbers.', 'Verify cell references.'] }
        ]
    },

    // 20. OR
    {
        slug: 'or',
        title: "OR Function in Excel: Test If Any Condition Is True",
        metaDescription: "Test if at least one condition is true in Excel with the OR formula. Combine with IF for flexible multi-criteria filtering with our free generator.",
        excelFunction: 'OR',
        category: 'Logic',
        description: 'Returns TRUE if any argument is TRUE; returns FALSE if all arguments are FALSE.',
        inputs: [
            { id: 'logical1', label: 'Condition 1', type: 'text', placeholder: 'e.g., A1>0' },
            { id: 'logical2', label: 'Condition 2', type: 'text', placeholder: 'e.g., B1<10' },
        ],
        generate: (p) => `=OR(${p.logical1 || 'logical1'}, ${p.logical2 || 'logical2'})`,
        howToSteps: [
        {
                name: "Specify First Test",
                text: "Enter your first logical test (e.g., A2 = 'VIP')."
        },
        {
                name: "Specify Alternative Tests",
                text: "Enter additional conditions separated by commas (e.g., B2 > 1000)."
        },
        {
                name: "Evaluate & Wrap",
                text: "Wrap inside IF: =IF(OR(A2='VIP', B2>1000), 'Discount', 'Regular')."
        }
],
        richContent: `<div class="space-y-6">
      <h2>How to Use the OR Function in Excel</h2>
      <p>The <strong>OR</strong> function returns TRUE if any argument is TRUE, and returns FALSE only when all arguments are FALSE.</p>
      <h3>Syntax</h3>
      <p><code>=OR(logical1, [logical2], ...)</code></p>
      <h3>Example: Weekend Checker</h3>
      <p><code>=IF(OR(WEEKDAY(A2)=1, WEEKDAY(A2)=7), "Weekend", "Workday")</code></p>
    </div>`,
        faq: [
            { question: 'Can OR be used in conditional formatting?', answer: 'Yes. Use =OR(A1="Overdue", B1>30) in a conditional formatting rule to highlight cells matching any condition.' },
            { question: 'What is the difference between OR and AND?', answer: 'OR returns TRUE if ANY condition is true. AND returns TRUE only if ALL conditions are true. Use OR for flexible criteria and AND for strict criteria.' },
            { question: 'Does OR work in Google Sheets?', answer: 'Yes, OR works identically in Google Sheets with the same syntax and behavior.' }
        ],
        commonErrors: [
            { title: 'OR returns TRUE unexpectedly', causes: ['A condition matches when you thought all should fail.', 'Empty cells are treated as 0, which may be a valid condition match.'], fixes: ['Test each condition individually.', 'Check how empty cells are evaluated in your specific criteria.'] }
        ]
    },

    // 21. Extract Email
    {
        slug: 'extract-email',
        title: "Extract Email from Text in Excel: Formula & Generator",
        metaDescription: "Extract email addresses from messy text and strings in Excel & Google Sheets. Copy-paste ready formulas and interactive generator with no signup.",
        excelFunction: 'REGEXEXTRACT',
        category: 'Text',
        description: 'Extracts an email address from a text string.',
        inputs: [
            { id: 'target_cell', label: 'Target Cell', type: 'text', placeholder: 'e.g., A2' },
        ],
        generate: (p) => `=REGEXEXTRACT(${p.target_cell || 'A2'}, "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}")`,
        relatedTools: ['extract-domain', 'regex-extract-generator', 'find', 'left', 'mid'],
        richContent: `
       <h2 class="text-2xl font-bold mb-4">How to Extract Email from Text in Google Sheets</h2>
       <p class="mb-4">Cleaning messy data is one of the most time-consuming tasks in spreadsheet management. If you have a column of raw text, such as CRM exports or scraped web data, our <strong>Deterministic Email Extractor</strong> generates the exact REGEXEXTRACT formula you need to automate this process.</p>
       
       <h3 class="text-xl font-semibold mb-2">Understanding the Formula Logic</h3>
       <p class="mb-4">The core of this tool relies on <strong>Regular Expressions (Regex)</strong>. The standard formula follows this pattern: <br/><code class="bg-gray-100 p-1 rounded font-mono text-sm">=REGEXEXTRACT(A2, "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}")</code></p>
       
       <h3 class="text-xl font-semibold mb-2">Alternative: Excel vs Google Sheets</h3>
       <p class="mb-4">While Google Sheets natively supports REGEX, Excel traditionally requires complex combinations of LEFT, MID, and FIND. This generator ensures you get the most compatible string for your platform.</p>
       
       <div class="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-6">
         <p class="text-sm text-blue-800 italic"><strong>Pro Tip:</strong> To extract multiple emails from a single cell, you might need a custom Apps Script or a combination of TEXTJOIN and REGEXREPLACE.</p>
       </div>
     `,
        howToSteps: [
        {
                name: "Paste Source Text",
                text: "Identify the column containing raw text or bios with emails."
        },
        {
                name: "Generate Formula",
                text: "Use REGEXEXTRACT or TEXTBEFORE/TEXTAFTER based on your Excel version."
        },
        {
                name: "Extract & Validate",
                text: "Apply formula to extract clean, lowercase email addresses."
        }
],
        faq: [
            { question: 'Does Excel support REGEXEXTRACT?', answer: 'Google Sheets uses REGEXEXTRACT natively. Microsoft Excel 365 has added REGEXEXTRACT in newer builds; otherwise use TEXTSPLIT, MID/FIND patterns, or Power Query for extraction.' },
            { question: 'Why is my extracted email incomplete?', answer: 'The pattern returns one match. For multiple emails in one cell, use repeated formulas, SPLIT/TEXTJOIN workflows, or Apps Script.' },
            { question: 'How do I extract email from text in Sheets?', answer: 'Use REGEXEXTRACT with an email pattern on your cell (e.g. A2), or paste the exact formula from SheetMaster’s generator.' },
        ],
    },

    // 22. Extract Domain
    {
        slug: 'extract-domain',
        title: "Extract Domain from URL & Email in Excel (Formulas)",
        metaDescription: "Extract website domain names from URLs or email addresses in Excel & Google Sheets. Free formula generator with step-by-step examples.",
        excelFunction: 'REGEXEXTRACT',
        category: 'Text',
        description: 'Extracts the domain part from a URL.',
        inputs: [
            { id: 'target_cell', label: 'URL Cell', type: 'text', placeholder: 'e.g., A2' },
        ],
        generate: (p) => `=REGEXEXTRACT(${p.target_cell || 'A2'}, "^(?:https?:\\/\\/)?(?:www\\.)?([^\\/]+)")`,
        howToSteps: [
        {
                name: "Select URL/Email Cell",
                text: "Click the cell containing the web link or email address."
        },
        {
                name: "Enter Extraction Formula",
                text: "For email: =MID(A2, FIND(\"@\", A2)+1, LEN(A2))."
        },
        {
                name: "Copy Down",
                text: "Press Enter and double-click the fill handle down your table."
        }
],
        richContent: `
  <h3>How to Extract Domain from URL</h3>
  <p>For SEO specialists and marketers, extracting the root domain (e.g., "google.com") from a full URL (e.g., "[https://www.google.com/search?q=](https://www.google.com/search?q=)...") is a daily task.</p>
  
  <h4>Why not use LEFT/RIGHT?</h4>
  <p>Using standard text functions is difficult because URLs vary in length. Some start with HTTP, some with HTTPS, and some have "www".</p>
  <p>This tool uses a <strong>Regular Expression</strong> to ignore the protocol (http://) and the "www" prefix, capturing only the core domain name immediately following them.</p>
  
  <h4>Pro Tip</h4>
  <p>If you need to extract the full path or specific parameters, consider using the <code>SPLIT</code> function with "/" as the delimiter.</p>
`
        ,
        faq: [
            {
                question: 'How do I extract domain from URL in Excel?',
                answer: 'Use REGEXEXTRACT with a pattern that strips protocol and path, or this generator’s pattern to return the host (e.g. example.com) from a full URL in a cell.',
            },
            {
                question: 'Does this return subdomain or root domain only?',
                answer: 'The default pattern captures the host after optional http(s) and www. For subdomains you get the full host (e.g. blog.example.com). Adjust the regex if you need only the registrable domain.',
            },
        ],
        commonErrors: [
            {
                title: 'REGEXEXTRACT returns empty or wrong string',
                causes: ['URL missing or not a string.', 'Pattern does not match internationalized or unusual TLDs.', 'Cell contains only a path with no host.'],
                fixes: ['Ensure the cell has a full URL with a host.', 'Test the pattern in one cell before filling down.', 'For email-based domains use the extract-email tool instead.'],
            },
        ],
        relatedTools: ['left', 'find', 'len', 'trim', 'iferror'],
    },

    // 23. Get First Word
    {
        slug: 'get-first-word',
        title: "Extract First Word from Text in Excel (LEFT & FIND)",
        metaDescription: "Extract the first word or first name from text strings in Excel using LEFT and FIND. Clean customer names instantly with our free builder.",
        excelFunction: 'LEFT & FIND',
        category: 'Text',
        description: 'Returns the first word in a text string.',
        inputs: [
            { id: 'target_cell', label: 'Target Cell', type: 'text', placeholder: 'e.g., A2' },
        ],
        generate: (p) => `=LEFT(${p.target_cell || 'A2'}, FIND(" ", ${p.target_cell || 'A2'}) - 1)`,
        howToSteps: [
        {
                name: "Identify Name Cell",
                text: "Select the cell containing full names or multi-word strings."
        },
        {
                name: "Apply LEFT & FIND Formula",
                text: "Use =LEFT(A2, FIND(\" \", A2&\" \") - 1) to handle single & multi-word cells."
        },
        {
                name: "Apply to Dataset",
                text: "Press Enter and drag down to parse all first words."
        }
],
        richContent: `
  <h3>How to Get the First Word from a String</h3>
  <p>Extracting the first word is often used to get a person's <strong>First Name</strong> from a full name column.</p>
  
  <h4>The Logic</h4>
  <p>We use a combination of <code>LEFT</code> and <code>FIND</code> functions:</p>
  <ol>
    <li><strong>FIND(" ", A2)</strong>: This tells us the position number of the first space character.</li>
    <li><strong>LEFT(A2, Position - 1)</strong>: This extracts everything from the left up to (but not including) that space.</li>
  </ol>
  
  <h4>Edge Case: Single Words</h4>
  <p>Note: If the cell contains only one word (no spaces), this formula might return an error. You can wrap it in <code>IFERROR</code> to handle single-word cells gracefully.</p>
`
        ,
        faq: [
            {
                question: 'How do I get the first word in Excel?',
                answer: 'Use LEFT with FIND on the first space: =LEFT(A2,FIND(" ",A2)-1). For Google Sheets you can also use TEXTBEFORE when available.',
            },
            {
                question: 'Why do I get #VALUE when extracting the first word?',
                answer: 'Usually there is no space in the cell (single word) or the cell is empty. Wrap with IFERROR or test with IF(ISERROR(FIND(...))).',
            },
            {
                question: 'How is this different from PROPER or TRIM?',
                answer: 'PROPER capitalizes words; TRIM removes extra spaces. LEFT+FIND returns only the substring before the first space.',
            },
        ],
        commonErrors: [
            {
                title: '#VALUE! when extracting first word',
                causes: ['No space in the cell (single word).', 'FIND returns error when space is missing.', 'Empty cell.'],
                fixes: ['Use IFERROR: =IFERROR(LEFT(A2,FIND(" ",A2&" ")-1),A2) to treat one word as the whole cell.', 'Or use TEXTBEFORE in Excel 365 / Sheets when supported.'],
            },
        ],
        relatedTools: ['left', 'find', 'iferror', 'trim', 'text'],
    },

    // 24. Remove First 3 Characters
    {
        slug: 'remove-first-3-chars',
        title: "Remove First 3 Characters in Excel (Formulas & Tool)",
        metaDescription: "Remove the first 3 characters in Excel instantly using RIGHT+LEN, MID, or REPLACE. Copy working formulas or use our interactive generator.",
        excelFunction: 'RIGHT & LEN',
        category: 'Text',
        description: 'Removes the specified number of characters from the beginning of a text string.',
        inputs: [
            { id: 'target_cell', label: 'Target Cell', type: 'text', placeholder: 'e.g., A2' },
            { id: 'num_chars', label: 'Number of chars to remove', type: 'number', placeholder: 'e.g., 3' },
        ],
        generate: (p) => `=RIGHT(${p.target_cell || 'A2'}, LEN(${p.target_cell || 'A2'}) - ${p.num_chars || '3'})`,
        richContent: `
  <h3>How to Remove First 3 Characters in Excel: Step-by-Step Guide</h3>
  <p>Stripping unwanted characters from the start of a cell is one of the most common data cleaning tasks in Excel. Whether you are dealing with product codes (e.g. "SKU-12345"), phone numbers with country codes, or imported CSV data with prefix junk, Excel offers <strong>three reliable methods</strong> to remove the first N characters.</p>

  <h4>Method 1: RIGHT + LEN (Most Popular)</h4>
  <p>The most intuitive and widely-used approach:</p>
  <ol>
    <li><strong>Identify your target cell</strong> — e.g. A2 contains "SKU-12345".</li>
    <li><strong>Apply the formula:</strong> <code>=RIGHT(A2, LEN(A2) - 3)</code> removes the first 3 characters.</li>
    <li><strong>Drag down</strong> to apply to all cells in your column.</li>
  </ol>
  <p><strong>Why it works:</strong> <code>LEN(A2)</code> counts the total length. Subtracting N gives <code>RIGHT</code> the exact number of trailing characters to keep. Change "3" to any number of characters you need to strip.</p>
  <div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-4 rounded">
    <p class="text-sm text-blue-900"><strong>Pro Tip:</strong> For truly dynamic stripping, put N in a separate cell (e.g. D1) and use <code>=RIGHT(A2, LEN(A2) - D1)</code>. Update D1 once and all formulas recalculate automatically.</p>
  </div>

  <h4>Method 2: MID (More Forgiving)</h4>
  <p>If you find <code>RIGHT + LEN</code> confusing, <code>MID</code> offers a more natural "start at character X" syntax:</p>
  <ul>
    <li><code>=MID(A2, 4, LEN(A2))</code> — starts at the 4th character, keeping everything after it.</li>
    <li>Replace the "4" with <code>N+1</code> (where N is the number of characters to remove). For N=3, start at position 4.</li>
  </ul>

  <h4>Method 3: REPLACE (One-Step)</h4>
  <p>For removing a <strong>known prefix string</strong> (not a fixed character count), use <code>REPLACE</code>:</p>
  <ul>
    <li><code>=REPLACE(A2, 1, 3, "")</code> — replaces the first 3 characters with an empty string.</li>
    <li>This is simpler than <code>RIGHT+LEN</code> when you always remove the same fixed count.</li>
  </ul>

  <h4>Method Comparison Table</h4>
  <div class="overflow-x-auto my-6">
    <table class="min-w-full border-collapse border border-gray-300 text-sm">
      <thead>
        <tr class="bg-gray-100">
          <th class="border border-gray-300 px-4 py-2 text-left font-semibold">Method</th>
          <th class="border border-gray-300 px-4 py-2 text-left font-semibold">Formula (remove first 3)</th>
          <th class="border border-gray-300 px-4 py-2 text-left font-semibold">Best For</th>
          <th class="border border-gray-300 px-4 py-2 text-left font-semibold">Excel & Sheets</th>
        </tr>
      </thead>
      <tbody>
        <tr class="even:bg-gray-50">
          <td class="border border-gray-300 px-4 py-2 font-medium">RIGHT + LEN</td>
          <td class="border border-gray-300 px-4 py-2"><code>=RIGHT(A2,LEN(A2)-3)</code></td>
          <td class="border border-gray-300 px-4 py-2">Variable-length text, most common</td>
          <td class="border border-gray-300 px-4 py-2 text-center">✅ Both</td>
        </tr>
        <tr class="even:bg-gray-50">
          <td class="border border-gray-300 px-4 py-2 font-medium">MID</td>
          <td class="border border-gray-300 px-4 py-2"><code>=MID(A2,4,LEN(A2))</code></td>
          <td class="border border-gray-300 px-4 py-2">Users who prefer "start position" logic</td>
          <td class="border border-gray-300 px-4 py-2 text-center">✅ Both</td>
        </tr>
        <tr class="even:bg-gray-50">
          <td class="border border-gray-300 px-4 py-2 font-medium">REPLACE</td>
          <td class="border border-gray-300 px-4 py-2"><code>=REPLACE(A2,1,3,"")</code></td>
          <td class="border border-gray-300 px-4 py-2">Fixed character count, simplest syntax</td>
          <td class="border border-gray-300 px-4 py-2 text-center">✅ Both</td>
        </tr>
        <tr class="even:bg-gray-50">
          <td class="border border-gray-300 px-4 py-2 font-medium">LEFT + LEN (last N)</td>
          <td class="border border-gray-300 px-4 py-2"><code>=LEFT(A2,LEN(A2)-3)</code></td>
          <td class="border border-gray-300 px-4 py-2">Removing from the <em>end</em> instead</td>
          <td class="border border-gray-300 px-4 py-2 text-center">✅ Both</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>Real-World Use Cases</h4>
  <ul>
    <li><strong>Cleaning product codes</strong>: Remove prefix "SKU-" from "SKU-12345" → <code>=RIGHT(A2,LEN(A2)-4)</code>.</li>
    <li><strong>Phone numbers</strong>: Strip country code "+1" from "+15551234567" → <code>=RIGHT(A2,LEN(A2)-2)</code>.</li>
    <li><strong>CSV imports</strong>: Remove quote character or "#" prefix from imported data.</li>
    <li><strong>Serial numbers</strong>: Drop fixed-length batch prefix from part numbers.</li>
    <li><strong>Date formatting cleanup</strong>: Strip leading zeros or prefixes from imported date strings.</li>
  </ul>

  <h4>Variable N — One Formula for Any Strip Length</h4>
  <p>Instead of hard-coding the number, store it in a cell reference:</p>
  <pre class="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm"><code>=RIGHT(A2, LEN(A2) - D1)</code></pre>
  <p>Where D1 contains the number of characters to remove (e.g. 3, 5, 7). Update D1 once and every formula using it recalculates. This is especially powerful when processing datasets with varying prefix lengths.</p>

  <h4>Edge Cases & How to Handle Them</h4>
  <ul>
    <li><strong>N is larger than text length:</strong> <code>RIGHT</code> returns empty. Wrap with <code>=IF(LEN(A2)<=3, A2, RIGHT(A2,LEN(A2)-3))</code> to return the original value unchanged.</li>
    <li><strong>Cell contains a number (not text):</strong> <code>LEN</code> still works, but if you get <code>#VALUE!</code>, wrap with <code>=RIGHT(TEXT(A2,"@"), LEN(TEXT(A2,"@"))-3)</code>.</li>
    <li><strong>Whitespace differences:</strong> Use <code>TRIM</code> before stripping: <code>=RIGHT(TRIM(A2), LEN(TRIM(A2))-3)</code> to avoid off-by-one errors from trailing spaces.</li>
    <li><strong>Empty cells:</strong> <code>RIGHT</code> returns empty. Use <code>=IF(A2="", "", RIGHT(A2,LEN(A2)-3))</code> to keep your output clean.</li>
  </ul>
`,
        howToSteps: [
        {
                name: "Select Target Cell",
                text: "Click the cell where you want the trimmed text string."
        },
        {
                name: "Enter RIGHT+LEN Formula",
                text: "Type =RIGHT(A2, LEN(A2)-3) replacing 3 with your character count."
        },
        {
                name: "Fill Column",
                text: "Press Enter and double-click to apply down your entire column."
        }
],
        faq: [
            { question: 'How do I remove the first 3 characters in Excel?', answer: '=RIGHT(A2,LEN(A2)-3) removes exactly three characters from the left of the text in A2. You can change 3 to any number of characters you want to remove.' },
            { question: 'How do I remove the first 2 characters in Excel?', answer: 'Use =RIGHT(A2,LEN(A2)-2) to remove the first 2 characters. This is commonly used to strip country codes from phone numbers or remove prefix characters.' },
            { question: 'How do I remove last N characters instead?', answer: 'Use LEFT with LEN: =LEFT(A2,LEN(A2)-N). For example, =LEFT(A2,LEN(A2)-3) removes the last 3 characters from a text string.' },
            { question: 'What if the cell has fewer than 3 characters?', answer: 'If the text is shorter than the number of characters you want to remove, RIGHT returns an empty string. Use =IF(LEN(A2)<=3, A2, RIGHT(A2,LEN(A2)-3)) to handle this edge case.' },
            { question: 'Can I remove the first N characters in Google Sheets?', answer: 'Yes, the same formulas work in Google Sheets. You can also use =MID(A2,4,999) to skip the first 3 characters, or =REGEXREPLACE(A2,"^. {3}","") for a regex approach.' },
            { question: 'What is the fastest way to remove the first 3 characters from a column of data?', answer: 'Use the formula =RIGHT(A2,LEN(A2)-3) and drag it down the column. For bulk operations on thousands of rows, this is the most efficient method. Alternatively, use Power Query for non-destructive editing.' },
            { question: 'How do I remove the first 3 characters from a cell if it has fewer than 3 characters?', answer: 'Use a protective formula: =IF(LEN(A2)<=3, A2, RIGHT(A2,LEN(A2)-3)). This returns the original value if the text is 3 characters or shorter, preventing errors.' },
            { question: 'Can I remove the first N characters dynamically (not just 3)?', answer: 'Yes. Replace the hardcoded 3 with a cell reference: =RIGHT(A2,LEN(A2)-B1) where B1 contains the number of characters to remove. This makes the formula reusable for any N value.' }
        ],
        commonErrors: [
            {
                title: '#VALUE! or wrong length after RIGHT/LEN',
                causes: ['Cell contains a number; LEN still works but formula may be mixed with dates.', 'N larger than LEN(text) returns empty.'],
                fixes: ['Wrap source in TEXT if needed: TEXT(A2,"@").', 'Use MAX(0,LEN(A2)-N) inside RIGHT if N can exceed length in edge cases.'],
            },
        ],
        relatedTools: ['right', 'mid', 'left', 'len', 'find', 'substitute', 'regex-extract-generator'],
    },

    // 25. SUMIFS - Multiple Criteria Sum
    {
        slug: 'sumifs',
        title: "SUMIFS in Excel: Sum with Multiple Criteria (Easy Guide)",
        metaDescription: "Learn how to use SUMIFS in Excel to sum values matching multiple criteria. Step-by-step examples with dates, numbers, and free formula generator.",
        excelFunction: 'SUMIFS',
        category: 'Math',
        description: 'Adds all cells that meet multiple criteria. More powerful than SUMIF for complex conditions.',
        inputs: [
            { id: 'sum_range', label: 'Sum Range', type: 'range', placeholder: 'e.g., C1:C100' },
            { id: 'criteria_range1', label: 'Criteria Range 1', type: 'range', placeholder: 'e.g., A1:A100' },
            { id: 'criteria1', label: 'Criteria 1', type: 'text', placeholder: 'e.g., "Sales"' },
            { id: 'criteria_range2', label: 'Criteria Range 2', type: 'range', placeholder: 'e.g., B1:B100' },
            { id: 'criteria2', label: 'Criteria 2', type: 'text', placeholder: 'e.g., ">1000"' },
        ],
        generate: (p) => `=SUMIFS(${p.sum_range || 'sum_range'}, ${p.criteria_range1 || 'criteria_range1'}, ${p.criteria1 || 'criteria1'}, ${p.criteria_range2 || 'criteria_range2'}, ${p.criteria2 || 'criteria2'})`,
        howToSteps: [
        {
                name: "Select Sum Range First",
                text: "Highlight the column of numbers you want to sum (e.g., C2:C100)."
        },
        {
                name: "Add First Criteria Range & Condition",
                text: "Select criteria column 1 and value (e.g., A2:A100, \"North\")."
        },
        {
                name: "Add Second Criteria Range & Condition",
                text: "Select criteria column 2 and value (e.g., B2:B100, \">1000\")."
        }
],
        faq: [
            { question: 'How to use SUMIFS with multiple criteria in Excel?', answer: 'Syntax: =SUMIFS(sum_range, criteria_range1, criteria1, criteria_range2, criteria2, ...). Example: =SUMIFS(C:C, A:A, "North", B:B, ">100") sums column C where column A is "North" AND column B > 100.' },
            { question: 'Why does SUMIFS return 0?', answer: 'Three main causes: (1) sum_range and criteria_ranges have different sizes. (2) Text criteria missing quotes — use "North" not North. (3) Argument order wrong — sum_range must be FIRST, not last like SUMIF.' },
            { question: 'SUMIFS syntax: does sum_range come first or last?', answer: 'FIRST. Unlike SUMIF (range, criteria, sum_range), SUMIFS places sum_range first: =SUMIFS(sum_range, criteria_range1, criteria1, criteria_range2, criteria2). This is the most common mistake for new users.' },
            { question: 'How do I use SUMIFS with dates between two dates?', answer: 'Use two conditions on the same date column: =SUMIFS(C:C, A:A, ">="&DATE(2026,1,1), A:A, "<="&DATE(2026,3,31)). For cell references: =SUMIFS(C:C, A:A, ">="&D1, A:A, "<="&E1).' },
            { question: 'Can SUMIFS use wildcards?', answer: 'Yes. * matches any sequence, ? matches single character: =SUMIFS(C:C, A:A, "*North*", B:B, ">100"). This sums values where column A contains "North" anywhere.' },
            { question: 'How to use SUMIFS with OR logic?', answer: 'SUMIFS is AND-only. For OR, add multiple SUMIFS: =SUMIFS(C:C, A:A, "East", B:B, ">500") + SUMIFS(C:C, A:A, "West", B:B, ">500"). For complex logic, consider SUMPRODUCT.' },
            { question: 'Can SUMIFS sum across multiple columns?', answer: 'Each SUMIFS handles one sum_range. To sum multiple columns, add separate SUMIFS: =SUMIFS(C:C, ...) + SUMIFS(D:D, ...). Or use SUMPRODUCT for non-contiguous ranges.' },
            { question: 'SUMIFS with blank / non-blank criteria?', answer: 'Use "" for blank: =SUMIFS(C:C, A:A, "<>", B:B, "") sums C where A is not blank AND B is blank. This is useful for identifying incomplete records.' },
            { question: 'How do I sum values across multiple sheets using SUMIFS?', answer: 'Use 3D references: =SUMIFS(Sheet1:Sheet3!D:D,Sheet1:Sheet3!A:A,"North",Sheet1:Sheet3!B:B,">100"). This sums column D across sheets 1-3 where column A equals \'North\' and column B is greater than 100.' },
            { question: 'Can SUMIFS use OR logic to sum values matching either of two conditions?', answer: 'SUMIFS uses AND logic only. For OR, add two SUMIFS: =SUMIFS(C:C,A:A,"East",B:B,">500") + SUMIFS(C:C,A:A,"West",B:B,">500"). This sums column C where region is East OR West AND amount > 500.' },
            { question: 'Why does my SUMIFS return #VALUE! error?', answer: 'Common causes: (1) Criteria ranges have different sizes than the sum range. (2) Text criteria not enclosed in quotes. (3) Using operators incorrectly — for numbers use >500, for text use "East". Ensure all ranges are the same size.' },
            { question: 'SUMIFS Excel formula — complete syntax breakdown', answer: 'Syntax: =SUMIFS(sum_range, criteria_range1, criteria1, [criteria_range2, criteria2], …). The sum_range goes FIRST — this is the key difference from SUMIF. Example: =SUMIFS(C:C, A:A, "East", B:B, ">500") sums column C for rows where column A equals "East" AND column B is greater than 500.' }
        ],
        commonErrors: [
            { title: 'SUMIFS returns 0 or wrong total', causes: ['Sum range and criteria ranges have different heights or columns.', 'Criteria in wrong order (text without quotes, date not as DATE() or cell ref).', 'Using SUMIF-style argument order (sum range must come first in SUMIFS).'], fixes: ['Use same-sized ranges: e.g. A1:A100, B1:B100, C1:C100.', 'Put text in quotes; use ">="&A1 for dates where A1 is a date.', 'Syntax: =SUMIFS(sum_range, criteria_range1, criteria1, criteria_range2, criteria2).'] },
        ],
        richContent: `
<div class="prose max-w-none mt-8 text-left">
  <h2 class="text-2xl font-bold mb-4">Master SUMIFS: Sum with Multiple Conditions</h2>
  <p class="mb-4">The <strong>SUMIFS function</strong> is an enhanced version of SUMIF that allows you to apply multiple criteria. It is essential for financial analysis, sales commission reports, and complex data aggregation.</p>

  <h3 class="text-xl font-semibold mb-2 mt-8">Step-by-Step: Using SUMIFS for the First Time</h3>
  <p>Imagine a sales table:</p>
  <ul class="list-disc pl-5 mb-4 space-y-1">
    <li><strong>Column A</strong>: Region (East, West, North)</li>
    <li><strong>Column B</strong>: Product Category (Electronics, Furniture, Clothing)</li>
    <li><strong>Column C</strong>: Sales Amount</li>
  </ul>
  <p><strong>Goal:</strong> Sum all sales in the "East" region for "Electronics" products.</p>
  <div class="bg-gray-100 p-4 rounded-lg mb-6">
    <code class="text-sm">=SUMIFS(C:C, A:A, "East", B:B, "Electronics")</code>
  </div>
  <p><strong>How it works:</strong> SUMIFS scans column A for "East" AND column B for "Electronics". When a row matches BOTH conditions, it adds column C to the total.</p>

  <h3 class="text-xl font-semibold mb-2 mt-8">SUMIF vs SUMIFS: Which should I use?</h3>
  <p class="mb-4">Many users struggle to choose between SUMIF and SUMIFS. Our recommendation is simple: <strong>Learn and always use SUMIFS</strong>. Why? SUMIFS can do everything SUMIF can (even just one condition), but its formula structure is entirely different and often easier to read because the result column comes first.</p>

  <div class="overflow-x-auto my-6">
    <table class="min-w-full border-collapse border border-gray-300 text-sm">
      <thead>
        <tr class="bg-gray-100">
          <th class="border border-gray-300 px-4 py-2 text-left font-semibold">Feature</th>
          <th class="border border-gray-300 px-4 py-2 text-left font-semibold">SUMIF</th>
          <th class="border border-gray-300 px-4 py-2 text-left font-semibold">SUMIFS (Winner 🏆)</th>
        </tr>
      </thead>
      <tbody>
        <tr class="even:bg-gray-50">
          <td class="border border-gray-300 px-4 py-2 font-medium">Conditions</td>
          <td class="border border-gray-300 px-4 py-2">1 max</td>
          <td class="border border-gray-300 px-4 py-2 font-bold text-green-600">Up to 127</td>
        </tr>
        <tr class="even:bg-gray-50">
          <td class="border border-gray-300 px-4 py-2 font-medium">Argument order</td>
          <td class="border border-gray-300 px-4 py-2 font-mono">range, criteria, sum_range</td>
          <td class="border border-gray-300 px-4 py-2 font-mono font-bold text-blue-600">sum_range, range1, cr1, range2, cr2</td>
        </tr>
        <tr class="even:bg-gray-50">
          <td class="border border-gray-300 px-4 py-2 font-medium">Same-column multi criteria</td>
          <td class="border border-gray-300 px-4 py-2">Not supported</td>
          <td class="border border-gray-300 px-4 py-2">Supported (e.g. date ranges)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 class="text-xl font-semibold mb-2 mt-8">Real-World Examples</h3>
  <ul class="list-disc pl-5 mb-4 space-y-2">
    <li><strong>HR & Payroll</strong>: Sum total hours worked by a specific employee (Condition 1) between January 1 and January 31 (Conditions 2 & 3).</li>
    <li><strong>E-commerce</strong>: Sum total revenue for "Electronics" (Condition 1) where order status is "Delivered" (Condition 2) and discount was ">0" (Condition 3).</li>
    <li><strong>Finance</strong>: Sum all invoices over $5,000 in Q1 2026 that are still "Unpaid".</li>
    <li><strong>Marketing</strong>: Sum total ad spend for campaign "Summer Sale" where ROI > 200%.</li>
    <li><strong>Inventory</strong>: Sum stock quantities for "Electronics" items where reorder flag is "Yes".</li>
  </ul>

  <h3 class="text-xl font-semibold mb-2 mt-8">SUMIFS with Date Ranges</h3>
  <p class="mb-4">Sum values between two dates by using two conditions on the same date column:</p>
  <pre class="bg-gray-100 p-3 rounded text-sm mb-4">=SUMIFS(C:C, A:A, "&gt;="&DATE(2026,1,1), A:A, "&lt;="&DATE(2026,3,31))</pre>
  <p class="mb-4">For dynamic date ranges from cell references:</p>
  <pre class="bg-gray-100 p-3 rounded text-sm mb-4">=SUMIFS(C:C, A:A, "&gt;="&D1, A:A, "&lt;="&E1)</pre>
  <p class="mb-4">This sums column C for all rows where column A dates fall within the range. Using cell references makes the formula reusable — just update the dates in D1 and E1.</p>

  <h3 class="text-xl font-semibold mb-2 mt-8">Advanced: Same-Column Multi-Criteria</h3>
  <p class="mb-4">To sum values that fall within a numeric range, apply two criteria to the same column:</p>
  <pre class="bg-gray-100 p-3 rounded text-sm mb-4">=SUMIFS(C:C, A:A, "&gt;100", A:A, "&lt;500")</pre>
  <p class="mb-4">This sums column C where column A is between 100 and 500 (exclusive). The same pattern works for dates, percentages, or any numeric criteria.</p>

  <h3 class="text-xl font-semibold mb-2 mt-8">Common Mistakes and How to Fix Them</h3>
  <ul class="list-disc pl-5 mb-4 space-y-2">
    <li><strong>Wrong argument order:</strong> SUMIFS syntax is <code>=SUMIFS(sum_range, criteria_range1, criteria1)</code>. The sum range comes FIRST — unlike SUMIF where it comes last. This is the #1 mistake.</li>
    <li><strong>Criteria not quoted:</strong> Text criteria need quotes: <code>"=Sales"</code>. For cell references: <code>"&gt;"&A1</code>.</li>
    <li><strong>Mismatched range sizes:</strong> All ranges must have the same number of rows. A1:A100 + B1:B99 = wrong results.</li>
    <li><strong>SUMIFS returns 0:</strong> Filter your data manually to verify rows matching all criteria exist. Check for hidden spaces with TRIM().</li>
  </ul>

  <div class="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-6">
    <p class="text-sm text-blue-800 italic"><strong>Pro Tip:</strong> Ensure that your <code>sum_range</code> and all <code>criteria_range</code> arrays are exactly the same size (e.g., all span rows 2 to 100). If they are mismatched, Excel will return an error.</p>
  </div>
</div>`,
        formulaLogicBreakdown: [
            { argument: 'sum_range', explanation: 'The actual cells to add up. This must be the exact same size as the criteria ranges.', example: 'e.g., C:C' },
            { argument: 'criteria_range1', explanation: 'The first range to evaluate against criteria1.', example: 'e.g., A:A' },
            { argument: 'criteria1', explanation: 'The condition that must be met in criteria_range1. Text and operators go in quotes.', example: 'e.g., ">100" or "Sales"' },
            { argument: 'criteria_range2...', explanation: 'Additional pairs of ranges and criteria. You can add up to 127 pairs.', example: 'e.g., B:B, "Completed"' },
        ],
        relatedTools: ['sumif', 'countifs', 'countif', 'averageif', 'ifs', 'sum'],
    },

    // 26. COUNTIFS - Multiple Criteria Count
    {
        slug: 'countifs',
        title: "COUNTIFS in Excel: Multiple Criteria Guide & Builder",
        metaDescription: "Master COUNTIFS in Excel with multiple criteria, dates, and wildcards. Build working formulas step-by-step with our free interactive generator.",
        excelFunction: 'COUNTIFS',
        category: 'Math',
        description: 'Counts cells that meet multiple criteria. Essential for data analysis with complex conditions.',
        inputs: [
            { id: 'criteria_range1', label: 'Criteria Range 1', type: 'range', placeholder: 'e.g., A1:A100' },
            { id: 'criteria1', label: 'Criteria 1', type: 'text', placeholder: 'e.g., "Completed"' },
            { id: 'criteria_range2', label: 'Criteria Range 2', type: 'range', placeholder: 'e.g., B1:B100' },
            { id: 'criteria2', label: 'Criteria 2', type: 'text', placeholder: 'e.g., ">500"' },
        ],
        generate: (p) => `=COUNTIFS(${p.criteria_range1 || 'criteria_range1'}, ${p.criteria1 || 'criteria1'}, ${p.criteria_range2 || 'criteria_range2'}, ${p.criteria2 || 'criteria2'})`,
        howToSteps: [
        {
                name: "Select Criteria Range 1",
                text: "Highlight first range to evaluate (e.g., A2:A100)."
        },
        {
                name: "Define Criteria 1",
                text: "Set first condition (e.g., \"Completed\")."
        },
        {
                name: "Add Criteria Range 2 & Criteria 2",
                text: "Add more range/criteria pairs as needed, then press Enter."
        }
],
        faq: [
            { question: 'How to use COUNTIFS with multiple criteria?', answer: 'Syntax: =COUNTIFS(criteria_range1, criteria1, criteria_range2, criteria2, ...). Example: =COUNTIFS(A:A, "East", B:B, ">500", C:C, "<>") counts rows where region is East, amount > 500, and category is not blank.' },
            { question: 'Why does my COUNTIFS return 0?', answer: 'Three most common causes: (1) Criteria ranges differ in size — all ranges must have the same row count. (2) Text values missing quotes — use "Completed" not Completed. (3) No rows match ALL conditions — test with fewer criteria to isolate.' },
            { question: 'How do I use COUNTIFS with date ranges in Excel?', answer: 'Use two conditions on the same date column: =COUNTIFS(A:A, ">="&DATE(2026,1,1), A:A, "<="&DATE(2026,3,31)). For single cell dates, reference them: =COUNTIFS(A:A, ">="&D1, A:A, "<="&E1).' },
            { question: 'Can COUNTIFS use OR logic instead of AND?', answer: 'COUNTIFS is AND-only. For OR logic, add multiple COUNTIFS together: =COUNTIFS(A:A, "X", B:B, "Y") + COUNTIFS(A:A, "Z", B:B, "Y"). Or use SUMPRODUCT for complex logic.' },
            { question: 'How do I count blank or non-blank cells with COUNTIFS?', answer: 'Use "" for blank and "<>" for non-blank: =COUNTIFS(A:A, "", B:B, "<>") counts rows where A is blank AND B is not blank. This is useful for data quality checks.' },
            { question: 'COUNTIFS with wildcards — how does it work?', answer: 'Use * for any sequence of characters and ? for a single character: =COUNTIFS(A:A, "*North*", B:B, "???-???"). This counts rows where A contains "North" and B has a pattern like "ABC-12".' },
            { question: 'What if my criteria range and criteria are in another sheet?', answer: 'Reference another sheet normally: =COUNTIFS(Sheet2!A:A, "East", Sheet2!B:B, ">100"). The sheet name with space must be in quotes: =COUNTIFS(\'Sheet 2\'!A:A, "East").' },
            { question: 'COUNTIFS vs COUNTIF — what is the difference?', answer: 'COUNTIF handles exactly ONE condition. COUNTIFS handles 1+ conditions (up to 127 pairs). Always prefer COUNTIFS even for single conditions — if you later add a second condition, the syntax stays consistent.' },
            { question: 'How do I count rows where a date falls between two dates using COUNTIFS?', answer: 'Use two conditions on the same date column: =COUNTIFS(A:A,">="&DATE(2026,1,1),A:A,"<="&DATE(2026,3,31)). This counts all rows where column A has a date between Jan 1 and Mar 31, 2026.' },
            { question: 'Can COUNTIFS handle wildcards for partial text matches?', answer: 'Yes. Use * for any characters and ? for a single character: =COUNTIFS(A:A,"*North*") counts cells containing \'North\' anywhere in the text. Combine with other criteria: =COUNTIFS(A:A,"*North*",B:B,">100").' },
            { question: 'What is the maximum number of criteria pairs COUNTIFS supports?', answer: 'COUNTIFS supports up to 127 criteria pairs in Excel 2007+. Each pair consists of a range and a criteria. For example: =COUNTIFS(A:A,"X",B:B,">5",C:C,"<>Y",D:D,"<100").' },
            { question: 'COUNTIFS Excel tutorial — how does it work step by step?', answer: 'Step 1: Decide which columns contain your conditions. Step 2: Type =COUNTIFS( then select the first range (e.g., A:A). Step 3: Add the first criteria in quotes if text (e.g., "East") or with an operator if numeric (e.g., ">500"). Step 4: Repeat for each additional condition. Step 5: Close the parenthesis. Example: =COUNTIFS(A:A,"East",B:B,">500").' },
        ],
        richContent: `
<div class="prose max-w-none mt-8 text-left">
  <h2 class="text-2xl font-bold mb-4">Master COUNTIFS: Count with Multiple Conditions</h2>
  <p class="mb-4">The <strong>COUNTIFS function</strong> counts rows that meet multiple criteria across different columns. It is the multi-condition version of COUNTIF and one of the most versatile functions for data analysis in Excel and Google Sheets.</p>

  <h3 class="text-xl font-semibold mb-2 mt-8">Step-by-Step: Using COUNTIFS for the First Time</h3>
  <p>Let us walk through a concrete example. Imagine you have a sales table:</p>
  <ul class="list-disc pl-5 mb-4 space-y-1">
    <li><strong>Column A</strong>: Region (East, West, North)</li>
    <li><strong>Column B</strong>: Sales Amount (e.g. 250, 750, 1200)</li>
    <li><strong>Column C</strong>: Status (Completed, Pending)</li>
  </ul>
  <p><strong>Goal:</strong> Count how many "Completed" orders in the "East" region exceeded $500.</p>
  <div class="bg-gray-100 p-4 rounded-lg mb-6">
    <code class="text-sm">=COUNTIFS(A:A, "East", B:B, ">500", C:C, "Completed")</code>
  </div>
  <p>Each pair (range, criteria) adds one filter. Only rows matching ALL three conditions are counted.</p>

  <h3 class="text-xl font-semibold mb-2 mt-8">COUNTIF vs COUNTIFS: What is the difference?</h3>
  <p class="mb-4">COUNTIF handles <strong>one condition</strong> only. COUNTIFS handles <strong>two or more conditions</strong> simultaneously. Every condition is connected by AND logic—all conditions must be true for a row to be counted.</p>

  <div class="overflow-x-auto my-6">
    <table class="min-w-full border-collapse border border-gray-300 text-sm">
      <thead>
        <tr class="bg-gray-100">
          <th class="border border-gray-300 px-4 py-2 text-left font-semibold">Feature</th>
          <th class="border border-gray-300 px-4 py-2 text-left font-semibold">COUNTIF</th>
          <th class="border border-gray-300 px-4 py-2 text-left font-semibold">COUNTIFS</th>
        </tr>
      </thead>
      <tbody>
        <tr class="even:bg-gray-50">
          <td class="border border-gray-300 px-4 py-2 font-medium">Conditions</td>
          <td class="border border-gray-300 px-4 py-2">Single condition</td>
          <td class="border border-gray-300 px-4 py-2 font-bold text-green-600">Multiple (AND)</td>
        </tr>
        <tr class="even:bg-gray-50">
          <td class="border border-gray-300 px-4 py-2 font-medium">Syntax</td>
          <td class="border border-gray-300 px-4 py-2 font-mono">=COUNTIF(range, criteria)</td>
          <td class="border border-gray-300 px-4 py-2 font-mono">=COUNTIFS(range1, cr1, range2, cr2)</td>
        </tr>
        <tr class="even:bg-gray-50">
          <td class="border border-gray-300 px-4 py-2 font-medium">Max criteria pairs</td>
          <td class="border border-gray-300 px-4 py-2">1</td>
          <td class="border border-gray-300 px-4 py-2">127</td>
        </tr>
        <tr class="even:bg-gray-50">
          <td class="border border-gray-300 px-4 py-2 font-medium">OR logic</td>
          <td class="border border-gray-300 px-4 py-2">Not supported</td>
          <td class="border border-gray-300 px-4 py-2">Requires multiple formulas</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 class="text-xl font-semibold mb-2 mt-8">Real-World Use Cases</h3>
  <ul class="list-disc pl-5 mb-4 space-y-2">
    <li><strong>Sales Reporting</strong>: Count orders where region = "East" AND amount > $500.</li>
    <li><strong>HR Analytics</strong>: Count employees in department "Engineering" with tenure > 3 years.</li>
    <li><strong>Inventory</strong>: Count products in category "Electronics" where stock < 10 (needs restocking).</li>
    <li><strong>Education</strong>: Count students who scored above 80 in Math AND above 70 in Science.</li>
    <li><strong>Customer Support</strong>: Count tickets tagged "Urgent" that are still "Open" and overdue by 3+ days.</li>
  </ul>

  <h3 class="text-xl font-semibold mb-2 mt-8">Working with Date Ranges</h3>
  <p class="mb-4">To count rows where a date falls within a specific range, use two conditions on the same date column:</p>
  <pre class="bg-gray-100 p-3 rounded text-sm mb-4">=COUNTIFS(A:A, "&gt;="&DATE(2026,1,1), A:A, "&lt;="&DATE(2026,3,31))</pre>
  <p class="mb-4">For dynamic dates stored in cells, reference them directly:</p>
  <pre class="bg-gray-100 p-3 rounded text-sm mb-4">=COUNTIFS(A:A, "&gt;="&D1, A:A, "&lt;="&E1)</pre>

  <h3 class="text-xl font-semibold mb-2 mt-8">Advanced: COUNTIFS with OR Logic</h3>
  <p class="mb-4">COUNTIFS uses AND logic by default. To implement OR, <strong>add multiple COUNTIFS together</strong>:</p>
  <pre class="bg-gray-100 p-3 rounded text-sm mb-4">=COUNTIFS(A:A, "East", B:B, ">500") + COUNTIFS(A:A, "West", B:B, ">500")</pre>
  <p class="mb-4">This counts rows where (Region = East AND Sales > 500) OR (Region = West AND Sales > 500).</p>

  <h3 class="text-xl font-semibold mb-2 mt-8">Common Errors & Troubleshooting</h3>
  <ul class="list-disc pl-5 mb-4 space-y-2">
    <li><strong>COUNTIFS returns 0:</strong> Likely causes: range sizes mismatch, text criteria not in quotes, or no data matches all conditions simultaneously.</li>
    <li><strong>#VALUE! error:</strong> Usually means criteria ranges have different dimensions (e.g. A1:A100 paired with B1:B99). Ensure every range has the same row count.</li>
    <li><strong>Counting blank cells:</strong> Use =COUNTIFS(A:A, "") for truly empty cells. Use =COUNTIFS(A:A, "") + COUNTIFS(A:A, "*
") to include blank-looking cells with only spaces.</li>
    <li><strong>Cell contains numbers as text:</strong> If your criteria range stores numbers as text, use TEXT function: =COUNTIFS(A:A, TEXT(500, "0")).</li>
  </ul>

  <div class="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-6">
    <p class="text-sm text-blue-800 italic"><strong>Important:</strong> All criteria ranges must be the same size. If range1 is A1:A100, range2 must also be 100 rows. Mismatched sizes cause incorrect counts or <code>#VALUE!</code> errors.</p>
  </div>
</div>`,
        relatedTools: ['countif', 'sumifs', 'sumif', 'averageif', 'ifs', 'iferror'],
        commonErrors: [
            { title: 'COUNTIFS returns 0 or unexpected count', causes: ['Criteria ranges have different lengths.', 'Text criteria not in quotes; number criteria wrong format.'], fixes: ['Use identical range sizes: A1:A100, B1:B100.', 'Use "Completed", ">100", "="&A1 for text, number, and cell reference.'] },
        ],
    },

    // 27. AVERAGEIF - Conditional Average
    {
        slug: 'averageif',
        title: "AVERAGEIF in Excel: Conditional Average Guide & Tool",
        metaDescription: "Calculate conditional averages in Excel based on text, numbers, or dates. Generate working AVERAGEIF formulas with our free interactive builder.",
        excelFunction: 'AVERAGEIF',
        category: 'Math',
        description: 'Returns the average of all cells in a range that meet a given criteria.',
        howToSteps: [
        {
                name: "Select Criteria Range",
                text: "Highlight the cells evaluated against your condition (e.g., A2:A50)."
        },
        {
                name: "Define Criteria",
                text: "Set condition (e.g., \"Marketing\" or \">0\")."
        },
        {
                name: "Select Average Range",
                text: "Highlight numbers to average (e.g., B2:B50), then press Enter."
        }
],
        inputs: [
            { id: 'range', label: 'Range to Check', type: 'range', placeholder: 'e.g., A1:A100' },
            { id: 'criteria', label: 'Criteria', type: 'text', placeholder: 'e.g., ">0" or "Sales"' },
            { id: 'average_range', label: 'Average Range (Optional)', type: 'range', placeholder: 'e.g., B1:B100' },
        ],
        generate: (p) => {
            const args = [p.range || 'range', p.criteria || 'criteria'];
            if (p.average_range) args.push(p.average_range);
            return `=AVERAGEIF(${args.join(', ')})`;
        },
        richContent: `
<div class="prose prose-slate max-w-none mt-12 border-t pt-8 text-left">
  <h2 class="text-2xl font-bold mb-4">AVERAGEIF: Calculate Conditional Means in Excel & Sheets</h2>
  <p class="mb-4">The <strong>AVERAGEIF</strong> function returns the average (arithmetic mean) of cells that meet a specific condition. It's perfect for calculating average sales per region, average scores for passing students, or average revenue for a product category.</p>

  <h3 class="text-xl font-semibold mb-2">Common AVERAGEIF Use Cases</h3>
  <p class="mb-2"><strong>Average sales for a specific product:</strong></p>
  <pre class="bg-gray-50 p-3 rounded-lg text-sm mb-4"><code>=AVERAGEIF(A:A, "Widget X", B:B)</code></pre>
  <p class="mb-2"><strong>Average values above a threshold:</strong></p>
  <pre class="bg-gray-50 p-3 rounded-lg text-sm mb-4"><code>=AVERAGEIF(B:B, ">500")</code></pre>
  <p class="mb-2"><strong>Average dates in a specific month:</strong></p>
  <pre class="bg-gray-50 p-3 rounded-lg text-sm mb-4"><code>=AVERAGEIF(A:A, ">="&DATE(2026,6,1), B:B)</code></pre>

  <h3 class="text-xl font-semibold mb-2">AVERAGEIF vs AVERAGEIFS vs AVERAGE</h3>
  <ul class="list-disc pl-5 mb-4 space-y-2">
    <li><strong>AVERAGE</strong> — Simple mean of all values. No filtering.</li>
    <li><strong>AVERAGEIF</strong> — Mean of cells matching <em>one</em> condition. Great for single-category reports.</li>
    <li><strong>AVERAGEIFS</strong> — Mean with <em>multiple</em> conditions. Use for complex filtering like "average orders in Q1 over $100 from California."</li>
  </ul>

  <div class="bg-orange-50 p-4 rounded-lg border border-orange-100 mt-6">
    <p class="text-sm text-orange-800"><strong>Watch Out:</strong> AVERAGEIF ignores blank cells and text in the average_range. If no cells match the criteria, it returns <code>#DIV/0!</code>. Wrap with <a href="/formulas/iferror" class="text-blue-600 underline font-semibold">IFERROR</a> to handle this gracefully: <code>=IFERROR(AVERAGEIF(...), 0)</code>.</p>
  </div>
</div>`,
        faq: [
            { question: 'What is the difference between AVERAGEIF and AVERAGE?', answer: 'AVERAGE returns the mean of all values. AVERAGEIF returns the mean only of cells that meet a specific condition, like averaging sales only for region "East".' },
            { question: 'Can I use wildcards in AVERAGEIF?', answer: 'Yes. Use * for multiple characters and ? for single characters, like AVERAGEIF(A:A,"*Corp",B:B) to average values for all companies ending in "Corp".' },
            { question: 'Does AVERAGEIF work in Google Sheets?', answer: 'Yes, AVERAGEIF works identically in Google Sheets with the same syntax.' }
        ],
        commonErrors: [
            { title: 'AVERAGEIF returns 0', causes: ['No cells match the criteria, so the average of no cells is 0.', 'Data type mismatch between criteria and actual data.', 'Blank or incorrectly formatted criteria_range or average_range.'], fixes: ['Verify the criteria matches at least one cell in the range.', 'Use TRIM() to remove hidden spaces and TEXT()/VALUE() to align types.', 'Ensure average_range and range are the same size.'] }
        ]
    },

    // 28. IFERROR - Error Handling
    {
        slug: 'iferror',
        title: "IFERROR in Excel: Catch & Replace #N/A, #VALUE Errors",
        metaDescription: "Replace ugly #N/A, #VALUE!, and #DIV/0! errors with clean text or 0 in Excel. Master IFERROR with VLOOKUP using our free interactive builder.",
        excelFunction: 'IFERROR',
        category: 'Logic',
        description: 'Returns a value you specify if a formula evaluates to an error; otherwise returns the result of the formula.',
        inputs: [
            { id: 'value', label: 'Formula to Check', type: 'text', placeholder: 'e.g., A1/B1' },
            { id: 'value_if_error', label: 'Value if Error', type: 'text', placeholder: 'e.g., 0 or "N/A"' },
        ],
        generate: (p) => `=IFERROR(${p.value || 'value'}, ${p.value_if_error || '""'})`,
        relatedTools: ['if', 'ifs', 'xlookup', 'vlookup', 'index-match'],
        howToSteps: [
        {
                name: "Enter Primary Formula",
                text: "Write your lookup or math formula (e.g., VLOOKUP(A2, D:E, 2, FALSE))."
        },
        {
                name: "Wrap with IFERROR",
                text: "Prepend =IFERROR( and add comma at the end."
        },
        {
                name: "Specify Fallback Value",
                text: "Add fallback (e.g., \"Not Found\" or 0), close parenthesis, and hit Enter."
        }
],
        faq: [
            { question: 'What errors does IFERROR catch?', answer: 'IFERROR catches #N/A, #VALUE!, #REF!, #DIV/0!, #NAME?, #NUM!, and #NULL!. It returns your fallback value for any of these errors.' },
            { question: 'Should I use IFERROR around VLOOKUP?', answer: 'Yes. When the lookup value is not found, VLOOKUP returns #N/A. Wrapping in IFERROR lets you show "Not Found" or 0 instead: =IFERROR(VLOOKUP(A2, B:C, 2, FALSE), "Not Found").' },
            { question: 'What is the difference between IFERROR and IFNA?', answer: 'IFERROR catches all errors; IFNA catches only #N/A. Use IFNA when you want other errors (e.g. #VALUE!) to still show so you can debug them.' },
            { question: 'Can IFERROR hide formula errors in Google Sheets?', answer: 'Yes. IFERROR works the same in Excel and Google Sheets. Use it to avoid #DIV/0! from division or #N/A from lookups.' },
            { question: 'Why is my IFERROR returning the fallback when the result looks correct?', answer: 'The first argument might be returning an error you do not see (e.g. in a hidden column or due to a nested formula). Check the inner formula alone in a cell to see its real result.' },
            { question: 'Can I use IFERROR with INDEX MATCH?', answer: 'Yes. Wrap the entire INDEX MATCH: =IFERROR(INDEX(C:C, MATCH(A2, B:B, 0)), "Missing"). If MATCH fails to find the lookup value, IFERROR returns "Missing" instead of #N/A.' },
            { question: 'Does IFERROR work with array formulas?', answer: 'Yes, IFERROR wraps array formulas the same way. In older Excel, press Ctrl+Shift+Enter for array formulas inside IFERROR. In Excel 365 and Google Sheets, dynamic arrays work natively.' },
            { question: 'How do I use IFERROR to handle blank cells in calculations?', answer: 'If your formula references blank cells that cause errors, IFERROR catches them: =IFERROR(A1/B1, 0). For more targeted handling, check with ISBLANK first: =IF(ISBLANK(B1), 0, A1/B1). This way, you distinguish between intentional blanks and actual errors.' }
        ],
        commonErrors: [
            { title: 'IFERROR hides errors I want to see', causes: ['Using IFERROR around a formula that can return #VALUE! or #REF! you need to fix.', 'Nested formulas: inner error is caught so outer logic never runs.'], fixes: ['Use IFNA instead to catch only #N/A, or fix the inner formula first.', 'Test the inner formula without IFERROR to debug, then wrap once correct.'] },
        ],
        richContent: `
<div class="prose max-w-none mt-8">
  <h2>How to Use IFERROR in Excel and Google Sheets</h2>
  <p><strong>IFERROR</strong> is one of the most important functions for creating robust spreadsheets. It catches errors like #DIV/0!, #N/A, #VALUE!, and #REF! and replaces them with a clean value — keeping your reports professional and your calculations running smoothly.</p>

  <h3>IFERROR Syntax</h3>
  <p>The syntax is simple: <code>=IFERROR(value, value_if_error)</code></p>
  <ul>
    <li><strong>value</strong>: The formula, cell reference, or expression you want to evaluate.</li>
    <li><strong>value_if_error</strong>: What to return if the first argument produces any error.</li>
  </ul>

  <h3>Step-by-Step: Protect a Division Formula</h3>
  <p>Imagine you have a sales commission table:</p>
  <div class="overflow-x-auto mb-4">
    <table class="min-w-full text-sm border-collapse border border-gray-200">
      <thead><tr class="bg-gray-50"><th class="border border-gray-200 p-2 text-left">A (Salesperson)</th><th class="border border-gray-200 p-2 text-left">B (Sales Amount)</th><th class="border border-gray-200 p-2 text-left">C (Commission Rate)</th><th class="border border-gray-200 p-2 text-left">D (Commission)</th></tr></thead>
      <tbody>
        <tr><td class="border border-gray-200 p-2">Alice</td><td class="border border-gray-200 p-2">10,000</td><td class="border border-gray-200 p-2">5%</td><td class="border border-gray-200 p-2">500</td></tr>
        <tr><td class="border border-gray-200 p-2">Bob</td><td class="border border-gray-200 p-2">0</td><td class="border border-gray-200 p-2">5%</td><td class="border border-gray-200 p-2">0</td></tr>
        <tr><td class="border border-gray-200 p-2">Charlie</td><td class="border border-gray-200 p-2">8,000</td><td class="border border-gray-200 p-2"><em>blank</em></td><td class="border border-gray-200 p-2 text-red-600">#DIV/0!</td></tr>
      </tbody>
    </table>
  </div>
  <p class="mb-2">Without IFERROR, Bob and Charlie's rows show ugly errors. Here's how to fix it:</p>
  <ol class="list-decimal pl-5 mb-4 space-y-1">
    <li><strong>Write your original formula:</strong> <code>=B2*C2</code> — this calculates commission by multiplying the sales amount by the rate.</li>
    <li><strong>Wrap with IFERROR:</strong> <code>=IFERROR(B2*C2, 0)</code> — if the multiplication fails (e.g., C2 is blank), show 0 instead of #DIV/0!.</li>
    <li><strong>Copy down the column:</strong> Drag the formula to all rows. Every row now shows either a valid commission or 0 — no errors visible.</li>
  </ol>
  <p class="mb-4">The result: clean, professional-looking data with no explanation needed.</p>

  <h3>IFERROR with VLOOKUP and XLOOKUP</h3>
  <p>One of the most common uses of IFERROR is to handle lookup failures gracefully:</p>
  <ul class="list-disc pl-5 mb-4 space-y-2">
    <li><strong>VLOOKUP + IFERROR:</strong> <code>=IFERROR(VLOOKUP(A2, B:C, 2, FALSE), "Not Found")</code> — shows "Not Found" instead of #N/A when an employee ID has no match.</li>
    <li><strong>XLOOKUP alternative:</strong> XLOOKUP has a built-in <code>if_not_found</code> argument: <code>=XLOOKUP(A2, B:B, C:C, "Not Found")</code>. This is cleaner than wrapping in IFERROR.</li>
    <li><strong>INDEX MATCH + IFERROR:</strong> <code>=IFERROR(INDEX(C:C, MATCH(A2, B:B, 0)), "Missing")</code> — same protection for the INDEX MATCH combination.</li>
  </ul>

  <h3>IFERROR vs IFNA — When to Use Which</h3>
  <div class="overflow-x-auto mb-4">
    <table class="min-w-full text-sm border-collapse border border-gray-200">
      <thead><tr class="bg-gray-50"><th class="border border-gray-200 p-2 text-left">Function</th><th class="border border-gray-200 p-2 text-left">Catches</th><th class="border border-gray-200 p-2 text-left">Best For</th></tr></thead>
      <tbody>
        <tr><td class="border border-gray-200 p-2">IFERROR</td><td class="border border-gray-200 p-2">All errors (#N/A, #DIV/0!, #VALUE!, #REF!, #NAME?, #NUM!, #NULL!)</td><td class="border border-gray-200 p-2">Final polish of production reports</td></tr>
        <tr><td class="border border-gray-200 p-2">IFNA</td><td class="border border-gray-200 p-2">Only #N/A</td><td class="border border-gray-200 p-2">Lookup formulas where other errors should still surface</td></tr>
      </tbody>
    </table>
  </div>

  <h3>Common Pitfalls and Edge Cases</h3>
  <ul class="list-disc pl-5 mb-4 space-y-2">
    <li><strong>Masking bugs:</strong> IFERROR hides ALL errors. If your VLOOKUP is returning #REF! because a column was deleted, IFERROR silently covers it up. Always debug the inner formula first before wrapping with IFERROR.</li>
    <li><strong>Blank fallback:</strong> Use <code>""</code> (empty string) to leave the cell blank on error: <code>=IFERROR(A1/B1, "")</code>. This looks clean in reports but remember the cell is not truly empty — it contains a formula returning "".</li>
    <li><strong>Nested IFERROR:</strong> You can nest IFERROR calls to try multiple strategies: <code>=IFERROR(VLOOKUP(A2, Sheet1!A:B, 2, 0), IFERROR(VLOOKUP(A2, Sheet2!A:B, 2, 0), "Not in any sheet"))</code> — tries Sheet1 first, then Sheet2, then gives up.</li>
    <li><strong>Performance:</strong> IFERROR evaluates the first argument completely. If the inner formula is slow (e.g., an array lookup over 100k rows), IFERROR doesn't speed it up — it just cleans the result.</li>
  </ul>

  <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-100 mt-6">
    <p class="text-sm text-yellow-800"><strong>Pro Tip:</strong> Use IFERROR as a <strong>final polish</strong> — never as a development crutch. Build and debug your inner formula first without IFERROR, then wrap it only after it works correctly. This way you catch real bugs during development instead of hiding them. For lookups that might fail, consider XLOOKUP's built-in <code>if_not_found</code> parameter — it's more explicit and doesn't mask other error types.</p>
  </div>
</div>`
    },

    // 29. IFS - Multiple Conditions
    {
        slug: 'ifs',
        title: "IFS in Excel: Multiple Conditions Without Nested IF",
        metaDescription: "Evaluate multiple conditions in Excel without messy nested IF formulas. Generate clean, readable IFS formulas with our free interactive tool.",
        excelFunction: 'IFS',
        category: 'Logic',
        description: 'Checks multiple conditions and returns a value corresponding to the first TRUE condition. Cleaner than nested IFs.',
        inputs: [
            { id: 'condition1', label: 'Condition 1', type: 'text', placeholder: 'e.g., A1>=90' },
            { id: 'value1', label: 'Value if True 1', type: 'text', placeholder: 'e.g., "A"' },
            { id: 'condition2', label: 'Condition 2', type: 'text', placeholder: 'e.g., A1>=80' },
            { id: 'value2', label: 'Value if True 2', type: 'text', placeholder: 'e.g., "B"' },
            { id: 'condition3', label: 'Condition 3', type: 'text', placeholder: 'e.g., A1>=70' },
            { id: 'value3', label: 'Value if True 3', type: 'text', placeholder: 'e.g., "C"' },
        ],
        generate: (p) =>
            `=IFS(${p.condition1 || 'condition1'}, ${p.value1 || 'value1'}, ${p.condition2 || 'condition2'}, ${p.value2 || 'value2'}, ${p.condition3 || 'condition3'}, ${p.value3 || 'value3'})`,
        relatedTools: ['if', 'iferror', 'and', 'or', 'sumifs', 'countifs', 'averageif'],
        richContent: `
<div class="prose max-w-none mt-8">
  <h2>How to Use IFS in Excel — Step by Step</h2>
  <p>The <strong>IFS</strong> function checks multiple conditions in order and returns the value for the first TRUE test. It is ideal for <strong>letter grades</strong>, <strong>tiered discounts</strong>, and commission bands — without stacking IF(IF(IF(...))).</p>

  <h3>Real-World Example: Student Letter Grades</h3>
  <p>Imagine you have student scores in column A and want to assign letter grades in column B:</p>
  <div class="overflow-x-auto mb-4">
    <table class="min-w-full text-sm border-collapse border border-gray-200">
      <thead><tr class="bg-gray-50"><th class="border border-gray-200 p-2 text-left">A (Score)</th><th class="border border-gray-200 p-2 text-left">B (Formula)</th><th class="border border-gray-200 p-2 text-left">Result</th></tr></thead>
      <tbody>
        <tr><td class="border border-gray-200 p-2">95</td><td class="border border-gray-200 p-2"><code>=IFS(A2>=90,"A",A2>=80,"B",A2>=70,"C",A2>=60,"D",TRUE,"F")</code></td><td class="border border-gray-200 p-2 font-semibold text-green-700">A</td></tr>
        <tr><td class="border border-gray-200 p-2">82</td><td class="border border-gray-200 p-2"><em>(same formula)</em></td><td class="border border-gray-200 p-2 font-semibold text-green-700">B</td></tr>
        <tr><td class="border border-gray-200 p-2">67</td><td class="border border-gray-200 p-2"><em>(same formula)</em></td><td class="border border-gray-200 p-2 font-semibold text-green-700">D</td></tr>
        <tr><td class="border border-gray-200 p-2">41</td><td class="border border-gray-200 p-2"><em>(same formula)</em></td><td class="border border-gray-200 p-2 font-semibold text-green-700">F</td></tr>
      </tbody>
    </table>
  </div>
  <p>The formula checks from highest threshold to lowest. If no condition matches, the <code>TRUE</code> fallback returns &quot;F&quot;.</p>

  <h3>IFS vs Nested IF — Comparison</h3>
  <div class="overflow-x-auto mb-4">
    <table class="min-w-full text-sm border-collapse border border-gray-200">
      <thead><tr class="bg-gray-50"><th class="border border-gray-200 p-2 text-left">Feature</th><th class="border border-gray-200 p-2 text-left">IFS</th><th class="border border-gray-200 p-2 text-left">Nested IF</th></tr></thead>
      <tbody>
        <tr><td class="border border-gray-200 p-2">Syntax</td><td class="border border-gray-200 p-2"><code>=IFS(test1, val1, test2, val2)</code></td><td class="border border-gray-200 p-2"><code>=IF(test1, val1, IF(test2, val2, ...))</code></td></tr>
        <tr><td class="border border-gray-200 p-2">Readability</td><td class="border border-gray-200 p-2 text-green-600">Flat, easy to scan</td><td class="border border-gray-200 p-2 text-red-600">Deeply nested, hard to read</td></tr>
        <tr><td class="border border-gray-200 p-2">Limit</td><td class="border border-gray-200 p-2">127 conditions (Excel 2019+)</td><td class="border border-gray-200 p-2">7 levels deep (Excel 2003) or 64 (Excel 2007+)</td></tr>
        <tr><td class="border border-gray-200 p-2">Default value</td><td class="border border-gray-200 p-2 text-yellow-600">Must add TRUE fallback manually</td><td class="border border-gray-200 p-2 text-green-600">Last FALSE value works as default</td></tr>
        <tr><td class="border border-gray-200 p-2">Compatibility</td><td class="border border-gray-200 p-2">Excel 2019+ / Microsoft 365 / Sheets</td><td class="border border-gray-200 p-2 text-green-600">All versions</td></tr>
      </tbody>
    </table>
  </div>

  <h3>Common Mistakes with IFS</h3>
  <ul class="list-disc pl-5 mb-4 space-y-1">
    <li><strong>No TRUE fallback</strong> — If no condition matches, IFS returns #N/A. Always add <code>TRUE, "Default"</code> as the last pair.</li>
    <li><strong>Wrong condition order</strong> — IFS stops at the first TRUE. Place the most specific (highest threshold) conditions first.</li>
    <li><strong>Text vs number mismatch</strong> — Comparing text &quot;90&quot; to the number 90 fails. Use <code>VALUE()</code> to convert text scores.</li>
    <li><strong>Empty cells treated as 0</strong> — A blank cell evaluates as 0 in comparisons. Use <code>ISBLANK()</code> as an early condition if needed.</li>
  </ul>

  <h3>Minimum Viable Pattern</h3>
  <p>Always end with a catch-all: use <code>TRUE</code> as the last condition to assign a default (e.g. &quot;F&quot; or &quot;Other&quot;).</p>
  <pre class="bg-gray-50 p-3 rounded-lg text-sm mb-4"><code>=IFS(A1>=90,&quot;A&quot;, A1>=80,&quot;B&quot;, A1>=70,&quot;C&quot;, TRUE,&quot;F&quot;)</code></pre>

  <h3>Google Sheets & Excel Compatibility</h3>
  <p>IFS works in Excel 2019+ / Microsoft 365 and Google Sheets. For older Excel, use nested IF or lookup tables.</p>

  <div class="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-6">
    <p class="text-sm text-blue-800"><strong>Pro Tip:</strong> For tiered pricing or commission rates, combine IFS with LOOKUP tables. Store your thresholds in a separate range and reference them with named ranges — your formulas stay clean and your business logic lives in one place.</p>
  </div>
</div>`,
        howToSteps: [
        {
                name: "Define Condition 1 & Value 1",
                text: "Type first test and output (e.g., A2>=90, \"A\")."
        },
        {
                name: "Define Condition 2 & Value 2",
                text: "Add second test and output (e.g., A2>=80, \"B\")."
        },
        {
                name: "Add Default Fallback (TRUE)",
                text: "Use TRUE, \"F\" as the final pair to catch all other values."
        }
],
        faq: [
            {
                question: 'Can IFS replace nested IF for letter grades?',
                answer: 'Yes. Example: =IFS(A1>=90,"A",A1>=80,"B",A1>=70,"C",TRUE,"F"). Easier to read than multiple nested IFs. The TRUE fallback ensures every score gets a grade.',
            },
            {
                question: 'Why does IFS return #N/A?',
                answer: 'No condition matched and there is no final TRUE fallback. Add TRUE, "Default" as the last pair. This is the most common IFS mistake — always plan for unmatched values.',
            },
            {
                question: 'IFS vs SWITCH — which should I use?',
                answer: 'IFS tests ranges and inequalities (e.g. A1>=90); SWITCH matches exact values (e.g. A1="Red"). Use IFS for grade bands, tier thresholds, and date ranges. Use SWITCH for exact category mapping.',
            },
            {
                question: 'Can I use IFS with dates?',
                answer: 'Yes. Example: =IFS(A1>TODAY(),"Future",A1=TODAY(),"Today",A1<TODAY(),"Past"). Dates are serial numbers in Excel, so comparisons work the same as numbers.',
            },
            {
                question: 'What Excel versions support IFS?',
                answer: 'IFS is available in Excel 2019, Excel 2021, Microsoft 365 (Office 365), and Google Sheets. It is not available in Excel 2016 or earlier — use nested IF instead.',
            },
            {
                question: 'How many conditions can IFS handle?',
                answer: 'Excel 2019+ supports up to 127 condition/value pairs. Google Sheets has a practical limit of about 50 pairs. For complex logic, consider using a lookup table instead.',
            },
            {
                question: 'Why is my IFS formula returning wrong results?',
                answer: 'Most likely your conditions are in the wrong order. IFS returns the value for the first TRUE condition, so place the most specific condition first. Also check for text-vs-number mismatches: "90" (text) is not >= 90 (number). Use VALUE() to convert.',
            },
            {
                question: 'Can I use AND/OR inside IFS conditions?',
                answer: 'Yes. Wrap multiple criteria in AND or OR: =IFS(AND(A1>=90,B1="Pass"),"Honors",A1>=70,"Pass",TRUE,"Fail"). This lets you build complex multi-column logic within a single IFS condition.',
            },
        ],
        commonErrors: [
            {
                title: '#N/A or wrong grade bucket',
                causes: ['Conditions out of order so a lower threshold matches first.', 'Missing TRUE fallback.', 'Comparing text scores without VALUE().'],
                fixes: ['Put highest thresholds first.', 'End with TRUE, "default".', 'Use VALUE(A1) if scores are stored as text.'],
            },
        ],
    },

    // 30. SUBSTITUTE - Text Replacement
    {
        slug: 'substitute',
        title: "SUBSTITUTE in Excel: Replace Specific Text in Strings",
        metaDescription: "Replace specific characters, words, or symbols in Excel text using SUBSTITUTE. Clean dates, dashes, and phone numbers with our free generator.",
        excelFunction: 'SUBSTITUTE',
        category: 'Text',
        description: 'Substitutes new text for old text in a text string. Great for data cleaning.',
        howToSteps: [
        {
                name: "Select Text Cell",
                text: "Click the cell containing text to modify (e.g., A2)."
        },
        {
                name: "Specify Old Text",
                text: "Enter the character or word to find in quotes (e.g., \"-\")."
        },
        {
                name: "Specify New Text",
                text: "Enter replacement text in quotes (e.g., \"/\" or \"\" to delete)."
        }
],
        inputs: [
            { id: 'text', label: 'Text', type: 'text', placeholder: 'e.g., A1' },
            { id: 'old_text', label: 'Old Text', type: 'text', placeholder: 'e.g., "-"' },
            { id: 'new_text', label: 'New Text', type: 'text', placeholder: 'e.g., "/"' },
        ],
        generate: (p) => `=SUBSTITUTE(${p.text || 'text'}, ${p.old_text || '"old"'}, ${p.new_text || '"new"'})`,
        richContent: `<div class="space-y-6">
      <h2>How to Use SUBSTITUTE in Excel</h2>
      <p>The <strong>SUBSTITUTE</strong> function replaces existing text with new text in a text string. It is case-sensitive.</p>
      <h3>Syntax</h3>
      <p><code>=SUBSTITUTE(text, old_text, new_text, [instance_num])</code></p>
      <h3>Example: Cleaning Phone Numbers</h3>
      <p>To strip dashes from a phone number: <code>=SUBSTITUTE(A2, "-", "")</code></p>
    </div>`,
        faq: [
            { question: 'Is SUBSTITUTE case-sensitive?', answer: 'Yes, SUBSTITUTE is case-sensitive. "apple" will not match "Apple". For case-insensitive replacement, use REPLACE with UPPER/LOWER.' },
            { question: 'Can I replace only the first occurrence?', answer: 'Yes, add a fourth argument (instance_num) to specify which occurrence. Omit it to replace all occurrences.' },
            { question: 'What is the difference between SUBSTITUTE and REPLACE?', answer: 'SUBSTITUTE replaces specific text wherever it appears. REPLACE replaces text at a specific starting position with a given length.' }
        ],
        commonErrors: [
            { title: 'SUBSTITUTE is not changing anything', causes: ['old_text does not match due to case sensitivity or extra spaces.', 'old_text may have leading/trailing spaces that are not visible.'], fixes: ['Use TRIM(A1) on the source cell to remove extra spaces.', 'Double-check exact spelling and case of old_text.'] }
        ]
    },

    // 31. MID - Extract Middle Text
    {
        slug: 'mid',
        title: "MID Function in Excel: Extract Text from Middle of Strings",
        metaDescription: "Extract characters from the middle of any text string in Excel using the MID formula. Set start position and length with our free generator.",
        excelFunction: 'MID',
        category: 'Text',
        description: 'Returns a specific number of characters from a text string, starting at the position you specify.',
        inputs: [
            { id: 'text', label: 'Text', type: 'text', placeholder: 'e.g., A1' },
            { id: 'start_num', label: 'Start Position', type: 'number', placeholder: 'e.g., 3' },
            { id: 'num_chars', label: 'Number of Characters', type: 'number', placeholder: 'e.g., 5' },
        ],
        generate: (p) => `=MID(${p.text || 'text'}, ${p.start_num || '1'}, ${p.num_chars || '1'})`,
        howToSteps: [
        {
                name: "Select Text Cell",
                text: "Select cell containing your text string (e.g., A2)."
        },
        {
                name: "Specify Start Position",
                text: "Enter character position to start extracting from (1-based index)."
        },
        {
                name: "Specify Character Count",
                text: "Enter number of characters to extract and press Enter."
        }
],
        richContent: `<div class="space-y-6">
      <h2>How to Use the MID Function in Excel</h2>
      <p>The <strong>MID</strong> function returns a specific number of characters from a text string, starting at the position you specify.</p>
      <h3>Syntax</h3>
      <p><code>=MID(text, start_num, num_chars)</code></p>
      <h3>Example</h3>
      <p>To extract the 4-digit year from ID code "PROJ-2026-US": <code>=MID(A2, 6, 4)</code> returns <strong>"2026"</strong>.</p>
    </div>`,
        faq: [
            { question: 'What happens if start_num is negative or zero?', answer: 'MID returns a #VALUE! error if start_num is less than 1. Always start from position 1 or higher.' },
            { question: 'What if start_num is beyond the text length?', answer: 'MID returns an empty string ("") if start_num exceeds the total length of the text.' },
            { question: 'How do I extract text between two characters?', answer: 'Combine MID with FIND: =MID(A1, FIND("(", A1)+1, FIND(")", A1)-FIND("(", A1)-1) extracts text between parentheses.' }
        ],
        commonErrors: [
            { title: '#VALUE! error or wrong result', causes: ['start_num is less than 1.', 'num_chars is negative.', 'The text is shorter than the start position.'], fixes: ['Ensure start_num is at least 1.', 'Use a positive number for num_chars.', 'Check the actual length of the text string first with LEN.'] }
        ]
    },

    // 32. LEN - Text Length
    {
        slug: 'len',
        title: "LEN in Excel: Count Total Characters in a Cell",
        metaDescription: "Count the exact number of characters (including spaces & punctuation) in Excel with the LEN formula. Validate data length with our free builder.",
        excelFunction: 'LEN',
        category: 'Text',
        description: 'Returns the number of characters in a text string.',
        howToSteps: [
        {
                name: "Select Output Cell",
                text: "Click the empty cell where character count will appear."
        },
        {
                name: "Enter LEN Formula",
                text: "Type =LEN(A2) where A2 is the text cell."
        },
        {
                name: "Press Enter",
                text: "Hit Enter to view total character count."
        }
],
        inputs: [{ id: 'text', label: 'Text', type: 'text', placeholder: 'e.g., A1' }],
        generate: (p) => `=LEN(${p.text || 'text'})`,
        richContent: `<div class="space-y-6">
      <h2>How to Count Characters in Excel with LEN</h2>
      <p>The <strong>LEN</strong> function returns the number of characters in a text string, counting letters, numbers, spaces, and punctuation.</p>
      <h3>Syntax</h3>
      <p><code>=LEN(text)</code></p>
      <h3>Combine with Other Formulas</h3>
      <p>LEN is frequently combined with <code>RIGHT</code> and <code>FIND</code> for dynamic text trimming and character extraction.</p>
    </div>`,
        faq: [
            { question: 'Does LEN count spaces?', answer: 'Yes, LEN counts every character including spaces, punctuation, and invisible characters. "Hello World" returns 11, not 10.' },
            { question: 'What does LEN return for an empty cell?', answer: 'LEN returns 0 for a completely empty cell. If the cell contains a formula that returns "", the length is also 0.' },
            { question: 'What is the difference between LEN and LENB?', answer: 'LEN counts each character as 1. LENB counts bytes (2 per character for double-byte languages like Chinese or Japanese). For English text, they return the same result.' }
        ],
        commonErrors: [
            { title: 'LEN returns a higher count than expected', causes: ['The cell contains extra spaces, line breaks, or non-printable characters.', 'Number formatting adds hidden characters.'], fixes: ['Use TRIM(CLEAN(A1)) before counting to remove excess whitespace and non-printable chars.', 'Ensure numbers are plain text, not formatted values.'] }
        ]
    },

    // 33. FIND - Find Text Position
    {
        slug: 'find',
        title: "FIND in Excel: Locate Text Position (Case-Sensitive)",
        metaDescription: "Find the exact character position of a substring in Excel with FIND. Case-sensitive text position locator with our free interactive formula builder.",
        excelFunction: 'FIND',
        category: 'Text',
        description: 'Returns the starting position of one text string within another (case-sensitive).',
        inputs: [
            { id: 'find_text', label: 'Text to Find', type: 'text', placeholder: 'e.g., "@"' },
            { id: 'within_text', label: 'Within Text', type: 'text', placeholder: 'e.g., A1' },
        ],
        generate: (p) => `=FIND(${p.find_text || 'find_text'}, ${p.within_text || 'within_text'})`,
        relatedTools: ['search', 'left', 'mid', 'right', 'len', 'substitute'],
        howToSteps: [
        {
                name: "Specify Search Substring",
                text: "Enter the character to find in quotes (e.g., \"@\" or \"-\")."
        },
        {
                name: "Specify Target Text Cell",
                text: "Enter the cell reference to search within (e.g., A2)."
        },
        {
                name: "Optional Start Number",
                text: "Set starting character index (defaults to 1)."
        }
],
        richContent: `<div class="space-y-6">
      <h2>How to Find Character Position with FIND in Excel</h2>
      <p>The <strong>FIND</strong> function locates one text string inside another and returns its starting character number. It is <strong>case-sensitive</strong>.</p>
      <h3>Syntax</h3>
      <p><code>=FIND(find_text, within_text, [start_num])</code></p>
      <h3>FIND vs SEARCH</h3>
      <ul>
        <li><strong>FIND:</strong> Case-sensitive, does NOT support wildcards.</li>
        <li><strong>SEARCH:</strong> Case-insensitive, supports <code>?</code> and <code>*</code> wildcards.</li>
      </ul>
    </div>`,
        faq: [
            { question: 'Is FIND case-sensitive?', answer: 'Yes, FIND is case-sensitive. "Apple" and "apple" are different. For case-insensitive search, use SEARCH instead.' },
            { question: 'What does FIND return if the text is not found?', answer: 'FIND returns a #VALUE! error if the search text is not found. Use IFERROR to handle this: =IFERROR(FIND("x", A1), 0).' },
            { question: 'How do I find the second occurrence of a character?', answer: 'Use the start_num argument: =FIND("@", A1, FIND("@", A1)+1) finds the second @ symbol.' }
        ],
        commonErrors: [
            { title: '#VALUE! error', causes: ['The search text does not exist in the source text.', 'Case mismatch (FIND is case-sensitive).', 'The source cell is empty.'], fixes: ['Double-check the search text exists.', 'Use SEARCH instead for case-insensitive search.', 'Check that the source cell is not blank.'] }
        ]
    },

    // 34. SEARCH - Search Text Position
    {
        slug: 'search',
        title: "SEARCH in Excel: Find Text Position (Case-Insensitive)",
        metaDescription: "Find text position in Excel without worrying about uppercase or lowercase. Generate SEARCH formulas with wildcards using our free generator.",
        excelFunction: 'SEARCH',
        category: 'Text',
        description: 'Returns the position of a text string within another (case-insensitive). Supports wildcards.',
        inputs: [
            { id: 'find_text', label: 'Text to Find', type: 'text', placeholder: 'e.g., "error"' },
            { id: 'within_text', label: 'Within Text', type: 'text', placeholder: 'e.g., A1' },
        ],
        generate: (p) => `=SEARCH(${p.find_text || 'find_text'}, ${p.within_text || 'within_text'})`,
        howToSteps: [
        {
                name: "Enter Find Text",
                text: "Provide the substring to locate (e.g., \"total\" or \"#\")."
        },
        {
                name: "Select Target Cell",
                text: "Select cell reference to search within (e.g., A2)."
        },
        {
                name: "Combine with MID/LEFT",
                text: "Use position output inside MID or LEFT for dynamic slicing."
        }
],
        richContent: `<div class="space-y-6">
      <h2>How to Use SEARCH in Excel</h2>
      <p>The <strong>SEARCH</strong> function finds the position of a substring inside a text string. Unlike FIND, SEARCH is <strong>case-insensitive</strong> and allows wildcards.</p>
      <h3>Syntax</h3>
      <p><code>=SEARCH(find_text, within_text, [start_num])</code></p>
    </div>`,
        faq: [
            { question: 'What wildcards does SEARCH support?', answer: 'SEARCH supports * (any characters), ? (single character), and ~ (escape character). For example, SEARCH("A*", A1) finds any text starting with A.' },
            { question: 'What is the difference between SEARCH and FIND?', answer: 'SEARCH is case-insensitive and supports wildcards. FIND is case-sensitive and does not support wildcards. SEARCH("apple") matches "Apple", "APPLE", "apple". FIND does not.' },
            { question: 'Does SEARCH work in Google Sheets?', answer: 'Yes, SEARCH works identically in Google Sheets with case-insensitive behavior and wildcard support.' }
        ],
        commonErrors: [
            { title: '#VALUE! error when text exists', causes: ['The search text has a different case (SEARCH is insensitive so this is unlikely).', 'Wildcard pattern does not match.', 'The source cell contains only numbers stored as text.'], fixes: ['Test with a simple exact match first.', 'Use * only when you need pattern matching.', 'Ensure the source cell is formatted as text.'] }
        ]
    },

    // 35. TEXT - Format Numbers as Text
    {
        slug: 'text',
        title: "TEXT in Excel: Format Numbers, Dates & Currency",
        metaDescription: "Format dates, currency, percentages, and leading zeros in Excel with the TEXT formula. Build custom format codes with our free formula generator.",
        excelFunction: 'TEXT',
        category: 'Text',
        description: 'Converts a value to text in a specific number format.',
        howToSteps: [
        {
                name: "Select Number/Date Cell",
                text: "Choose the cell containing numeric data (e.g., A2)."
        },
        {
                name: "Specify Format Pattern",
                text: "Enter format string in quotes (e.g., \"yyyy-mm-dd\", \"$#,##0.00\")."
        },
        {
                name: "Combine with Strings",
                text: "Concatenate: =\"Total: \" & TEXT(A2, \"$#,##0.00\")."
        }
],
        inputs: [
            { id: 'value', label: 'Value', type: 'text', placeholder: 'e.g., A1' },
            {
                id: 'format',
                label: 'Format',
                type: 'select',
                options: [
                    { label: 'Number (1,234.56)', value: '"#,##0.00"' },
                    { label: 'Currency ($1,234)', value: '"$#,##0"' },
                    { label: 'Percentage (12.5%)', value: '"0.0%"' },
                    { label: 'Date (YYYY-MM-DD)', value: '"YYYY-MM-DD"' },
                    { label: 'Date (MM/DD/YYYY)', value: '"MM/DD/YYYY"' },
                    { label: 'Time (HH:MM:SS)', value: '"HH:MM:SS"' },
                ]
            },
        ],
        generate: (p) => `=TEXT(${p.value || 'value'}, ${p.format || '"#,##0"'})`,
        relatedTools: ['left', 'right', 'mid', 'concatenate', 'proper'],
        richContent: `<div class="space-y-6">
      <h2>How to Format Numbers and Dates with TEXT in Excel</h2>
      <p>The <strong>TEXT</strong> function converts a number into formatted text using custom format codes.</p>
      <h3>Common Format Codes</h3>
      <table class="min-w-full divide-y divide-gray-200 border text-sm">
        <thead class="bg-gray-50"><tr><th class="p-2 text-left">Goal</th><th class="p-2 text-left">Formula</th><th class="p-2 text-left">Result</th></tr></thead>
        <tbody>
          <tr><td class="p-2">Date Format</td><td class="p-2 font-mono">=TEXT(TODAY(), "yyyy-mm-dd")</td><td class="p-2 font-mono">2026-08-26</td></tr>
          <tr><td class="p-2">Currency</td><td class="p-2 font-mono">=TEXT(1234.5, "$#,##0.00")</td><td class="p-2 font-mono">$1,234.50</td></tr>
          <tr><td class="p-2">Leading Zeros</td><td class="p-2 font-mono">=TEXT(42, "00000")</td><td class="p-2 font-mono">00042</td></tr>
        </tbody>
      </table>
    </div>`,
        faq: [
            { question: 'What is the most useful TEXT format code?', answer: '"$#,##0.00" for currency, "YYYY-MM-DD" for dates, "0.0%" for percentages, and "00000" for leading zeros (like ZIP codes).' },
            { question: 'Why is my formatted number not calculating in formulas?', answer: 'TEXT converts numbers to text, which other formulas may not recognize as numeric. Use the original cell for calculations and TEXT only for display/output.' },
            { question: 'Can TEXT format dates in Google Sheets?', answer: 'Yes. TEXT works identically in Google Sheets. Format codes are the same: "MM/DD/YYYY", "DDD" for abbreviated day name, "MMMM" for full month name.' }
        ],
        commonErrors: [
            { title: 'Result shows #####', causes: ['Column too narrow for the formatted text output.', 'Custom format code is invalid or mistyped.'], fixes: ['Widen the column.', 'Double-check the format string syntax — it must be in quotes.'] }
        ]
    },

    // 36. ROUND - Round Numbers
    {
        slug: 'round',
        title: "ROUND in Excel: Round Numbers to Specified Decimals",
        metaDescription: "Round numbers to specified decimal places or nearest integer in Excel with the ROUND formula. Clean financial calculations with our free builder.",
        excelFunction: 'ROUND',
        category: 'Math',
        description: 'Rounds a number to a specified number of digits.',
        howToSteps: [
        {
                name: "Select Number Cell",
                text: "Click the cell with decimals to round (e.g., A2)."
        },
        {
                name: "Set Decimal Places",
                text: "Enter 2 for cents, 0 for nearest whole number, or -1 for nearest 10."
        },
        {
                name: "Press Enter",
                text: "Execute formula and copy down."
        }
],
        inputs: [
            { id: 'number', label: 'Number', type: 'text', placeholder: 'e.g., A1' },
            { id: 'num_digits', label: 'Decimal Places', type: 'number', placeholder: 'e.g., 2' },
        ],
        generate: (p) => `=ROUND(${p.number || 'number'}, ${p.num_digits || '0'})`,
        richContent: `<div class="space-y-6">
      <h2>How to Round Numbers in Excel with ROUND</h2>
      <p>The <strong>ROUND</strong> function rounds a number to a specified number of decimal digits according to standard mathematical rules (0.5 rounds up).</p>
      <h3>Syntax</h3>
      <p><code>=ROUND(number, num_digits)</code></p>
    </div>`,
        faq: [
            { question: 'What is the difference between ROUND, ROUNDUP, and ROUNDDOWN?', answer: 'ROUND rounds to the nearest value (away from zero at .5). ROUNDUP always rounds up (away from zero). ROUNDDOWN always rounds down (toward zero).' },
            { question: 'Can I round to the left of the decimal point?', answer: 'Yes. Use negative num_digits: -1 rounds to tens, -2 to hundreds, -3 to thousands. Example: =ROUND(1234, -2) returns 1200.' },
            { question: 'Does Excel use bankers rounding?', answer: 'No. Excel ROUND uses standard rounding (0.5 always rounds up). For bankers rounding (round to even), use a custom VBA function.' }
        ],
        commonErrors: [
            { title: 'Unexpected rounding result', causes: ['Display formatting shows fewer decimals but the actual value is not rounded.', 'Negative num_digits rounds to the left of the decimal, changing magnitude significantly.'], fixes: ['Use ROUND in the formula, not just cell formatting.', 'Check the num_digits value — positive for decimal places, negative for tens/hundreds.'] }
        ]
    },

    // 37. ROUNDUP - Round Up
    {
        slug: 'roundup',
        title: "ROUNDUP in Excel: Always Round Numbers Up (Ceiling)",
        metaDescription: "Always round numbers up away from zero in Excel using the ROUNDUP formula. Calculate packaging, inventory, and rates with our free tool.",
        excelFunction: 'ROUNDUP',
        category: 'Math',
        description: 'Rounds a number up, away from zero.',
        inputs: [
            { id: 'number', label: 'Number', type: 'text', placeholder: 'e.g., A1' },
            { id: 'num_digits', label: 'Decimal Places', type: 'number', placeholder: 'e.g., 0' },
        ],
        generate: (p) => `=ROUNDUP(${p.number || 'number'}, ${p.num_digits || '0'})`,
        relatedTools: ['round', 'rounddown', 'abs', 'floor', 'ceil'],
        howToSteps: [
        {
                name: "Select Value Cell",
                text: "Select the decimal number cell (e.g., A2)."
        },
        {
                name: "Set Num Digits",
                text: "Enter decimal precision (0 for whole units, 2 for cents)."
        },
        {
                name: "Apply to Calculations",
                text: "Press Enter to guarantee upward rounding."
        }
],
        richContent: `<div class="space-y-6">
      <h2>How to Round Up in Excel with ROUNDUP</h2>
      <p>The <strong>ROUNDUP</strong> function behaves like ROUND, except that it always rounds a number up away from zero.</p>
      <h3>Syntax</h3>
      <p><code>=ROUNDUP(number, num_digits)</code></p>
      <h3>Example: Minimum Packaging Units</h3>
      <p>If you need 10.2 boxes, <code>=ROUNDUP(10.2, 0)</code> ensures you order <strong>11</strong> boxes.</p>
    </div>`,
        faq: [
            { question: 'When should I use ROUNDUP instead of ROUND?', answer: 'Use ROUNDUP when you need to ensure a value never falls below a threshold, such as calculating required materials, shipping charges, or pricing markups.' },
            { question: 'Does ROUNDUP ever round down?', answer: 'No. ROUNDUP always rounds away from zero. Even 1.001 rounded to 0 decimals becomes 2. Use ROUNDDOWN for forced rounding toward zero.' },
            { question: 'How does ROUNDUP handle negative numbers?', answer: 'ROUNDUP rounds away from zero, so -1.5 becomes -2 (more negative). This is consistent with "always round up" behavior.' }
        ],
        commonErrors: [
            { title: 'Number rounded in the wrong direction', causes: ['Using ROUNDUP when ROUND or ROUNDDOWN was intended.', 'Negative numbers may give unexpected results if you expect "up" to mean "less negative".'], fixes: ['Use ROUND for standard rounding, ROUNDDOWN for truncation.', 'For negative numbers, test with a small sample first.'] }
        ]
    },

    // 38. ROUNDDOWN - Round Down
    {
        slug: 'rounddown',
        title: "ROUNDDOWN in Excel: Always Round Numbers Down (Floor)",
        metaDescription: "Round numbers down toward zero in Excel with the ROUNDDOWN formula. Truncate decimals for milestone and age tracking with our free generator.",
        excelFunction: 'ROUNDDOWN',
        category: 'Math',
        description: 'Rounds a number down, toward zero.',
        howToSteps: [
        {
                name: "Select Number Cell",
                text: "Click the cell containing the decimal value."
        },
        {
                name: "Specify Decimal Precision",
                text: "Enter 0 for integers or 2 for hundredths."
        },
        {
                name: "Press Enter",
                text: "Apply formula to truncate without upward rounding."
        }
],
        inputs: [
            { id: 'number', label: 'Number', type: 'text', placeholder: 'e.g., A1' },
            { id: 'num_digits', label: 'Decimal Places', type: 'number', placeholder: 'e.g., 0' },
        ],
        generate: (p) => `=ROUNDDOWN(${p.number || 'number'}, ${p.num_digits || '0'})`,
        richContent: `<div class="space-y-6">
      <h2>How to Round Down in Excel with ROUNDDOWN</h2>
      <p>The <strong>ROUNDDOWN</strong> function behaves like ROUND, except that it always rounds numbers down toward zero.</p>
      <h3>Syntax</h3>
      <p><code>=ROUNDDOWN(number, num_digits)</code></p>
    </div>`,
        faq: [
            { question: 'When should I use ROUNDDOWN?', answer: 'Use ROUNDDOWN when you need to truncate values without rounding up, such as calculating whole units, integer payouts, or conservative estimates.' },
            { question: 'Does ROUNDDOWN just drop extra digits?', answer: 'Yes. ROUNDDOWN truncates toward zero — it simply discards digits beyond the specified decimal places without any rounding.' },
            { question: 'Is ROUNDDOWN the same as TRUNC?', answer: 'For positive numbers and default num_digits, yes, ROUNDDOWN and TRUNC behave identically. For negative numbers, TRUNC still truncates toward zero while ROUNDDOWN always rounds toward zero.' }
        ],
        commonErrors: [
            { title: 'Number not rounding down as expected', causes: ['Using ROUNDDOWN on positive num_digits but the value is already below the threshold.', 'Applying to negatives — -1.5 rounddown to 0 decimals gives -1 (toward zero).'], fixes: ['Test with a simple value first to verify the direction.', 'Remember: ROUNDDOWN always goes toward zero regardless of sign.'] }
        ]
    },

    // 39. ABS - Absolute Value
    {
        slug: 'abs',
        title: "ABS in Excel: Calculate Absolute Value (Formula Guide)",
        metaDescription: "Convert negative numbers to positive values in Excel using the ABS formula. Calculate variances and differences easily with our free tool.",
        excelFunction: 'ABS',
        category: 'Math',
        description: 'Returns the absolute value of a number (removes the negative sign).',
        inputs: [{ id: 'number', label: 'Number', type: 'text', placeholder: 'e.g., A1' }],
        generate: (p) => `=ABS(${p.number || 'number'})`,
        howToSteps: [
        {
                name: "Select Input Cell",
                text: "Click the cell containing a positive or negative number."
        },
        {
                name: "Enter ABS Formula",
                text: "Type =ABS(A2) or =ABS(Actual - Budget)."
        },
        {
                name: "View Absolute Result",
                text: "Press Enter to return the unsigned magnitude."
        }
],
        richContent: `<div class="space-y-6">
      <h2>How to Calculate Absolute Value in Excel with ABS</h2>
      <p>The <strong>ABS</strong> function returns the absolute value of a number (the number without its positive or negative sign).</p>
      <h3>Syntax</h3>
      <p><code>=ABS(number)</code></p>
      <h3>Example: Variance Calculation</h3>
      <p><code>=ABS(Budget - Actual)</code> returns the difference distance regardless of which is larger.</p>
    </div>`,
        faq: [
            { question: 'What does ABS do?', answer: 'ABS returns the absolute value of a number, removing any negative sign. ABS(-5) returns 5, ABS(5) returns 5, and ABS(0) returns 0.' },
            { question: 'Does ABS work with negative numbers?', answer: 'Yes. ABS converts negative numbers to positive by removing the minus sign. This is useful for calculating differences regardless of direction.' },
            { question: 'Does ABS work in Google Sheets?', answer: 'Yes, ABS works identically in Google Sheets with the same syntax.' }
        ],
        commonErrors: [
            { title: 'ABS not removing the negative sign from a date', causes: ['Excel stores dates as serial numbers. A negative date serial number results when you subtract a later date from an earlier one.', 'The value might be text, not a number.'], fixes: ['Ensure the value is numeric. Use VALUE() to convert text to a number.', 'For date differences, use DATEDIF or DAYS instead.'] }
        ]
    },

    // 40. MAX - Maximum Value
    {
        slug: 'max',
        title: "MAX in Excel: Find Highest Number in a Data Range",
        metaDescription: "Find the maximum or highest value in a range in Excel with the MAX formula. Identify top sales, scores, and peak values with our free builder.",
        excelFunction: 'MAX',
        category: 'Math',
        description: 'Returns the largest value in a set of values.',
        inputs: [{ id: 'range', label: 'Range', type: 'range', placeholder: 'e.g., A1:A100' }],
        generate: (p) => `=MAX(${p.range || 'range'})`,
        howToSteps: [
        {
                name: "Select Output Cell",
                text: "Click where you want the maximum value displayed."
        },
        {
                name: "Enter Range in MAX",
                text: "Type =MAX(B2:B100) highlighting your numeric data."
        },
        {
                name: "Press Enter",
                text: "Hit Enter to view the highest number in the dataset."
        }
],
        richContent: `<div class="space-y-6">
      <h2>How to Find Maximum Values with MAX in Excel</h2>
      <p>The <strong>MAX</strong> function returns the largest numeric value in a set of values, ignoring text and logical values.</p>
      <h3>Syntax</h3>
      <p><code>=MAX(number1, [number2], ...)</code></p>
    </div>`,
        faq: [
            { question: 'What is the difference between MAX and MAXA?', answer: 'MAX ignores text and logical values. MAXA evaluates TRUE as 1, FALSE as 0, and includes text values.' },
            { question: 'How do I find the MAX while ignoring errors?', answer: 'Use IFERROR inside an array: =MAX(IFERROR(A1:A10, "")) entered with Ctrl+Shift+Enter, or =AGGREGATE(4, 6, A1:A10) in Excel 2010+.' },
            { question: 'Does MAX work in Google Sheets?', answer: 'Yes, MAX works identically in Google Sheets with the same syntax.' }
        ],
        commonErrors: [
            { title: 'MAX returns 0 when I expect a positive number', causes: ['The range includes cells with 0 or empty cells that Excel treats as 0.', 'The range contains all text values instead of numbers.'], fixes: ['Exclude zero cells with MAXIFS or an array formula.', 'Ensure values are stored as numbers, not text.'] }
        ]
    },

    // 41. MIN - Minimum Value
    {
        slug: 'min',
        title: "MIN in Excel: Find Lowest Number in a Data Range",
        metaDescription: "Find the smallest or lowest number in an Excel range with the MIN formula. Track lowest costs, fastest times, and minimum scores with our free tool.",
        excelFunction: 'MIN',
        category: 'Math',
        description: 'Returns the smallest value in a set of values.',
        inputs: [{ id: 'range', label: 'Range', type: 'range', placeholder: 'e.g., A1:A100' }],
        generate: (p) => `=MIN(${p.range || 'range'})`,
        howToSteps: [
        {
                name: "Select Result Cell",
                text: "Click the empty cell for the minimum value."
        },
        {
                name: "Enter MIN Formula",
                text: "Type =MIN(B2:B100) selecting your range."
        },
        {
                name: "Press Enter",
                text: "View the smallest numeric value in the range."
        }
],
        richContent: `<div class="space-y-6">
      <h2>How to Find Minimum Values with MIN in Excel</h2>
      <p>The <strong>MIN</strong> function returns the smallest number in a set of provided values.</p>
      <h3>Syntax</h3>
      <p><code>=MIN(number1, [number2], ...)</code></p>
    </div>`,
        faq: [
            { question: 'What is the difference between MIN and MINA?', answer: 'MIN ignores text and logical values. MINA evaluates TRUE as 1 and FALSE as 0, which may give unexpected results.' },
            { question: 'How do I find the smallest value excluding zeros?', answer: 'Use an array formula: =MIN(IF(A1:A100>0, A1:A100)), or MINIFS in Excel 2019+ if you have a criteria range.' },
            { question: 'Does MIN work in Google Sheets?', answer: 'Yes, MIN works identically in Google Sheets with the same syntax.' }
        ],
        commonErrors: [
            { title: 'MIN returns 0 when expecting a positive minimum', causes: ['The range includes zeros which are technically the minimum.', 'Blank cells in the range are counted as 0.'], fixes: ['Use MINIFS or array formulas to exclude 0.', 'Use =MINIFS(range, range, ">0") in supported Excel versions.'] }
        ]
    },

    // 42. AVERAGE - Average Value
    {
        slug: 'average',
        title: "AVERAGE in Excel: Calculate Mean of Numbers in Range",
        metaDescription: "Calculate the arithmetic mean of numbers in Excel with the AVERAGE formula. Compute average sales, grades, and prices with our free builder.",
        excelFunction: 'AVERAGE',
        category: 'Math',
        description: 'Returns the average (arithmetic mean) of the arguments.',
        howToSteps: [
        {
                name: "Select Output Cell",
                text: "Click where you want the average result."
        },
        {
                name: "Enter Range into AVERAGE",
                text: "Type =AVERAGE(A2:A50) highlighting your numbers."
        },
        {
                name: "Press Enter",
                text: "Hit Enter to calculate the exact mathematical average."
        }
],
        inputs: [{ id: 'range', label: 'Range', type: 'range', placeholder: 'e.g., A1:A100' }],
        generate: (p) => `=AVERAGE(${p.range || 'range'})`,
        relatedTools: ['averageif', 'sum', 'countif', 'median', 'mode'],
        richContent: `<div class="space-y-6">
      <h2>How to Calculate Averages in Excel</h2>
      <p>The <strong>AVERAGE</strong> function computes the arithmetic mean of the arguments provided.</p>
      <h3>Syntax</h3>
      <p><code>=AVERAGE(number1, [number2], ...)</code></p>
    </div>`,
        faq: [
            { question: 'What is the difference between AVERAGE and MEDIAN?', answer: 'AVERAGE calculates the arithmetic mean (sum divided by count). MEDIAN returns the middle value. MEDIAN is better for data with outliers.' },
            { question: 'How does AVERAGE handle blank cells and zeros?', answer: 'AVERAGE ignores blank cells but counts zeros. This means a cell with 0 lowers the average. Use AVERAGEA to count text as 0.' },
            { question: 'Does AVERAGE work in Google Sheets?', answer: 'Yes, AVERAGE works identically in Google Sheets with the same syntax.' }
        ],
        commonErrors: [
            { title: '#DIV/0! error', causes: ['The range contains no numeric values — all blank cells, text, or errors.', 'The range reference is invalid.'], fixes: ['Add at least one number to the range.', 'Use IFERROR to handle the error gracefully: =IFERROR(AVERAGE(A1:A10), 0).'] }
        ]
    },

    // 43. SUM - Sum Values
    {
        slug: 'sum',
        title: "SUM in Excel: Add Numbers and Cell Ranges Fast",
        metaDescription: "Add numbers and total columns in Excel with the SUM formula. Shortcut keys, multi-range addition, and free formula generator with no signup.",
        excelFunction: 'SUM',
        category: 'Math',
        description: 'Adds all the numbers in a range of cells.',
        howToSteps: [
        {
                name: "Select Total Cell",
                text: "Click below or next to the numbers you want to total."
        },
        {
                name: "Use AutoSum Shortcut",
                text: "Press Alt + = (or type =SUM(A2:A50))."
        },
        {
                name: "Press Enter",
                text: "Hit Enter to get the total sum instantly."
        }
],
        inputs: [{ id: 'range', label: 'Range', type: 'range', placeholder: 'e.g., A1:A100' }],
        generate: (p) => `=SUM(${p.range || 'range'})`,
        relatedTools: ['sumif', 'sumifs', 'average', 'countif', 'subtotal'],
        richContent: `<div class="space-y-6">
      <h2>How to Use the SUM Function in Excel</h2>
      <p>The <strong>SUM</strong> function adds values together: individual cells, continuous ranges, or a mix of both.</p>
      <h3>Syntax & Keyboard Shortcut</h3>
      <p><code>=SUM(number1, [number2], ...)</code></p>
      <p><strong>Pro Shortcut:</strong> Highlight a cell and press <code>Alt + =</code> to AutoSum adjacent cells automatically.</p>
    </div>`,
        faq: [
            { question: 'What is the difference between SUM and SUMIF?', answer: 'SUM adds all numbers in a range. SUMIF adds only the cells that meet a specific condition, like summing values greater than 100.' },
            { question: 'How do I sum across multiple sheets?', answer: 'Use a 3D reference: =SUM(Sheet1:Sheet3!A1). This adds cell A1 from Sheet1, Sheet2, and Sheet3.' },
            { question: 'Does SUM work in Google Sheets?', answer: 'Yes, SUM works identically in Google Sheets. Google Sheets also supports SUM across multiple sheets with the same 3D reference syntax.' }
        ],
        commonErrors: [
            { title: 'SUM returns 0 when there are numbers in the range', causes: ['Numbers are stored as text (green triangle in corner of cell).', 'Cells contain formulas returning text that looks like numbers.', 'There are hidden spaces or non-printable characters.'], fixes: ['Use VALUE() to convert text to numbers, or multiply by 1: =SUM(VALUE(A1:A10)) as array.', 'Use TRIM(CLEAN()) to remove hidden characters before summing.', 'Use the "Convert to Number" option from the error alert dropdown.'] }
        ]
    },

    // 44. YEAR - Extract Year
    {
        slug: 'year',
        title: "YEAR in Excel: Extract 4-Digit Year from Any Date",
        metaDescription: "Extract the 4-digit year (e.g. 2026) from any date cell in Excel using the YEAR formula. Group by year and filter data with our free tool.",
        excelFunction: 'YEAR',
        category: 'Date',
        description: 'Returns the year of a date, an integer in the range 1900-9999.',
        howToSteps: [
        {
                name: "Select Output Cell",
                text: "Click the cell where the year integer should appear."
        },
        {
                name: "Enter YEAR Formula",
                text: "Type =YEAR(A2) referencing your date cell."
        },
        {
                name: "Press Enter",
                text: "Hit Enter to extract the 4-digit year number."
        }
],
        inputs: [{ id: 'date', label: 'Date', type: 'text', placeholder: 'e.g., A1' }],
        generate: (p) => `=YEAR(${p.date || 'date'})`,
        richContent: `<div class="space-y-6">
      <h2>How to Extract the Year from a Date in Excel</h2>
      <p>The <strong>YEAR</strong> function returns the year corresponding to a date as a four-digit integer (ranging from 1900 to 9999).</p>
      <h3>Syntax</h3>
      <p><code>=YEAR(serial_number)</code></p>
    </div>`,
        faq: [
            { question: 'Why is YEAR returning a strange 4-digit number?', answer: 'Excel stores dates as serial numbers. YEAR correctly converts them. If YEAR returns something like 1905, the cell likely contains a serial number instead of a formatted date.' },
            { question: 'Can YEAR extract the year from a text date?', answer: 'Only if the text is recognized as a valid date format by Excel. For text dates, use DATEVALUE() first: =YEAR(DATEVALUE(A1)).' },
            { question: 'What is the difference between YEAR and YEARFRAC?', answer: 'YEAR extracts the year portion of a date. YEARFRAC calculates the fraction of a year between two dates, useful for age or tenure calculations.' }
        ],
        commonErrors: [
            { title: '#VALUE! error', causes: ['The input is text that Excel cannot interpret as a date.', 'The cell contains an error value.'], fixes: ['Use DATEVALUE() to convert text dates.', 'Ensure the cell contains a valid date, not a string.'] }
        ]
    },

    // 45. MONTH - Extract Month
    {
        slug: 'month',
        title: "MONTH in Excel: Extract Month Number (1-12) from Date",
        metaDescription: "Extract month numbers (1 to 12) from dates in Excel with the MONTH formula. Group reports by month and build quarterly summaries easily.",
        excelFunction: 'MONTH',
        category: 'Date',
        description: 'Returns the month of a date, a number from 1 (January) to 12 (December).',
        inputs: [{ id: 'date', label: 'Date', type: 'text', placeholder: 'e.g., A1' }],
        generate: (p) => `=MONTH(${p.date || 'date'})`,
        relatedTools: ['day', 'year', 'edate', 'eomonth', 'text'],
        howToSteps: [
        {
                name: "Select Result Cell",
                text: "Choose the cell where the month number will appear."
        },
        {
                name: "Enter MONTH Formula",
                text: "Type =MONTH(A2) referencing your date cell."
        },
        {
                name: "Press Enter",
                text: "Returns 1 for January through 12 for December."
        }
],
        richContent: `<div class="space-y-6">
      <h2>How to Extract the Month from a Date in Excel</h2>
      <p>The <strong>MONTH</strong> function extracts the month of a date represented by a number from 1 (January) to 12 (December).</p>
      <h3>Syntax</h3>
      <p><code>=MONTH(serial_number)</code></p>
      <h3>To Get Month Name instead of Number</h3>
      <p>Use <code>=TEXT(A2, "mmmm")</code> for full month name (e.g., "August") or <code>=TEXT(A2, "mmm")</code> for short abbreviation (e.g., "Aug").</p>
    </div>`,
        faq: [
            { question: 'Why does MONTH return a number instead of the month name?', answer: 'MONTH always returns a number (1-12). To show the month name, use TEXT: =TEXT(A1, "MMMM") for full name or "MMM" for abbreviated name.' },
            { question: 'What does MONTH return for a blank cell?', answer: 'MONTH returns 1 for a blank cell because Excel treats empty cells as date serial number 0, which corresponds to January 0, 1900 — month 1.' },
            { question: 'Does MONTH work in Google Sheets?', answer: 'Yes, MONTH works identically in Google Sheets with the same syntax and behavior.' }
        ],
        commonErrors: [
            { title: 'MONTH returns wrong value', causes: ['The date cell contains a serial number display issue.', 'The input is text in an unrecognized date format.'], fixes: ['Format the date cell properly using Format Cells > Date.', 'Use DATEVALUE() for text dates.'] }
        ]
    },

    // 46. DAY - Extract Day
    {
        slug: 'day',
        title: "DAY in Excel: Extract Day of the Month (1-31) from Date",
        metaDescription: "Extract the day of the month (1 to 31) from any date in Excel using the DAY formula. Perfect for invoice dates and cohort tracking with our free tool.",
        excelFunction: 'DAY',
        category: 'Date',
        description: 'Returns the day of a date, a number from 1 to 31.',
        inputs: [{ id: 'date', label: 'Date', type: 'text', placeholder: 'e.g., A1' }],
        generate: (p) => `=DAY(${p.date || 'date'})`,
        relatedTools: ['month', 'year', 'edate', 'eomonth', 'networkdays'],
        howToSteps: [
        {
                name: "Select Target Cell",
                text: "Click the empty cell for the day number."
        },
        {
                name: "Enter DAY Formula",
                text: "Type =DAY(A2) where A2 is your date cell."
        },
        {
                name: "Press Enter",
                text: "Returns an integer between 1 and 31."
        }
],
        richContent: `<div class="space-y-6">
      <h2>How to Extract Day of the Month in Excel</h2>
      <p>The <strong>DAY</strong> function returns the day of the month as an integer from 1 to 31 based on a valid date value.</p>
      <h3>Syntax</h3>
      <p><code>=DAY(serial_number)</code></p>
    </div>`,
        faq: [
            { question: 'Does DAY return the day of the week or the day of the month?', answer: 'DAY returns the day of the month (1-31). For the day of the week (1=Sunday to 7=Saturday), use WEEKDAY instead.' },
            { question: 'Can DAY extract the day from a text string?', answer: 'If the text is a recognizable date format in Excel, yes. Otherwise, use DATEVALUE to convert the text to a date first.' },
            { question: 'What is the difference between DAY and WEEKDAY?', answer: 'DAY returns the day of the month (1-31). WEEKDAY returns the day of the week (1-7, where 1 depends on your return_type).' }
        ],
        commonErrors: [
            { title: '#VALUE! error', causes: ['The input is text Excel cannot recognize as a date.', 'The cell contains an error from another formula.'], fixes: ['Use DATEVALUE() to convert text dates to valid date serial numbers.', 'Check the source cell for formula errors.'] }
        ]
    },

    // 47. EDATE - Add Months to Date
    {
        slug: 'edate',
        title: "EDATE in Excel: Add or Subtract Months from Dates",
        metaDescription: "Calculate exact expiration and renewal dates by adding or subtracting months in Excel using EDATE. Free interactive formula generator.",
        excelFunction: 'EDATE',
        category: 'Date',
        description: 'Returns a date that is a specified number of months before or after a given date.',
        inputs: [
            { id: 'start_date', label: 'Start Date', type: 'text', placeholder: 'e.g., A1' },
            { id: 'months', label: 'Months to Add', type: 'number', placeholder: 'e.g., 3 or -6' },
        ],
        generate: (p) => `=EDATE(${p.start_date || 'start_date'}, ${p.months || '1'})`,
        relatedTools: ['eomonth', 'datedif', 'networkdays', 'today', 'month'],
        howToSteps: [
        {
                name: "Select Start Date",
                text: "Select the cell with the initial date (e.g., A2)."
        },
        {
                name: "Specify Number of Months",
                text: "Enter positive months to add (e.g., 3) or negative to subtract (e.g., -6)."
        },
        {
                name: "Format Result as Date",
                text: "Press Enter and apply Date format (Ctrl+Shift+#)."
        }
],
        richContent: `<div class="space-y-6">
      <h2>How to Add or Subtract Months with EDATE in Excel</h2>
      <p>The <strong>EDATE</strong> function returns the date that is the indicated number of months before or after a specified start date.</p>
      <h3>Syntax</h3>
      <p><code>=EDATE(start_date, months)</code></p>
      <h3>Examples</h3>
      <ul>
        <li><strong>Add 6 Months:</strong> <code>=EDATE(A2, 6)</code></li>
        <li><strong>Subtract 1 Year:</strong> <code>=EDATE(A2, -12)</code></li>
      </ul>
      <p><em>Note:</em> EDATE preserves the exact day of the month. If the resulting month has fewer days (e.g. Feb 30), Excel automatically adjusts to the last day of the month (Feb 28/29).</p>
    </div>`,
        faq: [
            { question: 'What does EDATE do?', answer: 'EDATE returns a date that is a specified number of months before or after a given date. For example, EDATE("2026-01-15", 3) returns April 15, 2026.' },
            { question: 'Can EDATE handle negative months?', answer: 'Yes. Use a negative number for the months argument to go back in time. For example, EDATE(A1, -6) gives the date 6 months before A1.' },
            { question: 'Does EDATE handle month-end dates correctly?', answer: 'Yes. If the start date is Jan 31 and you add 1 month, EDATE returns Feb 28 (or 29 in leap years) — the last day of the month.' }
        ],
        commonErrors: [
            { title: '#VALUE! error with EDATE', causes: ['Start date is not a valid date (text instead of a date value).', 'Months argument is not a number.'], fixes: ['Use DATEVALUE() to convert text dates, or ensure the cell contains a proper date.', 'Make sure the months argument is a number, not text.'] }
        ]
    },

    // 48. EOMONTH - End of Month
    {
        slug: 'eomonth',
        title: "EOMONTH in Excel: Find Last Day of the Month Fast",
        metaDescription: "Calculate the exact last day of the month in Excel using the EOMONTH formula. Standardize billing cycles and financial closes with our free tool.",
        excelFunction: 'EOMONTH',
        category: 'Date',
        description: 'Returns the last day of the month a specified number of months before or after a date.',
        inputs: [
            { id: 'start_date', label: 'Start Date', type: 'text', placeholder: 'e.g., A1' },
            { id: 'months', label: 'Month Offset', type: 'number', placeholder: 'e.g., 0 for current month' },
        ],
        generate: (p) => `=EOMONTH(${p.start_date || 'start_date'}, ${p.months || '0'})`,
        relatedTools: ['edate', 'datedif', 'day', 'month', 'networkdays'],
        howToSteps: [
        {
                name: "Select Start Date",
                text: "Click the cell with your reference date (e.g., A2)."
        },
        {
                name: "Specify Months Offset",
                text: "Enter 0 for end of current month, 1 for next month, -1 for previous month."
        },
        {
                name: "Press Enter",
                text: "Returns the serial number of the final day of the target month."
        }
],
        richContent: `<div class="space-y-6">
      <h2>How to Find Month-End Dates with EOMONTH in Excel</h2>
      <p>The <strong>EOMONTH</strong> function returns the last day of the month that is the indicated number of months before or after a start date.</p>
      <h3>Syntax</h3>
      <p><code>=EOMONTH(start_date, months)</code></p>
      <h3>Common Applications</h3>
      <ul>
        <li><strong>Last Day of Current Month:</strong> <code>=EOMONTH(TODAY(), 0)</code></li>
        <li><strong>First Day of Next Month:</strong> <code>=EOMONTH(TODAY(), 0) + 1</code></li>
      </ul>
    </div>`,
        faq: [
            { question: 'What is EOMONTH used for?', answer: 'EOMONTH returns the last day of the month, given a starting date and month offset. It is commonly used for financial reporting, invoice due dates, and subscription billing cycles.' },
            { question: 'What does months = 0 do?', answer: 'EOMONTH(A1, 0) returns the last day of the month for the date in A1. For example, EOMONTH("2026-05-14", 0) returns May 31, 2026.' },
            { question: 'Does EOMONTH work in Google Sheets?', answer: 'Yes, EOMONTH works identically in Google Sheets with the same syntax. It is fully compatible between both platforms.' }
        ],
        commonErrors: [
            { title: '#NUM! or #VALUE! error', causes: ['Start date is not a valid date.', 'Month offset is non-numeric or the resulting date is invalid (e.g., year beyond Excel limits).'], fixes: ['Ensure the start date cell contains a valid date.', 'Validate the months argument is a number within a reasonable range.'] }
        ]
    },

    // 49. COUNTA - Count Non-Empty Cells
    {
        slug: 'counta',
        title: "COUNTA in Excel: Count Non-Empty Cells in a Range",
        metaDescription: "Count all cells containing text, numbers, dates, or formulas in Excel with COUNTA. Exclude truly empty cells with our free interactive generator.",
        excelFunction: 'COUNTA',
        category: 'Math',
        description: 'Counts number of cells that are not empty in a range.',
        inputs: [{ id: 'range', label: 'Range', type: 'range', placeholder: 'e.g., A1:A100' }],
        generate: (p) => `=COUNTA(${p.range || 'range'})`,
        howToSteps: [
        {
                name: "Select Output Cell",
                text: "Click where you want the total filled count."
        },
        {
                name: "Enter COUNTA Range",
                text: "Type =COUNTA(A2:A100) highlighting the dataset."
        },
        {
                name: "Press Enter",
                text: "Counts all non-blank cells in the selected range."
        }
],
        richContent: `<div class="space-y-6">
      <h2>How to Count Non-Empty Cells with COUNTA in Excel</h2>
      <p>The <strong>COUNTA</strong> function counts the number of cells in a range that are not empty (including text, numbers, dates, booleans, and errors).</p>
      <h3>Syntax</h3>
      <p><code>=COUNTA(value1, [value2], ...)</code></p>
      <h3>COUNT vs COUNTA</h3>
      <ul>
        <li><strong>COUNT:</strong> Counts cells with <em>numbers only</em>.</li>
        <li><strong>COUNTA:</strong> Counts cells containing <em>any type of data</em>.</li>
      </ul>
    </div>`,
        faq: [
            { question: 'What is the difference between COUNTA and COUNT?', answer: 'COUNTA counts all non-empty cells including text, numbers, errors, and logical values. COUNT only counts cells containing numeric values.' },
            { question: 'Does COUNTA count cells with formulas?', answer: 'Yes, COUNTA counts a cell if its formula returns any value — even an empty string "". COUNTA only excludes truly blank cells.' },
            { question: 'Does COUNTA work in Google Sheets?', answer: 'Yes, COUNTA works identically in Google Sheets with the same syntax.' }
        ],
        commonErrors: [
            { title: 'COUNTA counts more cells than expected', causes: ['Cells that appear empty may contain formula-generated empty strings ("").', 'Hidden spaces or non-printable characters make cells appear non-empty.'], fixes: ['Use COUNTIF(range, "?*") to count only cells with visible text.', 'Use SUMPRODUCT(--(TRIM(range)<>"")) to exclude blank-looking cells with spaces.'] }
        ]
    },

    // 50. COUNTBLANK - Count Empty Cells
    {
        slug: 'countblank',
        title: "COUNTBLANK in Excel: Count Missing & Empty Cells Fast",
        metaDescription: "Count empty or missing cells in a dataset in Excel using the COUNTBLANK formula. Audit spreadsheet completeness instantly with our free builder.",
        excelFunction: 'COUNTBLANK',
        category: 'Math',
        description: 'Counts the number of empty cells in a specified range.',
        inputs: [{ id: 'range', label: 'Range', type: 'range', placeholder: 'e.g., A1:A100' }],
        generate: (p) => `=COUNTBLANK(${p.range || 'range'})`,
        howToSteps: [
        {
                name: "Select Target Cell",
                text: "Click where you want the missing cell count."
        },
        {
                name: "Enter COUNTBLANK Range",
                text: "Type =COUNTBLANK(A2:A100) covering your dataset."
        },
        {
                name: "Press Enter",
                text: "Returns total number of empty and blank cells."
        }
],
        richContent: `<div class="space-y-6">
      <h2>How to Count Blank Cells in Excel with COUNTBLANK</h2>
      <p>The <strong>COUNTBLANK</strong> function counts the number of empty cells in a specified range of cells.</p>
      <h3>Syntax</h3>
      <p><code>=COUNTBLANK(range)</code></p>
      <h3>Data Auditing Example</h3>
      <p>To check if any of 50 student submissions are missing in B2:B51: <code>=IF(COUNTBLANK(B2:B51)>0, "Missing Data!", "All Complete")</code></p>
    </div>`,
        faq: [
            { question: 'What is the difference between COUNTBLANK and COUNTIF(range, "")?', answer: 'COUNTBLANK counts both truly empty cells and cells with empty strings (""). COUNTIF(range, "") only counts cells that visually appear blank.' },
            { question: 'Does COUNTBLANK count cells with spaces?', answer: 'No, a cell with a space (" ") is not blank. COUNTBLANK will not count it. Use TRIM to clean cells before counting if stray spaces are an issue.' },
            { question: 'COUNTBLANK vs COUNTA — what is the relationship?', answer: 'For a given range, COUNTBLANK + COUNTA does not always equal the total cells because COUNTBLANK counts empty-string formulas while COUNTA counts formula outputs. Use ROWS(range)*COLUMNS(range) for the total cell count.' }
        ],
        commonErrors: [
            { title: 'COUNTBLANK counts wrong number of blanks', causes: ['Cells with formulas returning "" are counted as blank.', 'Cells with spaces or non-printing characters appear blank but are not counted.', 'Merged cells may cause unexpected counting behavior.'], fixes: ['Use COUNTIF(range, "=") to count truly empty cells excluding empty-string formulas.', 'Use TRIM to clean data before counting blanks.'] }
        ]
    },
];
