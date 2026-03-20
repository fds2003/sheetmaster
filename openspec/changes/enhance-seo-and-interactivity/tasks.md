## 1. 实施步骤 (Implementation)
- [ ] 1.1 更新 `JsonLd` 组件，支持基于公式数据的 `HowTo` 和 `FAQPage` schema
- [ ] 1.2 更新 `lib/formulas.ts` 中的 `FormulaConfig` 接口，包含用于 "HowTo" schema 的可选结构化步骤
- [ ] 1.3 创建 `InteractiveFormulaBuilder` 组件，支持 VLOOKUP 的可视化网格预览
- [ ] 1.4 在 `/formulas/[slug]/page.tsx` 中集成 `InteractiveFormulaBuilder`，用于支持的公式
- [ ] 1.5 在 `lib/formulas.ts` 中为前 5 个公式（VLOOKUP, IF, XLOOKUP, REGEX, INDEX/MATCH）填充 "HowTo" 步骤数据
