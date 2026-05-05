import { NextResponse } from 'next/server';

/**
 * IndexNow API Endpoint
 * 
 * IndexNow is a protocol that allows you to instantly notify search engines
 * about URL changes on your website. Simply put, IndexNow allows search engines
 * to know about your content changes within seconds of occurrence.
 * 
 * Usage:
 * 1. Generate an API key (any string you choose, e.g., a hex string)
 * 2. Place a text file with the API key as the filename at your root:
 *    https://www.getsheetmaster.com/[API_KEY].txt
 * 3. Submit URLs via this endpoint
 * 
 * Example:
 * curl -X POST "https://www.getsheetmaster.com/api/indexnow" \
 *   -H "Content-Type: application/json" \
 *   -d '{
 *     "url": "https://www.getsheetmaster.com/formulas/vlookup",
 *     "key": "YOUR_API_KEY"
 *   }'
 */

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { url, key, urlList } = body;

        // Skip in local development to prevent 422/500 errors
        if (process.env.NODE_ENV !== 'production') {
            return NextResponse.json({ success: true, message: 'Skipped strictly in dev environment.' });
        }

        // Validate required parameters
        if (!key) {
            return NextResponse.json(
                { error: 'API key is required' },
                { status: 400 }
            );
        }

        // Build URL list
        const urls = urlList || (url ? [url] : []);
        if (urls.length === 0) {
            return NextResponse.json(
                { error: 'At least one URL is required' },
                { status: 400 }
            );
        }

        // IndexNow API configuration
        const indexNowEndpoint = 'https://api.indexnow.org/indexnow';
        
        // Your chosen API key (should match the .txt file at your root)
        const apiKey = key;

        // Prepare the request to IndexNow
        const indexNowPayload = {
            host: 'www.getsheetmaster.com',
            key: apiKey,
            keyLocation: 'https://www.getsheetmaster.com',
            urlList: urls,
        };

        // Submit to IndexNow
        const response = await fetch(indexNowEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(indexNowPayload),
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(
                `IndexNow API returned ${response.status}: ${errText?.slice(0, 200) || 'no body'}`
            );
        }

        // IndexNow often returns 200/202 with an empty body — do not call .json() blindly
        const raw = await response.text();
        let result: unknown = null;
        if (raw) {
            try {
                result = JSON.parse(raw) as unknown;
            } catch {
                result = raw;
            }
        }

        return NextResponse.json({
            success: true,
            message: `Submitted ${urls.length} URL(s) to IndexNow`,
            submittedUrls: urls,
            indexNowStatus: response.status,
            result,
        });
    } catch (error) {
        console.error('IndexNow submission error:', error);
        return NextResponse.json(
            { 
                error: 'Failed to submit to IndexNow',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({
        message: 'IndexNow API Endpoint',
        documentation: 'https://www.indexnow.org/',
        usage: {
            method: 'POST',
            endpoint: '/api/indexnow',
            body: {
                key: 'Your API key (must match a .txt file at your root)',
                url: 'Single URL to submit',
                urlList: 'Array of URLs to submit (optional, use if multiple)',
            },
            example: {
                key: 'YOUR_API_KEY',
                urlList: [
                    'https://www.getsheetmaster.com/formulas/vlookup',
                    'https://www.getsheetmaster.com/formulas/xlookup',
                ],
            },
        },
    });
}
