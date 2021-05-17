const {chromium} = require('playwright');
const database = require('../components/model');
(async () => {
    let data = [];
    let counter = 0;
    const browser = await chromium.launch({headless: false,});
//97+122
    let errors = [];
    const context = await browser.newContext();

    async function run(webpage) {
        try {
            let list = [];
            const page = await context.newPage();
            await page.route('**/*.{png,jpg,jpeg,html,js,json,svg,css,woff,woff2,ico}', route => {
                route.abort()
            });
            await page.goto(webpage)
            const ele_gal = await page.$$("a.galleryname");
            Array(ele_gal.length).fill(0).map(async (v, i) => {
                list[i] = ele_gal[i].getAttribute("href");
            });
            data.push(await Promise.all(list))
            counter++
            if(counter === 26) {
                let total=0
                let c1=[];
                let c=0
                data.map((v,i)=>{
                    v.map((val,ind)=>{
                        c1[c] = val.match(/([\d]+)/)[0]
                        c++
                    })
                    total= total+v.length

                })
                if(total === c1.length){
                    await database.sql("UPDATE `starzone_filmpersonal` SET `gender`='1' WHERE `rid` in ("+c1.toString()+")")
                    await database.sql("UPDATE `starzone_photos` SET `gender`='1' WHERE `refId` in ("+c1.toString()+")")
                }
                console.log('total')
                console.log(total)
                console.log('c1.length')
                console.log(c1.length)
            }
            await page.close();
            console.log('list => ' + webpage)
            console.log(counter)

        } catch (e) {
            await context.close()
            console.log(e)
            console.log('errors found')
            return
        }
    }

    function arr() {
        let code=97;
        Array(26).fill(0).map((v,i)=>{
            run('https://www.ragalahari.com/actress/'+String.fromCharCode(code++)+'/starzonesearch.aspx')
        })
    }
    arr()
})();
