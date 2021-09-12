const core = require('../coreDataScrap');
let total = 51
let split= 1
let limit = Math.ceil(total/split)
// offset: total+(limit*i),
Array(split).fill(0).map((v,i)=> {
    let data = {
        file: 'filmpersonal.log',
        gotoUrl: 'https://www.ragalahari.com/newadmin/FilmPersonalAddEdit.aspx?fpid=',
        linkDatabase: 'starzone_filmpersonal',
        coreDate: 'filmpersonals',
        limit: limit,
        offset: limit*i,
        array: i+1,
    }
    console.log(data)
    core(data)
})
