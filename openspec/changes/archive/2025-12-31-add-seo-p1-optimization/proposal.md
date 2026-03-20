# Change: SEO P1 高优先级优化 - 添加 Open Graph、首页元数据、面包屑导航

## Why

根据 SEO_OPTIMIZATION_PLAN.md 第一阶段 (P1) 需求，当前 SheetMaster 网站缺少完整的社交媒体分享元数据（Open Graph/Twitter Cards）、首页关键词优化、以及面包屑导航功能。这些基础 SEO 优化可以显著提升：
- 社交媒体分享效果和点击率 (+20-30%)
- 首页关键词排名 (+10-15%)
- 用户导航体验和页面跳出率 (-5-10%)

## What Changes

### 1. 增强 Open Graph 和 Twitter Cards 元数据
- 在公式页面 (`/app/formulas/[slug]/page.tsx`) 添加完整的 Open Graph 标签
- 添加 Twitter Card 标签支持大图分享
- 包含动态生成的 URL、图片配置

### 2. 优化首页元数据和关键词
- 在首页 (`/app/page.tsx`) 添加完整的 `metadata` 导出
- 包含目标关键词列表：Excel formula generator, Google Sheets formulas, VLOOKUP, SUMIF 等
- 添加 Open Graph 和 Twitter Cards 到首页

### 3. 添加面包屑导航组件
- 新建 `Breadcrumbs.tsx` 组件
- 添加 BreadcrumbList 结构化数据（Schema.org）
- 在公式页面集成面包屑导航

## Impact

- **Affected specs**: seo (新建)
- **Affected code**: 
  - `sheetmaster/app/formulas/[slug]/page.tsx` - 添加 OG/Twitter 标签
  - `sheetmaster/app/page.tsx` - 添加首页 metadata
  - `sheetmaster/components/Breadcrumbs.tsx` - 新建组件
  - `sheetmaster/app/layout.tsx` - 可能需要添加全局 metadata 配置

## 验收标准

1. 社交媒体分享预览正常显示标题、描述和图片
2. 首页包含完整的 SEO 元数据
3. 公式页面显示面包屑导航：首页 > Formulas > [Formula Name]
4. 使用 Google Rich Results Test 验证结构化数据

