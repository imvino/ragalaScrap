const core = require('../core_countList');

let total = 3
let split= 1
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
        formatDate:true,
        selector2:'td:nth-of-type(7)',
        limit: limit,
        offset: limit*i,
        array:i
    }
   //console.log(data)
    core(data)
})

