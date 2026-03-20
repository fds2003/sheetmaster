## ADDED Requirements

### Requirement: 交互式向导模式 (Interactive Wizard Mode)
系统必须为复杂公式（如 VLOOKUP, INDEX/MATCH）提供增强的“向导”模式，逐步引导用户操作。

#### Scenario: VLOOKUP 向导显示
- **GIVEN** 用户访问 VLOOKUP 生成器
- **WHEN** `InteractiveFormulaBuilder` 加载时
- **THEN** 它必须显示一个代表电子表格的视觉网格预览
- **AND** 当用户聚焦相应的输入框时，它必须高亮显示相关的单元格（查找值、数据表）

#### Scenario: 向导步骤导航
- **GIVEN** 用户正在使用向导模式
- **WHEN** 他们完成一个步骤时
- **THEN** 系统必须视觉上引导他们进入下一个输入字段
