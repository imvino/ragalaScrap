const database = require('../components/model');

async function removeBracket(table,col) {
    let sql = "SELECT `id`, `" + col + "` FROM `" + table + "` where `" + col + "` like '%[%' or `" + col + "` like '%]%' ";
    console.log(sql)
    let data = await database.sql(sql)
     data.map(async (v, i) => {
       let rm = v[col].substring(1, v[col].length-1);
       let sql2 = "UPDATE `" + table + "` SET `" + col + "`="+rm+" WHERE `id`=" + v.id;
         console.log(sql2)
       let t3 = await database.sql(sql2)
         //
         // console.log(v.id,rm)
     })
}
async function directField(table, refTable, oldCol,newCol) {
    let sql = "SELECT  `id`, `" + oldCol + "` FROM `" + table + "` where `" + newCol + "` is Null order by id desc  ";
    console.log(sql)
    let data = await database.sql(sql)
    data.map(async (v, i) => {
        let sql2 = "SELECT `id` FROM `" + refTable + "` where `rid` = "+v[oldCol];
        let data2 = await database.sql(sql2)
        console.log(sql2)
       let sql3 = "UPDATE `" + table + "` SET `" + newCol + "`="+data2[0].id+" WHERE `id`=" + v.id;

        let sql4 = await database.sql(sql3)
       if(sql4.affectedRows){
           console.log(sql3)
       }

    })
}
directField('articles_news','movies_names_title','movieName','movie_name')
//removeBracket('articles_news','movieName')

