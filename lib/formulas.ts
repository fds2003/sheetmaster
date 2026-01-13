export type FormulaInputType = 'text' | 'number' | 'range' | 'boolean' | 'select';

export interface FormulaInput {
    id: string;
    label: string;
    placeholder?: string;
    type: FormulaInputType;
    options?: { label: string; value: string }[];
    tooltip?: string;
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
}

function createSimpleFormula(
    slug: string,
    excelFunction: string,
    category: string,
    description: string,
    inputs: FormulaInput[],
    generateFn: (params: Record<string, string>) => string,
    metaDescription?: string
): FormulaConfig {
    return {
        slug,
        title: `Free ${excelFunction} Formula Generator`,
        metaDescription: metaDescription || `Generate ${excelFunction} formulas for Excel and Google Sheets.`,
        excelFunction,
        category,
        description,
        inputs,
        generate: generateFn,
    };
}

function createSingleParamFormula(
    slug: string,
    excelFunction: string,
    category: string,
    description: string,
    paramName: string,
    paramLabel: string,
    paramType: FormulaInputType,
    metaDescription?: string
): FormulaConfig {
    const input = { id: paramName, label: paramLabel, type: paramType, placeholder: 'e.g., A1' };
    return createSimpleFormula(
        slug,
        excelFunction,
        category,
        description,
        [input],
        (p: Record<string, string>) => `=${excelFunction}(${p[paramName] || paramName})`,
        metaDescription
    );
}

