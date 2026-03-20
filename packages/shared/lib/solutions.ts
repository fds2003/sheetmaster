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
    // 1. Data Cleaning Hub (RETAINED)
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
            }
        ],
        richContent: `
<div class="prose max-w-none">
  <h2 class="text-2xl font-bold mb-4">Stop Wasting Time on Data Cleanup</h2>
  <p class="mb-4">If you've ever spent hours manually cleaning up a messy spreadsheet from Salesforce, HubSpot, or a web scrape, you know the pain. These tools automate the tedious stuff so you can focus on what matters.</p>
  
  <h3 class="text-xl font-semibold mb-2">What You Can Do</h3>
  <ul class="list-disc pl-6 mb-4">
    <li><strong>Pull emails</strong> from messy text blocks</li>
    <li><strong>Extract domains</strong> from URL lists for competitor analysis</li>
    <li><strong>Fix formatting</strong> issues like ALL CAPS names or extra spaces</li>
  </ul>
  
  <div class="bg-green-50 border border-green-200 rounded-lg p-4 my-4">
    <p class="text-sm text-green-800"><strong>💡 Pro tip:</strong> After extracting emails, always run TRIM to remove any hidden spaces that could break your email campaigns.</p>
  </div>
</div>
`
    },

    // 2. Loan Payment Calculator (RETAINED)
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
            }
        ],
        richContent: `
<div class="prose max-w-none">
  <h2 class="text-2xl font-bold mb-4">Know Your Numbers Before You Sign</h2>
  <p class="mb-4">Whether you're shopping for a house, a car, or comparing personal loan offers, knowing your exact monthly payment helps you budget and negotiate better.</p>
  
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

    // 3. SEO Toolkit (NEW)
    {
        slug: 'seo-toolkit',
        title: 'URL Slug Generator & Meta Tag Checker | SEO Tools',
        metaDescription: 'Generate SEO-friendly URL slugs, check meta tag character limits, and build UTM tracking links. Free tools for content marketers and SEO specialists.',
        icon: 'Search',
        description: 'Create clean URLs, check meta lengths & build UTM links',
        tools: [
            {
                id: 'slug-generator',
                name: 'URL Slug Generator',
                description: 'Convert titles to SEO-friendly URL slugs',
                formulaSlug: 'substitute',
                inputs: [
                    { id: 'title_cell', label: 'Cell with Title', type: 'text', placeholder: 'e.g., A2' }
                ],
                generate: (p) => `=LOWER(TRIM(SUBSTITUTE(${p.title_cell || 'A2'}, " ", "-")))`
            },
            {
                id: 'meta-title-check',
                name: 'Meta Title Checker',
                description: 'Check if title exceeds 60 characters',
                formulaSlug: 'len',
                inputs: [
                    { id: 'title_cell', label: 'Cell with Title', type: 'text', placeholder: 'e.g., A2' },
                    { id: 'max_length', label: 'Max Characters', type: 'number', placeholder: 'e.g., 60' }
                ],
                generate: (p) => `=IF(LEN(${p.title_cell || 'A2'})>${p.max_length || '60'}, "Too Long ("&LEN(${p.title_cell || 'A2'})&" chars)", "OK ("&LEN(${p.title_cell || 'A2'})&" chars)")`
            },
            {
                id: 'meta-desc-check',
                name: 'Meta Description Checker',
                description: 'Check if description exceeds 160 characters',
                formulaSlug: 'len',
                inputs: [
                    { id: 'desc_cell', label: 'Cell with Description', type: 'text', placeholder: 'e.g., B2' },
                    { id: 'max_length', label: 'Max Characters', type: 'number', placeholder: 'e.g., 160' }
                ],
                generate: (p) => `=IF(LEN(${p.desc_cell || 'B2'})>${p.max_length || '160'}, "Too Long ("&LEN(${p.desc_cell || 'B2'})&" chars)", "OK ("&LEN(${p.desc_cell || 'B2'})&" chars)")`
            },
            {
                id: 'utm-builder',
                name: 'UTM Link Builder',
                description: 'Add UTM tracking parameters to URLs',
                formulaSlug: 'concatenate',
                inputs: [
                    { id: 'base_url', label: 'Base URL Cell', type: 'text', placeholder: 'e.g., A2' },
                    { id: 'source', label: 'UTM Source', type: 'text', placeholder: 'e.g., "newsletter"' },
                    { id: 'medium', label: 'UTM Medium', type: 'text', placeholder: 'e.g., "email"' },
                    { id: 'campaign', label: 'UTM Campaign', type: 'text', placeholder: 'e.g., "spring_sale"' }
                ],
                generate: (p) => `=CONCATENATE(${p.base_url || 'A2'}, "?utm_source=", ${p.source || '"source"'}, "&utm_medium=", ${p.medium || '"medium"'}, "&utm_campaign=", ${p.campaign || '"campaign"'})`
            }
        ],
        scenarios: [
            {
                id: 'blog-posts',
                name: 'Blog Post URLs',
                description: 'Generate slugs for your blog post titles',
                defaultValues: { title_cell: 'A2' }
            },
            {
                id: 'email-campaign',
                name: 'Email Campaign Links',
                description: 'Build tracked links for email newsletters',
                defaultValues: { base_url: 'A2', source: '"newsletter"', medium: '"email"', campaign: '"jan_2024"' }
            },
            {
                id: 'meta-audit',
                name: 'SEO Audit',
                description: 'Check meta tags across your site pages',
                defaultValues: { title_cell: 'A2', max_length: '60' }
            }
        ],
        richContent: `
