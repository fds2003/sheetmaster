# Tasks: SEO P1 高优先级优化

## 1. Open Graph & Twitter Cards

- [x] 1.1 在 `/app/formulas/[slug]/page.tsx` 的 `generateMetadata` 函数中增强 OpenGraph 配置
  - 添加 `url` 字段
  - 添加 `siteName` 字段
  - 添加 `images` 配置（使用默认 OG 图片模板）
- [x] 1.2 添加 Twitter Cards 元数据
  - 设置 `card: 'summary_large_image'`
  - 添加 `title`, `description`, `images` 字段
- [x] 1.3 在 `/app/layout.tsx` 添加全局 `metadataBase` 配置

## 2. 首页元数据优化

- [x] 2.1 在 `/app/page.tsx` 添加 `metadata` 导出
  - 添加优化后的 `title` 和 `description`
  - 添加 `keywords` 数组（核心关键词）
- [x] 2.2 为首页添加 Open Graph 配置
- [x] 2.3 为首页添加 Twitter Card 配置

## 3. 面包屑导航

- [x] 3.1 创建 `/components/Breadcrumbs.tsx` 组件
  - 支持接收 `items` 数组作为 props
  - 渲染响应式面包屑 UI
  - 添加 aria-label 无障碍支持
- [x] 3.2 创建面包屑结构化数据组件 (`BreadcrumbJsonLd`)
  - 遵循 Schema.org BreadcrumbList 规范
  - 生成正确的 JSON-LD 标记
- [x] 3.3 在 `/app/formulas/[slug]/page.tsx` 集成面包屑
  - 添加 Breadcrumbs 组件到页面顶部
  - 传入正确的导航路径
- [x] 3.4 更新站点地图确保面包屑 URL 正确 (已有正确配置)

## 4. 验证与测试

- [ ] 4.1 使用 Facebook Sharing Debugger 验证 OG 标签
- [ ] 4.2 使用 Twitter Card Validator 验证 Twitter 标签
- [ ] 4.3 使用 Google Rich Results Test 验证结构化数据
- [ ] 4.4 本地运行并检查页面元数据

