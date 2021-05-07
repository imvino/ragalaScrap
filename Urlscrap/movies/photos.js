const core = require('../core_countList');

let data = {
    file: 'photoUrl.log',
    selector: 'select[name="ctl00$MainContent$drp_moviename"]',
    gotoUrl: 'https://www.ragalahari.com/newadmin/photogalleryinfo.aspx',
    editUrl: 'photogallerynewaddedit.aspx?pgid=',
    linkDatabase: 'movies_photos',
    logDatabase: 'url_log_photos',
    find: 'photos',
}

core(data)

