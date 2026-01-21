import { FormulaInput } from './formulas';

export interface SolutionScenario {
    id: string;
    name: string;
    description: string;
    defaultValues: Record<string, string>;
}

export interface SolutionTool {
    id: string;
    name: string;
    description: string;
    formulaSlug: string;
    inputs: FormulaInput[];
    generate: (params: Record<string, string>) => string;
}

export interface SolutionConfig {
    slug: string;
    title: string;
    metaDescription: string;
    icon: string;
    description: string;
    tools: SolutionTool[];
    scenarios: SolutionScenario[];
    richContent: string;
}

export const SOLUTIONS: SolutionConfig[] = [
    // 1. Data Cleaning Hub
    {
        slug: 'data-cleaning',
        title: 'Email Extractor & Data Cleanup Tools | Free Online',
        metaDescription: 'Extract emails from messy text, pull domains from URLs, and clean up formatting issues. Free tools for marketers, sales teams, and data analysts.',
        icon: 'Mail',
        description: 'Pull emails, domains & clean messy data in seconds',
        tools: [
            {
                id: 'extract-email',
                name: 'Email Extractor',
                description: 'Pull all email addresses from any text',
                formulaSlug: 'extract-email',
                inputs: [
                    { id: 'target_cell', label: 'Cell with Text', type: 'text', placeholder: 'e.g., A2' }
                ],
                generate: (p) => `=REGEXEXTRACT(${p.target_cell || 'A2'}, "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}")`
            },
            {
                id: 'extract-domain',
                name: 'Domain Extractor',
                description: 'Get the domain name from any URL',
                formulaSlug: 'extract-domain',
                inputs: [
                    { id: 'target_cell', label: 'Cell with URL', type: 'text', placeholder: 'e.g., A2' }
                ],
                generate: (p) => `=REGEXEXTRACT(${p.target_cell || 'A2'}, "^(?:https?:\\/\\/)?(?:www\\.)?([^\\/]+)")`
            },
            {
                id: 'trim-text',
                name: 'Remove Extra Spaces',
                description: 'Clean up double spaces and trailing whitespace',
                formulaSlug: 'trim',
                inputs: [
                    { id: 'text', label: 'Cell to Clean', type: 'text', placeholder: 'e.g., A2' }
                ],
                generate: (p) => `=TRIM(${p.text || 'A2'})`
            },
            {
                id: 'proper-case',
                name: 'Fix Capitalization',
                description: 'Convert text to Title Case (like names)',
                formulaSlug: 'proper',
                inputs: [
                    { id: 'text', label: 'Cell to Format', type: 'text', placeholder: 'e.g., A2' }
                ],
                generate: (p) => `=PROPER(${p.text || 'A2'})`
            }
        ],
        scenarios: [
            {
                id: 'crm-cleanup',
                name: 'CRM/Salesforce Export',
                description: 'Clean up messy contact lists from your CRM',
                defaultValues: { target_cell: 'A2' }
            },
            {
                id: 'linkedin-leads',
                name: 'LinkedIn Lead List',
                description: 'Extract emails from LinkedIn Sales Navigator exports',
                defaultValues: { target_cell: 'B2' }
            },
            {
                id: 'web-scrape',
                name: 'Web Scraped Data',
                description: 'Clean data copied from websites or PDFs',
                defaultValues: { text: 'A2' }
            }
        ],
        richContent: `
<div class="prose max-w-none">
  <h2 class="text-2xl font-bold mb-4">Stop Wasting Time on Data Cleanup</h2>
  <p class="mb-4">If you've ever spent hours manually cleaning up a messy spreadsheet from Salesforce, HubSpot, or a web scrape, you know the pain. These tools automate the tedious stuff so you can focus on what matters.</p>
  
  <h3 class="text-xl font-semibold mb-2">What You Can Do</h3>
  <ul class="list-disc pl-6 mb-4">
    <li><strong>Pull emails</strong> from messy text blocks (like company descriptions or LinkedIn bios)</li>
    <li><strong>Extract domains</strong> from URL lists for competitor analysis or lead research</li>
    <li><strong>Fix formatting</strong> issues like ALL CAPS names or extra spaces</li>
  </ul>
  
  <h3 class="text-xl font-semibold mb-2">Why Use Formulas?</h3>
  <p class="mb-4">Sure, you could use ChatGPT or copy-paste into an online tool. But formulas give you:</p>
  <ul class="list-disc pl-6 mb-4">
    <li>✅ <strong>Instant results</strong> – no waiting for AI responses</li>
    <li>✅ <strong>Bulk processing</strong> – drag the formula down 10,000 rows</li>
    <li>✅ <strong>100% accuracy</strong> – regex doesn't hallucinate</li>
    <li>✅ <strong>No data privacy concerns</strong> – everything stays in your spreadsheet</li>
  </ul>
  
  <div class="bg-green-50 border border-green-200 rounded-lg p-4 my-4">
    <p class="text-sm text-green-800"><strong>💡 Pro tip:</strong> After extracting emails, always run TRIM to remove any hidden spaces that could break your email campaigns.</p>
  </div>
</div>
`
    },

    // 2. HR & Project Time Calculator
    {
        slug: 'hr-time-calculator',
        title: 'Business Days Calculator | Workdays Between Dates',
        metaDescription: 'Calculate working days between dates, excluding weekends and holidays. Perfect for project planning, PTO tracking, and contract management.',
        icon: 'Calendar',
        description: 'Count workdays, calculate tenure & track deadlines',
        tools: [
            {
                id: 'networkdays',
                name: 'Business Days Counter',
                description: 'Count workdays between two dates (skips weekends)',
                formulaSlug: 'networkdays',
                inputs: [
                    { id: 'start_date', label: 'Start Date', type: 'text', placeholder: 'e.g., A2 or "1/15/2024"' },
                    { id: 'end_date', label: 'End Date', type: 'text', placeholder: 'e.g., B2 or "3/15/2024"' },
                    { id: 'holidays', label: 'Holidays (optional)', type: 'text', placeholder: 'e.g., C2:C10' }
                ],
                generate: (p) => {
                    const args = [p.start_date || 'start_date', p.end_date || 'end_date'];
                    if (p.holidays) args.push(p.holidays);
                    return `=NETWORKDAYS(${args.join(', ')})`;
                }
            },
            {
                id: 'datedif',
                name: 'Time Between Dates',
                description: 'Calculate years, months, or days between dates',
                formulaSlug: 'datedif',
                inputs: [
                    { id: 'start_date', label: 'Start Date', type: 'text', placeholder: 'e.g., A2 (hire date)' },
                    { id: 'end_date', label: 'End Date', type: 'text', placeholder: 'e.g., TODAY()' },
                    { 
                        id: 'unit', 
                        label: 'What to Calculate', 
                        type: 'select',
                        options: [
                            { label: 'Years (for tenure)', value: '"Y"' },
                            { label: 'Months (total)', value: '"M"' },
                            { label: 'Days (total)', value: '"D"' },
                            { label: 'Months (after full years)', value: '"YM"' },
                            { label: 'Days (after full months)', value: '"MD"' }
                        ]
                    }
                ],
                generate: (p) => `=DATEDIF(${p.start_date || 'start_date'}, ${p.end_date || 'end_date'}, ${p.unit || '"Y"'})`
            },
            {
                id: 'edate',
                name: 'Future Date Calculator',
                description: 'Find a date X months from now',
                formulaSlug: 'edate',
                inputs: [
                    { id: 'start_date', label: 'Starting Date', type: 'text', placeholder: 'e.g., A2' },
                    { id: 'months', label: 'Months to Add', type: 'number', placeholder: 'e.g., 12' }
                ],
                generate: (p) => `=EDATE(${p.start_date || 'start_date'}, ${p.months || '12'})`
            }
        ],
        scenarios: [
            {
                id: 'project-deadline',
                name: 'Project Timeline',
                description: 'How many actual working days do we have?',
                defaultValues: { start_date: 'A2', end_date: 'B2' }
            },
            {
                id: 'employee-tenure',
                name: 'Employee Tenure',
                description: 'Calculate years of service for reviews or PTO',
                defaultValues: { start_date: 'A2', end_date: 'TODAY()', unit: '"Y"' }
            },
            {
                id: 'contract-renewal',
                name: 'Contract Renewal Date',
                description: 'When does this 12-month contract expire?',
                defaultValues: { start_date: 'A2', months: '12' }
            }
        ],
        richContent: `
<div class="prose max-w-none">
  <h2 class="text-2xl font-bold mb-4">Finally, Accurate Date Math</h2>
  <p class="mb-4">Anyone who's tried to calculate "how many business days until launch?" by counting on a calendar knows it's a nightmare. These formulas handle weekends, holidays, and all the edge cases.</p>
  
  <h3 class="text-xl font-semibold mb-2">Common Use Cases</h3>
  <table class="w-full border-collapse border border-gray-300 mb-4">
    <tr class="bg-gray-100">
      <th class="border border-gray-300 p-2 text-left">Task</th>
      <th class="border border-gray-300 p-2 text-left">Formula</th>
      <th class="border border-gray-300 p-2 text-left">Example</th>
    </tr>
    <tr>
      <td class="border border-gray-300 p-2">Project planning</td>
      <td class="border border-gray-300 p-2 font-mono text-sm">NETWORKDAYS</td>
      <td class="border border-gray-300 p-2">"We have 47 business days"</td>
    </tr>
    <tr>
      <td class="border border-gray-300 p-2">PTO accrual</td>
      <td class="border border-gray-300 p-2 font-mono text-sm">DATEDIF</td>
      <td class="border border-gray-300 p-2">"3 years, 4 months tenure"</td>
    </tr>
    <tr>
      <td class="border border-gray-300 p-2">Subscription renewals</td>
      <td class="border border-gray-300 p-2 font-mono text-sm">EDATE</td>
      <td class="border border-gray-300 p-2">"Renews on 3/15/2025"</td>
    </tr>
  </table>
  
  <h3 class="text-xl font-semibold mb-2">Don't Forget Holidays</h3>
  <p class="mb-4">NETWORKDAYS automatically skips Saturdays and Sundays. To also skip holidays (like July 4th, Thanksgiving, Christmas), just add a range with your holiday dates.</p>
  
  <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 my-4">
    <p class="text-sm text-blue-800"><strong>💡 Pro tip:</strong> To show tenure as "3 years, 2 months", combine formulas: <code>=DATEDIF(A2,TODAY(),"Y") & " years, " & DATEDIF(A2,TODAY(),"YM") & " months"</code></p>
  </div>
</div>
`
    },

    // 3. Loan Payment Calculator
    {
        slug: 'loan-calculator',
        title: 'Loan Payment Calculator | Mortgage, Auto & Personal',
        metaDescription: 'Calculate your monthly payment for mortgages, car loans, and personal loans. See exactly what you\'ll pay with different rates and terms.',
        icon: 'Banknote',
        description: 'Figure out monthly payments for any loan type',
        tools: [
            {
                id: 'mortgage',
                name: 'Mortgage Payment',
                description: 'Calculate your monthly house payment',
                formulaSlug: 'pmt',
                inputs: [
                    { id: 'annual_rate', label: 'Interest Rate (%)', type: 'number', placeholder: 'e.g., 6.875' },
                    { id: 'years', label: 'Loan Term (years)', type: 'number', placeholder: 'e.g., 30' },
                    { id: 'principal', label: 'Loan Amount ($)', type: 'number', placeholder: 'e.g., 350000' }
                ],
                generate: (p) => {
                    const rate = p.annual_rate ? `${p.annual_rate}%/12` : 'annual_rate/12';
                    const nper = p.years ? `${p.years}*12` : 'years*12';
                    const pv = p.principal || 'principal';
                    return `=PMT(${rate}, ${nper}, -${pv})`;
                }
            },
            {
                id: 'car-loan',
                name: 'Auto Loan Payment',
                description: 'Calculate your monthly car payment',
                formulaSlug: 'pmt',
                inputs: [
                    { id: 'annual_rate', label: 'Interest Rate (%)', type: 'number', placeholder: 'e.g., 5.49' },
                    { id: 'years', label: 'Loan Term (years)', type: 'number', placeholder: 'e.g., 5' },
                    { id: 'principal', label: 'Amount Financed ($)', type: 'number', placeholder: 'e.g., 32000' }
                ],
                generate: (p) => {
                    const rate = p.annual_rate ? `${p.annual_rate}%/12` : 'annual_rate/12';
                    const nper = p.years ? `${p.years}*12` : 'years*12';
                    const pv = p.principal || 'principal';
                    return `=PMT(${rate}, ${nper}, -${pv})`;
                }
            },
            {
                id: 'personal-loan',
                name: 'Personal Loan Payment',
                description: 'Calculate payments for personal/unsecured loans',
                formulaSlug: 'pmt',
                inputs: [
                    { id: 'annual_rate', label: 'Interest Rate (%)', type: 'number', placeholder: 'e.g., 11.5' },
                    { id: 'months', label: 'Loan Term (months)', type: 'number', placeholder: 'e.g., 36' },
                    { id: 'principal', label: 'Loan Amount ($)', type: 'number', placeholder: 'e.g., 10000' }
                ],
                generate: (p) => {
                    const rate = p.annual_rate ? `${p.annual_rate}%/12` : 'annual_rate/12';
                    const nper = p.months || 'months';
                    const pv = p.principal || 'principal';
                    return `=PMT(${rate}, ${nper}, -${pv})`;
                }
            }
        ],
        scenarios: [
            {
                id: 'starter-home',
                name: 'First Home (30-year)',
                description: 'Typical first-time homebuyer scenario',
                defaultValues: { annual_rate: '6.875', years: '30', principal: '350000' }
            },
            {
                id: 'new-car',
                name: 'New Car (60 months)',
                description: 'Standard 5-year auto financing',
                defaultValues: { annual_rate: '5.49', years: '5', principal: '32000' }
            },
            {
                id: 'debt-consolidation',
                name: 'Debt Consolidation',
                description: 'Personal loan to pay off credit cards',
                defaultValues: { annual_rate: '11.5', months: '36', principal: '15000' }
            }
        ],
        richContent: `
<div class="prose max-w-none">
  <h2 class="text-2xl font-bold mb-4">Know Your Numbers Before You Sign</h2>
  <p class="mb-4">Whether you're shopping for a house, a car, or comparing personal loan offers, knowing your exact monthly payment helps you budget and negotiate better.</p>
  
  <h3 class="text-xl font-semibold mb-2">How the PMT Formula Works</h3>
  <p class="mb-4 font-mono bg-gray-100 p-3 rounded">=PMT(rate, number_of_payments, loan_amount)</p>
  <ul class="list-disc pl-6 mb-4">
    <li><strong>Rate:</strong> Your annual rate divided by 12 (for monthly payments)</li>
    <li><strong>Number of payments:</strong> Years × 12 for monthly</li>
    <li><strong>Loan amount:</strong> What you're borrowing (use negative for amount you owe)</li>
  </ul>
  
  <h3 class="text-xl font-semibold mb-2">Current Rate Ranges (2024)</h3>
  <table class="w-full border-collapse border border-gray-300 mb-4">
    <tr class="bg-gray-100">
      <th class="border border-gray-300 p-2 text-left">Loan Type</th>
      <th class="border border-gray-300 p-2 text-left">Good Credit</th>
      <th class="border border-gray-300 p-2 text-left">Average Credit</th>
    </tr>
    <tr>
      <td class="border border-gray-300 p-2">30-year Mortgage</td>
      <td class="border border-gray-300 p-2">6.5% - 7.0%</td>
      <td class="border border-gray-300 p-2">7.0% - 7.5%</td>
    </tr>
    <tr>
      <td class="border border-gray-300 p-2">Auto Loan (new)</td>
      <td class="border border-gray-300 p-2">5.0% - 6.0%</td>
      <td class="border border-gray-300 p-2">7.0% - 10.0%</td>
    </tr>
    <tr>
      <td class="border border-gray-300 p-2">Personal Loan</td>
      <td class="border border-gray-300 p-2">8% - 12%</td>
      <td class="border border-gray-300 p-2">15% - 25%</td>
    </tr>
  </table>
  
  <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-4">
    <p class="text-sm text-yellow-800"><strong>⚠️ Heads up:</strong> This calculates principal + interest only. Your actual mortgage payment will also include property taxes, homeowner's insurance, and possibly PMI.</p>
  </div>
</div>
`
    },

    // 4. Multi-Criteria Analysis
    {
        slug: 'multi-criteria-analysis',
        title: 'SUMIFS & COUNTIFS Generator | Conditional Formulas',
        metaDescription: 'Build SUMIFS and COUNTIFS formulas to analyze data with multiple conditions. Sum sales by region and product, count leads by status and source.',
        icon: 'Calculator',
        description: 'Sum & count data with multiple filters',
        tools: [
            {
                id: 'sumifs',
                name: 'Sum with Multiple Conditions',
                description: 'Add up values that match several criteria',
                formulaSlug: 'sumifs',
                inputs: [
                    { id: 'sum_range', label: 'Numbers to Sum', type: 'range', placeholder: 'e.g., D:D (revenue column)' },
                    { id: 'criteria_range1', label: 'Filter Column 1', type: 'range', placeholder: 'e.g., A:A (region)' },
                    { id: 'criteria1', label: 'Filter Value 1', type: 'text', placeholder: 'e.g., "West"' },
                    { id: 'criteria_range2', label: 'Filter Column 2', type: 'range', placeholder: 'e.g., B:B (product)' },
                    { id: 'criteria2', label: 'Filter Value 2', type: 'text', placeholder: 'e.g., "Pro Plan"' }
                ],
                generate: (p) => `=SUMIFS(${p.sum_range || 'sum_range'}, ${p.criteria_range1 || 'criteria_range1'}, ${p.criteria1 || 'criteria1'}, ${p.criteria_range2 || 'criteria_range2'}, ${p.criteria2 || 'criteria2'})`
            },
            {
                id: 'countifs',
                name: 'Count with Multiple Conditions',
                description: 'Count rows that match several criteria',
                formulaSlug: 'countifs',
                inputs: [
                    { id: 'criteria_range1', label: 'Filter Column 1', type: 'range', placeholder: 'e.g., A:A (status)' },
                    { id: 'criteria1', label: 'Filter Value 1', type: 'text', placeholder: 'e.g., "Won"' },
                    { id: 'criteria_range2', label: 'Filter Column 2', type: 'range', placeholder: 'e.g., B:B (source)' },
                    { id: 'criteria2', label: 'Filter Value 2', type: 'text', placeholder: 'e.g., "Referral"' }
                ],
                generate: (p) => `=COUNTIFS(${p.criteria_range1 || 'criteria_range1'}, ${p.criteria1 || 'criteria1'}, ${p.criteria_range2 || 'criteria_range2'}, ${p.criteria2 || 'criteria2'})`
            },
            {
                id: 'iferror',
                name: 'Handle Errors Gracefully',
                description: 'Show a custom message instead of ugly errors',
                formulaSlug: 'iferror',
                inputs: [
                    { id: 'formula', label: 'Your Formula', type: 'text', placeholder: 'e.g., A1/B1 or VLOOKUP(...)' },
                    { id: 'error_value', label: 'Show Instead of Error', type: 'text', placeholder: 'e.g., "N/A" or 0' }
                ],
                generate: (p) => `=IFERROR(${p.formula || 'your_formula'}, ${p.error_value || '""'})`
            }
        ],
        scenarios: [
            {
                id: 'sales-by-region',
                name: 'Sales by Region & Product',
                description: 'Total revenue for West region, Pro Plan only',
                defaultValues: { sum_range: 'D:D', criteria_range1: 'A:A', criteria1: '"West"', criteria_range2: 'B:B', criteria2: '"Pro Plan"' }
            },
            {
                id: 'lead-conversion',
                name: 'Lead Conversion Analysis',
                description: 'Count won deals from referrals',
                defaultValues: { criteria_range1: 'C:C', criteria1: '"Won"', criteria_range2: 'D:D', criteria2: '"Referral"' }
            },
            {
                id: 'clean-reports',
                name: 'Clean Up Report Errors',
                description: 'Replace #N/A with "Not Found"',
                defaultValues: { formula: 'VLOOKUP(A2, Data!A:B, 2, FALSE)', error_value: '"Not Found"' }
            }
        ],
        richContent: `
<div class="prose max-w-none">
  <h2 class="text-2xl font-bold mb-4">Answer Complex Questions with One Formula</h2>
  <p class="mb-4">"What's our total revenue from Enterprise customers in Q4?" "How many deals did we close from LinkedIn ads?" These tools build the formulas that answer questions like these.</p>
  
  <h3 class="text-xl font-semibold mb-2">SUMIFS vs SUMIF: What's the Difference?</h3>
  <table class="w-full border-collapse border border-gray-300 mb-4">
    <tr class="bg-gray-100">
      <th class="border border-gray-300 p-2 text-left">Feature</th>
      <th class="border border-gray-300 p-2 text-left">SUMIF</th>
      <th class="border border-gray-300 p-2 text-left">SUMIFS</th>
    </tr>
    <tr>
      <td class="border border-gray-300 p-2">Number of conditions</td>
      <td class="border border-gray-300 p-2">Just one</td>
      <td class="border border-gray-300 p-2">As many as you need</td>
    </tr>
    <tr>
      <td class="border border-gray-300 p-2">Argument order</td>
      <td class="border border-gray-300 p-2">Range, criteria, sum</td>
      <td class="border border-gray-300 p-2">Sum range first</td>
    </tr>
    <tr>
      <td class="border border-gray-300 p-2">When to use</td>
      <td class="border border-gray-300 p-2">Simple filters</td>
      <td class="border border-gray-300 p-2">Real-world analysis</td>
    </tr>
  </table>
  
  <h3 class="text-xl font-semibold mb-2">Criteria Cheat Sheet</h3>
  <ul class="list-disc pl-6 mb-4">
    <li><code>"West"</code> – exact match</li>
    <li><code>">1000"</code> – greater than 1000</li>
    <li><code>"<>"&A1</code> – not equal to value in A1</li>
    <li><code>"*LLC*"</code> – contains "LLC" anywhere</li>
    <li><code>">="&DATE(2024,1,1)</code> – on or after Jan 1, 2024</li>
  </ul>
  
  <div class="bg-purple-50 border border-purple-200 rounded-lg p-4 my-4">
    <p class="text-sm text-purple-800"><strong>💡 Pro tip:</strong> For really complex analysis, pivot tables might be easier. But SUMIFS is perfect for dashboards where you need specific calculated values.</p>
  </div>
</div>
`
    }
];
