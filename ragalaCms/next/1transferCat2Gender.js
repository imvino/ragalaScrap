//import urlSlug from 'url-slug'
const mysql = require('mysql2');
const urlSlug = require('url-slug');
// create the connection to database

// const con = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'ragalahari'
// });

const con_cms = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ragalacms'
});

// database = async (condition) => {
//     const result = await con.promise().query(condition)
//         .then(([rows, fields]) => {
//             return rows;
//         })
//         .catch(console.log)
//     // .then( () => con.end());
//     return result
// };
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
transferCat2Gender()





//
//Ocat2Ncat()
//transferCat2Gender()
//newId()

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
