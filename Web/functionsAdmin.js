const {chromium} = require('playwright');
const sendMail = require('../components/sendmail');
(async () => { //, slowMo: 50
    var start = new Date()
    var hrstart = process.hrtime()
    let data = [];
    let list = [];
    let errors = [];
    let timeout = 1200000
    let delcount =100;
    let counter = 0;
    //devtools: true
    const browser = await chromium.launch({headless: false});


  //  let ids=['3463','96249','84980','95871','95075','120','34143','2108','23806','794','74904','3455','3353','3375','44594','74890','95153','880','455','64762','44486','95017','95022','3347','95738','95630','95600','95601','95602','95633','95939','95634','95603','95837','95604','95725','95605','1151','23666','34429','74854','3419','34374','95984','44656','44560','64745','95530','64780','23760','34464','34301','95103','74861','3105','95614','44539','34381','34428','74849','74894','54705','34386','74838','34124','34274','34158','44547','34276','95000','74829','95082','74842','3268','95028','84946','95247','96020','95903','95988','95782','44546','2303','95013','2926','2093','2652','95990','74908','2934','34187','1227','409','1402','2302','2475','2519','96326','29','1946'];
    let ids=['3463','96249','84980'];
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.ragalahari.com/newadmin/Login.aspx');
    await page.fill('input#Login1_UserName', 'suresh');
    await page.fill('input#Login1_Password', 'Bujjinana99 ');
    await page.click('input#Login1_LoginButton')

    async function run(id) {
        try {
            const page = await context.newPage();
            await page.route('**/*.{png,jpg,jpeg,html,js,json,svg,css,woff,woff2,ico}', route => {
                route.abort()
            });
            await page.goto('https://www.ragalahari.com/newadmin/functionsinfo.aspx',{timeout:timeout})
            await page.waitForSelector('select[name="ctl00$MainContent$drp_movie"]',{timeout:timeout});

            await page.selectOption('select[name="ctl00$MainContent$drp_movie"]', id,{timeout:timeout});
          //  await page.waitForSelector(`#MainContent_gv_functions`);
            page.on('load', async () => {
                const deletes = await page.$$(`#MainContent_gv_functions`);
                if (deletes.length !== 0) {
                    console.log('yes'+id)
                }else{
                    console.log('no'+id)
                }
                // const ele_gal = await page.$$("a.galleryname");
                // Array(ele_gal.length).fill(0).map((v, i) => {
                //     list[i] = ele_gal[i].innerText();
                // });
                // data['list'] = await Promise.all(list)
                // console.log(data);

                 await page.close();
                console.log('list => ' + id)
                counter++
                var end = new Date() - start,
                    hrend = process.hrtime(hrstart)
                console.info('Execution time: %dms', end)
                console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)
                console.log(counter)
                if (counter % delcount === 0) {
                    arr()
                }
            })



        } catch (e) {
           // await context.close()
            console.log(e)
            console.log('errors found on id '+id)
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

   async function arr() {
        if(ids.length===0){
            // const browser = await chromium.launch({headless: false});
            // const page = await browser.newPage();
            // await page.goto('https://www.youtube.com/watch?v=-0beFQnB5lY');
            // return
        }
        ids.splice(0, delcount).map((id, i) => {
            run(id);
        })
    }
    arr()


})();
