# Vercel 自动化部署检查清单

## 📋 GitHub 仓库设置

- [ ] 创建 GitHub 仓库
- [ ] 推送代码到 GitHub
- [ ] 确认仓库包含以下文件：
  - [ ] `.github/workflows/deploy.yml`
  - [ ] `vercel.json`
  - [ ] `package.json`
  - [ ] `README.md`
  - [ ] `.gitignore`

## 🔐 Vercel 项目设置

### 1. 创建 Vercel 项目
- [ ] 登录 [Vercel Dashboard](https://vercel.com/dashboard)
- [ ] 点击 "New Project"
- [ ] 导入 GitHub 仓库
- [ ] 选择项目目录：`sheetmaster`

### 2. 配置项目设置
- [ ] Framework Preset: `Next.js`
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `.next`
- [ ] Install Command: `npm install`
- [ ] Root Directory: `sheetmaster`

### 3. 设置环境变量
在 Vercel Dashboard > Project Settings > Environment Variables 中添加：
- [ ] `NODE_ENV` = `production`

### 4. 获取部署凭证
在 Vercel Dashboard 中获取：
- [ ] **VERCEL_TOKEN**: Settings > Tokens > Create Token
- [ ] **VERCEL_ORG_ID**: Settings > General > Organization ID
- [ ] **VERCEL_PROJECT_ID**: Project Settings > General > Project ID

## 🔧 GitHub Secrets 配置

在 GitHub 仓库 Settings > Secrets and variables > Actions 中添加：

- [ ] `VERCEL_TOKEN` = [您的 Vercel Token]
- [ ] `VERCEL_ORG_ID` = [您的组织ID]
- [ ] `VERCEL_PROJECT_ID` = [您的项目ID]
- [ ] `PRODUCTION_DOMAIN` = [可选，生产域名]

## 🚀 测试部署

### 1. 推送代码触发部署
```bash
git add .
git commit -m "feat: setup vercel deployment"
git push origin main
```

### 2. 验证部署状态
- [ ] 检查 GitHub Actions 运行状态
- [ ] 查看 Vercel Dashboard 部署日志
- [ ] 确认预览环境 URL 可访问

### 3. 验证功能
部署完成后验证：
- [ ] 首页正常加载 (https://sheetmaster.vercel.app)
- [ ] 公式页面可访问 (https://sheetmaster.vercel.app/formulas/vlookup)
- [ ] 搜索功能正常
- [ ] 博客系统正常 (https://sheetmaster.vercel.app/blog)
- [ ] 教程系统正常 (https://sheetmaster.vercel.app/tutorials)

## 📊 验证 SEO 配置

- [ ] 检查页面标题和描述
- [ ] 验证 Open Graph 数据
- [ ] 确认站点地图可访问 (https://sheetmaster.vercel.app/sitemap.xml)
- [ ] 验证 robots.txt (https://sheetmaster.vercel.app/robots.txt)

## 🔍 故障排除

### 常见问题及解决方案

1. **构建失败**
   - 检查 `package.json` 依赖
   - 确认 `fuse.js` 已安装
   - 查看 GitHub Actions 日志

2. **环境变量错误**
   - 确认 GitHub Secrets 配置正确
   - 检查 Vercel 环境变量设置

3. **路由问题**
   - 确认 `vercel.json` 配置正确
   - 检查 Next.js 动态路由设置

4. **性能问题**
   - 启用 Vercel Edge Network
   - 优化图片和静态资源

## 📈 监控和优化

### 1. 性能监控
- [ ] 在 Vercel Dashboard 查看性能指标
- [ ] 监控页面加载时间
- [ ] 检查错误率

### 2. SEO 监控
- [ ] 提交站点地图到 Google Search Console
- [ ] 配置 Google Analytics
- [ ] 监控有机流量

### 3. 用户体验
- [ ] 测试移动端适配
- [ ] 验证搜索功能响应时间
- [ ] 检查表单提交功能

## 🔄 持续集成

### 1. 分支策略
- [ ] `main/master`: 生产环境
- [ ] `develop`: 开发环境
- [ ] `feature/*`: 功能分支

### 2. 代码审查
- [ ] 所有代码通过 Pull Request
- [ ] 自动化测试通过
- [ ] 代码质量检查

### 3. 回滚策略
- [ ] 保留最近 10 个部署版本
- [ ] Vercel 一键回滚功能可用

## 🎯 完成确认

所有检查项完成后：
- [ ] 🟢 GitHub Actions 工作流正常运行
- [ ] 🟢 Vercel 部署成功
- [ ] 🟢 所有功能验证通过
- [ ] 🟢 SEO 配置正确
- [ ] 🟢 性能指标良好

## 📞 支持联系

如有问题，请检查：
1. [GitHub Actions 日志](https://github.com/your-username/sheetmaster/actions)
2. [Vercel Dashboard](https://vercel.com/dashboard)
3. 项目文档 [DEPLOYMENT.md](DEPLOYMENT.md)

---

**部署完成！您的 SheetMaster 项目现在已通过 GitHub Actions 和 Vercel 实现自动化部署。** 🎉