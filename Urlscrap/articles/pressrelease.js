const core = require('../core_countList');

let total = 395
let split= 3
let limit = Math.round(total/split)
Array(split).fill(0).map((v,i)=>{
    let data = {
        file: 'pressrelease.log',
        selector: 'select[name="ctl00$MainContent$drp_movieexact"]',
        gotoUrl: 'https://www.ragalahari.com/newadmin/PressreleasesInfo.aspx',
        editUrl: 'PressReleasesAddEdit.aspx?relid=',
        linkDatabase: 'articles_press_releases',
        logDatabase: 'url_log_articles',
        find: 'press',
        limit: limit,
        offset: limit*i,
        array:i
    }
   //console.log(data)
    core(data)
})

