const {chromium} = require('playwright');
const database = require('../components/model');
const user = require('../components/login');

function logger(msg) {
    console.log(msg);
}

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
const main = async (data) => { //, slowMo: 50
    let timeout = 600000

    const browser = await chromium.launch({headless:false});
    const context = await browser.newContext();
    logger('started')
    await user.auth(context)
    logger('LoggedIn')
let v= 0;

    async function run() {
        try {
            const page = await context.newPage();
            await page.route('**/*.{png,jpg,jpeg,js,html,json,svg,css,woff,woff2,ico}', route => {
                route.abort()
            });
            await page.goto(data.gotoUrl, {timeout: timeout})

            page.on('load', async () => {
                console.log('hi',v)
                v++;
                const raga = await page.$$(`#raga`);

                if (raga.length !== 0) {
                    const link = await page.$$('a.btn-info[href]');
                    const dates =  await page.$$(data.selector2?data.selector2:'td:nth-of-type(8)');
                    console.log(dates.length)
                    let list = [];
                    let rdate = [];

                    if (link.length !== 0 && dates.length !=0 ) {
                        Array(link.length).fill(0).map((v, i) => {
                            list[i] = link[i].getAttribute("href")
                            dates[i]= dates[i].innerText()
                        });
                        list = await Promise.all(list);
                        rdate = await Promise.all(dates);


                        let count = 'new count';
                        console.log(dates.length,'dates.length')
                        console.log(rdate,'rdate')
                        list.map(async (v, i) => {
                            let function_id = v.toString().replace(data.editUrl, '');
                            count = null;
                            count = await database.sql("SELECT count(*) as chk from `"+data.linkDatabase+"` WHERE `rid`='" + function_id + "'")
                            let addDate = data.formatDate?formatDate(rdate[i]):rdate[i];
                            if (count[0]['chk'] === 0) {
                                logger('Inserted => ' + function_id)
                                await database.sql("INSERT INTO `"+data.linkDatabase+"` (`rid`,`rdate`) VALUES ('" + function_id + "','" + addDate + "')")
                            }else{
                                let t5="UPDATE `"+data.linkDatabase+"` SET  `rdate`='" +addDate + "' WHERE  `rid`='" + function_id + "'";
                                console.log(t5)
                                await database.sql(t5)
                            }
                        })

                    } else {

                    }
                } else {

                }
                logger('===============');
            });
        } catch (e) {
            await context.close()
            logger(e)

            return
        }
    }

    run()

}
module.exports = main
