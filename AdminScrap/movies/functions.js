const core = require('../coreDataScrap');
let total = 10714
let split= 2
let limit = Math.round(total/split)
// offset: total+(limit*i),
// offset: limit*i,
Array(split).fill(0).map((v,i)=> {
    let data = {
        file: 'functions.log',
        gotoUrl: 'https://www.ragalahari.com/newadmin/FunctionsNewAddEdit.aspx?fid=',
        linkDatabase: 'movies_function',
        coreDate: 'moviesFunction',
        limit: limit,
        offset: limit*i,
        array: i+1,
    }
    console.log(data)
    core(data)
})