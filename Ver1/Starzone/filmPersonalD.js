const {chromium} = require('playwright');
const database = require('../../components/model');
const timer = require('../../components/timer');
const user = require('../../components/login');
(async () => { //, slowMo: 50
    let start = new Date()
    let hrstart = process.hrtime()

    let data = [];
    let column = [];
    let category = [];
    let timeout = 1200000
    let delcount = 100;
    let counter = 0;
    let categoryData = {
        "Actor": "31",
        "Actress": "32",
        "Female Anchor": "24",
        "Female Art Director": "54",
        "Female Associate Director": "46",
        "Female Celebrity": "57",
        "Female Character Artist": "22",
        "Female Child Artist": "50",
        "Female Choreography": "43",
        "Female Cinematography": "42",
        "Female Comedian": "40",
        "Female Director": "44",
        "Female Dubbing Artist": "48",
        "Female Editor": "63",
        "Female Fresh Face": "29",
        "Female Hyderabad Model": "56",
        "Female Lyricist": "51",
        "Female Make-Up": "41",
        "Female Model": "16",
        "Female Music Director": "53",
        "Female Producer": "61",
        "Female Screenplay Writer": "45",
        "Female Singer": "23",
        "Female TV Star": "59",
        "Female Villian": "47",
        "Female Writer": "52",
        "Item Girl": "20",
        "Male Character Artist": "21",
        "Male Anchor": "49",
        "Male Art Director": "10",
        "Male Associate Director": "27",
        "Male Celebrity": "58",
        "Male Child Artist": "14",
        "Male Choreography": "35",
        "Male Cinematography": "37",
        "Male Comedian": "39",
        "Male Director": "34",
        "Male Dubbing Artist": "25",
        "Male Editor": "62",
        "Male Fresh Face": "30",
        "Male Hyderabad Model": "55",
        "Male Lyricist": "13",
        "Male Make-Up": "38",
        "Male Model": "15",
        "Male Music Director": "11",
        "Male Screenplay Writer": "28",
        "Male Singer": "33",
        "Male Stunt": "36",
        "Male TV Star": "60",
        "Male Villian": "26",
        "Male Writer": "12",
        "Other": "19",
        "Producer": "17",
        "Production House": "18"
    }
    const browser = await chromium.launch({headless: false});



    let ids = await database.sql("SELECT `rid` FROM `starzone_filmpersonal` WHERE `id`=1 limit 1")

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.ragalahari.com/newadmin/Login.aspx');
    await page.fill('input#Login1_UserName', 'suresh');
    await page.fill('input#Login1_Password', 'Bujjinana99 ');
    await page.click('input#Login1_LoginButton')

    async function run(rid) {
        try {
            const page = await context.newPage();
            await page.route('**/*.{png,jpg,jpeg,html,json,svg,css,woff,woff2,ico}', route => {
                route.abort()
            });
            counter++
            page.on('load', async () => {
                const raga = await page.$$(`#raga`);
                if (raga.length !== 0) {
                    await page.waitForSelector('#MainContent_lstcategory_chosen', {timeout: timeout});
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
                    data['category']?.map((v, i) => {
                        data['category'][i] = parseInt(categoryData[v])
                    })
                    let colList = Object.keys(data)
                    colList.map((v, i) => {
                        column[i] = "`" + v + "`=NULLIF('" + data[v] + "', null)";
                    })
                    let query = "UPDATE `starzone_filmpersonal` SET " + column.toString() + " WHERE `rid`=" + rid;
                    await database.sql(query)
                    //  await page.close();

                } else {
                    console.log('Page error => ' + rid)
                    await page.close();
                }

                timer.endTime(start, hrstart)
                console.log('counter => ' + counter)
                console.log('list => ' + rid)
                if (counter % delcount === 0) {
                    arr()
                }
            })

            await page.goto('https://www.ragalahari.com/newadmin/FilmPersonalAddEdit.aspx?fpid=' + rid, {timeout: timeout})


        } catch (e) {
            // await context.close()
            console.log(e)
            console.log('errors found on rid ' + rid)
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
