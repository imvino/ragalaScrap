const database = require('../components/model');
let rid=[];
//'articles_news', 'articles_press_releases','local_events_events',
// 'local_events_events_update','local_events_location','local_events_schedule','movies_function',
// 'movies_function_update','movies_names_title','movies_photos','movies_reviews','starzone_filmpersonal','starzone_photo_update'
let db = 'starzone_photos';
for(let i =169620; i <=170013; i++ ){
    rid.push(i)
}
//console.log(43069-42957)
console.log("INSERT INTO `"+db+"`(`rid`) VALUES("+rid.toString().replace(/,/ig,'),(')+")")
let g = database.sql("INSERT INTO  `"+db+"` (`rid`) VALUES("+rid.toString().replace(/,/ig,'),(')+")"); console.log(g)

// INSERT INTO `articles_news`(`rid`) VALUES('162718'),('162719')
