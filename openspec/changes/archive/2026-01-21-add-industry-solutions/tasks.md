# Tasks: 重构专题工具为行业垂直解决方案

## 1. 新增 SEO Toolkit
- [x] 1.1 创建专题配置 (slug: seo-toolkit)
- [x] 1.2 工具: URL Slug Generator (LOWER + SUBSTITUTE + TRIM)
- [x] 1.3 工具: Meta Tag Length Checker (LEN + IF)
- [x] 1.4 工具: UTM Link Builder (CONCATENATE)
- [x] 1.5 场景: Blog Post URLs, Social Media Campaigns

## 2. 新增 Inventory Manager
- [x] 2.1 创建专题配置 (slug: inventory-manager)
- [x] 2.2 工具: Reorder Alert (IF + AND)
- [x] 2.3 工具: SKU Price Lookup (XLOOKUP)
- [x] 2.4 工具: Missing Data Finder (COUNTBLANK)
- [x] 2.5 场景: Amazon/eBay Sellers, Retail Stores

## 3. 新增 Subscription Tracker
- [x] 3.1 创建专题配置 (slug: subscription-tracker)
- [x] 3.2 工具: Expiry Date Calculator (EDATE)
- [x] 3.3 工具: Billing Cycle Finder (EOMONTH)
- [x] 3.4 工具: Days Until Renewal (DATEDIF)
- [x] 3.5 场景: SaaS Renewals, Gym Memberships, Lease Agreements

## 4. 新增 Grade Calculator
- [x] 4.1 创建专题配置 (slug: grade-calculator)
- [x] 4.2 工具: Letter Grade Converter (IFS)
- [x] 4.3 工具: Clean Average Calculator (AVERAGEIF)
- [x] 4.4 工具: Attendance Counter (COUNTIF)
- [x] 4.5 场景: School Grades, Training Certifications

## 5. 移除旧专题
- [x] 5.1 移除 hr-time-calculator 配置
- [x] 5.2 移除 multi-criteria-analysis 配置

## 6. 更新首页
- [x] 6.1 更新专题卡片显示（6 个专题）
- [x] 6.2 调整布局适配 (3 columns)
- [x] 6.3 更新 meta keywords

## 7. 测试验证
- [x] 7.1 运行 `npm run build` 验证静态生成 ✅ 65 页面
- [x] 7.2 验证所有 6 个专题页面可访问 ✅ 全部 200 OK
- [x] 7.3 验证 sitemap 包含正确的 URL ✅ 6 个专题
- [x] 7.4 旧专题已从配置中移除 ✅
