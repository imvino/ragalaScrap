const {chromium} = require('playwright');
const database = require('../../components/model');
const timer = require('../../components/timer');
const user = require('../../components/login');
(async () => { //, slowMo: 50
    let start = new Date()
    let hrstart = process.hrtime()
    let timeout = 1200000
    let delcount = 100;
    let counter = 0;

    const browser = await chromium.launch({headless: false});
    // 97321
    //`working` is null
    let ids = await database.sql("SELECT `rid` FROM `starzone_filmpersonal` WHERE `working` is not null")
    const context = await browser.newContext();
    await user.auth(context)

    async function run(id) {
        try {
            let data = [];
            let column = [];
            const page = await context.newPage();
            await page.route('**/*.{png,jpg,jpeg,html,js,json,svg,css,woff,woff2,ico}', route => {
                route.abort()
            });
            page.on('load', async () => {
                counter++
                console.log('counter => ' + counter)
                const raga = await page.$$(`#raga`);
                if (raga.length !== 0) {
                    data['name'] = await page.$eval("input#MainContent_txtname", el => el.value)
                    data['category'] = await page.evaluate(() => {
                        let selected = [];
                        for (let option of document.getElementById('MainContent_lstcategory').options) {
                            if (option.selected && option.value != '') {
                                selected.push(parseInt(option.value));
                            }
                        }
                        return JSON.stringify(selected);
                    });
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
                    // console.log(data)
                    let colList = Object.keys(data)
                    colList.map((v, i) => {
                        column[i] = "`" + v + "`=NULLIF('" + data[v] + "', '')";
                    })
                    console.log("UPDATE `starzone_filmpersonal` SET " + column.toString() + " , `working`='1' WHERE `rid`=" + id)
                    await database.sql("UPDATE `starzone_filmpersonal` SET " + column.toString() + " , `working`='1' WHERE `rid`=" + id)
                    console.log('Inserted  => ' + id)
                } else {
                    console.log('Page error => ' + id)
                    await database.sql("UPDATE `starzone_filmpersonal` SET  `working`='0' WHERE `rid`=" + id)

                }
                // await page.close();
                timer.endTime(start, hrstart)
                console.log('===============');
                if (counter % delcount === 0) {
                    arr()
                }
            })
            await page.goto('https://www.ragalahari.com/newadmin/FilmPersonalAddEdit.aspx?fpid=' + id, {timeout: timeout})

        } catch (e) {
            // await context.close()
            console.log(e)
            console.log('errors found on id ' + id)
            return
        }
    }

    async function arr() {
        if (ids.length === 0) {
            console.log('completed')
        }
        ids.splice(0, delcount).map((v, i) => {
            run(v.rid);
        })
    }

    arr()
})();
