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
        title: 'Free VLOOKUP Generator - Excel & Google Sheets | No Signup',
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
    },

    // 2. IF
    {
        slug: 'if',
        title: 'IF Formula Generator - Create IF-THEN Statements | Free',
        metaDescription: 'Build IF formulas for Excel and Google Sheets. Handle nested IF, IF-AND, IF-OR conditions. Free generator with examples. No signup required.',
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
            { title: 'IF returns #NAME? or wrong result', causes: ['Text in value_if_true/value_if_false not in double quotes.', 'Misspelled function name (IF not IFF).', 'Too many nested IFs; limit in Excel is 64.'], fixes: ['Put all literal text in quotes: "Pass", "Fail".', 'Check spelling; use IFS for many conditions instead of nesting.' , 'Use IFS or SWITCH for cleaner multi-condition logic.'] },
        ],
    },

    // 3. SUMIF
    {
        slug: 'sumif',
        title: 'SUMIF Generator - Sum with Conditions | Excel & Sheets',
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
        title: 'COUNTIF Generator - Count Cells by Criteria | Excel & Sheets',
        metaDescription: 'Build COUNTIF formulas to count cells that meet a criterion (text, number, date). Free tool for Excel and Google Sheets. No signup.',
        excelFunction: 'COUNTIF',
        category: 'Math',
        description: 'Counts the number of cells within a range that meet the given condition.',
        inputs: [
            { id: 'range', label: 'Range to Count', type: 'range', placeholder: 'e.g., A1:A10' },
            { id: 'criteria', label: 'Criteria', type: 'text', placeholder: 'e.g., ">100" or "Completed"' },
        ],
        generate: (p) => `=COUNTIF(${p.range || 'range'}, ${p.criteria || 'criteria'})`,
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
        title: 'CONCATENATE Generator - Join Text with Separator | Excel & Sheets',
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
        title: 'INDEX MATCH Generator - More Powerful Than VLOOKUP',
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
    },

    // 7. XLOOKUP
    {
        slug: 'xlookup',
        title: 'XLOOKUP Generator - Modern VLOOKUP Replacement | Free',
        metaDescription: 'Generate XLOOKUP formulas for Excel and Google Sheets. The modern replacement for VLOOKUP with built-in error handling. Free, no signup.',
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
        }
    },

    // 18. PMT
    {
        slug: 'pmt',
        title: 'Free PMT Formula Generator',
        metaDescription: 'Calculate loan payments in Excel and Google Sheets. Free PMT tool for monthly payments. No signup required. Based on rate, periods, and loan amount.',
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
        metaDescription: 'Extract domain names from URLs in Excel and Google Sheets. Free REGEXEXTRACT tool for SEO. No signup required. Parse URLs instantly.',
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
        metaDescription: 'Extract first word from text in Excel and Google Sheets. Free LEFT and FIND tool. No signup required. Get first names or keywords instantly.',
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
        metaDescription: 'Remove first N characters in Excel and Google Sheets. Free RIGHT and LEN tool. No signup required. Clean text data instantly.',
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
        title: 'SUMIFS Generator - Sum with Multiple Criteria | Excel & Sheets',
        metaDescription: 'Sum cells that meet two or more conditions. Free SUMIFS builder for Excel and Google Sheets. Sum range first, then criteria pairs. No signup.',
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
        faq: [
            { question: 'Why is SUMIFS argument order different from SUMIF?', answer: 'SUMIFS puts the sum range first, then each criteria_range and criteria pair. SUMIF uses range, criteria, sum_range. Mixing them up causes wrong results or errors.' },
            { question: 'Why does SUMIFS return 0?', answer: 'Check that criteria match data types (text in quotes, numbers with operators like ">100"). Ensure all criteria ranges have the same number of rows as the sum range.' },
            { question: 'Can SUMIFS use wildcards?', answer: 'Yes. Use * for any characters and ? for one: =SUMIFS(C:C, A:A, "*North*", B:B, ">100").' },
            { question: 'How do I sum between two dates with SUMIFS?', answer: 'Use two criteria on the date column: criteria_range1 date column with ">="&start_date, criteria_range2 same column with "<="&end_date.' },
            { question: 'When should I use SUMIFS vs SUMIF?', answer: 'Use SUMIF for one condition; SUMIFS when you need two or more conditions (e.g. region and product, or date range).' },
        ],
        commonErrors: [
            { title: 'SUMIFS returns 0 or wrong total', causes: ['Sum range and criteria ranges have different heights or columns.', 'Criteria in wrong order (text without quotes, date not as DATE() or cell ref).', 'Using SUMIF-style argument order (sum range must come first in SUMIFS).'], fixes: ['Use same-sized ranges: e.g. A1:A100, B1:B100, C1:C100.', 'Put text in quotes; use ">="&A1 for dates where A1 is a date.', 'Syntax: =SUMIFS(sum_range, criteria_range1, criteria1, criteria_range2, criteria2).'] },
        ],
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
        title: 'COUNTIFS Generator - Count with Multiple Criteria | Excel & Sheets',
        metaDescription: 'Count cells that meet two or more conditions. Free COUNTIFS builder for Excel and Google Sheets. No signup.',
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
        title: 'Free AVERAGEIF Formula Generator',
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
        }
    },

    // 28. IFERROR - Error Handling
    {
        slug: 'iferror',
        title: 'IFERROR Generator - Hide Errors, Show Fallback | Excel & Sheets',
        metaDescription: 'Wrap formulas in IFERROR to show a fallback value instead of #N/A, #DIV/0!, #VALUE!. Free tool for Excel and Google Sheets. No signup.',
        excelFunction: 'IFERROR',
        category: 'Logic',
        description: 'Returns a value you specify if a formula evaluates to an error; otherwise returns the result of the formula.',
        inputs: [
            { id: 'value', label: 'Formula to Check', type: 'text', placeholder: 'e.g., A1/B1' },
            { id: 'value_if_error', label: 'Value if Error', type: 'text', placeholder: 'e.g., 0 or "N/A"' },
        ],
        generate: (p) => `=IFERROR(${p.value || 'value'}, ${p.value_if_error || '""'})`,
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
        title: 'Free IFS Formula Generator',
        metaDescription: 'Generate IFS formulas in Excel and Google Sheets. Free tool for multiple conditions. No signup required. Replace nested IF statements easily.',
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
        metaDescription: 'Replace text in Excel and Google Sheets. Free SUBSTITUTE tool for data cleaning. No signup required. Swap characters or words instantly.',
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
        generate: (p) => `=TEXT(${p.value || 'value'}, ${p.format || '"#,##0"'})`
    },

    // 36. ROUND - Round Numbers
    {
        slug: 'round',
        title: 'Free ROUND Formula Generator',
        metaDescription: 'Round numbers in Excel and Google Sheets. Free ROUND tool for decimal places. No signup required. Format values precisely and easily.',
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
        metaDescription: 'Round numbers up in Excel and Google Sheets. Free ROUNDUP tool for ceiling values. No signup required. Always round away from zero.',
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
        metaDescription: 'Round numbers down in Excel and Google Sheets. Free ROUNDDOWN tool for floor values. No signup required. Always round toward zero.',
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
        metaDescription: 'Add or subtract months in Excel and Google Sheets. Free EDATE tool for date calculations. No signup required. Calculate future or past dates.',
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
        metaDescription: 'Get month end dates in Excel and Google Sheets. Free EOMONTH tool for last day calculations. No signup required. Perfect for financial reports.',
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
