## ADDED Requirements

### Requirement: HowTo 结构化数据 (HowTo Structured Data)
系统必须为公式页面包含 HowTo 结构化数据 (JSON-LD)，以便在搜索结果中提供分步说明。

#### Scenario: HowTo JSON-LD 生成
- **GIVEN** 一个包含教程步骤的公式页面
- **WHEN** 页面渲染时
- **THEN** 它必须包含有效的 JSON-LD，且 `@type` 为 `"HowTo"`
- **AND** 它必须包含带有文本和图片（如果有）的 `step` 属性

### Requirement: FAQPage 结构化数据 (FAQPage Structured Data)
对于包含常见问题的公式页面，系统必须包含 FAQPage 结构化数据 (JSON-LD)。

#### Scenario: FAQPage JSON-LD 生成
- **GIVEN** 一个包含常见错误或问题的公式页面
- **WHEN** 页面渲染时
- **THEN** 它必须包含有效的 JSON-LD，且 `@type` 为 `"FAQPage"`
