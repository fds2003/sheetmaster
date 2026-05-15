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
        title: 'VLOOKUP Formula Generator (2026) — Free Excel & Google Sheets',
        metaDescription: 'Generate VLOOKUP formulas instantly for Excel and Google Sheets. Free tool with examples, error fixes (#N/A solutions), and step-by-step guide. No signup required.',
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
   `,
        howToSteps: [
            { name: "Identify your lookup value", text: "Select the cell that contains the value you want to search for (e.g., an ID or Name in cell A2)." },
            { name: "Select your data range", text: "Highlight the table where the data exists. Ensure the lookup value is in the FIRST column of this range." },
            { name: "Count the column number", text: "Count how many columns to the right the result is located. For example, if your table is A:C and you want data from C, the number is 3." },
            { name: "Choose exact match", text: "Always use FALSE (or 0) for exact matches to avoid incorrect results with unsorted data." }
        ],
        faq: [
            { question: "Why is VLOOKUP returning #N/A?", answer: "This usually means the lookup value does not exist in the first column of your table array, or there is a mismatch in data types (e.g., number vs text stored as number). Check for hidden spaces, leading zeros, or use TRIM and VALUE to normalize data." },
            { question: "Can VLOOKUP look to the left?", answer: "No, VLOOKUP can only look to the right. Use XLOOKUP or INDEX/MATCH to look to the left or in any column." },
            { question: "What is the difference between VLOOKUP and XLOOKUP?", answer: "VLOOKUP only looks right and requires a column index number. XLOOKUP looks in any direction, uses separate lookup and return arrays, and supports built-in if-not-found and default values." },
            { question: "How to use VLOOKUP with multiple criteria?", answer: "Add a helper column that concatenates the criteria columns, then use VLOOKUP on that column. In Excel 365 you can also use XLOOKUP with multiple conditions." },
            { question: "Why is VLOOKUP not working?", answer: "Common causes: data type mismatch (number vs text), extra spaces (use TRIM), wrong column index, or range_lookup set to TRUE when you need exact match. Use FALSE for exact match." },
            { question: "Is VLOOKUP case sensitive?", answer: "No, VLOOKUP is not case sensitive. To do a case-sensitive lookup, use INDEX with MATCH and EXACT, or XLOOKUP with EXACT." },
            { question: "How to fix VLOOKUP #REF error?", answer: "#REF usually means the column index number is greater than the columns in your range, or the range was deleted. Check that col_index_num does not exceed the number of columns in table_array." },
            { question: "Should I use VLOOKUP or INDEX MATCH?", answer: "Use INDEX MATCH when you need to look left, when columns might be inserted, or for clearer formulas. Use VLOOKUP for simple right-only lookups where the table rarely changes." }
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
        relatedTools: ['xlookup', 'index-match', 'if'],
    },

    // 2. IF
    {
        slug: 'if',
        title: 'IF Formula Generator (2026) — Create IF-THEN Statements | Free Excel & Sheets',
        metaDescription:
            'Build IF formulas instantly—nested IF, IF-AND, IF-OR—with examples for Excel and Google Sheets. Free generator. No signup required.',
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
  <p>Building complex logical statements manually can be prone to syntax errors, especially with parentheses. Our generator handles the formatting for you, ensuring your formula works perfectly the first time you paste it into your sheet. Save time and reduce frustration by letting our expert-crafted tools handle the heavy lifting of data analysis.</p>
</div>`,
        howToSteps: [
            { name: "Define your condition", text: "Decide what you want to test. For example, is cell A1 greater than 10?" },
            { name: "Determine the result if true", text: "Decide what happens if the condition is met (e.g., return text 'Pass')." },
            { name: "Determine the result if false", text: "Decide what happens if the condition is NOT met (e.g., return text 'Fail')." }
        ],
        faq: [
            { question: "Can I use multiple IF statements?", answer: "Yes, you can nest IF statements inside each other to test multiple conditions, or use the IFS function for cleaner syntax." },
            { question: "How do I check for text?", answer: "Put text inside double quotes, like \"Yes\" or \"No\". Numbers do not need quotes." },
            { question: "What does the IF function do in Excel?", answer: "IF checks a condition and returns one value when true and another when false. Syntax: =IF(condition, value_if_true, value_if_false)." },
            { question: "How do I use IF with AND or OR?", answer: "Put AND() or OR() in the logical_test: =IF(AND(A1>0, B1<10), \"Yes\", \"No\") or =IF(OR(A1=1, A1=2), \"OK\", \"No\")." },
            { question: "Why does IF return #NAME?", answer: "Usually a typo in the function name or unquoted text. Text must be in double quotes; numbers and cell references do not need quotes." }
        ],
        commonErrors: [
            { title: 'IF returns #NAME? or wrong result', causes: ['Text in value_if_true/value_if_false not in double quotes.', 'Misspelled function name (IF not IFF).', 'Too many nested IFs; limit in Excel is 64.'], fixes: ['Put all literal text in quotes: "Pass", "Fail".', 'Check spelling; use IFS for many conditions instead of nesting.', 'Use IFS or SWITCH for cleaner multi-condition logic.'] },
        ],
        formulaLogicBreakdown: [
            { argument: 'logical_test', explanation: 'The condition or criteria you are evaluating to see if it is true or false.', example: 'e.g., A1>10 or B2="Closed"' },
            { argument: 'value_if_true', explanation: 'The result returned if the logical_test evaluates to TRUE. Text must be in double quotes.', example: 'e.g., "Pass" or A1*0.1' },
            { argument: 'value_if_false', explanation: 'The result returned if the logical_test evaluates to FALSE. Text must be in double quotes.', example: 'e.g., "Fail" or 0' },
        ],
        relatedTools: ['sumif', 'countif', 'and'],
    },

    // 3. SUMIF
    {
        slug: 'sumif',
        title: 'SUMIF Formula Generator (2026) — Sum with Conditions | Excel & Sheets',
        metaDescription: 'Generate SUMIF formulas to sum cells based on criteria. Free tool for Excel and Google Sheets with multiple condition examples. No signup required.',
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
        howToSteps: [
            { name: 'Select your range', text: 'Choose the range of cells that contains your criteria. For example, A1:A10 contains product names or numbers.' },
            { name: 'Define your criteria', text: 'Enter the condition in quotes, like "Apple" for exact text or ">100" for numbers. For cell references use "="&E1.' },
            { name: 'Select sum range (optional)', text: 'If summing a different column, add the sum_range. If omitted, SUMIF sums the range itself.' },
            { name: 'Copy and test', text: 'Paste the formula into your spreadsheet and verify the result matches your expected total.' }
        ],
        faq: [
            { question: "What is the difference between SUMIF and SUMIFS?", answer: "SUMIF has one condition; SUMIFS can have multiple conditions. Use SUMIFS when you need to sum only when two or more criteria are met." },
            { question: "Can SUMIF use wildcards?", answer: "Yes. Use * for any characters and ? for one character. Example: =SUMIF(A:A,\"*apple*\",B:B) sums B where A contains \"apple\"." },
            { question: "How do I sum with a date criteria?", answer: "Use a cell reference or DATE() in criteria, e.g. =SUMIF(A:A,\">=\"&DATE(2025,1,1),B:B) or =SUMIF(A:A,\">=\"&E1,B:B) where E1 has the date." },
            { question: "Why does SUMIF return 0?", answer: "Check that criteria match the data type (e.g. number vs text). Use quotes for text: \"=100\" or \">50\". Ensure sum_range aligns with range if you use it." },
            { question: "When should I use SUMIF vs COUNTIF?", answer: "Use SUMIF to add values that meet a condition. Use COUNTIF to count how many cells meet a condition. Both use the same criteria syntax." }
        ],
        commonErrors: [
            { title: 'SUMIF returns 0 or wrong sum', causes: ['Criteria not in quotes for text (e.g. "Apple" not Apple).', 'Sum_range and range different sizes; only overlapping rows are summed.', 'Number stored as text in range; criteria does not match.'], fixes: ['Use quotes for text: ">100", "Sales".', 'Make sum_range same size as range, or omit sum_range to sum range.', 'Align data types; use VALUE or TEXT as needed.'] },
        ],
    },

    // 4. COUNTIF
    {
        slug: 'countif',
        title: 'COUNTIF Formula Generator (2026) — Count Cells by Criteria | Excel & Sheets',
        metaDescription: 'Build COUNTIF formulas to count cells that meet a criterion (text, number, date). Free tool for Excel and Google Sheets. No signup.',
        excelFunction: 'COUNTIF',
        category: 'Math',
        description: 'Counts the number of cells within a range that meet the given condition.',
        inputs: [
            { id: 'range', label: 'Range to Count', type: 'range', placeholder: 'e.g., A1:A10' },
            { id: 'criteria', label: 'Criteria', type: 'text', placeholder: 'e.g., ">100" or "Completed"' },
        ],
        generate: (p) => `=COUNTIF(${p.range || 'range'}, ${p.criteria || 'criteria'})`,
        howToSteps: [
            { name: 'Select your range', text: 'Choose the range of cells you want to count from, such as A1:A100.' },
            { name: 'Define your criteria', text: 'Enter the condition in quotes: "Completed" for exact text, ">100" for numbers, or "="&E1 for cell references.' },
            { name: 'Understand the result', text: 'COUNTIF returns the count of cells that match your criteria. Use COUNTIFS for multiple conditions.' },
            { name: 'Copy into your sheet', text: 'Paste the formula into your target cell and adjust ranges to match your actual data.' }
        ],
        faq: [
            { question: 'Why does COUNTIF return 0 when I expect a count?', answer: 'Check that your criteria match the data type (number vs text). Use quotes for text: "Completed" or "=100". For numbers use ">50" or "=100". Dates may need DATE() or a cell reference.' },
            { question: 'How do I count blank or non-blank cells?', answer: 'Use criteria "" for blanks: =COUNTIF(A:A,""). For non-blanks use "<>": =COUNTIF(A:A,"<>").' },
            { question: 'What is the difference between COUNTIF and COUNTIFS?', answer: 'COUNTIF has one condition; COUNTIFS supports multiple criteria ranges. Use COUNTIFS when you need to count only when two or more conditions are met.' },
            { question: 'Can COUNTIF use wildcards?', answer: 'Yes. Use * for any characters and ? for one character. Example: =COUNTIF(A:A,"*apple*") counts cells containing "apple".' },
            { question: 'How do I count cells with a date in a range?', answer: 'Use criteria with a date: =COUNTIF(A:A,">="&DATE(2025,1,1)) or =COUNTIF(A:A,">"&B1) where B1 holds the date.' },
        ],
        commonErrors: [
            { title: 'COUNTIF returns 0 or wrong count', causes: ['Criteria not in quotes for text (e.g. "Yes" not Yes).', 'Data type mismatch: numbers stored as text or vice versa.', 'Extra spaces in cells; criteria does not match exactly.'], fixes: ['Wrap text criteria in double quotes: "Completed", ">100".', 'Use TRIM on data or match the stored format.', 'For numbers, use "=100" or ">50" as the criteria string.'] },
        ],
    },

    // 5. CONCATENATE
    {
        slug: 'concatenate',
        title: 'CONCATENATE Formula Generator (2026) — Join Text with Separator | Excel & Sheets',
        metaDescription: 'Join text strings with a separator (comma, space, dash). Free CONCATENATE and TEXTJOIN-style builder for Excel and Google Sheets. No signup.',
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
        howToSteps: [
            { name: 'Identify your text values', text: 'Select the cells or text strings you want to join together, such as first name in A1 and last name in B1.' },
            { name: 'Add separators', text: 'Include separator strings between values: ", " for comma-space, " " for space-only, or " - " for dash. Always wrap separators in double quotes.' },
            { name: 'Optional: format numbers', text: 'If concatenating numbers or dates, wrap them in TEXT() first: =CONCATENATE(TEXT(A1,"0.00"), " units").' },
            { name: 'Copy the result', text: 'Paste the generated formula into your spreadsheet. It will join all values together into one text string.' }
        ],
        faq: [
            { question: 'How do I add a space or separator between concatenated values?', answer: 'Include a string argument for the separator, e.g. ", " or " - " between cell references: =CONCATENATE(A1, " - ", B1).' },
            { question: 'What is the difference between CONCATENATE and TEXTJOIN?', answer: 'CONCATENATE joins arguments in order; TEXTJOIN lets you specify a delimiter once and can ignore empty cells. In Excel 2016+ and Sheets, TEXTJOIN is often easier for lists.' },
            { question: 'Why does CONCATENATE show a number without formatting?', answer: 'Concatenation turns numbers to plain text. Use TEXT() to format: =CONCATENATE(TEXT(A1,"0.00"), " ", B1).' },
            { question: 'How do I concatenate a date with text?', answer: 'Wrap the date in TEXT() so it displays as you want: =CONCATENATE(TEXT(A1,"yyyy-mm-dd"), " ", B1).' },
            { question: 'Can I use CONCATENATE with more than 3 items?', answer: 'Yes. Add more arguments: =CONCATENATE(A1, " ", B1, " ", C1). In Google Sheets and Excel 2016+, TEXTJOIN is simpler for many values.' },
        ],
        commonErrors: [
            { title: 'No space or wrong separator between values', causes: ['Forgetting to add a separator string between references.', 'Using a number instead of quoted text for the separator.'], fixes: ['Add ", " or " - " (or any separator in quotes) between each pair of values.', 'Always put literal text in double quotes.'] },
        ],
    },

    // 6. INDEX/MATCH
    {
        slug: 'index-match',
        title: 'INDEX MATCH Formula Generator (2026) — More Powerful Than VLOOKUP',
        metaDescription: 'Generate INDEX MATCH formulas for Excel and Google Sheets. Look left, avoid column index errors. Free tool, no signup.',
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
        faq: [
            { question: "What does INDEX MATCH do?", answer: "INDEX returns a value from a range by position; MATCH finds the position of a value. Combined, they look up a value and return from another column—and can look to the left, unlike VLOOKUP." },
            { question: "Why use INDEX MATCH instead of VLOOKUP?", answer: "INDEX MATCH can look left, is not broken when you insert columns, and often performs better on large data. It is more flexible than VLOOKUP." },
            { question: "How do I use INDEX MATCH with multiple criteria?", answer: "Use MATCH with an array formula or helper column that concatenates criteria. In Excel 365 you can use XLOOKUP with multiple conditions more easily." },
            { question: "What is the MATCH type (0, -1, 1)?", answer: "0 = exact match. -1 = find smallest value >= lookup (ascending). 1 = find largest value <= lookup (descending). Use 0 for most lookups." },
            { question: "Why is INDEX MATCH returning #N/A?", answer: "MATCH returns #N/A when the lookup value is not found. Check for data type mismatch (number vs text), extra spaces, or use IFERROR to handle not found." }
        ],
        commonErrors: [
            { title: 'INDEX MATCH returns #N/A or wrong value', causes: ['Lookup range and return range have different heights (rows).', 'MATCH type wrong: use 0 for exact match; -1/1 for sorted lookup.', 'Data type mismatch between lookup value and lookup range.'], fixes: ['Use same-sized single-column ranges for lookup_range and return_range.', 'Use 0 for exact match in most cases.', 'Normalize types with TRIM, VALUE, or TEXT.'] },
        ],
        howToSteps: [
            { name: 'Choose the return column', text: 'Select the range that holds the values you want returned (your result column), e.g. C:C.' },
            { name: 'Choose where to search', text: 'Enter the lookup value cell (e.g. A2) and the column where that value appears (e.g. B:B). MATCH finds the row within that column.' },
            { name: 'Use exact match', text: 'Set Match Type to Exact Match (0) unless your lookup column is sorted and you need approximate match.' },
            { name: 'Combine INDEX and MATCH', text: 'The generator builds =INDEX(return_range, MATCH(lookup_value, lookup_range, match_type)) so you can look left or right without a column index number.' },
        ],
    },

    // 7. XLOOKUP
    {
        slug: 'xlookup',
        title: 'XLOOKUP Formula Generator (2026) — Look Left & Right, No Column Index Errors',
        metaDescription:
            'XLOOKUP does what VLOOKUP cannot: look left, separate lookup and return arrays, and optional if-not-found. Free for Excel 365 and Google Sheets. No signup.',
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
   `,
        faq: [
            { question: "What does XLOOKUP do?", answer: "XLOOKUP looks up a value in a lookup array and returns the corresponding value from a return array. It can look left or right and supports an optional if-not-found value." },
            { question: "Is XLOOKUP available in Google Sheets?", answer: "Yes. XLOOKUP is available in Excel 365 and Google Sheets. It replaces VLOOKUP and HLOOKUP with a single, more flexible function." },
            { question: "Why use XLOOKUP instead of VLOOKUP?", answer: "XLOOKUP can look left, does not need a column index number, supports built-in if-not-found, and defaults to exact match. It is the modern replacement for VLOOKUP." },
            { question: "How do I handle #N/A in XLOOKUP?", answer: "Use the fourth argument (if_not_found) to return a value when no match is found, e.g. =XLOOKUP(A2,B:B,C:C,\"Not Found\")." },
            { question: "Can XLOOKUP search from bottom?", answer: "Yes. Use the optional search_mode argument. -1 searches last-to-first. 1 (default) searches first-to-last." }
        ],
        commonErrors: [
            { title: 'XLOOKUP returns #N/A', causes: ['Lookup value not in lookup_array.', 'Lookup and return arrays different lengths.', 'Data type or format mismatch.'], fixes: ['Use fourth argument (if_not_found) to return a default.', 'Ensure lookup_array and return_array have the same number of rows.', 'Use TRIM, VALUE, or TEXT to align formats.'] },
        ],
        howToSteps: [
            { name: 'Pick lookup and return columns', text: 'Enter the cell with the value to find, the column (or row) to search, and the column (or row) that holds the answer. Unlike VLOOKUP, these can be separate ranges.' },
            { name: 'Add if-not-found (optional)', text: 'Use the optional fourth argument to show text like "Not Found" instead of #N/A when there is no match.' },
            { name: 'Keep ranges aligned', text: 'lookup_array and return_array must have the same number of rows (or columns for horizontal lookup).' },
            { name: 'Paste into Excel or Sheets', text: 'Copy the generated formula into Microsoft Excel 365 or Google Sheets—both support XLOOKUP.' },
        ],
        formulaLogicBreakdown: [
            { argument: 'lookup_value', explanation: 'What you are looking for.', example: 'e.g., A2' },
            { argument: 'lookup_array', explanation: 'The single column or row where the lookup_value should be found.', example: 'e.g., B:B' },
            { argument: 'return_array', explanation: 'The single column or row containing the value you want to return.', example: 'e.g., C:C' },
            { argument: 'if_not_found', explanation: 'Optional. The value to return if no match is found, eliminating the need for IFERROR.', example: 'e.g., "Not Found"' },
            { argument: 'match_mode', explanation: 'Optional. 0 for exact match (default), -1 for exact or next smaller, 1 for exact or next larger.', example: 'e.g., 0' },
            { argument: 'search_mode', explanation: 'Optional. 1 to search first-to-last (default), -1 to search last-to-first.', example: 'e.g., 1' },
        ],
        relatedTools: ['vlookup', 'index-match', 'iferror'],
    },

    // 8. TRIM
    {
        slug: 'trim',
        title: 'TRIM Formula Generator (2026) — Remove Extra Spaces | Free Excel & Sheets',
        metaDescription: 'Remove extra spaces from text with the TRIM function.',
        excelFunction: 'TRIM',
        category: 'Text',
        description: 'Removes all spaces from text except for single spaces between words.',
        inputs: [{ id: 'text', label: 'Text', type: 'text', placeholder: 'e.g., A1' }],
        generate: (p) => `=TRIM(${p.text || 'text'})`,
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
        title: 'UPPER Formula Generator (2026) — Convert Text to Uppercase | Free Excel & Sheets',
        metaDescription: 'Convert text to uppercase.',
        excelFunction: 'UPPER',
        category: 'Text',
        description: 'Converts text to uppercase.',
        inputs: [{ id: 'text', label: 'Text', type: 'text', placeholder: 'e.g., A1' }],
        generate: (p) => `=UPPER(${p.text || 'text'})`,
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
        title: 'LOWER Formula Generator (2026) — Convert Text to Lowercase | Free Excel & Sheets',
        metaDescription: 'Convert text to lowercase.',
        excelFunction: 'LOWER',
        category: 'Text',
        description: 'Converts all uppercase letters in a text string to lowercase.',
        inputs: [{ id: 'text', label: 'Text', type: 'text', placeholder: 'e.g., A1' }],
        generate: (p) => `=LOWER(${p.text || 'text'})`,
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
        title: 'PROPER Formula Generator (2026) — Capitalize Each Word | Free Excel & Sheets',
        metaDescription: 'Capitalize the first letter of each word.',
        excelFunction: 'PROPER',
        category: 'Text',
        description: 'Capitalizes the first letter in each word of a text value.',
        inputs: [{ id: 'text', label: 'Text', type: 'text', placeholder: 'e.g., A1' }],
        generate: (p) => `=PROPER(${p.text || 'text'})`,
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
        title: 'LEFT Formula Generator (2026) — Extract First Characters | Free Excel & Sheets',
        metaDescription: 'Extract the first characters from a text string.',
        excelFunction: 'LEFT',
        category: 'Text',
        description: 'Returns the first character or characters in a text string, based on the number of characters you specify.',
        inputs: [
            { id: 'text', label: 'Text', type: 'text', placeholder: 'e.g., A1' },
            { id: 'num_chars', label: 'Number of Characters', type: 'number', placeholder: 'e.g., 5' },
        ],
        generate: (p) => `=LEFT(${p.text || 'text'}, ${p.num_chars || '1'})`,
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
        title: 'RIGHT Formula Generator (2026) — Extract Last Characters | Free Excel & Sheets',
        metaDescription: 'Extract the last characters from a text string.',
        excelFunction: 'RIGHT',
        category: 'Text',
        description: 'Returns the last character or characters in a text string, based on the number of characters you specify.',
        inputs: [
            { id: 'text', label: 'Text', type: 'text', placeholder: 'e.g., A1' },
            { id: 'num_chars', label: 'Number of Characters', type: 'number', placeholder: 'e.g., 5' },
        ],
        generate: (p) => `=RIGHT(${p.text || 'text'}, ${p.num_chars || '1'})`,
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
        title: 'DATEDIF Formula Generator (2026) — Calculate Date Difference | Free Excel & Sheets',
        metaDescription: 'Calculate date differences in Excel and Google Sheets. Free DATEDIF tool for days, months, years. No signup required. Generate formulas instantly.',
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
            { name: 'Select your start and end dates', text: 'Enter the cells containing your start date and end date, such as A1 and B1.' },
            { name: 'Choose your unit', text: 'Pick Y for complete years, M for complete months, or D for days between the two dates.' },
            { name: 'Understand hidden behavior', text: 'DATEDIF is a hidden function in Excel — type it manually as it won\'t appear in autocomplete. It works normally once entered.' },
            { name: 'Handle reversed dates', text: 'If the start date is later than the end date, DATEDIF returns #NUM!. Use =IF(A1>B1, -DATEDIF(B1,A1,"Y"), DATEDIF(A1,B1,"Y")) for signed results.' }
        ],
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
        title: 'NOW Formula Generator (2026) — Current Date & Time | Free Excel & Sheets',
        metaDescription: 'Get the current date and time in Excel.',
        excelFunction: 'NOW',
        category: 'Date',
        description: 'Returns the serial number of the current date and time.',
        inputs: [],
        generate: () => `=NOW()`,
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
        title: 'TODAY Formula Generator (2026) — Current Date | Free Excel & Sheets',
        metaDescription: 'Get the current date in Excel.',
        excelFunction: 'TODAY',
        category: 'Date',
        description: 'Returns the serial number of the current date.',
        inputs: [],
        generate: () => `=TODAY()`,
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
        title: 'NETWORKDAYS Formula Generator (2026) — Count Working Days | Free Excel & Sheets',
        metaDescription: 'Calculate working days in Excel and Google Sheets. Free NETWORKDAYS tool excludes weekends. No signup required. Add holidays optionally.',
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
        title: 'PMT Formula Generator (2026) — Calculate Loan Payments | Free Excel & Sheets',
        metaDescription: 'Calculate loan payments in Excel and Google Sheets. Free PMT tool for monthly payments. No signup required. Based on rate, periods, and loan amount.',
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
            { name: 'Convert annual rate to periodic rate', text: 'Divide the annual interest rate by 12 for monthly payments. Example: 5%/12 for a 5% annual rate with monthly payments.' },
            { name: 'Set the number of payments', text: 'Multiply the loan term in years by 12 for monthly payments. Example: 30 years × 12 = 360 payments.' },
            { name: 'Enter the loan amount', text: 'Input the present value (loan principal). For a $200,000 loan, enter 200000.' },
            { name: 'Interpret the result', text: 'PMT returns a negative value because it represents a payment (cash outflow). Use =-PMT(...) to display a positive number.' }
        ],
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
        title: 'AND Formula Generator (2026) — Logical AND | Free Excel & Sheets',
        metaDescription: 'Check if all conditions are true.',
        excelFunction: 'AND',
        category: 'Logic',
        description: 'Returns TRUE if all its arguments are TRUE; returns FALSE if one or more argument is FALSE.',
        inputs: [
            { id: 'logical1', label: 'Condition 1', type: 'text', placeholder: 'e.g., A1>0' },
            { id: 'logical2', label: 'Condition 2', type: 'text', placeholder: 'e.g., B1<10' },
        ],
        generate: (p) => `=AND(${p.logical1 || 'logical1'}, ${p.logical2 || 'logical2'})`,
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
        title: 'OR Formula Generator (2026) — Logical OR | Free Excel & Sheets',
        metaDescription: 'Check if any condition is true.',
        excelFunction: 'OR',
        category: 'Logic',
        description: 'Returns TRUE if any argument is TRUE; returns FALSE if all arguments are FALSE.',
        inputs: [
            { id: 'logical1', label: 'Condition 1', type: 'text', placeholder: 'e.g., A1>0' },
            { id: 'logical2', label: 'Condition 2', type: 'text', placeholder: 'e.g., B1<10' },
        ],
        generate: (p) => `=OR(${p.logical1 || 'logical1'}, ${p.logical2 || 'logical2'})`,
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
        title: 'Extract Email from Text in Excel (2026) — Free Regex Formula Generator',
        metaDescription: 'Extract email addresses in Excel and Google Sheets. Free REGEXEXTRACT tool for email extraction. No signup required. Clean data instantly.',
        excelFunction: 'REGEXEXTRACT',
        category: 'Text',
        description: 'Extracts an email address from a text string.',
        inputs: [
            { id: 'target_cell', label: 'Target Cell', type: 'text', placeholder: 'e.g., A2' },
        ],
        generate: (p) => `=REGEXEXTRACT(${p.target_cell || 'A2'}, "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}")`,
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
            { name: 'Put messy text in a cell', text: 'Paste CRM exports, notes, or scraped text into a cell (e.g. A2).' },
            { name: 'Use REGEXEXTRACT', text: 'The formula uses REGEXEXTRACT with an email pattern to return the first matching address.' },
            { name: 'Fill or reference the cell', text: 'Point the generator at your cell reference so the formula reads from the correct row.' },
            { name: 'Copy into Google Sheets', text: 'REGEXEXTRACT is native in Google Sheets; Excel 365 can use REGEXEXTRACT where available or alternative text parsing.' },
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
        title: 'Extract Domain from URL in Excel — SEO & Marketing Lists',
        metaDescription:
            'Pull root domains from messy URLs for SEO, backlinks, and CRM cleanup—REGEXEXTRACT patterns for Excel and Google Sheets. Free, no signup.',
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
        relatedTools: ['extract-email', 'trim', 'substitute', 'concatenate'],
    },

    // 23. Get First Word
    {
        slug: 'get-first-word',
        title: 'Get First Word in Excel (2026) — LEFT + FIND Formula Generator',
        metaDescription:
            'Extract the first word from a cell (names, keywords)—excel get first word style workflows. LEFT and FIND for Excel and Google Sheets. Free, no signup.',
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
        title: 'Remove First N Characters in Excel (2026) — RIGHT, LEN & Text Cleaning',
        metaDescription:
            'Remove first 3 characters (or any N) from text—how to remove first characters in Excel style fixes. RIGHT + LEN for Excel and Google Sheets. Free, no signup.',
        excelFunction: 'RIGHT & LEN',
        category: 'Text',
        description: 'Removes the specified number of characters from the beginning of a text string.',
        inputs: [
            { id: 'target_cell', label: 'Target Cell', type: 'text', placeholder: 'e.g., A2' },
            { id: 'num_chars', label: 'Number of chars to remove', type: 'number', placeholder: 'e.g., 3' },
        ],
        generate: (p) => `=RIGHT(${p.target_cell || 'A2'}, LEN(${p.target_cell || 'A2'}) - ${p.num_chars || '3'})`,
        richContent: `
  <h3>Remove the First N Characters in Excel or Google Sheets</h3>
  <p>Common when cleaning CSV prefixes, IDs, or fixed-width junk at the start of a cell. Use <code>RIGHT</code> with <code>LEN</code> so the number of characters to drop is explicit.</p>
  <h4>Why LEN minus N?</h4>
  <p><code>RIGHT(text, LEN(text)-N)</code> keeps everything after the first N characters. Change N to match &quot;remove first 3 characters&quot; or any count.</p>
  <h4>Variable N</h4>
  <p>Put N in a cell (e.g. D1) and reference it: <code>=RIGHT(A2,LEN(A2)-D1)</code> so one formula works for different strip lengths.</p>
`,
        faq: [
            {
                question: 'How do I remove the first 3 characters in Excel?',
                answer: '=RIGHT(A2,LEN(A2)-3) removes exactly three characters from the left of the text in A2.',
            },
            {
                question: 'How do I remove last N characters instead?',
                answer: 'Use LEFT with LEN: =LEFT(A2,LEN(A2)-N). Or see SUBSTITUTE for removing specific characters rather than a fixed count.',
            },
        ],
        commonErrors: [
            {
                title: '#VALUE! or wrong length after RIGHT/LEN',
                causes: ['Cell contains a number; LEN still works but formula may be mixed with dates.', 'N larger than LEN(text) returns empty.'],
                fixes: ['Wrap source in TEXT if needed: TEXT(A2,"@").', 'Use MAX(0,LEN(A2)-N) inside RIGHT if N can exceed length in edge cases.'],
            },
        ],
        relatedTools: ['right', 'len', 'left', 'substitute', 'mid'],
    },

    // 25. SUMIFS - Multiple Criteria Sum
    {
        slug: 'sumifs',
        title: 'SUMIFS Formula Generator (2026) — Multi-Criteria Sum | Excel & Sheets',
        metaDescription:
            'Sum with multiple criteria: sum_range first, then criteria pairs—syntax that matches real searches (multi-criteria, same column). Excel & Google Sheets. Free, no signup.',
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
            { name: 'Place sum_range FIRST', text: 'Unlike SUMIF, SUMIFS requires the sum_range as the first argument, followed by criteria pairs.' },
            { name: 'Add criteria pairs', text: 'Each pair consists of a criteria_range and a criteria. Example: A1:A100 is the range, "Sales" is the condition for that range.' },
            { name: 'Keep ranges equal-sized', text: 'All criteria ranges must have the same number of rows as the sum_range. Mismatched sizes cause wrong results.' },
            { name: 'Copy and verify', text: 'Paste the formula and check the result against a manual calculation to confirm all criteria are applied correctly.' }
        ],
        faq: [
            { question: 'What is the correct SUMIFS syntax order (sum_range criteria_range1 criteria1)?', answer: 'The syntax is exactly: =SUMIFS(sum_range, criteria_range1, criteria1, [criteria_range2, criteria2]...). The sum_range MUST come first, followed by pairs of criteria ranges and their specific conditions.' },
            { question: 'Why does SUMIFS return 0?', answer: 'This usually happens if criteria_range and sum_range are different sizes, or text criteria are missing quotes (like ">100"). Ensure all ranges have the exact same number of rows.' },
            { question: 'How do I use SUMIFS with dates?', answer: 'To sum between two dates, use two criteria on the same date column: criteria_range1 with ">="&start_date, and criteria_range2 with "<="&end_date.' },
            { question: 'SUMIF vs SUMIFS: What is the difference?', answer: 'SUMIF is for a single condition and its syntax is (range, criteria, sum_range). SUMIFS handles multiple conditions and its syntax is (sum_range, criteria_range1, criteria1...). We recommend always using SUMIFS because it is more flexible.' },
            { question: 'Can SUMIFS use wildcards?', answer: 'Yes. Use * for any characters and ? for one character: =SUMIFS(C:C, A:A, "*North*", B:B, ">100").' },
        ],
        commonErrors: [
            { title: 'SUMIFS returns 0 or wrong total', causes: ['Sum range and criteria ranges have different heights or columns.', 'Criteria in wrong order (text without quotes, date not as DATE() or cell ref).', 'Using SUMIF-style argument order (sum range must come first in SUMIFS).'], fixes: ['Use same-sized ranges: e.g. A1:A100, B1:B100, C1:C100.', 'Put text in quotes; use ">="&A1 for dates where A1 is a date.', 'Syntax: =SUMIFS(sum_range, criteria_range1, criteria1, criteria_range2, criteria2).'] },
        ],
        richContent: `
<div class="prose max-w-none mt-8 text-left">
  <h2 class="text-2xl font-bold mb-4">Master SUMIFS: Sum with Multiple Conditions</h2>
  <p class="mb-4">The <strong>SUMIFS function</strong> is an enhanced version of SUMIF that allows you to apply multiple criteria. It's essential for financial analysis, sales commission reports, and complex data aggregation.</p>
  
  <h3 class="text-xl font-semibold mb-2 mt-8">SUMIF vs SUMIFS: Which should I use?</h3>
  <p class="mb-4">Many users struggle to choose between SUMIF and SUMIFS. Our recommendation is simple: <strong>Learn and always use SUMIFS</strong>. Why? SUMIFS can do everything SUMIF can (even just one condition), but its formula structure is entirely different and often easier to read because the result column comes first.</p>
  
  <table class="min-w-full border-collapse border border-gray-300 my-4 text-sm bg-white">
    <tr class="bg-gray-100"><th class="border border-gray-300 p-2 text-left">Feature</th><th class="border border-gray-300 p-2 text-left">SUMIF</th><th class="border border-gray-300 p-2 text-left">SUMIFS (Winner 🏆)</th></tr>
    <tr><td class="border border-gray-300 p-2 font-medium">Conditions Support</td><td class="border border-gray-300 p-2 text-gray-600">Max 1 condition</td><td class="border border-gray-300 p-2 font-bold text-green-600">Up to 127 conditions</td></tr>
    <tr><td class="border border-gray-300 p-2 font-medium">Syntax Argument Order</td><td class="border border-gray-300 p-2 text-gray-600">Range, Criteria, <em class="text-gray-400">Sum_Range</em></td><td class="border border-gray-300 p-2 font-bold text-blue-600"><em class="text-blue-400">Sum_Range</em>, Criteria_Range1, Criteria1...</td></tr>
  </table>

  <h3 class="text-xl font-semibold mb-2 mt-8">Real-World Examples</h3>
  <ul class="list-disc pl-5 mb-4 space-y-2">
    <li><strong>HR & Payroll</strong>: Sum total hours worked by a specific employee (Condition 1) between January 1 and January 31 (Conditions 2 & 3).</li>
    <li><strong>E-commerce</strong>: Sum total revenue for "Electronics" (Condition 1) where order status is "Delivered" (Condition 2) and discount was "&gt;0" (Condition 3).</li>
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
        relatedTools: ['sumif', 'countifs', 'averageif'],
    },

    // 26. COUNTIFS - Multiple Criteria Count
    {
        slug: 'countifs',
        title: 'COUNTIFS Formula Generator (2026) — Multiple Criteria & Date Ranges | Excel & Sheets',
        metaDescription:
            'Count rows with two or more conditions (text, numbers, date ranges). COUNTIFS builder for Excel and Google Sheets—aligned with countifs with date range searches. No signup.',
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
            { name: 'Set your first criteria pair', text: 'Choose the first range and condition. For example, A1:A100 is the range, "Completed" is the first condition.' },
            { name: 'Add more criteria pairs', text: 'Add additional range/condition pairs for more specific filters. All conditions must be TRUE for a row to be counted.' },
            { name: 'Keep ranges the same size', text: 'Every criteria range must have the same number of rows. Mismatched ranges give wrong counts.' },
            { name: 'Copy and test', text: 'Paste into your spreadsheet. Test with a few rows to verify the count is correct before using it in reports.' }
        ],
        faq: [
            { question: 'Why does COUNTIFS return 0?', answer: 'All conditions must be met in the same row. Check that criteria ranges are the same size and that criteria match data types (text in quotes, numbers with ">50" etc).' },
            { question: 'Do COUNTIFS ranges have to be the same size?', answer: 'Yes. Each criteria range must have the same number of rows (and columns). Mismatched range sizes can give wrong counts or errors.' },
            { question: 'Can COUNTIFS count with OR logic?', answer: 'COUNTIFS is AND logic only. For OR, add multiple COUNTIFS: =COUNTIFS(A:A,"X")+COUNTIFS(A:A,"Y"), or use SUMPRODUCT with (condition1)+(condition2).' },
            { question: 'How do I count rows where one column is blank and another is not?', answer: 'Use criteria "" for blank and "<>" for non-blank: =COUNTIFS(A:A,"", B:B,"<>").' },
            { question: 'What is the difference between COUNTIF and COUNTIFS?', answer: 'COUNTIF has one condition; COUNTIFS has multiple criteria_range/criteria pairs. Use COUNTIFS when you need two or more conditions at once.' },
        ],
        commonErrors: [
            { title: 'COUNTIFS returns 0 or unexpected count', causes: ['Criteria ranges have different lengths.', 'Text criteria not in quotes; number criteria wrong format.'], fixes: ['Use identical range sizes: A1:A100, B1:B100.', 'Use "Completed", ">100", "="&A1 for text, number, and cell reference.'] },
        ],
    },

    // 27. AVERAGEIF - Conditional Average
    {
        slug: 'averageif',
        title: 'AVERAGEIF Formula Generator (2026) — Conditional Average | Free Excel & Sheets',
        metaDescription: 'Calculate conditional average in Excel and Google Sheets. Free AVERAGEIF tool for criteria-based averages. No signup required. Analyze data easily.',
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
        },
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
        title: 'IFERROR Formula Generator (2026) — Hide Errors, Show Fallback | Free Excel & Sheets',
        metaDescription: 'Wrap formulas in IFERROR to show a fallback value instead of #N/A, #DIV/0!, #VALUE!. Free tool for Excel and Google Sheets. No signup.',
        excelFunction: 'IFERROR',
        category: 'Logic',
        description: 'Returns a value you specify if a formula evaluates to an error; otherwise returns the result of the formula.',
        inputs: [
            { id: 'value', label: 'Formula to Check', type: 'text', placeholder: 'e.g., A1/B1' },
            { id: 'value_if_error', label: 'Value if Error', type: 'text', placeholder: 'e.g., 0 or "N/A"' },
        ],
        generate: (p) => `=IFERROR(${p.value || 'value'}, ${p.value_if_error || '""'})`,
        howToSteps: [
            { name: 'Identify the formula to protect', text: 'Enter the formula or cell reference that might produce an error, such as A1/B1 or VLOOKUP(...).' },
            { name: 'Choose your fallback value', text: 'Decide what to show when there is an error: 0 for calculations, "N/A" for lookups, or "" to leave the cell blank.' },
            { name: 'Understand scope', text: 'IFERROR catches ALL error types (#N/A, #DIV/0!, #VALUE!, etc.). Use IFNA instead if you only want to catch #N/A errors.' },
            { name: 'Copy and test', text: 'Wrap your formula with IFERROR and test with data that would normally cause an error to verify the fallback displays correctly.' }
        ],
        faq: [
            { question: 'What errors does IFERROR catch?', answer: 'IFERROR catches #N/A, #VALUE!, #REF!, #DIV/0!, #NAME?, #NUM!, and #NULL!. It returns your fallback value for any of these.' },
            { question: 'Should I use IFERROR around VLOOKUP?', answer: 'Yes. When the lookup value is not found, VLOOKUP returns #N/A. Wrapping in IFERROR lets you show "Not Found" or 0 instead: =IFERROR(VLOOKUP(...), "Not Found").' },
            { question: 'What is the difference between IFERROR and IFNA?', answer: 'IFERROR catches all errors; IFNA catches only #N/A. Use IFNA when you want other errors (e.g. #VALUE!) to still show, so you can debug them.' },
            { question: 'Can IFERROR hide formula errors in Google Sheets?', answer: 'Yes. IFERROR works the same in Excel and Google Sheets. Use it to avoid #DIV/0! from division or #N/A from lookups.' },
            { question: 'Why is my IFERROR returning the fallback when the result looks correct?', answer: 'The first argument might be returning an error you do not see (e.g. in a hidden column). Check the inner formula alone; ensure the fallback is only what you want for real errors.' },
        ],
        commonErrors: [
            { title: 'IFERROR hides errors I want to see', causes: ['Using IFERROR around a formula that can return #VALUE! or #REF! you need to fix.', 'Nested formulas: inner error is caught so outer logic never runs.'], fixes: ['Use IFNA instead to catch only #N/A, or fix the inner formula first.', 'Test the inner formula without IFERROR to debug, then wrap once correct.'] },
        ],
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
        title: 'IFS Formula Generator (2026) — Letter Grades, Tiered Pricing & Multi-Condition Logic',
        metaDescription:
            'Build IFS formulas without deep nested IF—letter grades (A–F), tiered pricing, and score bands in Excel and Google Sheets. Free, no signup.',
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
        richContent: `
<div class="prose max-w-none mt-8">
  <h2>IFS vs Nested IF</h2>
  <p><strong>IFS</strong> evaluates conditions in order and returns the value for the first TRUE test—ideal for <strong>letter grades</strong>, <strong>tiered discounts</strong>, and commission bands without stacking IF(IF(IF(...))).</p>
  <h3>Minimum viable pattern</h3>
  <p>Always end with a catch-all: use <code>TRUE</code> as the last condition to assign a default (e.g. &quot;F&quot; or &quot;Other&quot;).</p>
  <h3>Google Sheets & Excel</h3>
  <p>IFS works in Excel 2019+ / Microsoft 365 and Google Sheets. For older Excel, use nested IF or lookup tables.</p>
</div>`,
        howToSteps: [
            { name: 'List thresholds', text: 'Order conditions from highest priority downward (e.g. score >=90 before >=80).' },
            { name: 'Pair each test with a result', text: 'Each condition must be followed by its return value—IFS requires an even number of arguments after the first.' },
            { name: 'Add TRUE fallback', text: 'Use TRUE as the final condition to handle every remaining case.' },
        ],
        faq: [
            {
                question: 'Can IFS replace nested IF for letter grades?',
                answer: 'Yes. Example: =IFS(A1>=90,"A",A1>=80,"B",A1>=70,"C",TRUE,"F"). Easier to read than multiple nested IFs.',
            },
            {
                question: 'Why does IFS return #N/A?',
                answer: 'No condition matched and there is no final TRUE fallback. Add TRUE, "Default" as the last pair.',
            },
            {
                question: 'IFS vs SWITCH?',
                answer: 'IFS tests ranges and inequalities; SWITCH matches exact values. Use IFS for grade bands and tier thresholds.',
            },
        ],
        commonErrors: [
            {
                title: '#N/A or wrong grade bucket',
                causes: ['Conditions out of order so a lower threshold matches first.', 'Missing TRUE fallback.', 'Comparing text scores without VALUE().'],
                fixes: ['Put highest thresholds first.', 'End with TRUE, "default".', 'Use VALUE(A1) if scores are stored as text.'],
            },
        ],
        relatedTools: ['if', 'iferror', 'sumifs', 'averageif'],
    },

    // 30. SUBSTITUTE - Text Replacement
    {
        slug: 'substitute',
        title: 'SUBSTITUTE Formula Generator (2026) — Replace Text | Free Excel & Sheets',
        metaDescription: 'Replace text in Excel and Google Sheets. Free SUBSTITUTE tool for data cleaning. No signup required. Swap characters or words instantly.',
        excelFunction: 'SUBSTITUTE',
        category: 'Text',
        description: 'Substitutes new text for old text in a text string. Great for data cleaning.',
        inputs: [
            { id: 'text', label: 'Text', type: 'text', placeholder: 'e.g., A1' },
            { id: 'old_text', label: 'Old Text', type: 'text', placeholder: 'e.g., "-"' },
            { id: 'new_text', label: 'New Text', type: 'text', placeholder: 'e.g., "/"' },
        ],
        generate: (p) => `=SUBSTITUTE(${p.text || 'text'}, ${p.old_text || '"old"'}, ${p.new_text || '"new"'})`,
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
        title: 'MID Formula Generator (2026) — Extract Middle Characters | Free Excel & Sheets',
        metaDescription: 'Extract characters from the middle of a text string.',
        excelFunction: 'MID',
        category: 'Text',
        description: 'Returns a specific number of characters from a text string, starting at the position you specify.',
        inputs: [
            { id: 'text', label: 'Text', type: 'text', placeholder: 'e.g., A1' },
            { id: 'start_num', label: 'Start Position', type: 'number', placeholder: 'e.g., 3' },
            { id: 'num_chars', label: 'Number of Characters', type: 'number', placeholder: 'e.g., 5' },
        ],
        generate: (p) => `=MID(${p.text || 'text'}, ${p.start_num || '1'}, ${p.num_chars || '1'})`,
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
        title: 'LEN Formula Generator (2026) — Count Characters | Free Excel & Sheets',
        metaDescription: 'Count the number of characters in a text string.',
        excelFunction: 'LEN',
        category: 'Text',
        description: 'Returns the number of characters in a text string.',
        inputs: [{ id: 'text', label: 'Text', type: 'text', placeholder: 'e.g., A1' }],
        generate: (p) => `=LEN(${p.text || 'text'})`,
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
        title: 'FIND Formula Generator (2026) — Case-Sensitive Text Search | Free Excel & Sheets',
        metaDescription: 'Find the position of text within another text string (case-sensitive).',
        excelFunction: 'FIND',
        category: 'Text',
        description: 'Returns the starting position of one text string within another (case-sensitive).',
        inputs: [
            { id: 'find_text', label: 'Text to Find', type: 'text', placeholder: 'e.g., "@"' },
            { id: 'within_text', label: 'Within Text', type: 'text', placeholder: 'e.g., A1' },
        ],
        generate: (p) => `=FIND(${p.find_text || 'find_text'}, ${p.within_text || 'within_text'})`,
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
        title: 'SEARCH Formula Generator (2026) — Case-Insensitive Text Search | Free Excel & Sheets',
        metaDescription: 'Find the position of text within another text string (case-insensitive, supports wildcards).',
        excelFunction: 'SEARCH',
        category: 'Text',
        description: 'Returns the position of a text string within another (case-insensitive). Supports wildcards.',
        inputs: [
            { id: 'find_text', label: 'Text to Find', type: 'text', placeholder: 'e.g., "error"' },
            { id: 'within_text', label: 'Within Text', type: 'text', placeholder: 'e.g., A1' },
        ],
        generate: (p) => `=SEARCH(${p.find_text || 'find_text'}, ${p.within_text || 'within_text'})`,
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
        title: 'TEXT Formula Generator (2026) — Format Numbers as Text | Free Excel & Sheets',
        metaDescription: 'Format numbers as text in Excel and Google Sheets. Free TEXT tool for custom formats. No signup required. Convert to currency, date, percent.',
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
        generate: (p) => `=TEXT(${p.value || 'value'}, ${p.format || '"#,##0"'})`,
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
        title: 'ROUND Formula Generator (2026) — Round Numbers | Free Excel & Sheets',
        metaDescription: 'Round numbers in Excel and Google Sheets. Free ROUND tool for decimal places. No signup required. Format values precisely and easily.',
        excelFunction: 'ROUND',
        category: 'Math',
        description: 'Rounds a number to a specified number of digits.',
        inputs: [
            { id: 'number', label: 'Number', type: 'text', placeholder: 'e.g., A1' },
            { id: 'num_digits', label: 'Decimal Places', type: 'number', placeholder: 'e.g., 2' },
        ],
        generate: (p) => `=ROUND(${p.number || 'number'}, ${p.num_digits || '0'})`,
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
        title: 'ROUNDUP Formula Generator (2026) — Always Round Up | Free Excel & Sheets',
        metaDescription: 'Round numbers up in Excel and Google Sheets. Free ROUNDUP tool for ceiling values. No signup required. Always round away from zero.',
        excelFunction: 'ROUNDUP',
        category: 'Math',
        description: 'Rounds a number up, away from zero.',
        inputs: [
            { id: 'number', label: 'Number', type: 'text', placeholder: 'e.g., A1' },
            { id: 'num_digits', label: 'Decimal Places', type: 'number', placeholder: 'e.g., 0' },
        ],
        generate: (p) => `=ROUNDUP(${p.number || 'number'}, ${p.num_digits || '0'})`,
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
        title: 'ROUNDDOWN Formula Generator (2026) — Always Round Down | Free Excel & Sheets',
        metaDescription: 'Round numbers down in Excel and Google Sheets. Free ROUNDDOWN tool for floor values. No signup required. Always round toward zero.',
        excelFunction: 'ROUNDDOWN',
        category: 'Math',
        description: 'Rounds a number down, toward zero.',
        inputs: [
            { id: 'number', label: 'Number', type: 'text', placeholder: 'e.g., A1' },
            { id: 'num_digits', label: 'Decimal Places', type: 'number', placeholder: 'e.g., 0' },
        ],
        generate: (p) => `=ROUNDDOWN(${p.number || 'number'}, ${p.num_digits || '0'})`,
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
        title: 'ABS Formula Generator (2026) — Absolute Value | Free Excel & Sheets',
        metaDescription: 'Get the absolute value of a number.',
        excelFunction: 'ABS',
        category: 'Math',
        description: 'Returns the absolute value of a number (removes the negative sign).',
        inputs: [{ id: 'number', label: 'Number', type: 'text', placeholder: 'e.g., A1' }],
        generate: (p) => `=ABS(${p.number || 'number'})`,
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
        title: 'MAX Formula Generator (2026) — Find Largest Value | Free Excel & Sheets',
        metaDescription: 'Find the largest value in a range of cells.',
        excelFunction: 'MAX',
        category: 'Math',
        description: 'Returns the largest value in a set of values.',
        inputs: [{ id: 'range', label: 'Range', type: 'range', placeholder: 'e.g., A1:A100' }],
        generate: (p) => `=MAX(${p.range || 'range'})`,
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
        title: 'MIN Formula Generator (2026) — Find Smallest Value | Free Excel & Sheets',
        metaDescription: 'Find the smallest value in a range of cells.',
        excelFunction: 'MIN',
        category: 'Math',
        description: 'Returns the smallest value in a set of values.',
        inputs: [{ id: 'range', label: 'Range', type: 'range', placeholder: 'e.g., A1:A100' }],
        generate: (p) => `=MIN(${p.range || 'range'})`,
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
        title: 'AVERAGE Formula Generator (2026) — Calculate Mean | Free Excel & Sheets',
        metaDescription: 'Calculate the average of a range of numbers.',
        excelFunction: 'AVERAGE',
        category: 'Math',
        description: 'Returns the average (arithmetic mean) of the arguments.',
        inputs: [{ id: 'range', label: 'Range', type: 'range', placeholder: 'e.g., A1:A100' }],
        generate: (p) => `=AVERAGE(${p.range || 'range'})`,
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
        title: 'SUM Formula Generator (2026) — Add Numbers | Free Excel & Sheets',
        metaDescription: 'Add up all numbers in a range of cells.',
        excelFunction: 'SUM',
        category: 'Math',
        description: 'Adds all the numbers in a range of cells.',
        inputs: [{ id: 'range', label: 'Range', type: 'range', placeholder: 'e.g., A1:A100' }],
        generate: (p) => `=SUM(${p.range || 'range'})`,
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
        title: 'YEAR Formula Generator (2026) — Extract Year from Date | Free Excel & Sheets',
        metaDescription: 'Extract the year from a date.',
        excelFunction: 'YEAR',
        category: 'Date',
        description: 'Returns the year of a date, an integer in the range 1900-9999.',
        inputs: [{ id: 'date', label: 'Date', type: 'text', placeholder: 'e.g., A1' }],
        generate: (p) => `=YEAR(${p.date || 'date'})`,
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
        title: 'MONTH Formula Generator (2026) — Extract Month from Date | Free Excel & Sheets',
        metaDescription: 'Extract the month from a date.',
        excelFunction: 'MONTH',
        category: 'Date',
        description: 'Returns the month of a date, a number from 1 (January) to 12 (December).',
        inputs: [{ id: 'date', label: 'Date', type: 'text', placeholder: 'e.g., A1' }],
        generate: (p) => `=MONTH(${p.date || 'date'})`,
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
        title: 'DAY Formula Generator (2026) — Extract Day from Date | Free Excel & Sheets',
        metaDescription: 'Extract the day from a date.',
        excelFunction: 'DAY',
        category: 'Date',
        description: 'Returns the day of a date, a number from 1 to 31.',
        inputs: [{ id: 'date', label: 'Date', type: 'text', placeholder: 'e.g., A1' }],
        generate: (p) => `=DAY(${p.date || 'date'})`,
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
        title: 'EDATE Formula Generator (2026) — Add or Subtract Months | Free Excel & Sheets',
        metaDescription: 'Add or subtract months in Excel and Google Sheets. Free EDATE tool for date calculations. No signup required. Calculate future or past dates.',
        excelFunction: 'EDATE',
        category: 'Date',
        description: 'Returns a date that is a specified number of months before or after a given date.',
        inputs: [
            { id: 'start_date', label: 'Start Date', type: 'text', placeholder: 'e.g., A1' },
            { id: 'months', label: 'Months to Add', type: 'number', placeholder: 'e.g., 3 or -6' },
        ],
        generate: (p) => `=EDATE(${p.start_date || 'start_date'}, ${p.months || '1'})`,
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
        title: 'EOMONTH Formula Generator (2026) — Get Month End Date | Free Excel & Sheets',
        metaDescription: 'Get month end dates in Excel and Google Sheets. Free EOMONTH tool for last day calculations. No signup required. Perfect for financial reports.',
        excelFunction: 'EOMONTH',
        category: 'Date',
        description: 'Returns the last day of the month a specified number of months before or after a date.',
        inputs: [
            { id: 'start_date', label: 'Start Date', type: 'text', placeholder: 'e.g., A1' },
            { id: 'months', label: 'Month Offset', type: 'number', placeholder: 'e.g., 0 for current month' },
        ],
        generate: (p) => `=EOMONTH(${p.start_date || 'start_date'}, ${p.months || '0'})`,
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
        title: 'COUNTA Formula Generator (2026) — Count Non-Empty Cells | Free Excel & Sheets',
        metaDescription: 'Count number of non-empty cells in a range.',
        excelFunction: 'COUNTA',
        category: 'Math',
        description: 'Counts number of cells that are not empty in a range.',
        inputs: [{ id: 'range', label: 'Range', type: 'range', placeholder: 'e.g., A1:A100' }],
        generate: (p) => `=COUNTA(${p.range || 'range'})`,
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
        title: 'COUNTBLANK Formula Generator (2026) — Count Empty Cells | Free Excel & Sheets',
        metaDescription: 'Count number of empty cells in a range.',
        excelFunction: 'COUNTBLANK',
        category: 'Math',
        description: 'Counts the number of empty cells in a specified range.',
        inputs: [{ id: 'range', label: 'Range', type: 'range', placeholder: 'e.g., A1:A100' }],
        generate: (p) => `=COUNTBLANK(${p.range || 'range'})`,
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
