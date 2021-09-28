const core = require('../coreDataScrap');
let total = 100
let split= 1
let limit = Math.round(total/split)
// offset: total+(limit*i),
// offset: limit*i,
Array(split).fill(0).map((v,i)=> {
    let data = {
        file: 'articlesNews.log',
        gotoUrl: 'https://www.ragalahari.com/newadmin/NewsItemAddEdit.aspx?newsid=',
        linkDatabase: 'articles_news',
        coreDate: 'articlesNews',
        limit: limit,
        offset: limit*i,
        array: i+1,
    }
    console.log(data)
    core(data)
})
