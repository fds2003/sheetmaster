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
    description:
      'SUMIF vs SUMIFS explained: comparison table, syntax, and examples. When one condition is enough vs when you need SUMIFS—plus our SUMIFS formula generator.',
    date: '2026-01-05',
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
