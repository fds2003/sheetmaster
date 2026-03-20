# Design: Boutique formula page quality

## Context
精品化与核心页整合方案要求公式页具备独有 Meta、OG 与 Meta 一致、Hero 10 公式特有 FAQ、以及可选的「Common Errors & Fixes」区块。现有公式配置已有 title、metaDescription、faq；公式页 metadata 中 OG/Twitter description 当前可能使用通用句；无 commonErrors 配置与区块。

## Goals / Non-Goals
- **Goals**: 规定每公式独有 Meta、公式页 OG/Twitter 使用 metaDescription、Hero 10 必有公式特有 FAQ、支持并渲染 Common Errors 区块。
- **Non-Goals**: 不在此变更中实现 Hero 10 的 800–1000 字场景化教程（richContent）或关键词映射表文档；不新增 compare/use-cases 页面。

## Decisions

### 1. OG/Twitter description 来源
- **Decision**: 公式页的 openGraph.description 与 twitter.description 一律使用 `formula.metaDescription`。OG 图片的 description 参数建议同样使用 metaDescription 或与 title 一致的短句，以保证分享文案与页面描述一致。
- **Rationale**: 避免所有公式页分享时出现相同的 "Generate X formulas..."，符合精品化「每页独有」原则。

### 2. Hero 10 名单
- **Decision**: Hero 10 = vlookup, if, sumif, index-match, xlookup, sumifs, countif, countifs, iferror, concatenate（与整合方案一致）。Spec 中明确该名单，以便校验「至少这 10 个公式有 faq」。
- **Rationale**: 与 执行/精品化与核心页整合方案 的 2.2 节一致；PMT 由 solutions/loan-calculator 覆盖，不在此列。

### 3. Common Errors 数据形状
- **Decision**: FormulaConfig 增加可选字段 `commonErrors?: Array<{ title?: string; causes: string[]; fixes: string[] }>` 或等价结构（如单条 title + causes/fixes 数组）。页面渲染时展示为「Common Errors & Fixes」区块，列表展示原因与修复建议。
- **Rationale**: 配置驱动、按公式填写，避免硬编码；与现有 richContent、faq 等可选字段风格一致。

### 4. 独有 Meta 的校验粒度
- **Decision**: Spec 要求「每个公式的 title 与 metaDescription 须为独有表述，体现该函数用途或痛点；禁止仅替换函数名的套话」。不在 spec 中枚举每公式的句子，由实现与人工审计保证。
- **Rationale**: 可执行且不把文案细节写死进 spec；验收时通过审计 lib/formulas.ts 与页面输出确认。

## Risks / Trade-offs
- **Risk**: 全公式 Meta 定制工作量大，可能分批完成。  
  **Mitigation**: Spec 要求「独有」；tasks.md 可拆为「先 Hero 10，再其余」。
- **Risk**: commonErrors 结构后续可能需扩展（如链接、代码块）。  
  **Mitigation**: 使用数组 of { causes, fixes } 或等价，便于后续增加字段而不破坏现有数据。

## Open Questions
- 无。实现时若需增加 commonErrors 的展示样式（如折叠、图标），可在页面组件内完成，无需改 spec。
