const {chromium} = require('playwright');

(async () => { //, slowMo: 50
    var start = new Date()
    var hrstart = process.hrtime()
    let data = [];
    let filmPersonals = [];
    let genere = [];
    let ottPlatform = [];

    const browser = await chromium.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://www.ragalahari.com/newadmin/Login.aspx');
    await page.fill('input#Login1_UserName', 'suresh');
    await page.fill('input#Login1_Password', 'Bujjinana99 ');
    await page.click('input#Login1_LoginButton')
    await page.goto('https://www.ragalahari.com/newadmin/MovieInfoAddEdit.aspx?mid=96151');

    await page.waitForSelector(`#MainContent_lstfp_chosen ul.chosen-choices`);

    const ele_filmPersonals = await page.$$("#MainContent_lstfp_chosen span");
    Array(ele_filmPersonals.length).fill(0).map((v, i) => {
        [filmPersonals[i]] = ([ele_filmPersonals[i].innerText()]);
    });

    const ele_genere = await page.$$("#MainContent_lsttype_chosen span");
    Array(ele_genere.length).fill(0).map((v, i) => {
        [genere[i]] = ([ele_genere[i].innerText()]);
    });

    const ele_ottPlat = await page.$$("#MainContent_lstottplatform_chosen span");
    Array(ele_ottPlat.length).fill(0).map((v, i) => {
        [ottPlatform[i]] = ([ele_ottPlat[i].innerText()]);
    });


    data['movieName'] = await page.$eval("input#MainContent_txtname", el => el.value)
    data['language'] = await page.$eval("select#MainContent_txtlanguage", el => el.value)
    data['rating'] = await page.$eval("select#MainContent_txtContentRating", el => el.value)
    data['filmPersonals'] = await Promise.all(filmPersonals)
    data['banner'] = await page.$eval("input#MainContent_txtbanner", el => el.value)
    data['cast'] = await page.$eval("textarea#MainContent_txtcast", el => el.value)
    data['crew'] = await page.$eval("textarea#MainContent_txtcrew", el => el.value)
    data['music'] = await page.$eval("input#MainContent_txtmusic", el => el.value)
    data['producer'] = await page.$eval("input#MainContent_txtproducer", el => el.value)
    data['director'] = await page.$eval("input#MainContent_txtdirector", el => el.value)
    data['genere'] = await Promise.all(genere)
    data['currentProgress'] = await page.$eval("textarea#MainContent_txtprogress", el => el.value)
    data['imageLink'] = await page.$eval("input#MainContent_txtimage", el => el.value)
    data['releaseDate'] = await page.$eval("input#MainContent_txtreleasedate", el => el.value)
    data['seoTitle'] = await page.$eval("input#MainContent_txtseotitle", el => el.value)
    data['permaLink'] = await page.$eval("input#MainContent_txtpermalink", el => el.value)
    data['metaDescription'] = await page.$eval("textarea#MainContent_txtmetadesc", el => el.value)
    data['metaKeywords'] = await page.$eval("textarea#MainContent_txtmetakey", el => el.value)
    data['duration'] = await page.$eval("input#MainContent_txtduration", el => el.value)
    data['imdbWikiUrl'] = await page.$eval("input#MainContent_txtsameas", el => el.value)
    data['synopsis'] = await page.$eval("textarea#MainContent_txtsynopsis", el => el.value)
    data['trailer'] = await page.$eval("input#MainContent_txttrailer", el => el.value)
    data['ottUrls'] = await page.$eval("input#MainContent_otturl", el => el.value)
    data['ottPlatform'] = await Promise.all(ottPlatform)
    data['active'] = await page.$eval("[name=\"ctl00$MainContent$rbactive\"]:checked", el => el.value)
    data['monthHighlight'] = await page.$eval("[name=\"ctl00$MainContent$rbmonthfocus\"]:checked", el => el.value)
    data['yearHighlight'] = await page.$eval("[name=\"ctl00$MainContent$rbyearfocus\"]:checked", el => el.value)


    console.log(data);
    //  await browser.close();

    var end = new Date() - start,
        hrend = process.hrtime(hrstart)
    console.info('Execution time: %dms', end)
    console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)

})();
