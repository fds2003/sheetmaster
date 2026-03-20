这份文档是为你专门设计的，旨在帮助你利用 AI 开发工具（如 Antigravity）构建一个既强大又符合 Reddit 合规政策的 **SEO 关键词雷达**。

------

# Prompt：基于 Python + AI 的 Reddit 实时关键词提取工具开发

## 1. 任务背景

我需要开发一个 Python 脚本，名为 **"Reddit SEO Keyword Radar"**。该工具旨在通过抓取 Reddit 热门版块（r/excel, r/googlesheets）的实时讨论，利用 AI 提取用户的痛点和长尾关键词，为我的网站 **getsheetmaster.com**（Excel 公式生成器）提供内容灵感。

## 2. 合规性要求 (Reddit API Policy)

根据 Reddit 的《Responsible Builder Policy》，开发时必须遵守以下原则：

- **透明性**：必须在 `User-Agent` 中清晰标明应用名称和版本。
- **尊重限制**：严格遵守 Reddit API 的速率限制（Rate Limits），严禁暴力抓取。
- **隐私保护**：脚本仅抓取公开帖子内容，不涉及任何用户个人敏感信息的识别或反向追踪。
- **非商业训练**：所获数据仅用于 SEO 关键词分析，不用于训练第三方 AI 模型。

## 3. 核心功能模块要求

### A. 数据抓取 (PRAW 模块)

- **目标版块**：`r/excel`, `r/googlesheets`。
- **抓取策略**：抓取过去 24 小时内的 `Hot` 帖子和 `New` 帖子。
- **提取内容**：帖子标题 (Title)、正文 (Selftext)、点赞数 (Score)、评论数 (Num_comments)。
- **过滤逻辑**：仅保留正文中包含 "How to", "formula", "help", "error", "REGEX" 等关键词的帖子。

### B. 语义分析 (OpenAI/LLM 模块)

- **处理逻辑**：将抓取到的内容（标题+正文）成批发送给 AI 进行分析。

- **AI 任务指令 (System Prompt)**：

  > "你是一个 SEO 专家。请分析这些 Reddit 帖子，识别用户在处理 Excel/Google Sheets 时的具体难题。请输出：
  >
  > 1. **核心需求**（用一句话概括用户想解决什么）；
  > 2. **建议的长尾词**（3个最适合搜索优化的关键词）；
  > 3. **内容转化潜力**（1-10分，评估该问题是否适合做一个公式生成器页面）。"

### C. 数据导出与展示

- **输出格式**：生成一个 `keywords_report_YYYYMMDD.csv` 文件。
- **字段定义**：`Subreddit` | `Original_Title` | `Pain_Point` | `SEO_Keywords` | `Potential_Score` | `URL`。

## 4. 技术栈要求

- **语言**：Python 3.10+
- **核心库**：`praw` (Reddit API), `openai` (AI 分析), `pandas` (数据处理), `python-dotenv` (配置管理)。
- **安全要求**：所有 API 密钥必须从 `.env` 文件读取，不得硬编码在脚本中。

## 5. 最终交付物指令（发给 AI 代码工具）

> "请根据上述 MD 文档的需求，写出完整的 Python 代码：
>
> 1. 提供一个 `reddit_radar.py` 脚本，采用类结构（Class-based）编写。
> 2. 提供一个 `.env.example` 文件模板。
> 3. 提供 `requirements.txt`。
> 4. **特别优化**：在分析逻辑中，请加入一段逻辑：如果用户提到的问题能通过复杂的 `INDEX/MATCH` 或 `REGEXEXTRACT` 解决，请将其标记为 'High Priority'，因为这最符合 getsheetmaster.com 的工具属性。"

------

### 如何执行？

1. **准备环境**：在你的开发文件夹中创建 `.env` 文件，填入你的 `REDDIT_CLIENT_ID`, `REDDIT_CLIENT_SECRET`, `OPENAI_API_KEY`。
2. **粘贴代码**：将以上 Prompt 丢给你的 AI 工具，生成代码。
3. **定期运行**：建议每周运行一次，你会发现很多类似 “How to extract domain from email without @” 这样非常有价值、搜索量高但竞争小的长尾词。