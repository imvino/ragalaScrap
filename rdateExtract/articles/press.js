const core = require('../dateCore');

let data = {
    file: 'press.log',
    selector: 'select[name="ctl00$MainContent$drp_movieexact"]',
    gotoUrl: 'https://www.ragalahari.com/newadmin/PressreleasesInfo.aspx',
    editUrl: 'PressReleasesAddEdit.aspx?relid=',
    linkDatabase: 'articles_press_releases',
    logDatabase: 'url_log_articles',
    find: 'press',
    selectorId:1,
    selector2:'td:nth-of-type(7)',
    formatDate:true
}
core(data)
