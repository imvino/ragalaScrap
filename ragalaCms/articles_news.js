const {chromium} = require('playwright');
const database = require('../components/model');
const core = require('../ExtractData/Using_DB_rid/coreDataScrap');
var format = require('../formatDT')
let rid = [];

async function gen(data, webid,extDate=false) {
    let rdate = async () => {
        let counter = 0;
        const browser = await chromium.launch({headless: false,});
        let delCount = 25;
        let ids = await database.sql("SELECT `rid` FROM `" + data + "` where `rdate` is null and active=1")
        const context = await browser.newContext();

        async function run(id) {
            try {
                const page = await context.newPage();
                await page.route('**/*.{png,jpg,jpeg,html,js,json,svg,css,woff,woff2,ico}', route => {
                    route.abort()
                });
                let gotoUrl='https://www.ragalahari.com/tollywood-news-news-news/'+id+'/news'
                page.on('response', async (response) => {
                    if (response.url() === gotoUrl && response.status()) {
                        if(response.status()===404){
                            console.log('response => ' + response.status() + ' => ' + id)
                            await database.sql("UPDATE `articles_news` SET `rdate` = '2222-02-17 00:00:00' WHERE `rid` = "+id)
                            await page.close();
                        }
                    }
                })
                page.on('load', async () => {
                    // function goes here
                    const time = await page.evaluate(() => {
                        return document.querySelector('time').getAttributeNode("datetime").value
                    });
                    await database.sql("UPDATE `articles_news` SET `rdate` = '" + format.formatDate(time) + "' WHERE `rid` = " + id)
                    await page.close();
                })
                await page.goto(gotoUrl)
                counter++
                console.log('list => ' + id+' => '+counter)
                if (counter % delCount === 0) {
                    arr()
                } else if (ids.length === 0) {
                    arr()
                }
            } catch (e) {
                //  await context.close()
                console.log(e)
                console.log('errors found')
                return
            }
        }

        async function arr() {
            if (ids.length === 0 || ids.length === 0 && counter === 0) {
                console.log('completed')
                return
            }
            ids.splice(0, delCount).map((v, i) => {
                run(v.rid);
            })
        }

        arr()
    }
    if (extDate) {
        rdate()
    } else {
        let v = await database.sql("SELECT MAX( rid ) FROM `" + data + "`")
        v = v[0]['MAX( rid )'] + 1
        console.log(v)
        for (let i = v; i <= webid; i++) {
            rid.push(i)
        }
        console.log('total', rid.length)
        if (rid.length != 0) {
            let sql = "INSERT INTO `" + data + "`(`rid`) VALUES (" + rid.toString().replace(/,/ig, '),(') + ")"
            console.log(sql)
            let sql2 = await database.sql(sql);
            console.log(sql2)
        } else {
            console.log('not inserted')
        }

        let total = rid.length?rid.length:150
        let split = 1
        let limit = Math.round(total / split)
// offset: total+(limit*i),
// offset: limit*i,
        Array(split).fill(0).map((v, i) => {
            let data = {
                file: 'articlesNews.log',
                gotoUrl: 'https://www.ragalahari.com/newadmin/NewsItemAddEdit.aspx?newsid=',
                linkDatabase: 'articles_news',
                coreDate: 'articlesNews',
                limit: limit,
                offset: limit*i,
                array: i+1,
            }
            console.log(data)
            core(data)
        })
    }

}

gen('articles_news', 164859,true)



