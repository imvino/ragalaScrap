const mysql = require('mysql2');
const urlSlug = require('url-slug');

const con_cms = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ragalacms'
});

databaseCms = async (condition) => {
    const result = await con_cms.promise().query(condition)
        .then(([rows, fields]) => {
            return rows;
        })
        .catch(console.log)
    // .then( () => con.end());
    return result
};

async function imgGen(db,image,content) {
    let r1 = await databaseCms("SELECT  `rid`,`"+content+"` FROM `"+db+"` WHERE `"+image+"` IS NULL and `"+content+"` like '%<img%' order by `rid` desc");
    if (r1.length==0) console.log(db+' over')
    r1.map((v, i) => {
        var m,
            urls = [],
            rex = /<img.*?src="(.*?)"[^>]+>/g;
        while ( m = rex.exec( v[content] ) ) {
            urls.push( m[1] );
        }
        if(urls.length!=0){
            let up = "UPDATE `"+db+"` SET `"+image+"` = '" + urls[0] + "' where rid=" + v.rid;
            if(!up.includes('http')){
               // up=up.replace('amp;','')
                up = "UPDATE `"+db+"` SET `"+image+"` = 'http://img.raagalahari.com" + urls[0] + "' where rid=" + v.rid;

                console.log(up)
            }else{
                console.log(up)
                databaseCms(up)
            }
        }
        if (i == r1.length - 1) console.log('done')
    })
}
imgGen('articles_press_releases','pressReleaseImage','content')
// imgGen('articles_news','newsImage','newsItem')
//imgGen('articles_interviews','interviewImage','interview')
