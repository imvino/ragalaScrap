const core = require('../coreDataScrap');
let total = 2
let split= 1
let limit = Math.round(total/split)
// offset: total+(limit*i),
// offset: limit*i,
Array(split).fill(0).map((v,i)=> {
    let data = {
        file: 'localEvents.log',
        gotoUrl: 'https://www.ragalahari.com/newadmin/LocalEventsNewAddEdit.aspx?fid=',
        linkDatabase: 'local_events_events',
        coreDate: 'localEvents',
        limit: limit,
        offset: limit*i,
        array: i+1,
    }
    console.log(data)
    core(data)
})
