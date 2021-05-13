const core = require('../coreDataScrap');
let total = 810
let split= 10
let limit = Math.round(total/split)
// offset: total+(limit*i),
// offset: limit*i,
Array(split).fill(0).map((v,i)=> {
    let data = {
        file: 'localLocation.log',
        gotoUrl: 'https://www.ragalahari.com/newadmin/LocalLocationsAddEdit.aspx?fid=',
        linkDatabase: 'local_events_location',
        coreDate: 'localLocation',
        limit: limit,
        offset: limit*i,
        array: i+1,
    }
    console.log(data)
    core(data)
})