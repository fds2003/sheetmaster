# Tasks: 添加专题解决方案页面

## 1. 基础架构
- [x] 1.1 创建 `lib/solutions.ts` 专题配置文件
- [x] 1.2 定义 SolutionConfig 接口
- [x] 1.3 创建 `app/solutions/[slug]/page.tsx` 动态路由

## 2. 数据清洗中心
- [x] 2.1 创建专题配置 (slug: data-cleaning)
- [x] 2.2 集成 REGEXEXTRACT、TRIM、PROPER 公式
- [x] 2.3 添加邮箱提取、域名提取、文本规范化场景
- [x] 2.4 编写专题 SEO 内容和教程

## 3. HR 工时计算器
- [x] 3.1 创建专题配置 (slug: hr-time-calculator)
- [x] 3.2 集成 NETWORKDAYS、DATEDIF、EDATE 公式
- [x] 3.3 添加工作日计算、工龄计算、合同到期场景
- [x] 3.4 编写专题 SEO 内容和教程

## 4. 贷款计算中心
- [x] 4.1 创建专题配置 (slug: loan-calculator)
- [x] 4.2 集成 PMT 公式扩展版
- [x] 4.3 添加房贷、车贷、消费贷场景计算器
- [x] 4.4 编写专题 SEO 内容和教程

## 5. 多条件分析工具
- [x] 5.1 创建专题配置 (slug: multi-criteria-analysis)
- [x] 5.2 集成 SUMIFS、COUNTIFS、IFERROR 公式
- [x] 5.3 添加多条件求和、计数、错误处理场景
- [x] 5.4 编写专题 SEO 内容和教程

## 6. UI 组件
- [x] 6.1 创建 `components/SolutionCard.tsx` 专题卡片组件
- [x] 6.2 创建 `components/SolutionBuilder.tsx` 专题构建器组件
- [x] 6.3 支持多公式切换的 Tab 界面

## 7. 首页集成
- [x] 7.1 在首页添加"热门专题"区块
- [x] 7.2 显示 4 个专题卡片（带图标和简介）
- [x] 7.3 响应式布局适配

## 8. SEO 优化
- [x] 8.1 为每个专题页面添加 generateMetadata
- [x] 8.2 添加 Open Graph 和 Twitter Cards
- [x] 8.3 更新 sitemap.ts 包含专题页面
- [x] 8.4 添加专题页面结构化数据 (SoftwareApplication)

## 9. 测试验证
- [x] 9.1 运行 `npm run build` 验证静态生成 ✅ 63 页面
- [x] 9.2 验证所有专题页面可访问 ✅ 全部 200 OK
- [ ] 9.3 PageSpeed Insights 测试 SEO 评分 (部署后测试)
- [x] 9.4 验证 sitemap 包含专题 URL ✅ 4 个专题页面已包含
