const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
    console.log("Starting Puppeteer...");
    const browser = await puppeteer.launch({
        headless: "new",
        defaultViewport: { width: 1280, height: 900 },
        args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    const screenshotDir = path.join(__dirname, '../screenshots');

    // Ensure the dir exists
    if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir, { recursive: true });
    }

    try {
        console.log("Capturing Figure 1: Homepage 50+ formula list...");
        await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
        await new Promise(r => setTimeout(r, 2000)); // Wait for hydration
        // Hide affiliate banners if they exist to keep it clean, as requested
        await page.evaluate(() => {
            const banners = Array.from(document.querySelectorAll('a')).filter(a => a.href.includes('udemy'));
            banners.forEach(b => {
                if (b.parentElement) b.parentElement.style.display = 'none';
            });
        });
        await page.screenshot({ path: path.join(screenshotDir, 'figure_1_homepage.png'), fullPage: true });

        console.log("Capturing Figure 2: VLOOKUP Generator interface...");
        await page.goto('http://localhost:3000/formulas/vlookup', { waitUntil: 'domcontentloaded' });
        await new Promise(r => setTimeout(r, 2000)); // Wait for hydration
        await page.evaluate(() => {
            const banners = Array.from(document.querySelectorAll('a')).filter(a => a.href.includes('udemy'));
            banners.forEach(b => {
                if (b.parentElement) b.parentElement.style.display = 'none';
            });
        });

        // Fill in some partial info to show the interaction
        await page.type('input#lookup_value', 'A2');
        await new Promise(r => setTimeout(r, 500)); // give it a moment to render state
        await page.screenshot({ path: path.join(screenshotDir, 'figure_2_vlookup_interaction.png') });

        console.log("Capturing Figure 3: Generated result with copy button...");
        await page.type('input#table_array', 'Sheet2!A:C');
        await page.type('input#col_index', '3');
        await page.select('select#range_lookup', 'FALSE');

        // wait for the text to appear in code
        await page.waitForFunction(() => {
            const code = document.querySelector('code');
            return code && code.innerText.includes('Sheet2!A:C');
        });

        // Hover the result box to show the copy buttons
        const resultBox = await page.$('.bg-gray-900');
        if (resultBox) {
            await resultBox.hover();
            await new Promise(r => setTimeout(r, 500)); // Wait for transition
        }

        await page.screenshot({ path: path.join(screenshotDir, 'figure_3_vlookup_result.png') });

        console.log("Screenshots captured successfully!");
    } catch (e) {
        console.error("Error capturing screenshots:", e);
    } finally {
        await browser.close();
    }
})();
