const {chromium} = require('playwright');

(async () => { //, slowMo: 50
    var start = new Date()
    var hrstart = process.hrtime()
    let data = [];
    let filmPersonals = [];

    const browser = await chromium.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://www.ragalahari.com/newadmin/Login.aspx');
    await page.fill('input#Login1_UserName', 'suresh');
    await page.fill('input#Login1_Password', 'Bujjinana99 ');
    await page.click('input#Login1_LoginButton');
    await page.goto('https://www.ragalahari.com/newadmin/NewsItemAddEdit.aspx?newsid=162687');



    await page.waitForSelector(`.chosen-single span`);

    const ele_filmPersonals = await page.$$("#MainContent_lstfp_chosen span");
    Array(ele_filmPersonals.length).fill(0).map((v, i) => {
        filmPersonals[i] = ele_filmPersonals[i].innerText();
    });


    data['movieName'] = await page.innerText(".chosen-single span")
    data['heading'] = await page.$eval("input#MainContent_txtheading", el => el.value)
    data['filmPersonals'] = await Promise.all(filmPersonals)
    data['seoTitle'] = await page.$eval("input#MainContent_txtseotitle", el => el.value)
    data['permaLink'] = await page.$eval("input#MainContent_txtpermalink", el => el.value)
    data['metaDescription'] = await page.$eval("textarea#MainContent_txtmetadesc", el => el.value)
    data['metaKeywords'] = await page.$eval("textarea#MainContent_txtmetakey", el => el.value)
    data['newsImage'] = await page.$eval("input#MainContent_txtnewsimg", el => el.value)
    data['newsItem'] = await page.$eval("input#MainContent_txtnews", el => el.value)
    data['videoIds'] = await page.$eval("input#MainContent_txtvideo", el => el.value)
    data['updatedDate'] = await page.$eval("[name=\"ctl00$MainContent$rbupdate\"]:checked", el => el.value)
    data['ottNews'] = await page.$eval("[name=\"ctl00$MainContent$rbott\"]:checked", el => el.value)
    data['highlightNews'] = await page.$eval("[name=\"ctl00$MainContent$rbnewsfocus\"]:checked", el => el.value)
    data['active'] = await page.$eval("[name=\"ctl00$MainContent$rbactive\"]:checked", el => el.value)


    console.log(data);
   // await browser.close();

    var end = new Date() - start,
        hrend = process.hrtime(hrstart)
    console.info('Execution time: %dms', end)
    console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)

})();