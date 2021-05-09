const core = require('../coreDataScrap');
let total = 2964
let split= 5
let limit = Math.ceil(total/split)
Array(split).fill(0).map((v,i)=> {
    let data = {
        file: 'filmpersonal.log',
        gotoUrl: 'https://www.ragalahari.com/newadmin/FilmPersonalAddEdit.aspx?fpid=',
        linkDatabase: 'starzone_filmpersonal',
        limit: limit,
        offset: total+(limit*i),
        array: 1,
    }
    console.log(data)
    core(data)
})