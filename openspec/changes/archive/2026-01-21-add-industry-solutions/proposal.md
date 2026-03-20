# Change: 重构专题工具为行业垂直解决方案

## Why
当前专题工具偏通用化，缺乏行业针对性。根据 Google Trends 市场洞察，用户搜索的是具体业务问题（如"URL slug generator"、"inventory reorder alert"），而非抽象的公式名称。

重构为行业垂直解决方案可以：
1. 提高 SEO 长尾关键词覆盖
2. 增加用户转化率（问题→解决方案直达）
3. 差异化竞争（从"卖公式"转向"卖业务效率"）

## What Changes

### 保留（高价值）
- ✅ **Loan Calculator** - 北美房贷搜索量巨大
- ✅ **Data Cleaning** - 通用性强

### 新增（4 个行业垂直）
- ➕ **SEO Toolkit** - URL Slug 生成、Meta 标签检查、UTM 链接构建
- ➕ **Inventory Manager** - 缺货预警、SKU 价格匹配、数据完整性检查
- ➕ **Subscription Tracker** - 会员到期、账单周期、续费倒计时
- ➕ **Grade Calculator** - 成绩分级、去噪平均分、考勤统计

### 移除
- ❌ **HR Time Calculator** - 功能被 Subscription Tracker 覆盖
- ❌ **SUMIFS Generator** - 偏技术化，保留公式页面即可

## Impact
- **修改 specs**: `solutions`
- **修改文件**: 
  - `lib/solutions.ts` - 更新专题配置
  - `app/page.tsx` - 更新首页展示
  - `app/sitemap.ts` - 更新 sitemap

## Success Metrics
- 专题数量: 4 → 6
- 行业覆盖: 通用 → 营销、电商、服务业、教育
- 所有页面构建成功
- SEO 评分 ≥ 95
