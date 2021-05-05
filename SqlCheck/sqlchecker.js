const database = require('../components/model');
let find = 'poster';
let linkDatabase = 'movies_poster';

async function fixIt() {
    console.log('Fixing..')
    let column = [];
    let errIds = []
    //from db
    let mv = await database.sql("SELECT `mvid` FROM `" + linkDatabase + "` GROUP by mvid")
    mv.map((v, i) => {
        column[i] = v.mvid;
    })
    let ids = await database.sql("SELECT `rid`,`" + find + "` FROM `url_log` where rid in (" + column.toString() + ")")
    let count = null
    ids.map(async (v, i) => {
        count = await database.sql("SELECT count(*) as chk from `" + linkDatabase + "` WHERE `mvid`='" + v.rid + "'")
        if (parseInt(count[0]['chk']) !== parseInt(v[find])) {
            //console.log('err on => ' + v.rid)
            errIds.push(v.rid)
        }
        //else {
        // console.log('ok => '+v.rid)
        //  }
        if (ids.length === i + 1) {
            console.log(errIds)
            console.log('count 1 completed')
        }
    })
    // from log
    let ids2 = await database.sql("SELECT `rid`,`" + find + "` FROM `url_log` where `" + find + "` is not null")
    let count2 = null
    ids2.map(async (v, i) => {
        count2 = await database.sql("SELECT count(*) as chk from `" + linkDatabase + "` WHERE `mvid`='" + v.rid + "'")
        if (parseInt(count2[0]['chk']) !== parseInt(v[find])) {
            //console.log('err on => ' + v.rid)
            errIds.push(v.rid)
        }
        //else {
        // console.log('ok => '+v.rid)
        // }
        if (ids2.length === i + 1) {
            console.log(errIds)
            console.log('count 2 completed')
            let unique = errIds.filter((v, i, a) => a.indexOf(v) === i);
            let gg = await database.sql("UPDATE `url_log` SET `" + find + "`=null WHERE rid in (" + unique.toString() + ")");
            let gg2 = await database.sql("DELETE FROM `" + linkDatabase + "` WHERE `mvid` in (" + unique.toString() + ")");

            // console.log(gg)
            //console.log(gg2)
            console.log('Fixed duplicate')
        }
    })


}

async function count() {

    let f = await database.sql("SELECT SUM(`" + find + "`) FROM `url_log` WHERE 1")
    console.log('url_log ' + find + ' = ' + f[0]['SUM(`' + find + '`)'])
    let t = await database.sql("SELECT count(*) FROM `" + linkDatabase + "` WHERE 1")
    console.log(linkDatabase + ' = ' + t[0]['count(*)'])
    if (parseInt(t[0]['count(*)']) === parseInt(f[0]['SUM(`' + find + '`)'])) {
        console.log('All good')
    } else {
        console.log(parseInt(t[0]['count(*)']) - parseInt(f[0]['SUM(`' + find + '`)']) + ' Duplicate')
        await fixIt()
    }
    let t3 = await database.sql("SELECT count(*) FROM `url_log` WHERE `" + find + "` is null")
    console.log('Pending log links= ' + t3[0]['count(*)'])

}

async function empty() {
    await database.sql("UPDATE `url_log_photos` SET `" + find + "`=null WHERE 1")
    await database.sql("TRUNCATE `" + linkDatabase + "`")
    console.log('empty completed')
}

// async function sqlT() {
//     let f = await database.sql("SELECT `id`,`found` FROM `url_log_functions`")
//     f.map( async (v,i)=>{
//         console.log("UPDATE `url_log` SET `function`="+v.found+" WHERE `id`="+v.id)
//         await database.sql("UPDATE `url_log` SET `function`="+v.found+" WHERE `id`="+v.id)
//         if (f.length === i + 1) {
//             console.log('done')
//         }
//     })
//
// }
// async function sqlT2() {
//     let q = await database.sql("SELECT `rid` FROM `url_log` ")
//     q.map( async (v,i)=> {
//         let f = await database.sql("SELECT count(*) FROM `movies_photos` WHERE mvid="+v.rid)
//         await database.sql("UPDATE `url_log` SET `photos`=" + f[0]['count(*)'] + " WHERE `rid`=" + v.rid)
//
//         if (q.length === i + 1) {
//             console.log('done')
//         }
//     })
// }

count()

