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

    // await page.waitForSelector(`.chosen-single span`);

    page.on('load', async () => {
        // data['filmPersonalName'] = await page.innerText(".chosen-single span")
        data['filmPersonalName'] = await page.evaluate(() => {
            let selected = [];
            for (let option of document.getElementById('MainContent_drp_fp').options) {
                if (option.selected && option.value != '') {
                    selected.push(parseInt(option.value));
                }
            }
            return JSON.stringify(selected);
        });
        data['providerName'] = await page.$eval("select.form-control", el => el.value)
        data['title'] = await page.$eval("input#MainContent_txttitle", el => el.value)
        data['seoTitle'] = await page.$eval("input#MainContent_txtseotitle", el => el.value)
        data['permaLink'] = await page.$eval("input#MainContent_txtpermalink", el => el.value)
        data['metaDescription'] = await page.$eval("textarea#MainContent_txtmetadesc", el => el.value)
        data['metaKeywords'] = await page.$eval("textarea#MainContent_txtmetakey", el => el.value)
        data['imageName'] = await page.$eval("input#MainContent_txtimagename", el => el.value)
        data['fileLocation'] = await page.$eval("input#MainContent_txtloc", el => el.value)
        data['description'] = await page.$eval("input#MainContent_txtdesc", el => el.value)
        data['videoIds'] = await page.$eval("input#MainContent_txtvideo", el => el.value)
        data['updatedDate'] = await page.$eval("[name=\"ctl00$MainContent$rbupdate\"]:checked", el => el.value)
        data['languagesWorked'] = await page.$eval("[name=\"ctl00$MainContent$chklanguages$0\"]:checked", el => el.value)
        data['exclusiveGallery'] = await page.$eval("[name=\"ctl00$MainContent$rbexclusive\"]:checked", el => el.value)
        data['spicyGallery'] = await page.$eval("[name=\"ctl00$MainContent$rbspicy\"]:checked", el => el.value)
        data['active'] = await page.$eval("[name=\"ctl00$MainContent$rbactive\"]:checked", el => el.value)


        console.log(data);
        // await browser.close();
    })

    await page.goto('http://localhost/starzone_photos.mhtml');

    var end = new Date() - start,
        hrend = process.hrtime(hrstart)
    console.info('Execution time: %dms', end)
    console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)

})();
