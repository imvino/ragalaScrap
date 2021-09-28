const {chromium} = require('playwright');
let user = require('../../components/login');
const database = require('../../components/model');
const log = require('log-to-file');
const timer = require('../../components/timer');

const main = async (data) => {
    var start = new Date()
    var hrstart = process.hrtime()
    let delCount = 50


    let err = [];
    let counter = 0;
    let timeout = 600000

    function logger(msg) {
        console.log('browser' + data.array + ' => ' + msg);
        log('browser' + data.array + ' => ' + msg, data.file);
    }


    let ids = data.gUrls;
    const browser = await chromium.launch({headless: false});
    const context = await browser.newContext();
    logger('started')
    await user.auth(context);
    logger('LoggedIn')

    async function run(goto) {
        let rid = goto.match(/([0-9]+)/)
        try {
            const page = await context.newPage();
            await page.route('**/*.{png,jpg,jpeg,js,html,json,svg,css,woff,woff2,ico}', route => {
                route.abort()
            });
            page.on('response', async (response) => {
                if (response.url() === goto && response.status() === 200) {
                    logger(response.url())
                    let count = await database.sql("SELECT count(*) as chk from `" + data.linkDatabase + "` WHERE `rid`='" + rid[0] + "'")
                    if (count[0]['chk'] === 0) {
                        ids.push(rid[0])
                        console.log('Inserted => ' + rid[0])
                        await database.sql("INSERT INTO `" + data.linkDatabase + "` (`rid`) VALUES ('" + rid[0] + "')")
                    }
                }
            })
            page.on('load', async () => {
                counter++
                console.log('counter => ' + counter)
                // let edit = await page.$eval('[name="ctl00$MainContent$txttitle"]', el => el.value)
                // if(edit !==''){
                //     let count = await database.sql("SELECT count(*) as chk from `" + data.linkDatabase + "` WHERE `rid`='" + rid[0] + "'")
                //     if (count[0]['chk'] === 0) {
                //         ids.push(rid[0])
                //         console.log('Inserted => ' + rid[0])
                //         await database.sql("INSERT INTO `" + data.linkDatabase + "` (`rid`) VALUES ('" + rid[0] + "')")
                //     }
                // }

                timer.endTime(start, hrstart, data.file, data.array)
                if (counter % delCount === 0) {
                    arr()
                }
                await page.close();
            })

            await page.goto(goto, {timeout: timeout});
        } catch (e) {
            logger('page error on ' + goto)
            err.push(rid[0])
            console.log(e)
        }
    }

    async function arr() {
        if (ids.length === 0) {
            logger('completed')
            timer.endTime(start, hrstart, data.file, data.array)
            logger('Errors => ' + err.sort().toString());
            logger('success => ' + ids.sort().toString());
            return
        }
        await ids.splice(0, delCount).map((goto, i) => {
            run(goto)
        })
    }

    arr()
};
module.exports = main
