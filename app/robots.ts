import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: [
                    '*',
                    'Googlebot',
                    'Bingbot',
                    'OAI-SearchBot',
                    'PerplexityBot',
                    'ClaudeBot',
                    'GPTBot',
                    'Google-Extended',
                    'Applebot-Extended',
                ],
                allow: '/',
                disallow: ['/admin/', '/api/', '/auth/'],
            },
        ],
        sitemap: 'https://www.getsheetmaster.com/sitemap.xml',
    };
}
