# 📝 项目开发文档：SheetMaster (Production)

## 1. 项目概况 (Project Overview)

* **项目名称：** SheetMaster
* **域名：** `www.getsheetmaster.com`
* **核心价值：** 针对 Excel/Google Sheets 用户，提供零延迟、交互式的公式生成工具。
* **目标市场：** 英语国家 (US/UK/CA/AU) 的办公人群、数据分析初学者。
* **技术策略：** 纯代码逻辑 (Pure Logic) + 静态页面生成 (SSG) + 零服务器成本。
* **变现模式：** 联盟营销 (Affiliate Marketing) 为主，展示广告为辅。

---

## 2. 当前状态 (Current Status) - 2026年1月

| 指标 | 数值 |
|------|------|
| 公式总数 | **50 个** |
| 页面总数 | **53 个** |
| SEO 评分 | **100/100** |
| 性能评分 | **98/100** |
| 部署状态 | ✅ 生产环境运行中 |

---

## 3. 技术栈 (Tech Stack)

* **前端框架：** Next.js 14.2.15 (App Router)
* **开发语言：** TypeScript 5.0
* **样式库：** Tailwind CSS 3.4.1
* **图标库：** Lucide React
* **部署托管：** Vercel (Edge Network)
* **分析工具：** Vercel Analytics
* **OG 图片：** @vercel/og (Edge Runtime)
* **数据库：** 无 (数据存储在 `lib/formulas.ts`)

---

## 4. 公式分类统计 (Formula Categories)

| 分类 | 数量 | 代表公式 |
|------|------|----------|
| **Lookup** | 4 | VLOOKUP, XLOOKUP, INDEX/MATCH |
| **Logic** | 5 | IF, IFS, IFERROR, AND, OR |
| **Math** | 16 | SUM, SUMIF, SUMIFS, AVERAGE, COUNTIF, COUNTIFS, ROUND, MAX, MIN |
| **Text** | 16 | CONCATENATE, LEFT, RIGHT, MID, TRIM, SUBSTITUTE, LEN, FIND |
| **Date** | 9 | TODAY, NOW, YEAR, MONTH, DAY, DATEDIF, EDATE, EOMONTH, NETWORKDAYS |

---

## 5. 完整公式列表 (All 50 Formulas)

### Lookup (4)
1. VLOOKUP
2. XLOOKUP
3. INDEX/MATCH
4. (reserved)

### Logic (5)
5. IF
6. IFS
7. IFERROR
8. AND
9. OR

### Math (16)
10. SUM
11. SUMIF
12. SUMIFS
13. COUNTIF
14. COUNTIFS
15. AVERAGE
16. AVERAGEIF
17. MAX
18. MIN
19. ROUND
20. ROUNDUP
21. ROUNDDOWN
22. ABS
23. PMT
24. COUNTA
25. COUNTBLANK

### Text (16)
26. CONCATENATE
27. LEFT
28. RIGHT
29. MID
30. TRIM
31. UPPER
32. LOWER
33. PROPER
34. SUBSTITUTE
35. LEN
36. FIND
37. SEARCH
38. TEXT
39. Extract Email (REGEXEXTRACT)
40. Extract Domain (REGEXEXTRACT)
41. Get First Word (LEFT & FIND)

### Date (9)
42. TODAY
43. NOW
44. YEAR
45. MONTH
46. DAY
47. DATEDIF
48. EDATE
49. EOMONTH
50. NETWORKDAYS

---

## 6. SEO 功能 (SEO Features)

### 已实现 ✅
- [x] 动态 Meta Tags (Title, Description)
- [x] Open Graph 标签
- [x] Twitter Cards
- [x] Canonical URLs (www.getsheetmaster.com)
- [x] 动态 Sitemap.xml
- [x] Robots.txt
- [x] BreadcrumbList 结构化数据 (Schema.org)
- [x] SoftwareApplication 结构化数据
- [x] 动态 OG 图片生成 (/api/og)
- [x] 面包屑导航组件
- [x] **实时公式搜索** (客户端筛选，300ms 防抖)

---

## 7. 数据结构设计 (Data Structure)

文件路径：`lib/formulas.ts`

```typescript
export type FormulaInputType = 'text' | 'number' | 'range' | 'boolean' | 'select';

export interface FormulaInput {
  id: string;          // 参数变量名
  label: string;       // 前端显示的标签 (English)
  placeholder?: string; // 占位符提示
  type: FormulaInputType;
  options?: { label: string; value: string }[]; // 仅当 type 为 select 时使用
  tooltip?: string;    // 鼠标悬停解释
}

export interface FormulaConfig {
  slug: string;        // URL 路径，如 'vlookup'
  title: string;       // 页面 H1 标题
  metaDescription: string; // SEO Description
  excelFunction: string;   // 核心函数名，如 'VLOOKUP'
  category: string;    // 分类: Lookup, Math, Text, Logic, Date
  description: string; // 简短介绍
  inputs: FormulaInput[];
  generate: (params: Record<string, string>) => string; // 核心生成逻辑
  richContent?: string; // HTML content for SEO (可选)
}
```

---

## 8. 项目结构 (Project Structure)

```
sheetmaster/
├── app/
│   ├── page.tsx              # 首页 (50个公式卡片)
│   ├── layout.tsx            # 全局布局 + SEO 元数据
│   ├── formulas/[slug]/      # 动态公式页面
│   │   └── page.tsx          # 公式生成器
│   ├── api/og/               # 动态 OG 图片 API
│   │   └── route.tsx
│   ├── privacy/page.tsx      # 隐私政策
│   ├── terms/page.tsx        # 服务条款
│   ├── sitemap.ts            # 动态站点地图
│   └── robots.ts             # Robots.txt
├── components/
│   ├── FormulaBuilder.tsx    # 公式生成器组件
│   ├── SearchBar.tsx         # 实时搜索输入框 (带防抖)
│   ├── FormulaGrid.tsx       # 可筛选公式网格
│   ├── Breadcrumbs.tsx       # 面包屑导航
│   ├── JsonLd.tsx            # 结构化数据
│   ├── AdUnit.tsx            # 广告位
│   ├── AffiliateBanner.tsx   # 联盟广告
│   └── FeedbackWidget.tsx    # 反馈组件
├── lib/
│   └── formulas.ts           # 50个公式配置
└── public/
    └── og-image.png          # 默认 OG 图片
```

---

## 9. 部署信息 (Deployment)

| 项目 | 值 |
|------|-----|
| 平台 | Vercel |
| 域名 | www.getsheetmaster.com |
| GitHub | github.com/fds2003/sheetmaster |
| 分支 | main |
| 自动部署 | ✅ 推送即部署 |

---

## 10. 后续优化计划 (Roadmap)

### P2 - 中优先级
- [ ] 相关公式推荐 (Related Formulas)
- [ ] FAQ 页面
- [ ] 博客系统

### P3 - 低优先级
- [ ] 图片性能优化
- [ ] 用户评价系统
- [ ] 多语言支持

---

**文档版本**: 2.0
**最后更新**: 2026-01-06
**负责人**: SheetMaster Team
