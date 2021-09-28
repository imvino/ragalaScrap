const {chromium} = require('playwright');
const database = require('../components/model');
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}
(async () => {
    let counter = 0;
    const browser = await chromium.launch({headless: false,});
    let delCount = 25;
    let ids = await database.sql("SELECT `rid` FROM `articles_interviews` where `rdate` is null and `active`=1")
    const context = await browser.newContext();
    async function run(id) {
        try {
            const page = await context.newPage();
            await page.route('**/*.{png,jpg,jpeg,html,js,json,svg,css,woff,woff2,ico}', route => {
                route.abort()
            });
            let gotoUrl='https://www.ragalahari.com/celebrity-interview/'+id+'/news'
            page.on('response', async (response) => {
                if (response.url() === gotoUrl && response.status()) {
                    if(response.status()===404){
                        console.log('response => ' + response.status() + ' => ' + id)
                        await database.sql("UPDATE `articles_interviews` SET `rdate` = '2222-02-17 00:00:00' WHERE `rid` = "+id)
                        await page.close();
                    }
                }
            })
            page.on('load', async () => {
                // function goes here
                const time = await page.evaluate(() => {
                    return document.querySelector('.gallerydate').innerText.replace('Updated on ','')
                });
              //  let date = new Date(time)
                await database.sql("UPDATE `articles_interviews` SET `rdate` = '" + formatDate(time) + "' WHERE `rid` = " + id)
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
        if (ids.length === 0  || ids.length === 0 && counter === 0) {
            console.log('completed')
            return
        }

        ids.splice(0, delCount).map((v, i) => {
            run(v.rid);
        })
    }

    arr()

})();