<div class="prose max-w-none">
  <h2 class="text-2xl font-bold mb-4">SEO Tasks That Shouldn't Take All Day</h2>
  <p class="mb-4">Content marketers and SEO specialists spend too much time on repetitive tasks: converting titles to URL slugs, checking character limits, building tracking links. These formulas handle the grunt work.</p>
  
  <h3 class="text-xl font-semibold mb-2">Google's Character Limits</h3>
  <table class="w-full border-collapse border border-gray-300 mb-4">
    <tr class="bg-gray-100">
      <th class="border border-gray-300 p-2 text-left">Element</th>
      <th class="border border-gray-300 p-2 text-left">Recommended Max</th>
      <th class="border border-gray-300 p-2 text-left">What Happens If Too Long</th>
    </tr>
    <tr>
      <td class="border border-gray-300 p-2">Title Tag</td>
      <td class="border border-gray-300 p-2">60 characters</td>
      <td class="border border-gray-300 p-2">Gets truncated with "..."</td>
    </tr>
    <tr>
      <td class="border border-gray-300 p-2">Meta Description</td>
      <td class="border border-gray-300 p-2">160 characters</td>
      <td class="border border-gray-300 p-2">Gets cut off in SERPs</td>
    </tr>
    <tr>
      <td class="border border-gray-300 p-2">URL Slug</td>
      <td class="border border-gray-300 p-2">50-60 characters</td>
      <td class="border border-gray-300 p-2">Harder to read/share</td>
    </tr>
  </table>
  
  <h3 class="text-xl font-semibold mb-2">UTM Parameters Explained</h3>
  <ul class="list-disc pl-6 mb-4">
    <li><strong>utm_source:</strong> Where traffic comes from (newsletter, google, facebook)</li>
    <li><strong>utm_medium:</strong> Marketing medium (email, cpc, social)</li>
    <li><strong>utm_campaign:</strong> Campaign name (spring_sale, product_launch)</li>
  </ul>
  
  <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 my-4">
    <p class="text-sm text-blue-800"><strong>💡 Pro tip:</strong> Keep URL slugs lowercase with hyphens. Avoid underscores, special characters, and stop words like "the" or "and".</p>
  </div>
