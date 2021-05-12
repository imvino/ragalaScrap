const core = require('../coreDataScrap');
let total = 76
let split= 4
let limit = Math.round(total/split)
// offset: total+(limit*i),
// offset: limit*i,
Array(split).fill(0).map((v,i)=> {
    let data = {
        file: 'localCategory.log',
        gotoUrl: 'https://www.ragalahari.com/newadmin/LocalEventCategoryAddEdit.aspx?fid=',
        linkDatabase: 'local_events_categories',
        coreDate: 'localCategory',
        limit: limit,
        offset: limit*i,
        array: i+1,
    }
    console.log(data)
    core(data)
})