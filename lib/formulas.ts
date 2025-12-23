export type FormulaInputType = 'text' | 'number' | 'range' | 'boolean' | 'select';

export interface FormulaInput {
    id: string;          // 参数变量名
    label: string;       // 前端显示的标签 (English)
    placeholder?: string; // 占位符提示
    type: FormulaInputType;
    options?: { label: string; value: string }[]; // 仅当 type 为 select 时使用
    tooltip?: string;    // 鼠标悬停解释
}

export interface FormulaConfig {
    slug: string;        // URL 路径，如 'vlookup-generator'
    title: string;       // 页面 H1 标题
    metaDescription: string; // SEO Description
    excelFunction: string;   // 核心函数名，如 'VLOOKUP'
    category: string;
    description: string; // 简短介绍
    inputs: FormulaInput[];
    // 核心生成逻辑函数
    generate: (params: Record<string, string>) => string;
    richContent?: string; // HTML content for SEO
}

export const FORMULAS: FormulaConfig[] = [
    // 1. VLOOKUP
    {
        slug: 'vlookup',
        title: 'Free VLOOKUP Formula Generator',
        metaDescription: 'Instantly generate VLOOKUP formulas for Excel and Google Sheets without memorizing syntax.',
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
     <h2 class="text-2xl font-bold mb-4">Mastering VLOOKUP: The Ultimate Guide</h2>
     <p class="mb-4">The <strong>VLOOKUP</strong> (Vertical Lookup) function is the backbone of data merging in Excel and Google Sheets. Whether you are reconciling invoices or searching for employee IDs, understanding how to structure this formula is essential for any spreadsheet user.</p>
     
     <h3 class="text-xl font-semibold mb-2">Common Pitfalls to Avoid</h3>
     <ul class="list-disc pl-5 mb-4">
       <li><strong>The Left-to-Right Rule:</strong> Remember that VLOOKUP can only look for a value in the leftmost column of your range. If your lookup value is to the right of your result, VLOOKUP won't work.</li>
       <li><strong>Approximate vs. Exact Match:</strong> Always use <code>FALSE</code> or <code>0</code> as the last argument if you need an exact match (like an ID or Name). Otherwise, you might get the nearest smaller value instead.</li>
       <li><strong>Static Column Index:</strong> Hardcoding a column number (e.g., 3) makes your formula fragile. If you insert a new column, the index won't update, leading to broken data.</li>
     </ul>
     
     <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-100 mt-6">
       <p class="text-sm text-yellow-800"><strong>Pro Tip:</strong> If your lookup value is not in the first column, consider using <strong>INDEX & MATCH</strong> or the more modern <a href="/formulas/xlookup" class="text-blue-600 underline font-semibold">XLOOKUP Generator</a> which removes these limitations entirely.</p>
     </div>
   </div>
   `
    },

    // 2. IF
    {
        slug: 'if',
        title: 'Free IF Formula Generator',
        metaDescription: 'Create complex IF statements for Excel and Google Sheets easily.',
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
  
  <h3>Why Use SheetMaster's IF Generator?</h3>
  <p>Building complex logical statements manually can be prone to syntax errors, especially with parentheses. Our generator handles the formatting for you, ensuring your formula works perfectly the first time you paste it into your sheet. Save time and reduce frustration by letting our AI-ready tools handle the heavy lifting of data analysis.</p>
</div>`
    },

    // 3. SUMIF
    {
        slug: 'sumif',
        title: 'Free SUMIF Formula Generator',
        metaDescription: 'Generate SUMIF formulas to sum cells based on specific criteria.',
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
        }
    },

    // 4. COUNTIF
    {
        slug: 'countif',
        title: 'Free COUNTIF Formula Generator',
        metaDescription: 'Count cells that meet a specific criterion with this free tool.',
        excelFunction: 'COUNTIF',
        category: 'Math',
        description: 'Counts the number of cells within a range that meet the given condition.',
        inputs: [
            { id: 'range', label: 'Range to Count', type: 'range', placeholder: 'e.g., A1:A10' },
            { id: 'criteria', label: 'Criteria', type: 'text', placeholder: 'e.g., ">100" or "Completed"' },
        ],
        generate: (p) => `=COUNTIF(${p.range || 'range'}, ${p.criteria || 'criteria'})`
    },

    // 5. CONCATENATE
    {
        slug: 'concatenate',
        title: 'Free CONCATENATE Formula Generator',
        metaDescription: 'Join multiple text strings into one text string.',
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
        }
    },

    // 6. INDEX/MATCH
    {
        slug: 'index-match',
        title: 'Free INDEX & MATCH Generator',
        metaDescription: 'Generate the powerful INDEX MATCH formula combination for advanced lookups.',
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
        }
    },

    // 7. XLOOKUP
    {
        slug: 'xlookup',
        title: 'Free XLOOKUP Formula Generator',
        metaDescription: 'Generate XLOOKUP formulas, the modern replacement for VLOOKUP.',
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
     <p class="mb-4">Introduced to solve the limitations of older functions, <strong>XLOOKUP</strong> is more powerful, flexible, and easier to use. It works in any direction (left, right, up, down) and defaults to an exact match.</p>
     
     <h3 class="text-xl font-semibold mb-2">Key Advantages of XLOOKUP</h3>
     <ul class="list-disc pl-5 mb-4">
       <li><strong>No More Column Counting:</strong> You select the lookup array and the return array separately.</li>
       <li><strong>Horizontal Lookups:</strong> XLOOKUP replaces both VLOOKUP and HLOOKUP.</li>
       <li><strong>Built-in Error Handling:</strong> You can define what to display (e.g., "Not Found") directly within the formula if a match isn't found.</li>
     </ul>
     
     <h3 class="text-xl font-semibold mb-2">Formula Syntax Example</h3>
     <p class="mb-4"><code class="bg-gray-100 p-1 rounded font-mono text-sm">=XLOOKUP(search_value, lookup_array, return_array, [if_not_found])</code></p>
   </div>
   `
    },

    // 8. TRIM
    {
        slug: 'trim',
        title: 'Free TRIM Formula Generator',
        metaDescription: 'Remove extra spaces from text with the TRIM function.',
        excelFunction: 'TRIM',
        category: 'Text',
        description: 'Removes all spaces from text except for single spaces between words.',
        inputs: [
            { id: 'text', label: 'Text', type: 'text', placeholder: 'e.g., A1' },
        ],
        generate: (p) => `=TRIM(${p.text || 'text'})`
    },

    // 9. UPPER
    {
        slug: 'upper',
        title: 'Free UPPER Formula Generator',
        metaDescription: 'Convert text to uppercase.',
        excelFunction: 'UPPER',
        category: 'Text',
        description: 'Converts text to uppercase.',
        inputs: [
            { id: 'text', label: 'Text', type: 'text', placeholder: 'e.g., A1' },
        ],
        generate: (p) => `=UPPER(${p.text || 'text'})`
    },

    // 10. LOWER
    {
        slug: 'lower',
        title: 'Free LOWER Formula Generator',
        metaDescription: 'Convert text to lowercase.',
        excelFunction: 'LOWER',
        category: 'Text',
        description: 'Converts all uppercase letters in a text string to lowercase.',
        inputs: [
            { id: 'text', label: 'Text', type: 'text', placeholder: 'e.g., A1' },
        ],
        generate: (p) => `=LOWER(${p.text || 'text'})`
    },

    // 11. PROPER
    {
        slug: 'proper',
        title: 'Free PROPER Formula Generator',
        metaDescription: 'Capitalize the first letter of each word.',
        excelFunction: 'PROPER',
        category: 'Text',
        description: 'Capitalizes the first letter in each word of a text value.',
        inputs: [
            { id: 'text', label: 'Text', type: 'text', placeholder: 'e.g., A1' },
        ],
        generate: (p) => `=PROPER(${p.text || 'text'})`
    },

    // 12. LEFT
    {
        slug: 'left',
        title: 'Free LEFT Formula Generator',
        metaDescription: 'Extract characters from the left side of a text string.',
        excelFunction: 'LEFT',
        category: 'Text',
        description: 'Returns the first character or characters in a text string, based on the number of characters you specify.',
        inputs: [
            { id: 'text', label: 'Text', type: 'text', placeholder: 'e.g., A1' },
            { id: 'num_chars', label: 'Number of Characters', type: 'number', placeholder: 'e.g., 5' },
        ],
        generate: (p) => `=LEFT(${p.text || 'text'}, ${p.num_chars || '1'})`
    },

    // 13. RIGHT
    {
        slug: 'right',
        title: 'Free RIGHT Formula Generator',
        metaDescription: 'Extract characters from the right side of a text string.',
        excelFunction: 'RIGHT',
        category: 'Text',
        description: 'Returns the last character or characters in a text string, based on the number of characters you specify.',
        inputs: [
            { id: 'text', label: 'Text', type: 'text', placeholder: 'e.g., A1' },
            { id: 'num_chars', label: 'Number of Characters', type: 'number', placeholder: 'e.g., 5' },
        ],
        generate: (p) => `=RIGHT(${p.text || 'text'}, ${p.num_chars || '1'})`
    },

    // 14. DATEDIF
    {
        slug: 'datedif',
        title: 'Free DATEDIF Formula Generator',
        metaDescription: 'Calculate the difference between two dates.',
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
        generate: (p) => `=DATEDIF(${p.start_date || 'start_date'}, ${p.end_date || 'end_date'}, ${p.unit || '"Y"'})`
    },

    // 15. NOW
    {
        slug: 'now',
        title: 'Free NOW Formula Generator',
        metaDescription: 'Get the current date and time.',
        excelFunction: 'NOW',
        category: 'Date',
        description: 'Returns the serial number of the current date and time.',
        inputs: [],
        generate: () => `=NOW()`
    },

    // 16. TODAY
    {
        slug: 'today',
        title: 'Free TODAY Formula Generator',
        metaDescription: 'Get the current date.',
        excelFunction: 'TODAY',
        category: 'Date',
        description: 'Returns the serial number of the current date.',
        inputs: [],
        generate: () => `=TODAY()`
    },

    // 17. NETWORKDAYS
    {
        slug: 'networkdays',
        title: 'Free NETWORKDAYS Formula Generator',
        metaDescription: 'Calculate the number of working days between two dates.',
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
        }
    },

    // 18. PMT
    {
        slug: 'pmt',
        title: 'Free PMT Formula Generator',
        metaDescription: 'Calculate loan payments with the PMT function.',
        excelFunction: 'PMT',
        category: 'Math', // Changed from Financial to Math as per type definition, or need to add Financial type
        description: 'Calculates the payment for a loan based on constant payments and a constant interest rate.',
        inputs: [
            { id: 'rate', label: 'Interest Rate', type: 'text', placeholder: 'e.g., 5%/12' },
            { id: 'nper', label: 'Number of Payments', type: 'text', placeholder: 'e.g., 60' },
            { id: 'pv', label: 'Present Value (Loan Amount)', type: 'text', placeholder: 'e.g., 10000' },
        ],
        generate: (p) => `=PMT(${p.rate || 'rate'}, ${p.nper || 'nper'}, ${p.pv || 'pv'})`
    },

    // 19. AND
    {
        slug: 'and',
        title: 'Free AND Formula Generator',
        metaDescription: 'Check if all arguments are TRUE.',
        excelFunction: 'AND',
        category: 'Logic',
        description: 'Returns TRUE if all its arguments are TRUE; returns FALSE if one or more argument is FALSE.',
        inputs: [
            { id: 'logical1', label: 'Condition 1', type: 'text', placeholder: 'e.g., A1>0' },
            { id: 'logical2', label: 'Condition 2', type: 'text', placeholder: 'e.g., B1<10' },
        ],
        generate: (p) => `=AND(${p.logical1 || 'logical1'}, ${p.logical2 || 'logical2'})`
    },

    // 20. OR
    {
        slug: 'or',
        title: 'Free OR Formula Generator',
        metaDescription: 'Check if any argument is TRUE.',
        excelFunction: 'OR',
        category: 'Logic',
        description: 'Returns TRUE if any argument is TRUE; returns FALSE if all arguments are FALSE.',
        inputs: [
            { id: 'logical1', label: 'Condition 1', type: 'text', placeholder: 'e.g., A1>0' },
            { id: 'logical2', label: 'Condition 2', type: 'text', placeholder: 'e.g., B1<10' },
        ],
        generate: (p) => `=OR(${p.logical1 || 'logical1'}, ${p.logical2 || 'logical2'})`
    },

    // 21. Extract Email
    {
        slug: 'extract-email',
        title: 'Extract Email Address from Text',
        metaDescription: 'Extract email addresses from text cells using REGEXEXTRACT.',
        excelFunction: 'REGEXEXTRACT',
        category: 'Text',
        description: 'Extracts an email address from a text string.',
        inputs: [
            { id: 'target_cell', label: 'Target Cell', type: 'text', placeholder: 'e.g., A2' },
        ],
        generate: (p) => `=REGEXEXTRACT(${p.target_cell || 'A2'}, "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}")`,
        richContent: `
       <h2 class="text-2xl font-bold mb-4">How to Extract Email from Text in Google Sheets</h2>
       <p class="mb-4">Cleaning messy data is one of the most time-consuming tasks in spreadsheet management. If you have a column of raw text, such as CRM exports or scraped web data, our <strong>AI-powered Email Extractor</strong> generates the exact REGEXEXTRACT formula you need to automate this process.</p>
       
       <h3 class="text-xl font-semibold mb-2">Understanding the Formula Logic</h3>
       <p class="mb-4">The core of this tool relies on <strong>Regular Expressions (Regex)</strong>. The standard formula follows this pattern: <br/><code class="bg-gray-100 p-1 rounded font-mono text-sm">=REGEXEXTRACT(A2, "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}")</code></p>
       
       <h3 class="text-xl font-semibold mb-2">Alternative: Excel vs Google Sheets</h3>
       <p class="mb-4">While Google Sheets natively supports REGEX, Excel traditionally requires complex combinations of LEFT, MID, and FIND. This generator ensures you get the most compatible string for your platform.</p>
       
       <div class="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-6">
         <p class="text-sm text-blue-800 italic"><strong>Pro Tip:</strong> To extract multiple emails from a single cell, you might need a custom Apps Script or a combination of TEXTJOIN and REGEXREPLACE.</p>
       </div>
     `
    },

    // 22. Extract Domain
    {
        slug: 'extract-domain',
        title: 'Extract Domain from URL',
        metaDescription: 'Extract the domain name from a URL.',
        excelFunction: 'REGEXEXTRACT',
        category: 'Text',
        description: 'Extracts the domain part from a URL.',
        inputs: [
            { id: 'target_cell', label: 'URL Cell', type: 'text', placeholder: 'e.g., A2' },
        ],
        generate: (p) => `=REGEXEXTRACT(${p.target_cell || 'A2'}, "^(?:https?:\\/\\/)?(?:www\\.)?([^\\/]+)")`,
        richContent: `
  <h3>How to Extract Domain from URL</h3>
  <p>For SEO specialists and marketers, extracting the root domain (e.g., "google.com") from a full URL (e.g., "[https://www.google.com/search?q=](https://www.google.com/search?q=)...") is a daily task.</p>
  
  <h4>Why not use LEFT/RIGHT?</h4>
  <p>Using standard text functions is difficult because URLs vary in length. Some start with HTTP, some with HTTPS, and some have "www".</p>
  <p>This tool uses a <strong>Regular Expression</strong> to ignore the protocol (http://) and the "www" prefix, capturing only the core domain name immediately following them.</p>
  
  <h4>Pro Tip</h4>
  <p>If you need to extract the full path or specific parameters, consider using the <code>SPLIT</code> function with "/" as the delimiter.</p>
`
    },

    // 23. Get First Word
    {
        slug: 'get-first-word',
        title: 'Get First Word from Text',
        metaDescription: 'Extract the first word from a text string.',
        excelFunction: 'LEFT & FIND',
        category: 'Text',
        description: 'Returns the first word in a text string.',
        inputs: [
            { id: 'target_cell', label: 'Target Cell', type: 'text', placeholder: 'e.g., A2' },
        ],
        generate: (p) => `=LEFT(${p.target_cell || 'A2'}, FIND(" ", ${p.target_cell || 'A2'}) - 1)`,
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
    },

    // 24. Remove First 3 Characters
    {
        slug: 'remove-first-3-chars',
        title: 'Remove First N Characters',
        metaDescription: 'Remove the first N characters from a text string.',
        excelFunction: 'RIGHT & LEN',
        category: 'Text',
        description: 'Removes the specified number of characters from the beginning of a text string.',
        inputs: [
            { id: 'target_cell', label: 'Target Cell', type: 'text', placeholder: 'e.g., A2' },
            { id: 'num_chars', label: 'Number of chars to remove', type: 'number', placeholder: 'e.g., 3' },
        ],
        generate: (p) => `=RIGHT(${p.target_cell || 'A2'}, LEN(${p.target_cell || 'A2'}) - ${p.num_chars || '3'})`
    },
];
