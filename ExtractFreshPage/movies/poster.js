const core = require('../PageCore');

let data = {
    gotoUrl: 'https://www.ragalahari.com/newadmin/postergalleryinfo.aspx',
    editUrl: 'PosterGalleryNewAddEdit.aspx?pgid=',
    linkDatabase: 'movies_poster',
    selector2:'td:nth-of-type(6)',
}
core(data)

