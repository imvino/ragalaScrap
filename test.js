const {chromium} = require('playwright');
(async () => {
     const browser = await chromium.launch({headless: false, devtools: false});
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.route('**/*.{png,jpg,jpeg,js,json,svg,css,woff,woff2,ico}', route => {
        route.abort()
    });

    page.on('load', async (e) => {
        console.log(e)
        console.log('loadded')
    })
    await page.goto('http://localhost/News.html', {timeout: 6000000})
 })()
