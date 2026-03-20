# SheetMaster - Excel Formula Generator

![Next.js](https://img.shields.io/badge/Next.js-14.2.15-black?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-blue?logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-green?logo=vercel&logoColor=white)

Free Excel and Google Sheets formula generators with AI-powered assistance.

## ✨ 特性

- 🔍 **实时搜索** - 按名称、描述或分类即时筛选公式（带防抖优化）
- 📊 **50个常用公式** - VLOOKUP, SUMIFS, IFERROR, INDEX/MATCH 等
- 🎯 **SEO优化** - 完整的搜索引擎优化配置 (Open Graph, Twitter Cards, 结构化数据)
- 📱 **响应式设计** - 完美适配所有设备
- ⚡ **静态部署** - 零延迟访问，零服务器成本
- 🖼️ **动态 OG 图片** - 自动生成社交分享图片
- 🧭 **面包屑导航** - 提升用户体验和 SEO

## 🚀 快速开始

### 本地开发

1. **克隆仓库**
```bash
git clone <your-repo-url>
cd getsheetmaster/sheetmaster
```

2. **安装依赖**
```bash
npm install
```

3. **启动开发服务器**
```bash
npm run dev
```

4. **访问应用**
打开浏览器访问 `http://localhost:3000`

### 生产构建

```bash
# 构建项目
npm run build

# 启动生产服务器
npm start
```

## 📁 项目结构

```
sheetmaster/
├── app/                    # Next.js App Router
│   ├── page.tsx           # 首页
│   ├── formulas/[slug]/    # 动态公式页面
│   ├── blog/              # 博客系统
│   ├── tutorials/         # 教程系统
│   ├── search/            # 搜索页面
│   └── api/               # API 路由
├── components/            # React 组件
│   ├── FormulaBuilder.tsx # 公式构建器
│   ├── SearchBar.tsx      # 实时搜索输入框（带防抖）
│   ├── FormulaGrid.tsx    # 可筛选公式网格
│   ├── Breadcrumbs.tsx    # 面包屑导航
│   ├── BlogList.tsx       # 博客列表
│   └── TutorialList.tsx   # 教程列表
├── lib/                   # 业务逻辑库
│   ├── formulas.ts        # 公式配置
│   ├── blog.ts           # 博客内容
│   ├── tutorials.ts      # 教程内容
│   └── search.ts         # 搜索逻辑
└── public/               # 静态资源
```

## 🔧 技术栈

- **前端框架**: Next.js 14 (App Router)
- **开发语言**: TypeScript
- **样式库**: Tailwind CSS
- **图标库**: Lucide React
- **搜索**: Fuse.js (模糊搜索)
- **部署平台**: Vercel
- **分析工具**: Vercel Analytics

## 🌐 部署

### 自动化部署

本项目已配置 GitHub Actions 和 Vercel 自动化部署：

1. **推送代码到 GitHub**
```bash
git add .
git commit -m "feat: add new formula"
git push origin main
```

2. **自动部署流程**
   - GitHub Actions 触发构建
   - Vercel 自动部署到预览环境
   - 合并到主分支后部署到生产环境

### 手动部署

```bash
# 通过 Vercel CLI
npm install -g vercel
vercel login
vercel --prod
```

详细部署指南请查看 [DEPLOYMENT.md](DEPLOYMENT.md)

## 📊 SEO 特性

- ✅ 动态站点地图生成
- ✅ robots.txt 自动配置
- ✅ Open Graph 和 Twitter Cards
- ✅ 结构化数据 (JSON-LD)
- ✅ 关键词优化
- ✅ 语义化 HTML

## 🎨 自定义配置

### 添加新公式

1. 在 `lib/formulas.ts` 中添加公式配置：

```typescript
{
    slug: 'new-formula',
    title: 'New Formula Generator',
    metaDescription: 'Generate new formula...',
    excelFunction: 'NEWFUNCTION',
    category: 'Math',
    description: 'Description of the formula...',
    inputs: [
        { id: 'param1', label: 'Parameter 1', type: 'text' }
    ],
    generate: (params) => `=NEWFUNCTION(${params.param1})`
}
```

2. 重新构建项目
```bash
npm run build
```

### 添加博客文章

在 `lib/blog.ts` 中添加新的博客文章：

```typescript
{
    slug: 'new-blog-post',
    title: 'New Blog Post',
    excerpt: 'Brief description...',
    content: '<h2>Content here</h2>',
    category: 'Guides',
    tags: ['Excel', 'Tips'],
    publishedAt: '2025-01-01',
    readingTime: 5
}
```

### 添加教程

在 `lib/tutorials.ts` 中添加新的教程：

```typescript
{
    slug: 'new-tutorial',
    title: 'New Tutorial',
    excerpt: 'Tutorial description...',
    level: 'beginner',
    duration: '10 minutes',
    difficulty: 2,
    steps: [
        {
            id: '1',
            title: 'Step 1',
            description: 'Description...',
            codeExample: '=FORMULA()'
        }
    ]
}
```

## 🤝 贡献

欢迎贡献代码！请遵循以下步骤：

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Next.js](https://nextjs.org/) - 强大的 React 框架
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [Fuse.js](https://fusejs.io/) - 轻量级模糊搜索库
- [Vercel](https://vercel.com/) - 优秀的部署平台

## 📞 联系我们

如有问题或建议，请通过以下方式联系：

- 提交 Issue: [GitHub Issues](https://github.com/your-username/sheetmaster/issues)
- 发送邮件: your-email@example.com

---

**让 Excel 公式生成变得简单而有趣！** 🚀