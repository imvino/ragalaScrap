const {chromium} = require('playwright');
const sendMail = require('../components/sendmail');
const database = require('../components/model');
const timer = require('../components/timer');
const user = require('../components/login');
const log = require('log-to-file');


const main = async (data) => { //, slowMo: 50
    var start = new Date()
    var hrstart = process.hrtime()
    let list = [];
    let timeout = 600000
    let delCount = 25;
    let counter = 0;
    let mailCounter = 0;
    //{headless: false, devtools: true}

    function logger(msg) {
        console.log('browser'+data.array+' => '+msg);
        log('browser'+data.array+' => '+msg, data.file);
    }

    const browser = await chromium.launch({headless:false,devtools:false});
    //rid='95315' `found` is null limit 50 id BETWEEN 1 AND 100 `"+data.find+"` is null and
    //OFFSET 1000
    let ids = await database.sql("SELECT `rid` FROM `"+data.logDatabase+"` where `"+data.find+"` is null LIMIT "+data.limit+" OFFSET "+data.offset)
    const context = await browser.newContext();
    logger('started')
    await user.auth(context)
    logger('LoggedIn')

    async function run(id) {
        try {
            const page = await context.newPage();
            //html,
            await page.route('**/*.{png,jpg,jpeg,js,html,json,svg,css,woff,woff2,ico}', route => {
                route.abort()
            });

            await page.goto(data.gotoUrl, {timeout: timeout})
            await page.waitForSelector(data.selector, {timeout: timeout});
            await page.selectOption(data.selector, id.toString(), {timeout: timeout});
            counter++
            logger('counter => ' + counter)
            page.on('load', async () => {

                const raga = await page.$$(`#raga`);
                if (raga.length !== 0) {
                    const link = await page.$$('a.btn-info[href]');
                    if (link.length !== 0) {
                        Array(link.length).fill(0).map((v, i) => {
                            list[i] = link[i].getAttribute("href")
                        });
                        list = await Promise.all(list)
                        logger('Found ' + link.length + ' urls on ' + id)
                        let count = 'new count';
                        list.map(async (v, i) => {
                            let function_id = v.toString().replace(data.editUrl, '');
                            count = null;
                            count = await database.sql("SELECT count(*) as chk from `"+data.linkDatabase+"` WHERE `rid`='" + function_id + "'")
                            if (count[0]['chk'] === 0) {
                                logger('Inserted => ' + function_id)
                                await database.sql("INSERT INTO `"+data.linkDatabase+"` (`rid`,`refId`) VALUES ('" + function_id + "','" + id + "')")

                            }
                        })
                        await database.sql("UPDATE `"+data.logDatabase+"` SET  `"+data.find+"`='" + link.length + "' WHERE `rid`=" + id)
                    } else {
                        logger('No urls found on ' + id)
                        await database.sql("UPDATE `"+data.logDatabase+"` SET  `"+data.find+"`='" + link.length + "' WHERE `rid`=" + id)
                    }
                } else {
                    logger('Page error => ' + id)
                    sendMail('Page error => ' + data.file, 'Error').catch(console.error);
                }
                await page.close();
                timer.endTime(start, hrstart, data.file)
                logger('===============');

            })
            if (counter % delCount === 0) {
                arr()
            } else if (ids.length === 0) {
                arr()
            }

            // await page.goto('http://localhost/select.html', {timeout: timeout})
        } catch (e) {
            // await context.close()
            logger(e)
            logger('errors found on id ' + id)
            sendMail(data.file, 'errors found on id ' + id).catch(console.error);
            return
        }
    }

    async function arr() {
        if (ids.length === 0) {
            mailCounter++
            if (mailCounter === 1) {
                logger('completed')
                sendMail(data.file, 'completed').catch(console.error);
            }
            console.log(mailCounter)
            return
        }
        ids.splice(0, delCount).map((v, i) => {
            run(v.rid);
        })
    }

    arr()
};

module.exports = main