# SheetMaster

![Next.js](https://img.shields.io/badge/Next.js-14.2.15-black?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-blue?logo=tailwind-css&logoColor=white)
![Formulas](https://img.shields.io/badge/Formulas-50-green)

**Build Complex Excel Formulas in Seconds** - Transform plain English into perfect Excel & Google Sheets formulas. AI-powered, 100% free, and built for ultimate productivity.

🌐 **Live Site**: [www.getsheetmaster.com](https://www.getsheetmaster.com)

## ✨ Features

- 📊 **50 Formula Generators** - VLOOKUP, SUMIFS, IFERROR, INDEX/MATCH, and more
- 🔍 **Real-time Search** - Instantly filter formulas by name, description, or category
- 🎯 **SEO Optimized** - Open Graph, Twitter Cards, Structured Data (JSON-LD)
- 🖼️ **Dynamic OG Images** - Auto-generated social sharing images
- 📱 **Responsive Design** - Works on all devices
- ⚡ **Static Generation** - Zero latency, maximum performance
- 🧭 **Breadcrumb Navigation** - Improved user experience

## 📊 Formula Categories

| Category | Count | Examples |
|----------|-------|----------|
| **Lookup** | 4 | VLOOKUP, XLOOKUP, INDEX/MATCH |
| **Logic** | 5 | IF, IFS, IFERROR, AND, OR |
| **Math** | 16 | SUM, SUMIF, SUMIFS, AVERAGE, ROUND, MAX, MIN |
| **Text** | 16 | CONCATENATE, LEFT, RIGHT, MID, TRIM, SUBSTITUTE |
| **Date** | 9 | TODAY, NOW, YEAR, MONTH, DAY, EDATE, EOMONTH |

## 🚀 Getting Started

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Production

```bash
# Build for production
npm run build

# Start production server
npm run start
```

## 📁 Project Structure

```
sheetmaster/
├── app/
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Root layout with SEO
│   ├── formulas/[slug]/      # Dynamic formula pages
│   ├── api/og/               # Dynamic OG image generation
│   ├── sitemap.ts            # Auto-generated sitemap
│   └── robots.ts             # Robots.txt
├── components/
│   ├── FormulaBuilder.tsx    # Formula generator UI
│   ├── SearchBar.tsx         # Real-time search input
│   ├── FormulaGrid.tsx       # Filterable formula grid
│   ├── Breadcrumbs.tsx       # Navigation breadcrumbs
│   └── JsonLd.tsx            # Structured data
├── lib/
│   └── formulas.ts           # All formula configurations
└── public/
    └── og-image.png          # Default OG image
```

## 🔧 Adding New Formulas

Add a new formula in `lib/formulas.ts`:

```typescript
{
    slug: 'new-formula',
    title: 'Free NEW Formula Generator',
    metaDescription: 'Generate NEW formulas for Excel and Google Sheets.',
    excelFunction: 'NEW',
    category: 'Math',
    description: 'Description of what this formula does.',
    inputs: [
        { id: 'param1', label: 'Parameter 1', type: 'text', placeholder: 'e.g., A1' },
    ],
    generate: (p) => `=NEW(${p.param1 || 'value'})`,
    richContent: `<div class="prose">...</div>` // Optional SEO content
}
```

The formula will automatically:
- Appear on the homepage
- Get its own page at `/formulas/new-formula`
- Be added to sitemap.xml
- Generate dynamic OG images

## 📈 SEO Features

- ✅ Dynamic meta tags per page
- ✅ Open Graph & Twitter Cards
- ✅ Canonical URLs (www.getsheetmaster.com)
- ✅ BreadcrumbList structured data
- ✅ SoftwareApplication structured data
- ✅ Auto-generated sitemap.xml
- ✅ Optimized robots.txt

## 🌐 Deployment

Deployed on [Vercel](https://vercel.com) with automatic deployments on push to `main`.

```bash
# Manual deploy via Vercel CLI
npm install -g vercel
vercel --prod
```

## 📊 Performance

| Metric | Score |
|--------|-------|
| Performance | 98/100 |
| Accessibility | 93/100 |
| Best Practices | 100/100 |
| SEO | 100/100 |

*Tested with PageSpeed Insights*

## 📄 License

MIT License - See [LICENSE](../LICENSE) for details.

---

**Made with ❤️ for spreadsheet users everywhere** 🚀
