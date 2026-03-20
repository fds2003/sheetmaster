# SheetMaster 部署指南

## 🚀 自动化部署配置

本项目已配置为通过 GitHub Actions 和 Vercel 实现自动化部署。

## 📋 部署前准备

### 1. GitHub 仓库设置

确保您的 GitHub 仓库包含以下文件：
- `.github/workflows/deploy.yml` - GitHub Actions 工作流
- `vercel.json` - Vercel 配置文件
- `package.json` - 项目依赖配置

### 2. Vercel 项目设置

1. **创建 Vercel 项目**
   - 登录 [Vercel Dashboard](https://vercel.com/dashboard)
   - 点击 "New Project"
   - 导入您的 GitHub 仓库

2. **配置环境变量**
   在 Vercel 项目设置中添加以下环境变量：
   ```
   NODE_ENV=production
   ```

3. **设置构建配置**
   - Framework Preset: `Next.js`
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

### 3. GitHub Secrets 配置

在 GitHub 仓库的 Settings > Secrets and variables > Actions 中添加：

```
VERCEL_TOKEN          # Vercel API Token
VERCEL_ORG_ID         # Vercel Organization ID
VERCEL_PROJECT_ID     # Vercel Project ID
PRODUCTION_DOMAIN     # 生产环境域名（可选）
```

**如何获取这些值：**
1. **VERCEL_TOKEN**: 在 Vercel Dashboard > Settings > Tokens 中创建
2. **VERCEL_ORG_ID**: 在 Vercel Dashboard > Settings > General 中查看
3. **VERCEL_PROJECT_ID**: 在 Vercel Dashboard > Project Settings > General 中查看

## 🔄 自动化部署流程

### 开发环境部署（Preview）
- **触发条件**: 创建 Pull Request
- **部署目标**: Vercel Preview 环境
- **URL格式**: `https://sheetmaster-[pr-number]-[hash].vercel.app`

### 生产环境部署
- **触发条件**: Push 到 `main` 或 `master` 分支
- **部署目标**: Vercel Production 环境
- **URL格式**: `https://sheetmaster.vercel.app`

## 📦 手动部署

### 通过 Vercel CLI

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录 Vercel
vercel login

# 部署到预览环境
vercel

# 部署到生产环境
vercel --prod
```

### 通过 GitHub Actions

```bash
# 强制触发部署工作流
git add .
git commit -m "Trigger deployment"
git push origin main
```

## 🔍 部署验证

### 1. 检查部署状态
- GitHub Actions: 查看 Actions 标签页
- Vercel Dashboard: 查看 Deployments

### 2. 验证功能
部署完成后，验证以下功能：
- [ ] 首页正常加载
- [ ] 公式页面可访问
- [ ] 搜索功能正常
- [ ] 博客系统正常
- [ ] 教程系统正常
- [ ] SEO 元数据正确

### 3. 检查环境变量
确保以下环境变量在 Vercel 中正确设置：
- `NODE_ENV=production`

## 🛠️ 故障排除

### 常见问题

1. **构建失败**
   ```
   Error: Cannot find module 'fuse.js'
   ```
   **解决方案**: 确保 `package.json` 中包含 `fuse.js` 依赖

2. **环境变量缺失**
   ```
   Error: Environment variable not found
   ```
   **解决方案**: 检查 Vercel 环境变量配置

3. **GitHub Actions 权限问题**
   ```
   Permission denied
   ```
   **解决方案**: 检查 GitHub Secrets 配置

### 调试步骤

1. **查看构建日志**
   ```bash
   # 查看 GitHub Actions 日志
   # 或者本地构建测试
   npm run build
   ```

2. **检查环境变量**
   ```bash
   # 在 Vercel Dashboard 中检查
   # 或者在项目设置中验证
   ```

3. **验证依赖**
   ```bash
   # 清理并重新安装依赖
   rm -rf node_modules package-lock.json
   npm install
   ```

## 📊 监控和分析

### Vercel Analytics
- 访问量统计
- 性能监控
- 错误追踪

### Google Search Console
- SEO 表现
- 索引状态
- 搜索查询分析

### Google Analytics
- 用户行为分析
- 流量来源
- 转化率追踪

## 🔄 持续集成最佳实践

1. **分支策略**
   - `main/master`: 生产环境
   - `develop`: 开发环境
   - `feature/*`: 功能分支

2. **代码审查**
   - 所有代码必须通过 Pull Request
   - 自动化测试通过后才能合并

3. **回滚策略**
   - Vercel 支持一键回滚
   - 保留最近 10 个部署版本

## 📞 支持

如果遇到部署问题，请检查：
1. GitHub Actions 工作流日志
2. Vercel Dashboard 部署日志
3. 项目依赖是否完整
4. 环境变量配置是否正确

如有需要，可以联系开发团队获取支持。