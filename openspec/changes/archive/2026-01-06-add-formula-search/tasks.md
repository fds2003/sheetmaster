# Tasks: 添加公式搜索功能

## 1. 创建搜索组件
- [x] 1.1 创建 `components/SearchBar.tsx` 客户端组件
- [x] 1.2 实现搜索输入框 UI（图标、placeholder、清空按钮）
- [x] 1.3 添加结果计数显示

## 2. 创建公式网格组件
- [x] 2.1 创建 `components/FormulaGrid.tsx` 客户端组件
- [x] 2.2 实现搜索过滤逻辑（名称、描述、分类匹配）
- [x] 2.3 添加无结果提示 UI

## 3. 集成到首页
- [x] 3.1 修改 `app/page.tsx` 引入搜索组件
- [x] 3.2 保持 metadata 服务端渲染
- [x] 3.3 提取可序列化的公式数据（不含函数）

## 4. 测试验证
- [x] 4.1 构建验证 `npm run build` - 59 页面生成成功
- [x] 4.2 验证 SEO metadata 仍然正常
