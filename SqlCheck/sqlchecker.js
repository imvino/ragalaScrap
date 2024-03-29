const database = require('../components/model');
// let find = 'title';
//let find = 'movieName';
// let linkDatabase = 'local_events_events_update';
// let logDatabase = 'url_log_local';


async function empty() {
    await database.sql("UPDATE `" + logDatabase + "` SET `" + find + "`=null WHERE 1")
    await database.sql("TRUNCATE `" + linkDatabase + "`")
    console.log('empty completed')
}

// async function sqlT() {
//     let f = await database.sql("SELECT `id`,`found` FROM `url_log_functions`")
//     f.map( async (v,i)=>{
//         console.log("UPDATE `"+logDatabase+"` SET `function`="+v.found+" WHERE `id`="+v.id)
//         await database.sql("UPDATE `"+logDatabase+"` SET `function`="+v.found+" WHERE `id`="+v.id)
//         if (f.length === i + 1) {
//             console.log('done')
//         }
//     })
//
// }
// async function sqlT2() {
//     let q = await database.sql("SELECT `rid` FROM `"+logDatabase+"` ")
//     q.map( async (v,i)=> {
//         let f = await database.sql("SELECT count(*) FROM `movies_photos` WHERE refId="+v.rid)
//         await database.sql("UPDATE `"+logDatabase+"` SET `photos`=" + f[0]['count(*)'] + " WHERE `rid`=" + v.rid)
//
//         if (q.length === i + 1) {
//             console.log('done')
//         }
//     })
// }
// async function fixIt() {
//     console.log('Fixing started..')
//     let column = [];
//     let errIds = []
//
//     // remove
//     async function rmv() {
//         let unique = errIds.filter((v, i, a) => a.indexOf(v) === i);
//         let gg = await database.sql("UPDATE `" + logDatabase + "` SET `" + find + "`=null WHERE rid in (" + unique.toString() + ")");
//         let gg2 = await database.sql("DELETE FROM `" + linkDatabase + "` WHERE `refId` in (" + unique.toString() + ")");
//     }
//
//     //from db
//     let mv = await database.sql("SELECT `refId` FROM `" + linkDatabase + "` GROUP by refId")
//     mv.map((v, i) => {
//         column[i] = v.refId;
//     })
//     let ids = await database.sql("SELECT `rid`,`" + find + "` FROM `" + logDatabase + "` where rid in (" + column.toString() + ")")
//     let count = null
//     ids.map(async (v, i) => {
//         count = await database.sql("SELECT count(*) as chk from `" + linkDatabase + "` WHERE `refId`='" + v.rid + "'")
//         if (parseInt(count[0]['chk']) !== parseInt(v[find])) {
//             errIds.push(v.rid)
//         }
//         if (ids.length === i + 1) {
//             console.log(errIds)
//             if (errIds.length !== 0) {
//                 console.log('count 1')
//             }
//         }
//     })
//     // from log
//     let ids2 = await database.sql("SELECT `rid`,`" + find + "` FROM `" + logDatabase + "` where `" + find + "` is not null")
//     let count2 = null
//     ids2.map(async (v, i) => {
//         count2 = await database.sql("SELECT count(*) as chk from `" + linkDatabase + "` WHERE `refId`='" + v.rid + "'")
//         if (parseInt(count2[0]['chk']) !== parseInt(v[find])) {
//             errIds.push(v.rid)
//         }
//         if (ids2.length === i + 1) {
//             console.log(errIds)
//             console.log('count 2')
//             if (errIds.length !== 0) {
//                 await rmv()
//             }
//             console.log('Fixed duplicate')
//         }
//     })
// }

async function count() {

    let f = await database.sql("SELECT SUM(`" + find + "`) FROM `" + logDatabase + "` WHERE 1")
    console.log('url_log ' + find + ' = ' + f[0]['SUM(`' + find + '`)'])
    let t = await database.sql("SELECT count(*) FROM `" + linkDatabase + "` WHERE 1")
    console.log(linkDatabase + ' = ' + t[0]['count(*)'])
    if (parseInt(t[0]['count(*)']) === parseInt(f[0]['SUM(`' + find + '`)'])) {
        console.log('All good')
    } else {
        console.log(parseInt(t[0]['count(*)']) - parseInt(f[0]['SUM(`' + find + '`)']) + ' Duplicate')
        //  await fixIt()
    }
    let t3 = await database.sql("SELECT count(*) FROM `" + logDatabase + "` WHERE `" + find + "` is null")
    console.log('Pending log links= ' + t3[0]['count(*)'])

}

