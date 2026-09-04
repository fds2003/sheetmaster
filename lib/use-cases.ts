export interface UseCase {
  slug: string;
  title: string;
  description: string;
  icon: string;
  formulaSlugs: string[];
}

export const USE_CASES: UseCase[] = [
  {
    slug: 'ecommerce',
    title: 'For Ecommerce Sellers',
    description: 'Master spreadsheet automation for e-commerce: clean customer data, calculate profit margins, track inventory levels, and manage multi-channel SKU pricing.',
    icon: '📦',
    formulaSlugs: ['vlookup', 'xlookup', 'if', 'sumifs', 'extract-email']
  },
  {
    slug: 'hr',
    title: 'For HR Professionals',
    description: 'Essential Excel formulas for HR teams: calculate employee tenure, summarize monthly work hours, automate birthday alerts, and parse staff names effortlessly.',
    icon: '👥',
    formulaSlugs: ['datedif', 'networkdays', 'sumifs', 'countifs', 'get-first-word']
  },
  {
    slug: 'finance',
    title: 'For Finance & Accounting',
    description: 'Speed up financial modeling in Excel: calculate loan amortizations, analyze cash flows, reconcile general ledger accounts, and build automated reports.',
    icon: '💰',
    formulaSlugs: ['pmt', 'sumifs', 'index-match', 'vlookup', 'iferror']
  },
  {
    slug: 'marketing',
    title: 'For Marketers & SEO',
    description: 'Streamline digital marketing analytics: extract domains from backlink lists, build campaign UTM tracking URLs, and parse complex web analytics datasets.',
    icon: '📈',
    formulaSlugs: ['extract-domain', 'extract-email', 'concatenate', 'trim']
  }
];
