//import urlSlug from 'url-slug'
const mysql = require('mysql2');
const urlSlug = require('url-slug');
// create the connection to database

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ragalahari'
});

const con_cms = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ragalacms'
});

database = async (condition) => {
    const result = await con.promise().query(condition)
        .then(([rows, fields]) => {
            return rows;
        })
        .catch(console.log)
    // .then( () => con.end());
    return result
};
databaseCms = async (condition) => {
    const result = await con_cms.promise().query(condition)
        .then(([rows, fields]) => {
            return rows;
        })
        .catch(console.log)
    // .then( () => con.end());
    return result
};

//`category` IS NOT NULL  order by `rid` desc
async function transferCat2Gender() {
    let rr1 = await databaseCms("SELECT DISTINCT(filmPersonalName) from `starzone_photos` WHERE  catgen IS NULL");
    rr1 = rr1.map(v => v.filmPersonalName).sort().reverse()
    // console.log("SELECT  `rid`,`category` FROM `starzone_filmpersonal` WHERE `category` IS NOT NULL and rid in("+rr1.toString()+")")
    // return
    let r1 = await databaseCms("SELECT  `rid`,`category` FROM `starzone_filmpersonal` WHERE `category` IS NOT NULL and rid in(1" + rr1.toString() + ")");
    console.log('total', r1.length)
    r1.map(async v => {
        let up = "UPDATE `starzone_photos` SET `catgen` = '" + v['category'] + "' where filmPersonalName=" + v['rid'];
        console.log(up)
        let r2 = databaseCms(up)
        console.log(r2)
    })
}