</div>
`
    },

    // 4. Inventory Manager (NEW)
    {
        slug: 'inventory-manager',
        title: 'Inventory Reorder Alert & SKU Lookup | Stock Management',
        metaDescription: 'Set up automatic reorder alerts, look up prices by SKU, and find missing product data. Free inventory tools for Amazon sellers and retail stores.',
        icon: 'Package',
        description: 'Get reorder alerts, match SKUs & find missing data',
        tools: [
            {
                id: 'reorder-alert',
                name: 'Reorder Alert',
                description: 'Flag items that need restocking',
                formulaSlug: 'if',
                inputs: [
                    { id: 'stock_cell', label: 'Current Stock Cell', type: 'text', placeholder: 'e.g., C2' },
                    { id: 'threshold', label: 'Reorder Threshold', type: 'number', placeholder: 'e.g., 10' },
                    { id: 'status_cell', label: 'Status Cell (optional)', type: 'text', placeholder: 'e.g., D2' }
                ],
                generate: (p) => {
                    if (p.status_cell) {
                        return `=IF(AND(${p.stock_cell || 'C2'}<${p.threshold || '10'}, ${p.status_cell}="Active"), "⚠️ REORDER", "OK")`;
                    }
                    return `=IF(${p.stock_cell || 'C2'}<${p.threshold || '10'}, "⚠️ REORDER", "OK")`;
                }
            },
            {
                id: 'sku-lookup',
                name: 'SKU Price Lookup',
                description: 'Find price by SKU from your price list',
                formulaSlug: 'xlookup',
                inputs: [
                    { id: 'sku_cell', label: 'SKU to Look Up', type: 'text', placeholder: 'e.g., A2' },
                    { id: 'sku_range', label: 'SKU Column (price list)', type: 'range', placeholder: 'e.g., PriceList!A:A' },
                    { id: 'price_range', label: 'Price Column', type: 'range', placeholder: 'e.g., PriceList!B:B' }
                ],
                generate: (p) => `=XLOOKUP(${p.sku_cell || 'A2'}, ${p.sku_range || 'PriceList!A:A'}, ${p.price_range || 'PriceList!B:B'}, "Not Found")`
            },
            {
                id: 'missing-data',
                name: 'Find Missing Data',
                description: 'Count empty cells in a product column',
                formulaSlug: 'countblank',
                inputs: [
                    { id: 'range', label: 'Column to Check', type: 'range', placeholder: 'e.g., E:E (description column)' }
                ],
                generate: (p) => `=COUNTBLANK(${p.range || 'E:E'})`
            },
            {
                id: 'low-stock-count',
                name: 'Low Stock Counter',
                description: 'Count how many items are below threshold',
                formulaSlug: 'countif',
                inputs: [
                    { id: 'stock_range', label: 'Stock Column', type: 'range', placeholder: 'e.g., C:C' },
                    { id: 'threshold', label: 'Below This Number', type: 'number', placeholder: 'e.g., 10' }
                ],
                generate: (p) => `=COUNTIF(${p.stock_range || 'C:C'}, "<"&${p.threshold || '10'})`
            }
        ],
        scenarios: [
            {
                id: 'amazon-fba',
                name: 'Amazon FBA Inventory',
                description: 'Track stock levels for FBA products',
                defaultValues: { stock_cell: 'C2', threshold: '15' }
            },
            {
                id: 'retail-pos',
                name: 'Retail POS System',
                description: 'Match SKUs to prices for checkout',
                defaultValues: { sku_cell: 'A2', sku_range: 'Catalog!A:A', price_range: 'Catalog!C:C' }
            },
            {
                id: 'data-quality',
                name: 'Product Data Audit',
                description: 'Find products missing descriptions or images',
                defaultValues: { range: 'E:E' }
            }
        ],
        richContent: `
