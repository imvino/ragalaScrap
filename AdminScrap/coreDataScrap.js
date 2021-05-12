const {chromium} = require('playwright');
const sendMail = require('../components/sendmail');
const database = require('../components/model');
const timer = require('../components/timer');
const user = require('../components/login');
const log = require('log-to-file');
const pageData = require('./pageData')


const main = async (data) => { //, slowMo: 50
    var start = new Date()
    var hrstart = process.hrtime()
    let timeout = 600000
    let delCount = 25;
    let counter = 0;
    let mailCounter = 0;
    let statusCode = 404

    function logger(msg) {
        console.log('browser' + data.array + ' => ' + msg);
        log('browser' + data.array + ' => ' + msg, data.file);
    }

    const browser = await chromium.launch({headless: false, devtools: false});
    //rid='95315' `found` is null limit 50 id BETWEEN 1 AND 100 `"+data.find+"` is null and
    //OFFSET 1000 and rid='169619'
    let ids = await database.sql("SELECT `rid` FROM `" + data.linkDatabase + "` where `working` is null LIMIT " + data.limit + " OFFSET " + data.offset)
    const context = await browser.newContext();
    logger('started')
    await user.auth(context)
    logger('LoggedIn')

    async function run(id) {
        const page = await context.newPage();
        logger('new page => ' + id)
        try {
            await page.route('**/*.{png,jpg,jpeg,js,html,json,svg,css,woff,woff2,ico}', route => {
                route.abort()
            });
            page.on('response', async (response) => {
                if (response.url() === data.gotoUrl + id && response.status()) {
                    logger('response => ' + response.status() + ' => ' + id)
                    statusCode = response.status();
                }
            })
            page.on('close', async () => {
                logger('page closed => ' + id)
                counter++
                logger('counter => ' + counter + ' => ' + id)
                timer.endTime(start, hrstart, data.file, 'browser' + data.array + ' => c' + counter)
                if (counter % delCount === 0) {
                    arr()
                } else if (ids.length === 0) {
                    arr()
                }

            })
            page.on('load', async () => {
                // function goes here
                const raga = await page.$$(`#raga`);
                if (raga.length !== 0 && statusCode) {
                    let column = await pageData[data.coreDate](page)
                    logger('inserted => ' + id)
                    await database.sql("UPDATE `" + data.linkDatabase + "` SET " + column.toString() + " , `working`='" + statusCode + "' WHERE `rid`=" + id)
                } else {
                    await database.sql("UPDATE `" + data.linkDatabase + "` SET  `working`='" + statusCode + "' WHERE `rid`=" + id)
                }
                await page.close();
            })
            await page.goto(data.gotoUrl + id, {timeout: timeout})

        } catch (e) {
            await page.close()
            logger(e)
            logger('catch error found on rid ' + id)
            // sendMail(data.file, 'catch error found on rid ' + id).catch(console.error);
            return
        }
    }

    async function arr() {
        if (ids.length === 0 && counter === data.limit || ids.length === 0 && counter === 0) {
            mailCounter++
            if (mailCounter === 1) {
                timer.endTime(start, hrstart, data.file, 'browser' + data.array + ' => completed')
              //  sendMail(data.file, 'completed').catch(console.error);
                await context.close()
            }
            return
        }

        ids.splice(0, delCount).map((v, i) => {
            run(v.rid);
        })
    }

    arr()
};
module.exports = main