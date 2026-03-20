# Change: 添加公式搜索功能

## Why
SheetMaster 目前有 50 个公式，用户需要滚动页面才能找到想要的公式。添加搜索功能可以：
- 提升用户体验，快速定位目标公式
- 减少页面跳出率
- 增加用户停留时间
- 对 SEO 有正面影响

## What Changes
- 在首页 Hero 区域下方添加搜索框组件
- 实现客户端实时搜索过滤
- 搜索范围：公式名称、描述、分类
- 支持模糊匹配和清空功能
- 无结果时显示友好提示

## Impact
- **Affected specs**: search (新建)
- **Affected code**:
  - `sheetmaster/components/SearchBar.tsx` - 新建搜索组件
  - `sheetmaster/components/FormulaGrid.tsx` - 新建公式网格组件（带搜索过滤）
  - `sheetmaster/app/page.tsx` - 集成搜索功能

## 技术方案
- 使用 React useState 管理搜索状态
- 客户端过滤，无需服务端请求
- 保持首页 SEO metadata 为服务端渲染
- 搜索组件使用 'use client' 指令