<div class="prose max-w-none">
  <h2 class="text-2xl font-bold mb-4">Inventory Management Without Expensive Software</h2>
  <p class="mb-4">You don't need a $500/month inventory system to track stock levels. These formulas turn your spreadsheet into a smart inventory tracker that alerts you before you run out.</p>
  
  <h3 class="text-xl font-semibold mb-2">What You Can Track</h3>
  <ul class="list-disc pl-6 mb-4">
    <li><strong>Reorder alerts:</strong> Get a warning when stock drops below your threshold</li>
    <li><strong>SKU lookups:</strong> Automatically pull prices from your master list</li>
    <li><strong>Data quality:</strong> Find products missing descriptions, prices, or images</li>
  </ul>
  
  <h3 class="text-xl font-semibold mb-2">Why XLOOKUP Beats VLOOKUP for Inventory</h3>
  <table class="w-full border-collapse border border-gray-300 mb-4">
    <tr class="bg-gray-100">
      <th class="border border-gray-300 p-2 text-left">Feature</th>
      <th class="border border-gray-300 p-2 text-left">VLOOKUP</th>
      <th class="border border-gray-300 p-2 text-left">XLOOKUP</th>
    </tr>
    <tr>
      <td class="border border-gray-300 p-2">Lookup direction</td>
      <td class="border border-gray-300 p-2">Right only</td>
      <td class="border border-gray-300 p-2">Any direction</td>
    </tr>
    <tr>
      <td class="border border-gray-300 p-2">Column shifts</td>
      <td class="border border-gray-300 p-2">Breaks formula</td>
      <td class="border border-gray-300 p-2">No problem</td>
    </tr>
    <tr>
      <td class="border border-gray-300 p-2">"Not found" handling</td>
      <td class="border border-gray-300 p-2">Shows #N/A</td>
      <td class="border border-gray-300 p-2">Custom message</td>
    </tr>
  </table>
  
  <div class="bg-orange-50 border border-orange-200 rounded-lg p-4 my-4">
    <p class="text-sm text-orange-800"><strong>🛒 Black Friday tip:</strong> Set your reorder threshold higher before peak seasons. If you normally reorder at 10 units, bump it to 25-30 before the holidays.</p>
  </div>
</div>
`
    },

    // 5. Subscription Tracker (NEW)
    {
        slug: 'subscription-tracker',
        title: 'Membership Expiry Calculator | Subscription Management',
        metaDescription: 'Calculate subscription renewal dates, find billing cycle end dates, and track days until expiry. For SaaS, gyms, and rental services.',
        icon: 'Calendar',
        description: 'Track renewals, billing cycles & expiry dates',
        tools: [
            {
                id: 'expiry-date',
                name: 'Renewal Date Calculator',
                description: 'Find the exact date X months from signup',
                formulaSlug: 'edate',
                inputs: [
                    { id: 'start_date', label: 'Start/Signup Date', type: 'text', placeholder: 'e.g., A2' },
                    { id: 'months', label: 'Subscription Length (months)', type: 'number', placeholder: 'e.g., 12' }
                ],
                generate: (p) => `=EDATE(${p.start_date || 'A2'}, ${p.months || '12'})`
            },
            {
                id: 'billing-cycle',
                name: 'Billing Cycle End',
                description: 'Find the last day of the billing month',
                formulaSlug: 'eomonth',
                inputs: [
                    { id: 'date_cell', label: 'Any Date in Period', type: 'text', placeholder: 'e.g., A2' },
                    { id: 'months_ahead', label: 'Months Ahead (0 = current)', type: 'number', placeholder: 'e.g., 0' }
                ],
                generate: (p) => `=EOMONTH(${p.date_cell || 'A2'}, ${p.months_ahead || '0'})`
            },
            {
                id: 'days-remaining',
                name: 'Days Until Expiry',
                description: 'Count days between today and expiry',
                formulaSlug: 'datedif',
                inputs: [
                    { id: 'expiry_cell', label: 'Expiry Date Cell', type: 'text', placeholder: 'e.g., B2' }
                ],
                generate: (p) => `=DATEDIF(TODAY(), ${p.expiry_cell || 'B2'}, "D")`
            },
            {
                id: 'renewal-status',
                name: 'Renewal Status',
                description: 'Flag accounts expiring within X days',
                formulaSlug: 'if',
                inputs: [
                    { id: 'expiry_cell', label: 'Expiry Date Cell', type: 'text', placeholder: 'e.g., B2' },
                    { id: 'days_warning', label: 'Warning Days Before', type: 'number', placeholder: 'e.g., 30' }
                ],
                generate: (p) => `=IF(${p.expiry_cell || 'B2'}-TODAY()<${p.days_warning || '30'}, "⚠️ Expiring Soon", IF(${p.expiry_cell || 'B2'}<TODAY(), "❌ Expired", "✅ Active"))`
            }
        ],
        scenarios: [
            {
                id: 'saas-annual',
                name: 'SaaS Annual Plans',
                description: 'Track when annual subscriptions renew',
                defaultValues: { start_date: 'A2', months: '12' }
            },
            {
                id: 'gym-membership',
                name: 'Gym Memberships',
                description: 'Monitor member expiry dates',
                defaultValues: { expiry_cell: 'B2', days_warning: '14' }
            },
            {
                id: 'lease-agreement',
                name: 'Lease Renewals',
                description: 'Track apartment or equipment lease dates',
                defaultValues: { start_date: 'A2', months: '12' }
            }
        ],
        richContent: `