async function test(linkDatabase, find) {
    let data = []

    data['dist'] = await database.sql("SELECT DISTINCT(working) FROM `" + linkDatabase + "` WHERE 1")
    data['findNullnNot500'] = await database.sql("SELECT count(*)  FROM `" + linkDatabase + "` WHERE `" + find + "` IS NULL AND `working` != 500")
    //data['notnull500'] = await database.sql("SELECT count(*)  FROM `" + linkDatabase + "` WHERE `" + find + "` IS not NULL AND `working` = 500")
    data['c200'] = await database.sql("SELECT count(*)  FROM `" + linkDatabase + "` WHERE `working` = 200")
    data['c500'] = await database.sql("SELECT count(*)  FROM `" + linkDatabase + "` WHERE  `working` = 500")
    data['total'] = await database.sql("SELECT count(*)  FROM `" + linkDatabase + "` WHERE  1")
    data['null'] = await database.sql("SELECT count(*)  FROM `" + linkDatabase + "` WHERE  `working` is null")
    console.log(linkDatabase)
    console.log(data)

    //if (data['null500'][0]['count(*)'] !== 0) {
        // await database.sql("UPDATE `" + linkDatabase + "` SET  `working`=null  WHERE `" + find + "` IS NULL AND `working` != 500");
    //    console.log('null500 -> exe')
    //}
   // if (data['notnull500'][0]['count(*)'] !== 0) {
        //  await database.sql("UPDATE `" + linkDatabase + "` SET  `working`=null  WHERE `" + find + "` IS not NULL AND `working` = 500");
    //    console.log('notnull500 -> exe')
    //}
    //if (data['total'][0]['count(*)'] !== parseInt(data['c200'][0]['count(*)'] + data['c500'][0]['count(*)'])) {
   //     console.log('err')
   // } else {
   //     console.log('ok')
   // }

}

async function select() {
    let data = await database.sql("SELECT `rid` FROM `starzone_photos` order by `c_date` DESC limit 1000 offset 0")
    data.map(async (v, i) => {
        let t3 = await database.sql("SELECT count(*) FROM `starzone_photos_update` WHERE `rid`=" + v.rid)
        if (t3[0]['count(*)'] == 0) {
            console.log('inserted', v.rid)
            let t4 = await database.sql("INSERT INTO `starzone_photos_update` (`rid`) VALUES ('" + v.rid + "')")
            console.log(t4)
        }
        if (data.length == i + 1) {
            console.log('done')
        }
    })
}

//select()

let db = [
    {db: 'articles_editorial', head: 'title'}, {db: 'articles_interviews', head: 'title'}, {
    db: 'articles_news',
    head: 'heading'
}, {db: 'articles_press_releases', head: 'heading'}, {
    db: 'local_events_categories',
    head: 'locationCategory'
},
    {db: 'local_events_events', head: 'eventName'}, {
    db: 'local_events_events_update',
    head: 'title'
},
    {db: 'local_events_location', head: 'locationName'}, {
    db: 'local_events_schedule',
    head: 'eventContent'
},
   {db: 'movies_function', head: 'title'}, {db: 'movies_function_update', head: 'title'},
   { db: 'movies_names_title', head: 'movieName' },
{db: 'movies_photos', head: 'title'}, {db: 'movies_photos_update', head: 'title'},
{ db: 'movies_poster',head: 'title' },
{db: 'movies_reviews', head: 'title'}, {db: 'starzone_filmpersonal', head: 'name'},
 {db: 'starzone_photos', head: 'title'}, { db: 'starzone_photos_update',  head: 'title' }
]

// db.map(value => {
//     test(value.db, value.head)
// })

async function newId(db) {
    //1221

     let data3 = await database.sql("ALTER TABLE `" + db + "` ENGINE=MyISAM;")
    console.log(data3)
     let data = await database.sql("ALTER TABLE `" + db + "` DROP COLUMN `id`;")
     if(data['affectedRows']){
         let data2 = await database.sql( "ALTER TABLE `" + db + "` ADD `id` INT NOT NULL AUTO_INCREMENT FIRST, ADD PRIMARY KEY (`id`);");
         console.log(data2)
    }
}

//newId('starzone_photos')
