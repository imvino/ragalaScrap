const core = require('../core');

let data = {
    file: 'postergalleryinfo.log',
    selector: 'select[name="ctl00$MainContent$drp_movieexact"]',
    gotoUrl: 'https://www.ragalahari.com/newadmin/postergalleryinfo.aspx',
    editUrl: 'PosterGalleryNewAddEdit.aspx?pgid=',
    linkDatabase: 'movies_poster',
    logDatabase: 'url_log_movies',
    find: 'poster',
}

core(data)