<div class="prose max-w-none">
  <h2 class="text-2xl font-bold mb-4">Never Miss a Renewal Again</h2>
  <p class="mb-4">Whether you're running a SaaS business, managing a gym, or tracking lease agreements, knowing exactly when subscriptions expire is crucial for retention and cash flow.</p>
  
  <h3 class="text-xl font-semibold mb-2">Common Subscription Tracking Needs</h3>
  <table class="w-full border-collapse border border-gray-300 mb-4">
    <tr class="bg-gray-100">
      <th class="border border-gray-300 p-2 text-left">Business Type</th>
      <th class="border border-gray-300 p-2 text-left">Typical Cycle</th>
      <th class="border border-gray-300 p-2 text-left">Key Formula</th>
    </tr>
    <tr>
      <td class="border border-gray-300 p-2">SaaS Software</td>
      <td class="border border-gray-300 p-2">Monthly / Annual</td>
      <td class="border border-gray-300 p-2 font-mono text-sm">EDATE</td>
    </tr>
    <tr>
      <td class="border border-gray-300 p-2">Gym / Fitness</td>
      <td class="border border-gray-300 p-2">Monthly</td>
      <td class="border border-gray-300 p-2 font-mono text-sm">EOMONTH</td>
    </tr>
    <tr>
      <td class="border border-gray-300 p-2">Property Leases</td>
      <td class="border border-gray-300 p-2">6-12 months</td>
      <td class="border border-gray-300 p-2 font-mono text-sm">DATEDIF</td>
    </tr>
  </table>
  
  <h3 class="text-xl font-semibold mb-2">Why EDATE is Better Than Adding Days</h3>
  <p class="mb-4">If you add 30 days to January 31st, you get March 2nd. But if a customer signed up on Jan 31st for a "1 month" subscription, they expect Feb 28th (or 29th). EDATE handles this correctly.</p>
  
  <div class="bg-green-50 border border-green-200 rounded-lg p-4 my-4">
    <p class="text-sm text-green-800"><strong>💡 Pro tip:</strong> Set up a "Renewal Status" column that flags accounts 30 days before expiry. This gives your team time to reach out and reduce churn.</p>
  </div>
</div>
`
    },

    // 6. Grade Calculator (NEW)
    {
        slug: 'grade-calculator',
        title: 'Letter Grade Converter & Grade Calculator | For Teachers',
        metaDescription: 'Convert scores to letter grades, calculate class averages excluding absent students, and track attendance. Free grading tools for teachers and trainers.',
        icon: 'GraduationCap',
        description: 'Convert scores to grades, calculate averages & track attendance',
        tools: [
            {
                id: 'letter-grade',
                name: 'Letter Grade Converter',
                description: 'Convert numeric scores to A/B/C/D/F',
                formulaSlug: 'ifs',
                inputs: [
                    { id: 'score_cell', label: 'Score Cell', type: 'text', placeholder: 'e.g., B2' }
                ],
                generate: (p) => `=IFS(${p.score_cell || 'B2'}>=90, "A", ${p.score_cell || 'B2'}>=80, "B", ${p.score_cell || 'B2'}>=70, "C", ${p.score_cell || 'B2'}>=60, "D", TRUE, "F")`
            },
            {
                id: 'clean-average',
                name: 'Average (Exclude Zeros)',
                description: 'Calculate average ignoring absent/zero scores',
                formulaSlug: 'averageif',
                inputs: [
                    { id: 'score_range', label: 'Score Column', type: 'range', placeholder: 'e.g., B:B' },
                    { id: 'min_score', label: 'Minimum Valid Score', type: 'number', placeholder: 'e.g., 1' }
                ],
                generate: (p) => `=AVERAGEIF(${p.score_range || 'B:B'}, ">="&${p.min_score || '1'})`
            },
            {
                id: 'attendance-count',
                name: 'Absence Counter',
                description: 'Count how many times a status appears',
                formulaSlug: 'countif',
                inputs: [
                    { id: 'status_range', label: 'Attendance Column', type: 'range', placeholder: 'e.g., C:C' },
                    { id: 'status_value', label: 'Status to Count', type: 'text', placeholder: 'e.g., "Absent"' }
                ],
                generate: (p) => `=COUNTIF(${p.status_range || 'C:C'}, ${p.status_value || '"Absent"'})`
            },
            {
                id: 'pass-rate',
                name: 'Pass Rate Calculator',
                description: 'Calculate percentage of students passing',
                formulaSlug: 'countif',
                inputs: [
                    { id: 'score_range', label: 'Score Column', type: 'range', placeholder: 'e.g., B2:B50' },
                    { id: 'pass_threshold', label: 'Passing Score', type: 'number', placeholder: 'e.g., 60' }
                ],
                generate: (p) => `=COUNTIF(${p.score_range || 'B2:B50'}, ">="&${p.pass_threshold || '60'})/COUNT(${p.score_range || 'B2:B50'})*100 & "%"`
            }
        ],
        scenarios: [
            {
                id: 'final-grades',
                name: 'Final Grade Report',
                description: 'Convert all scores to letter grades',
                defaultValues: { score_cell: 'B2' }
            },
            {
                id: 'class-stats',
                name: 'Class Statistics',
                description: 'Calculate class average excluding no-shows',
                defaultValues: { score_range: 'B2:B30', min_score: '1' }
            },
            {
                id: 'attendance-report',
                name: 'Attendance Summary',
                description: 'Count absences for the semester',
                defaultValues: { status_range: 'C:C', status_value: '"Absent"' }
            }
        ],
        richContent: `
