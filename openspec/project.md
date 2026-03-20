# Project Context

## Purpose
SheetMaster is a free Excel and Google Sheets formula generator toolkit. Users can input parameters through a simple interface and automatically generate complex spreadsheet formulas without memorizing syntax.

**Target Market**: North America (US & Canada)

**Target Users**: Data analysts, finance professionals, marketers, e-commerce sellers, teachers, and anyone who uses spreadsheets.

**Core Value**: 
- Lower the barrier to using formulas
- Improve work efficiency
- Provide formula learning resources
- **Real-time search** - quickly filter formulas
- **Industry solutions** - solve specific business problems

## Tech Stack
- **Framework**: Next.js 14.2.15 (App Router)
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS 3.4.1
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics, Ahrefs
- **Deployment**: Vercel
- **OG Images**: @vercel/og (Edge Runtime)

## Project Conventions

### Code Style
- TypeScript strict mode
- Functional components + Hooks
- File naming: PascalCase (components), camelCase (utilities)
- Tailwind utility classes for CSS

### Architecture Patterns
- Next.js App Router structure
- Formula configs in `lib/formulas.ts`
- Solution configs in `lib/solutions.ts`
- Static generation (SSG) primary, Edge Runtime for dynamic OG images
- Components in `components/` directory
- Client-side search components (`SearchBar.tsx`, `FormulaGrid.tsx`)
- Server/Client component separation to avoid function serialization issues

### Testing Strategy
- Build-time validation (`npm run build`)
- Production testing (`npm run start` + curl)
- Sitemap URL count verification

### Git Workflow
- Main branch: `main`
- Commit message format: `type: description`
  - feat: new feature
  - fix: bug fix
  - chore: maintenance
  - docs: documentation

## Domain Context

### Formula Categories
- **Lookup**: VLOOKUP, XLOOKUP, INDEX/MATCH
- **Logic**: IF, IFS, IFERROR, AND, OR
- **Math**: SUM, SUMIF, SUMIFS, AVERAGE, ROUND, MAX, MIN
- **Text**: CONCATENATE, LEFT, RIGHT, MID, TRIM, SUBSTITUTE
- **Date**: TODAY, NOW, YEAR, MONTH, DAY, EDATE, EOMONTH

### Solution Categories (Industry Verticals)
- **Data Cleaning**: Email extraction, domain extraction, text normalization
- **Loan Calculator**: Mortgage, auto, personal loans
- **SEO Toolkit**: URL slugs, meta tag checker, UTM builder
- **Inventory Manager**: Reorder alerts, SKU lookup
- **Subscription Tracker**: Renewal dates, billing cycles
- **Grade Calculator**: Letter grades, attendance tracking

### Formula Config Structure
Each formula contains:
- `slug`: URL path
- `title`: Page title
- `metaDescription`: SEO description
- `excelFunction`: Function name
- `category`: Category
- `description`: Short description
- `inputs`: Input parameter configs
- `generate`: Formula generation function
- `richContent`: (optional) SEO rich content

### Solution Config Structure
Each solution contains:
- `slug`: URL path
- `title`: SEO-optimized title
- `metaDescription`: SEO description
- `icon`: Lucide icon name
- `description`: Short description
- `tools`: Array of formula tools
- `scenarios`: Quick-fill scenarios
- `richContent`: Tutorial content

## Important Constraints
- All formulas must be compatible with both Excel and Google Sheets
- Pages must support static generation (SSG)
- Must include complete SEO metadata
- Must support mobile responsive design
- Content must be in US English for North American market

## External Dependencies
- **Vercel**: Deployment and hosting
- **GitHub**: Code repository (github.com/fds2003/sheetmaster)
- **Google Search Console**: SEO monitoring
- **Vercel Analytics**: Traffic analytics
- **Ahrefs**: SEO analytics

## Current Stats (2026-01-21)
- Formula count: **50**
- Solution count: **6** (industry verticals)
- Page count: **65** (3 static + 50 formulas + 6 solutions + misc)
- SEO score: **100/100** (PageSpeed Insights)
- Performance score: **98/100** (PageSpeed Insights)
- OpenSpec Specs: **4** (formulas, search, seo, solutions)

## Features
- ✅ 50 formula generators
- ✅ 6 industry solution tools
- ✅ Real-time search (by name/description/category)
- ✅ SEO optimization (Open Graph, Twitter Cards, structured data)
- ✅ Dynamic OG images
- ✅ Breadcrumb navigation
- ✅ Responsive design
- ✅ North American market localization
