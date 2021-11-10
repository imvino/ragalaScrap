const mysql = require('mysql2');
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


async function transferCat2Gender() {
    let r1 = await database("SELECT  `rid`,`category` FROM `starzone_filmpersonal` WHERE `category` IS NOT NULL and `rid` ='1673' order by `rid` desc limit 1");
    console.log('total',r1.length)
r1.map(async v=>{
    let up = "UPDATE `starzone_photos` SET `catgen` = '"+v['category']+"' where filmPersonalName="+v['rid'];
    let r2 = await databaseCms(up)
    console.log((r2))
    if(r2)console.log(v['rid'])
})
}

transferCat2Gender()
