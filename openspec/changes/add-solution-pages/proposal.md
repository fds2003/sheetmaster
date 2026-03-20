# Change: 添加专题解决方案页面 (Solution Pages)

## Why
当前 SheetMaster 的定位是"大而全"的公式工具集，缺乏针对具体业务痛点的专题页面。根据 Google Trends 市场分析，用户搜索的是具体问题（如"如何提取邮箱"、"计算实际工作天数"），而非抽象的函数名称。专题解决方案页面可以：
1. 提高 SEO 长尾关键词覆盖
2. 提升用户转化率（问题→解决方案直达）
3. 增强产品差异化竞争力

## What Changes
1. **新增专题页面路由**: `/solutions/[slug]`
2. **创建 4 个专题解决方案**:
   - 📧 **数据清洗中心** (`/solutions/data-cleaning`) - REGEXEXTRACT + TRIM + PROPER
   - 📅 **HR 工时计算器** (`/solutions/hr-time-calculator`) - NETWORKDAYS + DATEDIF + EDATE
   - 💰 **贷款计算中心** (`/solutions/loan-calculator`) - PMT 多场景（房贷/车贷/消费贷）
   - 📊 **多条件分析工具** (`/solutions/multi-criteria-analysis`) - SUMIFS + COUNTIFS + IFERROR
3. **新增专题配置结构**: `lib/solutions.ts`
4. **首页添加专题入口**: 在公式网格上方展示热门专题卡片

## Impact
- **新增 specs**: `solutions` (新能力)
- **修改 specs**: `formulas` (首页添加专题入口)
- **新增文件**: 
  - `lib/solutions.ts`
  - `app/solutions/[slug]/page.tsx`
  - `components/SolutionCard.tsx`
  - `components/SolutionBuilder.tsx`
- **修改文件**:
  - `app/page.tsx` (添加专题入口)
  - `app/sitemap.ts` (添加专题页面)

## Success Metrics
- 新增 4 个高质量专题页面
- 专题页面 SEO 评分 ≥ 95
- 支持静态生成 (SSG)
