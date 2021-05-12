const {chromium} = require('playwright');

(async () => { //, slowMo: 50
    var start = new Date()
    var hrstart = process.hrtime()
    let data = [];

    const browser = await chromium.launch({headless: false});
    const page = await browser.newPage();
    // await page.goto('https://www.ragalahari.com/newadmin/Login.aspx');
    // await page.fill('input#Login1_UserName', 'suresh');
    // await page.fill('input#Login1_Password', 'Bujjinana99 ');
    // await page.click('input#Login1_LoginButton')

    await page.route('**/*.{png,jpg,jpeg,html,js,json,svg,css,woff,woff2,ico}', route => {
        route.abort()
    });

    // await page.waitForSelector(`select#MainContent_drp_movie`);
    page.on('load', async () => {
        // data['evenLocationName'] = await page.$eval("select#MainContent_drp_movie", el => el.value)
        data['evenLocationName'] = await page.evaluate(() => {
            let selected = [];
            for (let option of document.getElementById('MainContent_drp_movie').options) {
                if (option.selected && option.value != '') {
                    selected.push(parseInt(option.value));
                }
            }
            return JSON.stringify(selected);
        });
        data['eventContent'] = await page.$eval("textarea#MainContent_txteventcnt", el => el.value)
        data['eventStartDate'] = await page.$eval("input#MainContent_txtstartdate", el => el.value)
        data['eventEndDate'] = await page.$eval("input#MainContent_txtenddate", el => el.value)
        data['active'] = await page.$eval("[name=\"ctl00$MainContent$rbactive\"]:checked", el => el.value)


        console.log(data);
        // await browser.close();
    })
    await page.goto('http://localhost/schedule.mhtml');


    var end = new Date() - start,
        hrend = process.hrtime(hrstart)
    console.info('Execution time: %dms', end)
    console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)

})();

