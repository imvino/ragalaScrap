const {chromium} = require('playwright');

(async () => { //, slowMo: 50
    var start = new Date()
    var hrstart = process.hrtime()
    let data = [];

    const browser = await chromium.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://www.ragalahari.com/newadmin/Login.aspx');
    await page.fill('input#Login1_UserName', 'suresh');
    await page.fill('input#Login1_Password', 'Bujjinana99 ');
    await page.click('input#Login1_LoginButton');
    await page.goto('https://www.ragalahari.com/newadmin/PressReleasesAddEdit.aspx?relid=42981');



    await page.waitForSelector(`#MainContent_drp_movie_chosen span`);



    data['movieName'] = await page.innerText("#MainContent_drp_movie_chosen span")
    data['localLocation'] = await page.innerText("#MainContent_drp_local_chosen span")
    data['heading'] = await page.$eval("input#MainContent_txtheading", el => el.value)
    data['pressReleaseImage'] = await page.$eval("input#MainContent_txtpressimg", el => el.value)
    data['seoTitle'] = await page.$eval("input#MainContent_txtseotitle", el => el.value)
    data['permaLink'] = await page.$eval("input#MainContent_txtpermalink", el => el.value)
    data['metaDescription'] = await page.$eval("textarea#MainContent_txtmetadesc", el => el.value)
    data['metaKeywords'] = await page.$eval("textarea#MainContent_txtmetakey", el => el.value)
    data['content'] = await page.$eval("input#MainContent_txtpresscnt", el => el.value)
    data['videoIds'] = await page.$eval("input#MainContent_txtvideo", el => el.value)
    data['updatedDate'] = await page.$eval("[name=\"ctl00$MainContent$rbupdate\"]:checked", el => el.value)
    data['mediaAgency'] = await page.innerText("#MainContent_drp_agency_chosen span")
    data['active'] = await page.$eval("[name=\"ctl00$MainContent$rbactive\"]:checked", el => el.value)
    data['paid'] = await page.$eval("[name=\"ctl00$MainContent$rbpaid\"]:checked", el => el.value)


    console.log(data);
   // await browser.close();

    var end = new Date() - start,
        hrend = process.hrtime(hrstart)
    console.info('Execution time: %dms', end)
    console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)

})();
