const core = require('../coreDataScrap');
let total = 5
let split= 1
let limit = Math.round(total/split)
// offset: total+(limit*i),
// offset: limit*i,
Array(split).fill(0).map((v,i)=> {
    let data = {
        file: 'moviePhotosUpdate.log',
        gotoUrl: 'https://www.ragalahari.com/newadmin/photogalleryupdatereorder.aspx?pgid=',
        linkDatabase: 'movies_photos_update',
        coreDate: 'moviePhotosUpdate',
        limit: limit,
        offset: limit*i,
        array: i+1,
    }
    console.log(data)
    core(data)
})
