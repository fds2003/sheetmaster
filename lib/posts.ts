export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  content?: string;
}

export const POSTS: Post[] = [
  {
    slug: 'vlookup-vs-xlookup-2026',
    title: 'VLOOKUP vs XLOOKUP: Which Should You Use in 2026?',
    description: 'Compare VLOOKUP and XLOOKUP: syntax, use cases, and when to use each in Excel and Google Sheets.',
    date: '2026-01-15',
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
    description: 'SUMIF has one condition; SUMIFS has multiple. Learn when to use each with examples.',
    date: '2026-01-05',
    content: '<p>SUMIF sums cells that meet one criterion. SUMIFS sums cells that meet two or more criteria. Both work in Excel and Google Sheets.</p><p>Build your formula with our <a href="/formulas/sumif">SUMIF Generator</a> or <a href="/formulas/sumifs">SUMIFS Generator</a>.</p>',
  },
];
