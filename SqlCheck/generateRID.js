const database = require('../components/model');

//'articles_news', 'articles_press_releases','local_events_events',
// 'local_events_events_update','local_events_location','local_events_schedule','movies_function',
// 'movies_function_update','movies_names_title','movies_photos','movies_reviews','starzone_filmpersonal','starzone_photo_update'


//console.log(43069-42957)
//rid=[96451,96452,96453,96454,96462,96466,96468,96469,96474,96478,96479,96481,96483,96484,96485,96486]
let rid=[];
let log_db = 'url_log_local';
let _db = 'articles_interviews';
let name = 'movieName';
async function select(){
   // let g2=[];
    let g = await database.sql("SELECT  distinct(`"+name+"`)  FROM `"+_db+"` where rdate IS null order by `"+name+"`");
    let g2= await Promise.all(g);
    g2.map((v,i)=>{
        if(v[name] != null) {
            rid.push(v[name])
        }
    })
  //  let sql = "INSERT INTO `"+log_db+"`(`rid`) VALUES ("+rid.toString().replace(/,/ig,'),(')+")"
  //   let sql = "SELECT events from `"+log_db+"` where rid in ("+rid.toString().replace(/,/ig,',')+")";
  //   console.log(sql)
  //   let sqlg = database.sql(sql);
  //   let sqlg2= await Promise.all(await sqlg);
  //   console.log(sqlg2)
    console.log(rid.toString())
}
//select();

async function gen(data) {
    for(let i =170257; i <=170272; i++ ){
        rid.push(i)
    }
    let sql = "INSERT INTO `"+data+"`(`rid`) VALUES ("+rid.toString().replace(/,/ig,'),(')+")"
    console.log(sql)
    await database.sql(sql);
}

gen('starzone_photo_update')


