const core = require('../core_countList');

let total = 65
let split= 1
let limit = Math.round(total/split)
Array(split).fill(0).map((v,i)=>{
    let data = {
        file: 'postergalleryinfo.log',
        selector: 'select[name="ctl00$MainContent$drp_movieexact"]',
        gotoUrl: 'https://www.ragalahari.com/newadmin/postergalleryinfo.aspx',
        editUrl: 'PosterGalleryNewAddEdit.aspx?pgid=',
        linkDatabase: 'movies_poster',
        logDatabase: 'url_log_movies',
        find: 'poster',
        limit: limit,
        offset: limit*i,
        array:i,
        selector2:'td:nth-of-type(6)',
    }
    console.log(data)
    core(data)
})





