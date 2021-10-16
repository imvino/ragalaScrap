const core = require('../dateCore');
let data = {
    gotoUrl: 'https://www.ragalahari.com/newadmin/photogalleryinfo.aspx',
    editUrl: 'photogallerynewaddedit.aspx?pgid=',
    linkDatabase: 'movies_photos',
    selector2:'td:nth-of-type(9)',
    formatDateTime:true
}

core(data)
