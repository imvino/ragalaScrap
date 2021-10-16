const {chromium} = require('playwright');
const database = require('../components/model');
var format = require('../formatDT')

const main = async (data) => {
    let counter = 0;
    const browser = await chromium.launch({headless: false,});
    let delCount = 25;
    let sql = "SELECT `rid` FROM `"+data.linkDatabase+"` where `rdate` is null and `active`=1 LIMIT "+data.limit+" OFFSET "+data.offset
    let ids = await database.sql(sql)
    const context = await browser.newContext();
    async function run(id) {
        try {
            const page = await context.newPage();
            await page.route('**/*.{png,jpg,jpeg,html,js,json,svg,css,woff,woff2,ico}', route => {
                route.abort()
            });
            let gotoUrl='https://www.ragalahari.com/'+data.gotoUrl+'/'+id+'/news'
            page.on('response', async (response) => {
                if (response.url() === gotoUrl && response.status()) {
                    if(response.status()===404){
                        console.log('response => ' + response.status() + ' => ' + id)
                        await database.sql("UPDATE `"+data.linkDatabase+"` SET `rdate` = '2222-02-17 00:00:00' WHERE `rid` = "+id)
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
                await database.sql("UPDATE `"+data.linkDatabase+"` SET `rdate` = '" + format.formatDate(time) + "' WHERE `rid` = " + id)
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

    console.log(sql)
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
};

module.exports = main
