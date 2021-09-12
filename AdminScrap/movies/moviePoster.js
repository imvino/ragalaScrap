const core = require('../coreDataScrap');
let total = 9
let split= 1
let limit = Math.round(total/split)
// offset: total+(limit*i),
// offset: limit*i,
Array(split).fill(0).map((v,i)=> {
    let data = {
        file: 'moviePoster.log',
        gotoUrl: 'https://www.ragalahari.com/newadmin/PosterGalleryNewAddEdit.aspx?pgid=',
        linkDatabase: 'movies_poster',
        coreDate: 'moviePoster',
        limit: limit,
        offset: limit*i,
        array: i+1,
    }
    console.log(data)
    core(data)
})
