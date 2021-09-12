const core = require('../coreDataScrap');
let total = 138
let split= 1
let limit = Math.round(total/split)
// offset: total+(limit*i),
// offset: limit*i,
Array(split).fill(0).map((v,i)=> {
    let data = {
        file: 'namesTitle.log',
        gotoUrl: 'https://www.ragalahari.com/newadmin/MovieInfoAddEdit.aspx?mid=',
        linkDatabase: 'movies_names_title',
        coreDate: 'namesTitle',
        limit: limit,
        offset: limit*i,
        array: i+1,
    }
    console.log(data)
    core(data)
})
