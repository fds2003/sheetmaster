# 全面检查与测试清单

## 已自动验证（本次执行）

- **ESLint**：`npm run lint` 通过，无警告/错误。
- **类型与结构**：`FormulaConfig` 含 `commonErrors?: FormulaCommonError[]`；公式页使用 `formula.metaDescription`、`formula.commonErrors` 正确。
- **Hero 10 配置**：vlookup, if, sumif, countif, concatenate, index-match, xlookup, sumifs, countifs, iferror 均具备 `faq`（≥5 条）与 `commonErrors`。
- **无 Lint 报错**：`lib/formulas.ts`、`app/formulas/[slug]/page.tsx`、FormulaBuilder、InteractiveFormulaBuilder 无 IDE 报错。

## 请在本地执行的命令

```bash
cd sheetmaster

# 1. 类型检查（可选，build 会一并做）
npx tsc --noEmit

# 2. 生产构建（必须）
npm run build

# 3. 公式 QA 检查（若已安装 tsx）
npx tsx qa-check.ts
# 或
npx tsx test-formulas.ts
```

## 功能抽查建议

1. **公式页元数据**  
   打开 `/formulas/vlookup`、`/formulas/countif`，查看页面标题与 meta description 是否与 `lib/formulas.ts` 中该公式的 `title`、`metaDescription` 一致且为独有表述。

2. **OG/Twitter 描述**  
   用 [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) 或 [Twitter Card Validator](https://cards-dev.twitter.com/validator) 检查公式页分享预览，确认 `og:description` / `twitter:description` 来自该公式的 `metaDescription`，而非通用 “Generate X formulas...”.

3. **Common Errors 区块**  
   打开 `/formulas/vlookup`、`/formulas/if`，页面下方应出现 “Common Errors & Fixes” 区块；打开无 `commonErrors` 的公式（如 `/formulas/trim`），不应出现该区块。

4. **FAQPage JSON-LD**  
   在 Hero 10 公式页（如 `/formulas/sumif`）查看源代码，搜索 `FAQPage`，应存在且与 `formula.faq` 一致。

## 变更摘要（add-boutique-formula-quality）

- 公式页 `openGraph.description`、`twitter.description` 及 OG 图片的 description 参数均使用 `formula.metaDescription`。
- Hero 10 具备独有 title/metaDescription、≥5 条公式专属 FAQ、以及 `commonErrors` 数据。
- `FormulaConfig` 新增可选字段 `commonErrors`；公式页在存在该配置时渲染 “Common Errors & Fixes” 区块。
