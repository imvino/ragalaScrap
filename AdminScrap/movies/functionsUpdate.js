const core = require('../coreDataScrap');
let total = 107
let split= 1
let limit = Math.round(total/split)
// offset: total+(limit*i),
// offset: limit*i,
Array(split).fill(0).map((v,i)=> {
    let data = {
        file: 'functionsUpdate.log',
        gotoUrl: 'https://www.ragalahari.com/newadmin/Functionsupdatereorder.aspx?fid=',
        linkDatabase: 'movies_function_update',
        coreDate: 'moviesFunctionUpdate',
        limit: limit,
        offset: limit*i,
        array: i+1,
    }
    console.log(data)
    core(data)
})
