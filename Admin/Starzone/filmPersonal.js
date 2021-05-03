const {chromium} = require('playwright');

(async () => { //, slowMo: 50
    var start = new Date()
    var hrstart = process.hrtime()
    let data = [];
    let category = [];

    const browser = await chromium.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://www.ragalahari.com/newadmin/Login.aspx');
    await page.fill('input#Login1_UserName', 'suresh');
    await page.fill('input#Login1_Password', 'Bujjinana99 ');
    await page.click('input#Login1_LoginButton')
    await page.goto('https://www.ragalahari.com/newadmin/FilmPersonalAddEdit.aspx?fpid=97167');



    await page.waitForSelector(`input#MainContent_txtname`);

    const ele_category = await page.$$("#MainContent_lstcategory_chosen span");
    Array(ele_category.length).fill(0).map((v, i) => {
        category[i] = ele_category[i].innerText();
    });


    data['name'] = await page.$eval("input#MainContent_txtname", el => el.value)
    data['category'] = await Promise.all(category)
    data['alternateNames'] = await page.$eval("input#MainContent_txtadditionalName", el => el.value)
    data['birthday'] = await page.$eval("input#MainContent_txtbday", el => el.value)
    data['birthPlace'] = await page.$eval("input#MainContent_txtbirthPlace", el => el.value)
    data['height'] = await page.$eval("input#MainContent_txtheight", el => el.value)
    data['weight'] = await page.$eval("input#MainContent_txtweight", el => el.value)
    data['nationality'] = await page.$eval("input#MainContent_txtnationality", el => el.value)
    data['parents'] = await page.$eval("input#MainContent_txtparent", el => el.value)
    data['spouse'] = await page.$eval("input#MainContent_txtspouse", el => el.value)
    data['children'] = await page.$eval("input#MainContent_txtchildren", el => el.value)
    data['siblings'] = await page.$eval("input#MainContent_txtsibling", el => el.value)
    data['profession'] = await page.$eval("input#MainContent_txthasOccupation", el => el.value)
    data['languages'] = await page.$eval("input#MainContent_txtknowsLanguage", el => el.value)
    data['instagram'] = await page.$eval("input#MainContent_txtinstagram", el => el.value)
    data['twitter'] = await page.$eval("input#MainContent_txttwitter", el => el.value)
    data['facebook'] = await page.$eval("input#MainContent_txtfacebook", el => el.value)
    data['wikiUrl'] = await page.$eval("input#MainContent_txtsameas", el => el.value)
    data['contact'] = await page.$eval("input#MainContent_txtcontact", el => el.value)
    data['website'] = await page.$eval("input#MainContent_txtwebsite", el => el.value)
    data['email'] = await page.$eval("input#MainContent_txtemail", el => el.value)
    data['award'] = await page.$eval("input#MainContent_txtaward", el => el.value)
    data['netWorth'] = await page.$eval("input#MainContent_txtnetWorth", el => el.value)
    data['productionHouse'] = await page.$eval("input#MainContent_txtmemberOf", el => el.value)
    data['expiredDate'] = await page.$eval("input#MainContent_txtexpired", el => el.value)
    data['expiredPlace'] = await page.$eval("input#MainContent_txtdeathPlace", el => el.value)
    data['thumbnail'] = await page.$eval("input#MainContent_txtthumbnail", el => el.value)
    data['seoTitle'] = await page.$eval("input#MainContent_txtseotitle", el => el.value)
    data['permaLink'] = await page.$eval("input#MainContent_txtpermalink", el => el.value)
    data['metaDescription'] = await page.$eval("textarea#MainContent_txtmetadesc", el => el.value)
    data['metaKeywords'] = await page.$eval("textarea#MainContent_txtmetakey", el => el.value)
    data['profile'] = await page.$eval("[name=\"ctl00$MainContent$FCKeditor1\"]", el => el.value)
    data['active'] = await page.$eval("[name=\"ctl00$MainContent$rbactive\"]:checked", el => el.value)



    console.log(data);
   // await browser.close();

    var end = new Date() - start,
        hrend = process.hrtime(hrstart)
    console.info('Execution time: %dms', end)
    console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)

})();
