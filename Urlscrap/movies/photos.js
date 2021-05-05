const {chromium} = require('playwright');
const sendMail = require('../../components/sendmail');
const database = require('../../components/model');
const timer = require('../../components/timer');
const user = require('../../components/login');
const log = require('log-to-file');

const file = 'photoUrl.log';
let selector ='select[name="ctl00$MainContent$drp_moviename"]';
let gotoUrl='https://www.ragalahari.com/newadmin/photogalleryinfo.aspx';
let editUrl='photogallerynewaddedit.aspx?pgid=';
let logDatabase='url_log_photos';
let linkDatabase='movies_photos';

function logger(msg) {
    console.log(msg);
    log(msg, file);
}

(async () => { //, slowMo: 50
    var start = new Date()
    var hrstart = process.hrtime()
    let list = [];
    let timeout = 600000
    let delCount = 100;
    let counter = 0;
    let mailCounter = 0;

    const browser = await chromium.launch({headless:true});
    //rid='95315' `found` is null limit 50 id BETWEEN 1 AND 100
    let ids = await database.sql("SELECT `rid` FROM `"+logDatabase+"` where `found` is null")
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

            await page.goto(gotoUrl, {timeout: timeout})
            await page.waitForSelector(selector, {timeout: timeout});
            await page.selectOption(selector, id.toString(), {timeout: timeout});

            page.on('load', async () => {
                counter++
                logger('counter => ' + counter)
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
                            let function_id = v.toString().replace(editUrl, '');
                            count = null;
                            count = await database.sql("SELECT count(*) as chk from `"+linkDatabase+"` WHERE `rid`='" + function_id + "'")
                            if (count[0]['chk'] === 0) {
                                logger('Inserted => ' + function_id)
                                await database.sql("INSERT INTO `"+linkDatabase+"` (`rid`,`mvid`) VALUES ('" + function_id + "','" + id + "')")

                            }
                        })
                        await database.sql("UPDATE `"+logDatabase+"` SET  `found`='" + link.length + "' WHERE `rid`=" + id)
                    } else {
                        logger('No urls found on ' + id)
                        await database.sql("UPDATE `"+logDatabase+"` SET  `found`='" + link.length + "' WHERE `rid`=" + id)
                    }
                } else {
                    logger('Page error => ' + id)
                    sendMail('Page error => ' + file, 'Error').catch(console.error);
                }
                await page.close();
                timer.endTime(start, hrstart, file)
                logger('===============');
                if (counter % delCount === 0) {
                    arr()
                } else if (ids.length === 0) {
                    arr()
                }

            })
            // await page.goto('http://localhost/select.html', {timeout: timeout})
        } catch (e) {
            await context.close()
            logger(e)
            logger('errors found on id ' + id)
            sendMail(file, 'errors found on id ' + id).catch(console.error);
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
        ids.splice(0, delCount).map((v, i) => {
            run(v.rid);
        })
    }

    arr()
})();
