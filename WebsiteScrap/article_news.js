const {chromium} = require('playwright');
const database = require('../components/model');
(async () => {
    let counter = 0;
    const browser = await chromium.launch({headless: false,});
    let delCount = 100;
    let ids = await database.sql("SELECT `rid` FROM `articles_news` where `rdate` is null and `active`=1")
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
                let date = new Date(time)
                await database.sql("UPDATE `articles_news` SET `rdate` = '" + date.toISOString().slice(0, 10) + " " + date.toTimeString().slice(0, 8) + "' WHERE `rid` = " + id)
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
        if (ids.length === 0 && counter === data.limit || ids.length === 0 && counter === 0) {
            console.log('completed')
            return
        }

        ids.splice(0, delCount).map((v, i) => {
            run(v.rid);
        })
    }

    arr()

    // run(159897)
})();
