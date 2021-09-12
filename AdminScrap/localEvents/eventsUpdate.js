const core = require('../coreDataScrap');
let total = 118
let split= 1
let limit = Math.round(total/split)
// offset: total+(limit*i),
// offset: limit*i,
Array(split).fill(0).map((v,i)=> {
    let data = {
        file: 'localEventsUpdate.log',
        gotoUrl: 'https://www.ragalahari.com/newadmin/LocalEventsupdatereorder.aspx?fid=',
        linkDatabase: 'local_events_events_update',
        coreDate: 'localEventsUpdate',
        limit: limit,
        offset: limit*i,
        array: i+1,
    }
    console.log(data)
    core(data)
})