async function newUrlGen(db) {
    let actor = [10, 11, 12, 13, 14, 15, 17, 21, 25, 26, 27, 28, 30, 31, 33, 34, 35, 36, 37, 38, 39, 49, 55, 58, 60, 62]
    let actress = [16, 20, 22, 23, 24, 29, 32, 40, 41, 42, 43, 44, 45, 46, 47, 48, 50, 51, 52, 53, 54, 56, 57, 59, 61, 63]
    if (db == 'starzone_photos') {
        let r1 = await databaseCms("SELECT  `rid`,`catgen`,`permaLink`,`gender` FROM `starzone_photos` WHERE `nurl` IS NULL order by `rid` desc");
        if (r1.length==0) console.log(db+' over')
        r1.map((v, i) => {
            let rid = v.rid
            let gallery = urlSlug(v.permaLink)
            let d = JSON.parse('[' + v['catgen'] + ']')
            let male = actor.filter(element => d.includes(element)).length;
            let female = actress.filter(element => d.includes(element)).length;
            let url = '', gender = '0'
            if (male) url = `/starzone/actor/${rid}/${gallery}`, gender = 0
            if (female) url = `/starzone/actress/${rid}/${gallery}`, gender = 1
            //console.log(url, gender) , `gender` = '"+gender+"'
            if (url == '') {
                if (v.gender == '0') url = `/starzone/actor/${rid}/${gallery}`
                if (v.gender == '1') url = `/starzone/actress/${rid}/${gallery}`
            }
            if (url != '') {
                let up = "UPDATE `starzone_photos` SET `nurl` = '" + url + "' where rid=" + rid;
                console.log(up)
                databaseCms(up)
            }
            if (i == r1.length - 1) console.log('done')
        })
    }
    if (db == 'movies_function' || db == 'movies_photos' || db == 'movies_poster') {
        let sub = {'movies_function':'functions','movies_photos':'photos','movies_poster':'poster-designs'}
        let newtbl = db =='movies_photos'? ", `fileLocation` ":''
        let r1 = await databaseCms("SELECT  `rid`,`permaLink` "+newtbl+" FROM `"+db+"` WHERE `nurl` IS  NULL order by `rid` desc");
        if (r1.length==0) console.log(db+' over')
        r1.map((v, i) =>{
            let rid = v.rid
            let gallery = urlSlug(v.permaLink)
            if(db =='movies_photos') {
              //  console.log(v.fileLocation,v.fileLocation.includes('/includes/working/') )
                sub[db] = v.fileLocation.includes('/includes/working/') ?  'working-stills' : 'photos'
            }
            let url = `/movies/${sub[db]}/${rid}/${gallery}`
            if (url != '') {
               let up = "UPDATE `"+db+"` SET `nurl` = '" + url + "' where rid=" + rid;
                console.log(up)
                databaseCms(up)
            }
            if (i == r1.length - 1) console.log('done')
        });
    }
    if(db=='local_events_events'){
        let r1 = await databaseCms("SELECT  `rid`,`permaLink`  FROM `"+db+"` WHERE `nurl` IS  NULL and working='200' order by `rid` desc ");
        if (r1.length==0) console.log(db+' over')
        r1.map((v, i) =>{
            let rid = v.rid
            let gallery = urlSlug(v.permaLink)
            let url = `/events/local-events/${rid}/${gallery}`
            if (url != '') {
                let up = "UPDATE `"+db+"` SET `nurl` = '" + url + "' where rid=" + rid;
                console.log(up)
                databaseCms(up)
            }
            if (i == r1.length - 1) console.log('done')
        })
    }
    if(db=='movies_names_title'){
        let r1 = await databaseCms("SELECT  `rid`,`web_url`  FROM `"+db+"` WHERE `nurl` IS  NULL and working='200' order by `rid` desc");
        if (r1.length==0) console.log(db+' over')
        r1.map((v, i) =>{
            let rid = v.rid
            let url = v.web_url.replace('.aspx','')
            if (url != '') {
                let up = "UPDATE `"+db+"` SET `nurl` = '" + url + "' where rid=" + rid;
                console.log(up)
                databaseCms(up)
            }
            if (i == r1.length - 1) console.log('done')
        })
    }
    if(db=='starzone_filmpersonal'){
        let r1 = await databaseCms("SELECT  `rid`,`permaLink`  FROM `"+db+"` WHERE `nurl` IS  NULL and working='200' order by `rid` desc");
        if (r1.length==0) console.log(db+' over')
        r1.map((v, i) =>{
            let rid = v.rid
            let gallery = urlSlug(v.permaLink)
            let url = `/starzone/info/${rid}/${gallery}`
            if (url != '') {
                let up = "UPDATE `"+db+"` SET `nurl` = '" + url + "' where rid=" + rid;
                console.log(up)
                databaseCms(up)
            }
            if (i == r1.length - 1) console.log('done')
        })
    }
    if(db=='local_events_location'){
        let r1 = await databaseCms("SELECT  `rid`,`locationName`  FROM `"+db+"` WHERE `nurl` IS  NULL and working='200' order by `rid` desc");
        if (r1.length==0) console.log(db+' over')
        r1.map((v, i) =>{
            let rid = v.rid
            let gallery = urlSlug(v.locationName)
            let url = `/events/info/${rid}/${gallery}`
            if (url != '') {
                let up = "UPDATE `"+db+"` SET `nurl` = '" + url + "' where rid=" + rid;
                console.log(up)
                databaseCms(up)
            }
            if (i == r1.length - 1) console.log('done')
        })
    }

}

// async function Ocat2Ncat() {
//     let r1 = await database("SELECT  `rid`,`category` FROM `starzone_filmpersonal` WHERE `category` IS NOT NULL  order by `rid` desc");
//     console.log('total',r1.length)
//     r1.map( v=>{
//         let up = "UPDATE `starzone_filmpersonal` SET `category` = '"+v['category']+"', delme='1' where rid="+v['rid'];
//         let r2 =  databaseCms(up)
//         console.log(v['rid'])
//     })
// }
//
// async function newId() {
//     let rid=[];
//     let r1 = await databaseCms("SELECT DISTINCT(filmPersonalName) from `starzone_photos` WHERE  catgen IS NULL");
// r1 =r1.map(v=>v.filmPersonalName).sort().reverse()
//     console.log(r1.length)
//     let sql = "INSERT INTO `starzone_filmpersonal` (`rid`) VALUES (" + r1.toString().replace(/,/ig, '),(') + ")";
//
//     console.log('total',sql)
//          }

let db = ['starzone_photos', 'movies_function','movies_photos','movies_poster','local_events_events','movies_names_title','starzone_filmpersonal','local_events_location']
newUrlGen('local_events_events')
//Ocat2Ncat()
//transferCat2Gender()
//newId()
