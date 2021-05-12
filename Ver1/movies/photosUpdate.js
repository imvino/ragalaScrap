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


    // await page.waitForSelector(`input#MainContent_txttitle`);
    page.on('load', async () => {
        data['title'] = await page.$eval("input#MainContent_txttitle", el => el.value)
        data['path'] = await page.$eval('[name="ctl00$MainContent$txtimgloc"]', el => el.value)
        data['imageAltText'] = await page.$eval("input#MainContent_txtimagealt", el => el.value)
        data['imageTitleText'] = await page.$eval("input#MainContent_txtimagetitle", el => el.value)
        data['homepageTitleText'] = await page.$eval("input#MainContent_txthomepage", el => el.value)
        data['homepageTitleDropdown'] = await page.$eval("select#MainContent_drpgaltype", el => el.value)
        data['addedDateTime'] = await page.$eval("input#MainContent_txtadddate", el => el.value)
        data['noOfPhotosPages'] = await page.$eval("select#MainContent_drpmaxphotos", el => el.value)
        data['updatedDate'] = await page.$eval("[name=\"ctl00$MainContent$rbupdate\"]:checked", el => el.value)

        console.log(data);
        // await browser.close();
    })
    await page.goto('http://localhost/photosUpdate.mhtml');

    var end = new Date() - start,
        hrend = process.hrtime(hrstart)
    console.info('Execution time: %dms', end)
    console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)

})();
