const core = require('../core_countList');

let data = {
    file: 'functionUrl.log',
    selector: 'select[name="ctl00$MainContent$drp_movie"]',
    gotoUrl: 'https://www.ragalahari.com/newadmin/functionsinfo.aspx',
    editUrl: 'FunctionsNewAddEdit.aspx?fid=',
    linkDatabase: 'movies_function',
    logDatabase: 'url_log_movies',
    find: 'function',
    limit: 5,
    offset: 0,
    array:0
}

core(data)