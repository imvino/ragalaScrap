const core = require('../coreDataScrap');
let total = 38
let split= 1
let limit = Math.round(total/split)
// offset: total+(limit*i),
// offset: limit*i,
Array(split).fill(0).map((v,i)=> {
    let data = {
        file: 'localSchedule.log',
        gotoUrl: 'https://www.ragalahari.com/newadmin/LocalEventContentAddEdit.aspx?cntid=',
        linkDatabase: 'local_events_schedule',
        coreDate: 'localSchedule',
        limit: limit,
        offset: limit*i,
        array: i+1,
    }
    console.log(data)
    core(data)
})
