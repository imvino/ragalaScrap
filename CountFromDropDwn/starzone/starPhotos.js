const core = require('../core_countList');

let total = 8
let split= 1
let limit = Math.round(total/split)
Array(split).fill(0).map((v,i)=>{
    let data = {
        file: 'starzonephoto.log',
        selector: 'select[name="ctl00$MainContent$drp_fp"]',
        gotoUrl: 'https://www.ragalahari.com/newadmin/starzoneinfo.aspx',
        editUrl: 'starzonenewaddedit.aspx?szid=',
        linkDatabase: 'starzone_photos',
        logDatabase: 'url_log_starzone',
        find: 'photos',
        limit: limit,
        offset: limit*i,
        array:i
    }
    console.log(data)
    core(data)
})

