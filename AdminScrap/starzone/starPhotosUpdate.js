const core = require('../coreDataScrap');
let total = 394
let split= 1
let limit = Math.round(total/split)
// offset: total+(limit*i),
// offset: limit*i,
Array(split).fill(0).map((v,i)=> {
    let data = {
        file: 'starPhotosUpdate.log',
        gotoUrl: 'https://www.ragalahari.com/newadmin/starzoneupdatereorder.aspx?szid=',
        linkDatabase: 'starzone_photo_update',
        coreDate: 'starPhotosUpdate',
        limit: limit,
        offset: limit*i,
        array: i+1,
    }
    console.log(data)
    core(data)
})
