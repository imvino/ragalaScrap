const core = require('../core_countList');

let total = 45
let split= 1
let limit = Math.round(total/split)
Array(split).fill(0).map((v,i)=>{
    let data = {
        file: 'photoUrl.log',
        selector: 'select[name="ctl00$MainContent$drp_moviename"]',
        gotoUrl: 'https://www.ragalahari.com/newadmin/photogalleryinfo.aspx',
        editUrl: 'photogallerynewaddedit.aspx?pgid=',
        linkDatabase: 'movies_photos',
        logDatabase: 'url_log_movies',
        find: 'photos',
        limit: limit,
        offset: limit*i,
        array:i,
        selector2:'td:nth-of-type(9)',
    }
    console.log(data)
    core(data)
})



