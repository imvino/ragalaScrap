const core = require('../coreDataScrap');
let total = 5934
let split= 10
let limit = Math.ceil(total/split)
// offset: total+(limit*i),
// offset: limit*i,
Array(split).fill(0).map((v,i)=> {
    let data = {
        file: 'filmpersonal.log',
        gotoUrl: 'https://www.ragalahari.com/newadmin/FilmPersonalAddEdit.aspx?fpid=',
        linkDatabase: 'starzone_filmpersonal',
        limit: limit,
        offset: limit*i,
        array: i+1,
    }
    console.log(data)
    core(data)
})