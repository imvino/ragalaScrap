const databaseCms = require('../../components/model');

async function photoType(db) {
        let r1 = await databaseCms.sql("SELECT  `title`,`rid`,`permaLink` , `fileLocation`  FROM `" + db + "` WHERE `type` IS NULL order by `rid` desc");
        if (r1.length == 0) console.log(db + ' over')
        r1.map((v, i) => {
            let rid = v.rid
            let type= v.fileLocation.includes('/includes/working/') ? 'stills' : 'photos'

                let up = "UPDATE `" + db + "` SET `type` = '" + type + "' where rid=" + rid;
                console.log(up)
                databaseCms.sql(up)

            if (i == r1.length - 1) console.log('done')
        });


}
async function starGender(db) {
    let actor = [10, 11, 12, 13, 14, 15, 17, 21, 25, 26, 27, 28, 30, 31, 33, 34, 35, 36, 37, 38, 39, 49, 55, 58, 60, 62]
    let actress = [16, 20, 22, 23, 24, 29, 32, 40, 41, 42, 43, 44, 45, 46, 47, 48, 50, 51, 52, 53, 54, 56, 57, 59, 61, 63]
    let r1 = await databaseCms.sql("SELECT  `rid`,`catgen`,`permaLink`,`gender` FROM `starzone_photos` WHERE gender IS NULL order by `rid` desc");
    if (r1.length == 0) console.log(db + ' over')
    r1.map((v, i) => {
        let rid = v.rid
        let d = JSON.parse('[' + v['catgen'] + ']')
        let male = actor.filter(element => d.includes(element)).length;
        let female = actress.filter(element => d.includes(element)).length;
        let gender = null
        if (male)  gender = 0
        if (female)  gender = 1

        if (gender == null) {
            if (v.gender == '0') gender = 0
            if (v.gender == '1')  gender = 1
        }
gender = 1
            let up = "UPDATE `starzone_photos` SET `gender` = '" + gender + "' where rid=" + rid;
            console.log(up)
            databaseCms.sql(up)

        if (i == r1.length - 1) console.log('done')
    })

   await databaseCms.sql("UPDATE `starzone_photos` SET `providerName` = NULL where providerName='-1'")
}
async function genre(){
    let list = ['Action','Adventure','Animation','Biography','Comedy','Crime','Documentary','Drama','Family','Fantasy','Film-Noir','History','Horror','Musical','Mystery','Romance','Sci-Fi','Short','Sport','Thriller','War','Western']
    function rmv(s){
        let k = s?.match(/[A-Za-z]+/g)?.toString()
        return k != undefined ? k : null
    }
//["Mystery","Romance","Thriller"]
    let r1 = await databaseCms.sql("SELECT  `rid`,`genre`  FROM `movies_names_title` WHERE `genre` LIKE '%\"%' or genre  LIKE '%[%' order by `rid` desc");
    if (r1.length == 0) console.log('genre over')
    console.log((r1.length))
    r1.map((v, i) => {
        if (v.genre) {
            let g = v.genre.includes('[')?JSON.parse(v.genre):JSON.parse(`[${v.genre}]`)
            let gen = g?.map(val1 => {
                return list.findIndex(val2 => {
                    return val2 == val1
                }) + 1
            })
            //console.log(gen)
            if(gen.length != 0){
                gen.map((g,i)=>{
                    let sql = "INSERT INTO `link_movies_names_title_movie_genre` (`movies_names_title_rid`, `movie_genre_id`) VALUES ('"+v.rid+"','"+g+"')"
                    databaseCms.sql(sql)
                    if (i == gen.length - 1) {
                        console.log(`UPDATE movies_names_title SET genre = '${rmv(v.genre)}' where rid='${v.rid}'`)
                        databaseCms.sql(`UPDATE movies_names_title SET genre = '${rmv(v.genre)}' where rid='${v.rid}'`)
                    }
                })
            }else{
                databaseCms.sql(`UPDATE movies_names_title SET genre = NULL where rid='${v.rid}'`)
                console.log(`UPDATE movies_names_title SET genre = NULL where rid='${v.rid}'`)
            }
        }
    })
}
// async function expiredDate(){
//     let r1 = await databaseCms.sql("SELECT  `rid`,`expiredDate`  FROM `starzone_filmpersonal` WHERE `expiredDate`  IS NOT NULL and expDate is null order by `rid` desc");
//     console.log(r1)
//     r1.map(v=>{
//         const d = new Date(v.expiredDate);
//         let day = d.getDate();
//         let month = d.getMonth() + 1;
//         let year = d.getFullYear()
//         databaseCms.sql(`UPDATE starzone_filmpersonal SET expDate = '${year}-${month}-${day}' where rid='${v.rid}'`)
//     })
// }
async function highlight(){
    let db = ['starzone_photos', 'movies_function', 'movies_photos', 'movies_poster', 'local_events_events', 'movies_names_title',
        'starzone_filmpersonal',  'movies_reviews', 'articles_press_releases', 'articles_editorial'
        ,'articles_interviews','articles_news']
    db.map(async v=>{
      let r = await databaseCms.sql(`UPDATE ${v} SET highlight = '0' where highlight is null` )
        console.log(r.affectedRows)
   })
}

//photoType('movies_photos')
//starGender('starzone_photos')
//genre()
//highlight()

