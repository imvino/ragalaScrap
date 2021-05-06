const core = require('../core');

let data = {
    file: 'starzonephoto.log',
    selector: 'select[name="ctl00$MainContent$drp_fp"]',
    gotoUrl: 'https://www.ragalahari.com/newadmin/starzoneinfo.aspx',
    editUrl: 'starzonenewaddedit.aspx?szid=',
    linkDatabase: 'starzone_photos',
    logDatabase: 'url_log_starzone',
    find: 'photos',
}

core(data)