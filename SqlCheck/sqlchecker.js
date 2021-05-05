const database = require('../components/model');
let logDatabase = 'url_log_photos';
let linkDatabase = 'movies_photos';

async function fixIt() {
    let column = [];
    let errIds = []
    //from db
    let mv = await database.sql("SELECT `mvid` FROM `" + linkDatabase + "` GROUP by mvid")
    mv.map((v, i) => {
        column[i] = v.mvid;
    })
    let ids = await database.sql("SELECT `rid`,`found` FROM `" + logDatabase + "` where rid in (" + column.toString() + ")")
    let count = null
    ids.map(async (v, i) => {
        count = await database.sql("SELECT count(*) as chk from `" + linkDatabase + "` WHERE `mvid`='" + v.rid + "'")
        if (parseInt(count[0]['chk']) !== parseInt(v.found)) {
            console.log('err on => ' + v.rid)
            errIds.push(v.rid)
        }
        //else {
        // console.log('ok => '+v.rid)
        //  }
        if (ids.length === i + 1) {
            console.log('count 1 completed')
        }
    })
    // from log
    let ids2 = await database.sql("SELECT `rid`,`found` FROM `" + logDatabase + "` where `found` is not null")
    let count2 = null
    ids2.map(async (v, i) => {
        count2 = await database.sql("SELECT count(*) as chk from `" + linkDatabase + "` WHERE `mvid`='" + v.rid + "'")
        if (parseInt(count2[0]['chk']) !== parseInt(v.found)) {
            console.log('err on => ' + v.rid)
            errIds.push(v.rid)
        }
        //else {
        // console.log('ok => '+v.rid)
        // }
        if (ids2.length === i + 1) {
            console.log('count 2 completed')
            let unique = errIds.filter((v, i, a) => a.indexOf(v) === i);
            console.log("UPDATE `url_log_photos` SET `found`=null WHERE rid in (" + unique.toString() + ")")
            console.log("DELETE FROM `movies_photos` WHERE `mvid` in (" + unique.toString() + ")")
           let gg=  await database.sql("UPDATE `url_log_photos` SET `found`=null WHERE rid in (" + unique.toString() + ")")
            let gg2=  await database.sql("DELETE FROM `movies_photos` WHERE `mvid` in (" + unique.toString() + ")")
            console.log(gg)
            console.log(gg2)
            console.log('Fixed duplicate')
        }
    })


}

async function count() {
    let f = await database.sql("SELECT SUM(found) FROM `" + logDatabase + "` WHERE 1")
    console.log(logDatabase + ' = ' + f[0]['SUM(found)'])
    let t = await database.sql("SELECT count(*) FROM `" + linkDatabase + "` WHERE 1")
    console.log(linkDatabase + ' = ' + t[0]['count(*)'])
    if(parseInt(t[0]['count(*)']) === parseInt(f[0]['SUM(found)'])){
        console.log('All good')
    }else{
        console.log(parseInt(t[0]['count(*)']) - parseInt(f[0]['SUM(found)']) + ' Duplicate')
    }
    let t3 = await database.sql("SELECT count(*) FROM `" + logDatabase + "` WHERE found is null")
    console.log('Pending log links= ' + t3[0]['count(*)'])

}

async function empty() {
    await database.sql("UPDATE `url_log_photos` SET `found`=null WHERE 1")
    await database.sql("TRUNCATE `" + linkDatabase + "`")
    console.log('empty completed')
}




count()
//fixIt()
