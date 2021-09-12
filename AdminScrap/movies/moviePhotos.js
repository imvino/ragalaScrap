const core = require('../coreDataScrap');
let total = 53
let split= 1
let limit = Math.round(total/split)
// offset: total+(limit*i),
// offset: limit*i,
Array(split).fill(0).map((v,i)=> {
    let data = {
        file: 'moviePhotos.log',
        gotoUrl: 'https://www.ragalahari.com/newadmin/photogallerynewaddedit.aspx?pgid=',
        linkDatabase: 'movies_photos',
        coreDate: 'moviePhotos',
        limit: limit,
        offset: limit*i,
        array: i+1,
    }
    console.log(data)
    core(data)
})
