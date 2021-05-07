const core = require('../core_countList');

let total = 2966
let split= 4
let limit = Math.round(total/split)
Array(split).fill(0).map((v,i)=>{
    let data = {
        file: 'events.log',
        selector: 'select[name="ctl00$MainContent$drp_movie"]',
        gotoUrl: 'https://www.ragalahari.com/newadmin/LocalEventsInfo.aspx',
        editUrl: 'LocalEventsNewAddEdit.aspx?fid=',
        linkDatabase: 'local_events_events',
        logDatabase: 'url_log_local',
        find: 'events',
        limit: limit,
        offset: limit*i,
        array:i
    }
   //console.log(data)
    core(data)
})

