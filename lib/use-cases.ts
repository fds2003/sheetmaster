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
    description: 'Clean data, calculate margins, manage inventory.',
    icon: '📦',
    formulaSlugs: ['vlookup', 'xlookup', 'if', 'sumifs', 'extract-email']
  },
  {
    slug: 'hr',
    title: 'For HR Professionals',
    description: 'Calculate tenure, summarize hours, manage employee data.',
    icon: '👥',
    formulaSlugs: ['datedif', 'networkdays', 'sumifs', 'countifs', 'get-first-word']
  },
  {
    slug: 'finance',
    title: 'For Finance & Accounting',
    description: 'Calculate loans, analyze cash flow, match transactions.',
    icon: '💰',
    formulaSlugs: ['pmt', 'sumifs', 'index-match', 'vlookup', 'iferror']
  },
  {
    slug: 'marketing',
    title: 'For Marketers & SEO',
    description: 'Extract domains, build UTMs, parse URLs.',
    icon: '📈',
    formulaSlugs: ['extract-domain', 'extract-email', 'concatenate', 'trim']
  }
];