<div class="prose max-w-none">
  <h2 class="text-2xl font-bold mb-4">Grading Made Simple</h2>
  <p class="mb-4">Teachers spend way too much time on grade calculations. These formulas handle the repetitive work: converting scores to letters, calculating clean averages, and tracking attendance.</p>
  
  <h3 class="text-xl font-semibold mb-2">Standard US Grading Scale</h3>
  <table class="w-full border-collapse border border-gray-300 mb-4">
    <tr class="bg-gray-100">
      <th class="border border-gray-300 p-2 text-left">Score Range</th>
      <th class="border border-gray-300 p-2 text-left">Letter Grade</th>
      <th class="border border-gray-300 p-2 text-left">GPA Points</th>
    </tr>
    <tr>
      <td class="border border-gray-300 p-2">90-100</td>
      <td class="border border-gray-300 p-2 font-bold text-green-600">A</td>
      <td class="border border-gray-300 p-2">4.0</td>
    </tr>
    <tr>
      <td class="border border-gray-300 p-2">80-89</td>
      <td class="border border-gray-300 p-2 font-bold text-blue-600">B</td>
      <td class="border border-gray-300 p-2">3.0</td>
    </tr>
    <tr>
      <td class="border border-gray-300 p-2">70-79</td>
      <td class="border border-gray-300 p-2 font-bold text-yellow-600">C</td>
      <td class="border border-gray-300 p-2">2.0</td>
    </tr>
    <tr>
      <td class="border border-gray-300 p-2">60-69</td>
      <td class="border border-gray-300 p-2 font-bold text-orange-600">D</td>
      <td class="border border-gray-300 p-2">1.0</td>
    </tr>
    <tr>
      <td class="border border-gray-300 p-2">Below 60</td>
      <td class="border border-gray-300 p-2 font-bold text-red-600">F</td>
      <td class="border border-gray-300 p-2">0.0</td>
    </tr>
  </table>
  
  <h3 class="text-xl font-semibold mb-2">Why IFS Beats Nested IFs</h3>
  <p class="mb-4">The old way of writing grade formulas used nested IFs that were impossible to read. IFS lets you write conditions in order, making it easy to adjust your grading scale.</p>
  
  <div class="bg-purple-50 border border-purple-200 rounded-lg p-4 my-4">
    <p class="text-sm text-purple-800"><strong>💡 Pro tip:</strong> When calculating class averages, always exclude zeros (students who were absent). Otherwise, a few no-shows will tank your class average unfairly.</p>
  </div>
</div>
`
    }
];
