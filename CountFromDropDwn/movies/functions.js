const core = require('../core_countList');

let total = 1
let split= 1
let limit = Math.round(total/split)
Array(split).fill(0).map((v,i)=>{
    let data = {
        file: 'functionUrl.log',
        selector: 'select[name="ctl00$MainContent$drp_movie"]',
        gotoUrl: 'https://www.ragalahari.com/newadmin/functionsinfo.aspx',
        editUrl: 'FunctionsNewAddEdit.aspx?fid=',
        linkDatabase: 'movies_function',
        logDatabase: 'url_log_movies',
        find: 'function',
        limit: limit,
        offset: limit*i,
        array:i
    }
    console.log(data)
    core(data)
})

