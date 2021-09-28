const core = require('../PageCore');
let data = {
    file: 'event.log',
    selector: 'select[name="ctl00$MainContent$drp_movie"]',
    gotoUrl: 'https://www.ragalahari.com/newadmin/LocalEventsInfo.aspx',
    editUrl: 'LocalEventsNewAddEdit.aspx?fid=',
    linkDatabase: 'local_events_events',
    logDatabase: 'url_log_local',
    find: 'events',
    selectorId:1360
}

core(data)