function createTwoParamFormula(
    slug: string,
    excelFunction: string,
    category: string,
    description: string,
    params: Array<{ id: string; label: string; type: FormulaInputType; placeholder: string }>,
    metaDescription?: string
): FormulaConfig {
    return createSimpleFormula(
        slug,
        excelFunction,
        category,
        description,
        params,
        (p: Record<string, string>) => `=${excelFunction}(${params.map(param => p[param.id] || param.id).join(', ')})`,
        metaDescription
    );
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
    createSingleParamFormula('trim', 'TRIM', 'Text', 'Removes all spaces from text except for single spaces between words.', 'text', 'Text', 'text', 'Remove extra spaces from text with the TRIM function.'),

    // 9. UPPER
    createSingleParamFormula('upper', 'UPPER', 'Text', 'Converts text to uppercase.', 'text', 'Text', 'text', 'Convert text to uppercase.'),

    // 10. LOWER
    createSingleParamFormula('lower', 'LOWER', 'Text', 'Converts all uppercase letters in a text string to lowercase.', 'text', 'Text', 'text', 'Convert text to lowercase.'),

    // 11. PROPER
    createSingleParamFormula('proper', 'PROPER', 'Text', 'Capitalizes the first letter in each word of a text value.', 'text', 'Text', 'text', 'Capitalize the first letter of each word.'),

    // 12. LEFT
    createSimpleFormula(
        'left',
        'LEFT',
        'Text',
        'Returns the first character or characters in a text string, based on the number of characters you specify.',
        [
            { id: 'text', label: 'Text', type: 'text', placeholder: 'e.g., A1' },
            { id: 'num_chars', label: 'Number of Characters', type: 'number', placeholder: 'e.g., 5' },
        ],
        (p) => `=LEFT(${p.text || 'text'}, ${p.num_chars || '1'})`
    ),

    // 13. RIGHT
    createSimpleFormula(
        'right',
        'RIGHT',
        'Text',
        'Returns the last character or characters in a text string, based on the number of characters you specify.',
        [
            { id: 'text', label: 'Text', type: 'text', placeholder: 'e.g., A1' },
            { id: 'num_chars', label: 'Number of Characters', type: 'number', placeholder: 'e.g., 5' },
        ],
        (p) => `=RIGHT(${p.text || 'text'}, ${p.num_chars || '1'})`
    ),

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
    createSimpleFormula(
        'now',
        'NOW',
        'Date',
        'Returns the serial number of the current date and time.',
        [],
        () => `=NOW()`
    ),

    // 16. TODAY
    createSimpleFormula(
        'today',
        'TODAY',
        'Date',
        'Returns the serial number of the current date.',
        [],
        () => `=TODAY()`
    ),

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
    createSimpleFormula(
        'and',
        'AND',
        'Logic',
        'Returns TRUE if all its arguments are TRUE; returns FALSE if one or more argument is FALSE.',
        [
            { id: 'logical1', label: 'Condition 1', type: 'text', placeholder: 'e.g., A1>0' },
            { id: 'logical2', label: 'Condition 2', type: 'text', placeholder: 'e.g., B1<10' },
        ],
        (p) => `=AND(${p.logical1 || 'logical1'}, ${p.logical2 || 'logical2'})`
    ),

    // 20. OR
    createSimpleFormula(
        'or',
        'OR',
        'Logic',
        'Returns TRUE if any argument is TRUE; returns FALSE if all arguments are FALSE.',
        [
            { id: 'logical1', label: 'Condition 1', type: 'text', placeholder: 'e.g., A1>0' },
            { id: 'logical2', label: 'Condition 2', type: 'text', placeholder: 'e.g., B1<10' },
        ],
        (p) => `=OR(${p.logical1 || 'logical1'}, ${p.logical2 || 'logical2'})`
    ),

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

    // 25. SUMIFS - Multiple Criteria Sum
    {
        slug: 'sumifs',
        title: 'Free SUMIFS Formula Generator',
        metaDescription: 'Generate SUMIFS formulas to sum cells based on multiple criteria in Excel and Google Sheets.',
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
        richContent: `
<div class="prose max-w-none mt-8">
  <h2>Master SUMIFS: Sum with Multiple Conditions</h2>
  <p>The <strong>SUMIFS function</strong> is an enhanced version of SUMIF that allows you to apply multiple criteria. It's essential for financial analysis, sales reports, and data aggregation.</p>
  
  <h3>SUMIFS vs SUMIF</h3>
  <table class="min-w-full border-collapse border border-gray-300 my-4">
    <tr class="bg-gray-100"><th class="border border-gray-300 p-2">Feature</th><th class="border border-gray-300 p-2">SUMIF</th><th class="border border-gray-300 p-2">SUMIFS</th></tr>
    <tr><td class="border border-gray-300 p-2">Criteria</td><td class="border border-gray-300 p-2">Single</td><td class="border border-gray-300 p-2">Multiple</td></tr>
    <tr><td class="border border-gray-300 p-2">Syntax Order</td><td class="border border-gray-300 p-2">Range, Criteria, Sum Range</td><td class="border border-gray-300 p-2">Sum Range first, then Criteria pairs</td></tr>
  </table>

  <h3>Common Use Cases</h3>
  <ul>
    <li>Sum sales by region AND product category</li>
    <li>Calculate total expenses by date range AND department</li>
    <li>Aggregate data with multiple filters</li>
  </ul>
</div>`
    },

    // 26. COUNTIFS - Multiple Criteria Count
    {
        slug: 'countifs',
        title: 'Free COUNTIFS Formula Generator',
        metaDescription: 'Generate COUNTIFS formulas to count cells based on multiple criteria.',
        excelFunction: 'COUNTIFS',
        category: 'Math',
        description: 'Counts cells that meet multiple criteria. Essential for data analysis with complex conditions.',
        inputs: [
            { id: 'criteria_range1', label: 'Criteria Range 1', type: 'range', placeholder: 'e.g., A1:A100' },
            { id: 'criteria1', label: 'Criteria 1', type: 'text', placeholder: 'e.g., "Completed"' },
            { id: 'criteria_range2', label: 'Criteria Range 2', type: 'range', placeholder: 'e.g., B1:B100' },
            { id: 'criteria2', label: 'Criteria 2', type: 'text', placeholder: 'e.g., ">500"' },
        ],
        generate: (p) => `=COUNTIFS(${p.criteria_range1 || 'criteria_range1'}, ${p.criteria1 || 'criteria1'}, ${p.criteria_range2 || 'criteria_range2'}, ${p.criteria2 || 'criteria2'})`
    },

    // 27. AVERAGEIF - Conditional Average
    {
        slug: 'averageif',
        title: 'Free AVERAGEIF Formula Generator',
        metaDescription: 'Calculate the average of cells that meet a specific criterion.',
        excelFunction: 'AVERAGEIF',
        category: 'Math',
        description: 'Returns the average of all cells in a range that meet a given criteria.',
        inputs: [
            { id: 'range', label: 'Range to Check', type: 'range', placeholder: 'e.g., A1:A100' },
            { id: 'criteria', label: 'Criteria', type: 'text', placeholder: 'e.g., ">0" or "Sales"' },
            { id: 'average_range', label: 'Average Range (Optional)', type: 'range', placeholder: 'e.g., B1:B100' },
        ],
        generate: (p) => {
            const args = [p.range || 'range', p.criteria || 'criteria'];
            if (p.average_range) args.push(p.average_range);
            return `=AVERAGEIF(${args.join(', ')})`;
        }
    },

    // 28. IFERROR - Error Handling
    {
        slug: 'iferror',
        title: 'Free IFERROR Formula Generator',
        metaDescription: 'Handle errors gracefully in Excel and Google Sheets with IFERROR.',
        excelFunction: 'IFERROR',
        category: 'Logic',
        description: 'Returns a value you specify if a formula evaluates to an error; otherwise returns the result of the formula.',
        inputs: [
            { id: 'value', label: 'Formula to Check', type: 'text', placeholder: 'e.g., A1/B1' },
            { id: 'value_if_error', label: 'Value if Error', type: 'text', placeholder: 'e.g., 0 or "N/A"' },
        ],
        generate: (p) => `=IFERROR(${p.value || 'value'}, ${p.value_if_error || '""'})`,
        richContent: `
<div class="prose max-w-none mt-8">
  <h2>IFERROR: The Essential Error Handler</h2>
  <p><strong>IFERROR</strong> is one of the most important functions for creating robust spreadsheets. It catches errors like #DIV/0!, #N/A, #VALUE!, and #REF! and replaces them with a clean value.</p>
  
  <h3>Common Use Cases</h3>
  <ul>
    <li><strong>VLOOKUP with IFERROR:</strong> <code>=IFERROR(VLOOKUP(A1, B:C, 2, FALSE), "Not Found")</code></li>
    <li><strong>Division protection:</strong> <code>=IFERROR(A1/B1, 0)</code></li>
    <li><strong>Clean reports:</strong> Replace ugly error messages with blank cells or custom text</li>
  </ul>
  
  <div class="bg-green-50 p-4 rounded-lg border border-green-100 mt-4">
    <p class="text-sm text-green-800"><strong>Pro Tip:</strong> Wrap any lookup or division formula in IFERROR to create professional, error-free reports.</p>
  </div>
</div>`
    },

    // 29. IFS - Multiple Conditions
    {
        slug: 'ifs',
        title: 'Free IFS Formula Generator',
        metaDescription: 'Generate IFS formulas for multiple conditions without nested IFs.',
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
        generate: (p) => `=IFS(${p.condition1 || 'condition1'}, ${p.value1 || 'value1'}, ${p.condition2 || 'condition2'}, ${p.value2 || 'value2'}, ${p.condition3 || 'condition3'}, ${p.value3 || 'value3'})`
    },

    // 30. SUBSTITUTE - Text Replacement
    {
        slug: 'substitute',
        title: 'Free SUBSTITUTE Formula Generator',
        metaDescription: 'Replace text within a string using the SUBSTITUTE function.',
        excelFunction: 'SUBSTITUTE',
        category: 'Text',
        description: 'Substitutes new text for old text in a text string. Great for data cleaning.',
        inputs: [
            { id: 'text', label: 'Text', type: 'text', placeholder: 'e.g., A1' },
            { id: 'old_text', label: 'Old Text', type: 'text', placeholder: 'e.g., "-"' },
            { id: 'new_text', label: 'New Text', type: 'text', placeholder: 'e.g., "/"' },
        ],
        generate: (p) => `=SUBSTITUTE(${p.text || 'text'}, ${p.old_text || '"old"'}, ${p.new_text || '"new"'})`
    },

    // 31. MID - Extract Middle Text
    createSimpleFormula(
        'mid',
        'MID',
        'Text',
        'Returns a specific number of characters from a text string, starting at the position you specify.',
        [
            { id: 'text', label: 'Text', type: 'text', placeholder: 'e.g., A1' },
            { id: 'start_num', label: 'Start Position', type: 'number', placeholder: 'e.g., 3' },
            { id: 'num_chars', label: 'Number of Characters', type: 'number', placeholder: 'e.g., 5' },
        ],
        (p) => `=MID(${p.text || 'text'}, ${p.start_num || '1'}, ${p.num_chars || '1'})`
    ),

    // 32. LEN - Text Length
    createSingleParamFormula('len', 'LEN', 'Text', 'Returns the number of characters in a text string.', 'text', 'Text', 'text'),

    // 33. FIND - Find Text Position
    createTwoParamFormula(
        'find',
        'FIND',
        'Text',
        'Returns the starting position of one text string within another (case-sensitive).',
        [
            { id: 'find_text', label: 'Text to Find', type: 'text', placeholder: 'e.g., "@"' },
            { id: 'within_text', label: 'Within Text', type: 'text', placeholder: 'e.g., A1' },
        ]
    ),

    // 34. SEARCH - Search Text Position
    createTwoParamFormula(
        'search',
        'SEARCH',
        'Text',
        'Returns the position of a text string within another (case-insensitive). Supports wildcards.',
        [
            { id: 'find_text', label: 'Text to Find', type: 'text', placeholder: 'e.g., "error"' },
            { id: 'within_text', label: 'Within Text', type: 'text', placeholder: 'e.g., A1' },
        ]
    ),

    // 35. TEXT - Format Numbers as Text
    {
        slug: 'text',
        title: 'Free TEXT Formula Generator',
        metaDescription: 'Format numbers as text with custom number formats.',
        excelFunction: 'TEXT',
        category: 'Text',
        description: 'Converts a value to text in a specific number format.',
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
        generate: (p) => `=TEXT(${p.value || 'value'}, ${p.format || '"#,##0"'})`
    },

    // 36. ROUND - Round Numbers
    {
        slug: 'round',
        title: 'Free ROUND Formula Generator',
        metaDescription: 'Round numbers to a specified number of decimal places.',
        excelFunction: 'ROUND',
        category: 'Math',
        description: 'Rounds a number to a specified number of digits.',
        inputs: [
            { id: 'number', label: 'Number', type: 'text', placeholder: 'e.g., A1' },
            { id: 'num_digits', label: 'Decimal Places', type: 'number', placeholder: 'e.g., 2' },
        ],
        generate: (p) => `=ROUND(${p.number || 'number'}, ${p.num_digits || '0'})`
    },

    // 37. ROUNDUP - Round Up
    {
        slug: 'roundup',
        title: 'Free ROUNDUP Formula Generator',
        metaDescription: 'Round numbers up, away from zero.',
        excelFunction: 'ROUNDUP',
        category: 'Math',
        description: 'Rounds a number up, away from zero.',
        inputs: [
            { id: 'number', label: 'Number', type: 'text', placeholder: 'e.g., A1' },
            { id: 'num_digits', label: 'Decimal Places', type: 'number', placeholder: 'e.g., 0' },
        ],
        generate: (p) => `=ROUNDUP(${p.number || 'number'}, ${p.num_digits || '0'})`
    },

    // 38. ROUNDDOWN - Round Down
    {
        slug: 'rounddown',
        title: 'Free ROUNDDOWN Formula Generator',
        metaDescription: 'Round numbers down, toward zero.',
        excelFunction: 'ROUNDDOWN',
        category: 'Math',
        description: 'Rounds a number down, toward zero.',
        inputs: [
            { id: 'number', label: 'Number', type: 'text', placeholder: 'e.g., A1' },
            { id: 'num_digits', label: 'Decimal Places', type: 'number', placeholder: 'e.g., 0' },
        ],
        generate: (p) => `=ROUNDDOWN(${p.number || 'number'}, ${p.num_digits || '0'})`
    },

    // 39. ABS - Absolute Value
    createSingleParamFormula('abs', 'ABS', 'Math', 'Returns the absolute value of a number (removes the negative sign).', 'number', 'Number', 'text', 'Get the absolute value of a number.'),

    // 40. MAX - Maximum Value
    createSingleParamFormula('max', 'MAX', 'Math', 'Returns the largest value in a set of values.', 'range', 'Range', 'range', 'Find the largest value in a range of cells.'),

    // 41. MIN - Minimum Value
    createSingleParamFormula('min', 'MIN', 'Math', 'Returns the smallest value in a set of values.', 'range', 'Range', 'range', 'Find the smallest value in a range of cells.'),

    // 42. AVERAGE - Average Value
    createSingleParamFormula('average', 'AVERAGE', 'Math', 'Returns the average (arithmetic mean) of the arguments.', 'range', 'Range', 'range', 'Calculate the average of a range of numbers.'),

    // 43. SUM - Sum Values
    createSingleParamFormula('sum', 'SUM', 'Math', 'Adds all the numbers in a range of cells.', 'range', 'Range', 'range', 'Add up all numbers in a range of cells.'),

    // 44. YEAR - Extract Year
    createSingleParamFormula('year', 'YEAR', 'Date', 'Returns the year of a date, an integer in the range 1900-9999.', 'date', 'Date', 'text', 'Extract the year from a date.'),

    // 45. MONTH - Extract Month
    createSingleParamFormula('month', 'MONTH', 'Date', 'Returns the month of a date, a number from 1 (January) to 12 (December).', 'date', 'Date', 'text', 'Extract the month from a date.'),

    // 46. DAY - Extract Day
    createSingleParamFormula('day', 'DAY', 'Date', 'Returns the day of a date, a number from 1 to 31.', 'date', 'Date', 'text', 'Extract the day from a date.'),

    // 47. EDATE - Add Months to Date
    {
        slug: 'edate',
        title: 'Free EDATE Formula Generator',
        metaDescription: 'Add or subtract months from a date.',
        excelFunction: 'EDATE',
        category: 'Date',
        description: 'Returns a date that is a specified number of months before or after a given date.',
        inputs: [
            { id: 'start_date', label: 'Start Date', type: 'text', placeholder: 'e.g., A1' },
            { id: 'months', label: 'Months to Add', type: 'number', placeholder: 'e.g., 3 or -6' },
        ],
        generate: (p) => `=EDATE(${p.start_date || 'start_date'}, ${p.months || '1'})`
    },

    // 48. EOMONTH - End of Month
    {
        slug: 'eomonth',
        title: 'Free EOMONTH Formula Generator',
        metaDescription: 'Get the last day of a month, with optional month offset.',
        excelFunction: 'EOMONTH',
        category: 'Date',
        description: 'Returns the last day of the month a specified number of months before or after a date.',
        inputs: [
            { id: 'start_date', label: 'Start Date', type: 'text', placeholder: 'e.g., A1' },
            { id: 'months', label: 'Month Offset', type: 'number', placeholder: 'e.g., 0 for current month' },
        ],
        generate: (p) => `=EOMONTH(${p.start_date || 'start_date'}, ${p.months || '0'})`
    },

    // 49. COUNTA - Count Non-Empty Cells
    createSingleParamFormula('counta', 'COUNTA', 'Math', 'Counts number of cells that are not empty in a range.', 'range', 'Range', 'range', 'Count number of non-empty cells in a range.'),

    // 50. COUNTBLANK - Count Empty Cells
    createSingleParamFormula('countblank', 'COUNTBLANK', 'Math', 'Counts the number of empty cells in a specified range.', 'range', 'Range', 'range', 'Count number of empty cells in a range.'),
];
