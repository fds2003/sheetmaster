import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            // 1. ✅ 允许：搜索/用户发起的 AI 检索爬虫（产生真实引用与流量回流）
            {
                userAgent: [
                    'OAI-SearchBot',
                    'ChatGPT-User',
                    'Claude-SearchBot',
                    'Claude-User',
                    'PerplexityBot',
                    'Perplexity-User',
                    'Googlebot',
                    'GoogleOther',
                    'Bingbot',
                    'Applebot',
                    'Meta-ExternalAgent',
                    'Amazonbot',
                ],
                allow: ['/api/formulas/', '/'],
                disallow: ['/admin/', '/api/', '/auth/'],
            },
            // 2. ❌ 阻止：仅用于大模型预训练的爬虫（不产生引用）
            {
                userAgent: [
                    'GPTBot',
                    'ClaudeBot',
                    'Google-Extended',
                    'CCBot',
                    'Bytespider',
                    'anthropic-ai',
                ],
                disallow: ['/'],
            },
            // 3. 默认通用规则
            {
                userAgent: '*',
                allow: ['/api/formulas/', '/'],
                disallow: ['/admin/', '/api/', '/auth/'],
            },
        ],
        sitemap: 'https://www.getsheetmaster.com/sitemap.xml',
    };
}
