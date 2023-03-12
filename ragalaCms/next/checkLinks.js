const databaseCms = require('../../components/model');

async function test(){
    let r1 = await databaseCms.sql("SELECT  count(DISTINCT(`articles_news_rid`)) FROM `link_articles_news_starzone_filmpersonal`");
    let r2 = await databaseCms.sql("SELECT  count(*) FROM `articles_news` WHERE filmPersonals is  not null and working =200");
    console.log(r1,r2, r1[0]['count(DISTINCT(`articles_news_rid`))']-r2[0]['count(*)'])
     r1 = await databaseCms.sql("SELECT  count(DISTINCT(`local_events_events_rid`)) FROM `link_local_events_events_starzone_filmpersonal`");
     r2 = await databaseCms.sql("SELECT  count(*) FROM `local_events_events` WHERE filmPersonals is not null and working =200 ");
    console.log(r1,r2, r1[0]['count(DISTINCT(`local_events_events_rid`))']-r2[0]['count(*)'])
    r1 = await databaseCms.sql("SELECT  count(DISTINCT(`movies_names_title_rid`)) FROM `link_movies_names_title_movie_genre` ");
     r2 = await databaseCms.sql("SELECT  count(*) FROM `movies_names_title` WHERE genre is not null and working =200");
    console.log(r1,r2, r1[0]['count(DISTINCT(`movies_names_title_rid`))']-r2[0]['count(*)'])
    r1 = await databaseCms.sql("SELECT  count(DISTINCT(`movies_names_title_rid`)) FROM `link_movies_names_title_starzone_filmpersonal`");
     r2 = await databaseCms.sql("SELECT  count(*) FROM `movies_names_title` WHERE filmPersonals is not null and working =200");
    console.log(r1,r2, r1[0]['count(DISTINCT(`movies_names_title_rid`))']-r2[0]['count(*)'])
    r1 = await databaseCms.sql("SELECT  count(DISTINCT(`starzone_filmpersonal_rid`)) FROM `link_starzone_filmpersonal_starzone_filmpersonal_category`");
     r2 = await databaseCms.sql("SELECT  count(*) FROM `starzone_filmpersonal` WHERE category is not null and working =200");
    console.log(r1,r2, r1[0]['count(DISTINCT(`starzone_filmpersonal_rid`))']-r2[0]['count(*)'])

}

//test() //   'starzone_photos',
//     'local_events_events',
//  //   'movies_function', //11634
//   //   'movies_photos', //7061
//  //    'movies_poster' //1899

setInterval(async ()=>{
    r2 = await databaseCms.sql("SELECT count(*) FROM `movies_poster` where wasabi is null and working =200");
    console.log(r2[0]['count(*)'])
},5000)