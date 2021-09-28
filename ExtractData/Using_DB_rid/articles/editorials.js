const core = require('../coreDataScrap');
let total = 40
let split= 1
let limit = Math.round(total/split)
// offset: total+(limit*i),
// offset: limit*i,
Array(split).fill(0).map((v,i)=> {
    let data = {
        file: 'editorials.log',
        gotoUrl: 'https://www.ragalahari.com/newadmin/EditorialsAddEdit.aspx?edtid=',
        linkDatabase: 'articles_editorial',
        coreDate: 'editorials',
        limit: limit,
        offset: limit*i,
        array: i+1,
    }
    console.log(data)
    core(data)
})