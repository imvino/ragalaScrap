const {chromium} = require('playwright');
const sendMail = require('../components/sendmail');
const database = require('../components/model');
const timer = require('../components/timer');
const user = require('../components/login');
const log = require('log-to-file');

const file = 'functionUrl.log';

function logger(msg) {
    console.log(msg);
    log(msg, file);
}

(async () => { //, slowMo: 50
    var start = new Date()
    var hrstart = process.hrtime()
    let list = [];
    let timeout = 600000
    let delcount = 80;
    let counter = 0;
    let mailCounter = 0;
    //{headless: false, devtools: true}

    const browser = await chromium.launch({headless: false});
    //rid='95315' `found` is null limit 50 id BETWEEN 1 AND 100
    let ids = await database.sql("SELECT `rid` FROM `url_log_functions` where `found` is null ")
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

            await page.goto('https://www.ragalahari.com/newadmin/functionsinfo.aspx', {timeout: timeout})
            await page.waitForSelector('select[name="ctl00$MainContent$drp_movie"]', {timeout: timeout});
            await page.selectOption('select[name="ctl00$MainContent$drp_movie"]', id.toString(), {timeout: timeout});

            page.on('load', async () => {
                counter++
                logger('counter => ' + counter)
                const raga = await page.$$(`#raga`);
                if (raga.length !== 0) {
                    let selector = 'a.btn-info[href]'
                    const link = await page.$$(selector);
                    if (link.length !== 0) {
                        Array(link.length).fill(0).map((v, i) => {
                            list[i] = link[i].getAttribute("href")
                        });
                        list = await Promise.all(list)
                        logger('Found ' + link.length + ' urls on ' + id)
                        let count = 'new count';
                        list.map(async (v, i) => {
                            let function_id = v.toString().replace('FunctionsNewAddEdit.aspx?fid=', '');
                            // let count = await database.sql("SELECT rid from `movies_function` WHERE `rid`=79535")
                            count = null;
                            count = await database.sql("SELECT count(*) as chk from `movies_function` WHERE `rid`='" + function_id + "'")
                            // count = await database.sql("SELECT `rid` from `movies_function` WHERE `rid`='" + function_id + "' limit 2")
                            // if (count && count?.length === 0) {
                            if (count[0]['chk'] === 0) {
                                logger('Inserted => ' + function_id)
                                await database.sql("INSERT INTO `movies_function` (`rid`,`mvid`) VALUES ('" + function_id + "','" + id + "')")

                            }
                        })
                        await database.sql("UPDATE `url_log_functions` SET  `found`='" + link.length + "' WHERE `rid`=" + id)
                    } else {
                        logger('No urls found on ' + id)
                        await database.sql("UPDATE `url_log_functions` SET  `found`='" + link.length + "' WHERE `rid`=" + id)
                    }
                } else {
                    logger('Page error => ' + id)
                    sendMail('Page error => ' + file, 'Error').catch(console.error);
                }
                await page.close();
                timer.endTime(start, hrstart, file)
                logger('===============');
                if (counter % delcount === 0) {
                    arr()
                } else if (ids.length === 0) {
                    arr()
                }

            })
            // await page.goto('http://localhost/select.html', {timeout: timeout})
        } catch (e) {
            // await context.close()
            logger(e)
            logger('errors found on id ' + id)
            return
        }
    }

    async function arr() {
        if (ids.length === 0) {
            mailCounter++
            if (mailCounter === 1) {
                logger('completed')
                sendMail(file, 'completed').catch(console.error);
            }
            console.log(mailCounter)
            return
        }
        ids.splice(0, delcount).map((v, i) => {
            run(v.rid);
        })
    }

    arr()
})();
