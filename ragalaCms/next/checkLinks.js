const databaseCms = require('../../components/model');

async function test(){
    let r1 = await databaseCms.sql("SELECT  count(DISTINCT(`articles_news_rid`)) FROM `link_articles_news_starzone_filmpersonal` WHERE 1");
    let r2 = await databaseCms.sql("SELECT  count(*) FROM `articles_news` WHERE filmPersonals is  not null");
    console.log(r1,r2)
     r1 = await databaseCms.sql("SELECT  count(DISTINCT(`local_events_events_rid`)) FROM `link_local_events_events_starzone_filmpersonal` WHERE 1");
     r2 = await databaseCms.sql("SELECT  count(*) FROM `local_events_events` WHERE filmPersonals is not null");
    console.log(r1,r2)
    r1 = await databaseCms.sql("SELECT  count(DISTINCT(`movies_names_title_rid`)) FROM `link_movies_names_title_movie_genre` WHERE 1");
     r2 = await databaseCms.sql("SELECT  count(*) FROM `movies_names_title` WHERE genre is not null");
    console.log(r1,r2)
    r1 = await databaseCms.sql("SELECT  count(DISTINCT(`movies_names_title_rid`)) FROM `link_movies_names_title_starzone_filmpersonal` WHERE 1");
     r2 = await databaseCms.sql("SELECT  count(*) FROM `movies_names_title` WHERE filmPersonals is not null");
    console.log(r1,r2)
    r1 = await databaseCms.sql("SELECT  count(DISTINCT(`starzone_filmpersonal_rid`)) FROM `link_starzone_filmpersonal_starzone_filmpersonal_category` WHERE 1");
     r2 = await databaseCms.sql("SELECT  count(*) FROM `starzone_filmpersonal` WHERE category is not null");
    console.log(r1,r2)

}

test()
