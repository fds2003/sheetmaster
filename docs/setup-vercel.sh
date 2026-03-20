#!/bin/bash

# SheetMaster Vercel 部署配置脚本
# 使用方法: ./setup-vercel.sh

echo "🚀 开始配置 Vercel 部署..."

# 检查是否安装了 Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI 未安装"
    echo "请先安装: npm install -g vercel"
    exit 1
fi

echo "✅ Vercel CLI 已安装"

# 登录 Vercel
echo "🔐 登录 Vercel..."
vercel login

# 创建或链接项目
echo "📁 创建/链接 Vercel 项目..."
vercel

# 获取项目信息
echo "📋 获取项目信息..."
PROJECT_ID=$(vercel --scope --id-only)
ORG_ID=$(vercel --scope --id-only | cut -d'/' -f1)

echo "✅ 项目创建完成"
echo "📊 项目ID: $PROJECT_ID"
echo "🏢 组织ID: $ORG_ID"

# 设置环境变量
echo "⚙️ 设置环境变量..."
vercel env add NODE_ENV production

# 配置构建设置
echo "🏗️ 配置构建设置..."
vercel settings build-command "npm run build"
vercel settings output-directory ".next"
vercel settings install-command "npm install"

echo "✅ Vercel 配置完成！"

# 显示下一步操作
echo ""
echo "🎉 配置完成！下一步："
echo "1. 复制以下环境变量到 GitHub Secrets:"
echo "   VERCEL_TOKEN: $(vercel tokens list | grep -o 'vercel_[a-zA-Z0-9]*' | head -1)"
echo "   VERCEL_ORG_ID: $ORG_ID"
echo "   VERCEL_PROJECT_ID: $PROJECT_ID"
echo ""
echo "2. 推送代码到 GitHub:"
echo "   git add ."
echo "   git commit -m 'feat: add vercel deployment config'"
echo "   git push origin main"
echo ""
echo "3. 部署将在 GitHub Actions 完成后自动触发"