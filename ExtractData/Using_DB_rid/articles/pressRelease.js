const core = require('../coreDataScrap');
module.exports.pressReleaseCms = async (page) =>
{
    let total = 113
let split= 1
let limit = Math.round(total/split)
// offset: total+(limit*i),
// offset: limit*i,
Array(split).fill(0).map((v,i)=> {
    let data = {
        file: 'pressRelease.log',
        gotoUrl: 'https://www.ragalahari.com/newadmin/PressReleasesAddEdit.aspx?relid=',
        linkDatabase: 'articles_press_releases',
        coreDate: 'pressRelease',
        limit: limit,
        offset: limit*i,
        array: i+1,
    }
    console.log(data)
    core(data)
})
}
