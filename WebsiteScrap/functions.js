const {chromium} = require('playwright');
const sendMail = require('../components/sendmail');
(async () => { //, slowMo: 50
    var start = new Date()
    var hrstart = process.hrtime()
    let data = [];
    let list = [];
    let errors = [];
    let delcount = 26;
    let counter = 0;
    //devtools: true
    const browser = await chromium.launch({headless: false,});
//97+122
    //let webpages = ['https://www.ragalahari.com/functions/a/search.aspx', 'https://www.ragalahari.com/functions/b/search.aspx', 'https://www.ragalahari.com/functions/c/search.aspx', 'https://www.ragalahari.com/functions/d/search.aspx', 'https://www.ragalahari.com/functions/e/search.aspx', 'https://www.ragalahari.com/functions/f/search.aspx', 'https://www.ragalahari.com/functions/g/search.aspx', 'https://www.ragalahari.com/functions/h/search.aspx', 'https://www.ragalahari.com/functions/i/search.aspx', 'https://www.ragalahari.com/functions/j/search.aspx', 'https://www.ragalahari.com/functions/k/search.aspx', 'https://www.ragalahari.com/functions/l/search.aspx', 'https://www.ragalahari.com/functions/m/search.aspx', 'https://www.ragalahari.com/functions/n/search.aspx', 'https://www.ragalahari.com/functions/o/search.aspx', 'https://www.ragalahari.com/functions/p/search.aspx', 'https://www.ragalahari.com/functions/q/search.aspx', 'https://www.ragalahari.com/functions/r/search.aspx', 'https://www.ragalahari.com/functions/s/search.aspx', 'https://www.ragalahari.com/functions/t/search.aspx', 'https://www.ragalahari.com/functions/u/search.aspx', 'https://www.ragalahari.com/functions/v/search.aspx', 'https://www.ragalahari.com/functions/w/search.aspx', 'https://www.ragalahari.com/functions/x/search.aspx', 'https://www.ragalahari.com/functions/y/search.aspx', 'https://www.ragalahari.com/functions/z/search.aspx'];
    let webpages = ['https://www.ragalahari.com/functions/a/search.aspx', 'https://www.ragalahari.com/functions/b/search.aspx', ]
    const context = await browser.newContext();

    async function run(webpage) {
        try {
            const page = await context.newPage();
            await page.route('**/*.{png,jpg,jpeg,html,js,json,svg,css,woff,woff2,ico}', route => {
                route.abort()
            });
            await page.goto(webpage)
            const ele_gal = await page.$$("a.galleryname");
            Array(ele_gal.length).fill(0).map((v, i) => {
                list[i] = ele_gal[i].innerText();
            });
            data['list'] = await Promise.all(list)
            // console.log(data);

            await page.close();
            console.log('list => ' + webpage)
            counter++
            var end = new Date() - start,
                hrend = process.hrtime(hrstart)
            console.info('Execution time: %dms', end)
            console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)
            console.log(counter)
            if (counter % delcount === 0) {
                arr()
            }
        } catch (e) {
            await context.close()
            errors.push(e)
            console.log('errors found')
            return
        }
        // finally {
        //     if (errors.length!==0) {
        //         console.log(errors)
        //         let req = {
        //             from: 'reachoutvino@gmail.com',
        //             to: 'webpistol@gmail.com',
        //             subject: 'Error in web function',
        //             html: JSON.stringify(errors)
        //         }
        //         sendMail(req).catch(console.error);
        //     }
        // }
    }

    function arr() {
        webpages.splice(0, delcount).map((webpage, i) => {
            run(webpage);
        })
    }

    arr()


})();
