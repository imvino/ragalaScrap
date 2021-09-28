const core = require('../core_countList');

let total = 1
let split= 1
let limit = Math.round(total/split)
Array(split).fill(0).map((v,i)=>{
    let data = {
        file: 'news.log',
        selector: 'select',
        gotoUrl: 'https://www.ragalahari.com/newadmin/NewsItemsInfo.aspx',
        editUrl: 'NewsItemAddEdit.aspx?newsid=',
        linkDatabase: 'articles_news',
        logDatabase: 'url_log_movie_news',
        find: 'news',
        formatDate:true,
        selector2:'td:nth-of-type(6)',
        limit: limit,
        offset: limit*i,
        array:i
    }
    console.log(data)
    core(data)
})

