const core = require('../PageCore');

let data = {
    file: 'event.log',
    selector: 'select[name="ctl00$MainContent$drp_moviename"]',
    gotoUrl: 'https://www.ragalahari.com/newadmin/NewsItemsInfo.aspx',
    editUrl: 'NewsItemAddEdit.aspx?newsid=',
    linkDatabase: 'local_events_events',
    logDatabase: 'url_log_local',
    find: 'events',
    selectorId:1360
}
core(data)

