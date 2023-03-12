const {chromium} = require('playwright');
const sendMail = require('../../../components/sendmail');
const database = require('../../../components/model');
const timer = require('../../../components/timer');
const user = require('../../../components/login');
const log = require('log-to-file');

const file = 'reviewUrl.log';
let gotoUrl='https://www.ragalahari.com/newadmin/LocalEventCategoryInfo.aspx';
let editUrl='LocalEventCategoryAddEdit.aspx?fid=';
let linkDatabase='local_events_categories';

function logger(msg) {
    console.log(msg);
    log(msg, file);
}

(async () => { //, slowMo: 50
    var start = new Date()
    var hrstart = process.hrtime()
    let list = [];
    let timeout = 600000

    const browser = await chromium.launch({headless:false});
    const context = await browser.newContext();
    logger('started')
    await user.auth(context)
    logger('LoggedIn')

    async function run() {
        try {
            const page = await context.newPage();
            await page.route('**/*.{png,jpg,jpeg,js,html,json,svg,css,woff,woff2,ico}', route => {
                route.abort()
            });
            await page.goto(gotoUrl, {timeout: timeout})
                const raga = await page.$$(`#raga`);
                if (raga.length !== 0) {
                    const link = await page.$$('a.btn-info[href]');
                    if (link.length !== 0) {
                        Array(link.length).fill(0).map((v, i) => {
                            list[i] = link[i].getAttribute("href")
                        });
                        list = await Promise.all(list)
                        logger('Found ' + link.length )
                        let count = 'new count';
                        list.map(async (v, i) => {
                            let function_id = v.toString().replace(editUrl, '');
                            count = null;
                            count = await database.sql("SELECT count(*) as chk from `"+linkDatabase+"` WHERE `rid`='" + function_id + "'")
                            if (count[0]['chk'] === 0) {
                                logger('Inserted => ' + function_id)
                                await database.sql("INSERT INTO `"+linkDatabase+"` (`rid`) VALUES ('" + function_id + "')")
                            }
                        })
                    }
                }
                //await page.close();
                timer.endTime(start, hrstart, file)
                logger('===============');

        } catch (e) {
            await context.close()
            logger(e)
            logger('errors found on id ' + id)
            return
        }
    }

    run()

})();
