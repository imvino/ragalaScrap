// Load the SDK
const AWS = require('aws-sdk');
const database = require('../../components/model');
// Connection
// This is how you can use the .aws credentials file to fetch the credentials
const credentials = new AWS.SharedIniFileCredentials({profile: 'wasabi'});
AWS.config.credentials = credentials;

// This is a configuration to directly use a profile from aws credentials file.
//  AWS.config.credentials.accessKeyId = "8P58RXZO6FV2HB44355V"
//  AWS.config.credentials.secretAccessKey = "CrOIY0sKCb8yReR034anNrqkCmBJouWMk91zr4ee"
AWS.config.credentials.accessKeyId = "1WSIWHRURHJVMWHLU1FE"
AWS.config.credentials.secretAccessKey = "WTpchaqGTymsFA5JG3zKhIJRrS5P0hHThT88wNbJ"
// Set an endpoint.
const ep = new AWS.Endpoint('s3.wasabisys.com');

// Create an S3 client
const s3 = new AWS.S3({endpoint: ep});

let delCount = 15;
let counter = 0;
let mailCounter = 0;
let table = [
    {main: 'starzone_photos',sub:'starzone_photos_update'},
  //  {main: 'local_events_events',sub:'local_events_events_update'},
   //   {main: 'movies_function',sub:'movies_function_update'},
    //   {main: 'movies_photos',sub:'movies_photos_update'},
     //  {main: 'movies_poster'}
    ]
const main = async (table) => {
    let bucket = ['img.ragalahari.com', 'media.ragalahari.com', 'starzone.ragalahari.com', 'imgcdn.ragalahari.com',
        'www1.ragalahari.com', 'imgcdn.raagalahari.com', 'img.raagalahari.com', 'timg.raagalahari.com', 'szcdn.ragalahari.com', 'www.ragalahari.com','szcdn1.ragalahari.com']
    //'gallery.ragalahari.com',media1.ragalahari.com,74.52.160.190,media1.ragalahari.com,www.ragalahari.net,www.telugudvdshop.com
//`wasabi` is null
    let _webUrl = table.main == 'movies_poster'?'`permaLink`,`web_url`':'`web_url`'

        let ids = await database.sql("SELECT `rid`,"+_webUrl+",`imageName` FROM `"+table.main+"` where `wasabi` is null and `working`=200  order by rid desc")
        //console.log(ids)
        //ids.map(async val => {
        async function run(val) {
            console.log(val)
            let selPath = table.main == 'movies_poster'?'`fileLocation` as path':'path'
            let sql = await database.sql("SELECT "+selPath+" FROM `"+table.main+"` where `wasabi` is null and `working`=200 and `rid`=" + val.rid)
            console.log('started', val.rid)
            //console.log('sql', sql)
           // return
            if (sql[0]?.path) {
                let Orgin = sql[0].path.replace(/http:\/\//gi, '').split('/')
                let bucketName = Orgin[0] == bucket[0] || Orgin[0] == bucket[3] || Orgin[0] == bucket[4] ||
                Orgin[0] == bucket[5] || Orgin[0] == bucket[6] || Orgin[0] == bucket[7] ? bucket[0] : Orgin[0] == bucket[1] || Orgin[0] == bucket[9] ? bucket[1] :
                    Orgin[0] == bucket[2] || Orgin[0] == bucket[8] || Orgin[0] == bucket[10] ? bucket[2] : 'noFile';

                let remove = bucket.concat('http:///').concat('Http:///')
                let prefix = sql[0].path

                if (prefix == 'http://www.ragalahari.com/images/') {
                    prefix = 'gallery/' + val.imageName + '/'
                } else {
                    remove.map(v => {
                        prefix = prefix.replace(v, '')
                    })
                }
                console.log( bucketName, prefix)
                if (bucketName != 'noFile') {
                    var params = {
                        Bucket: bucketName,
                        Prefix: prefix
                    };
                    s3.listObjects(params, function (err, data) {
                        if (err) {
                            return 'There was an error viewing your album: ' + err.message
                        } else {
                           //  console.log(data.Contents,"<<<all content");
                            let wasabi = []
                            let prefixUrl=(prefix +'/'+val.imageName)?.replace('//','/')
                            // console.log(prefixUrl)
                            let promises = data.Contents.map(async (obj, index) => {
                                //  console.log(data)
                                // console.log(obj.Key, obj.Key.includes('t.jpg'), obj.Key.includes(prefixUrl));
                                // return
                                if (obj.Key.includes('t.jpg') && obj.Key.includes(prefixUrl)) {
                                    let imgNo = obj.Key.replace(prefixUrl, '').replace('t.jpg', '')
                                    let url
                                    if(table.main == 'movies_poster'){
                                        url=`/posters/${val.permaLink}/${val.imageName}${imgNo}.aspx`
                                    }else{
                                        url = val.web_url?.replace('.aspx', `/image${imgNo}.aspx`);
                                    }
                                    let image = 'http://' + Orgin[0] + '/' + obj.Key.replace('t.jpg', '.jpg');
                                    // let thumb = 'http://' + Orgin[0] + '/' + obj.Key;
                                    // console.log('url',url)
                                    // console.log('image',image)

                                    let sql = await database.sql("SELECT count(*) FROM `wasabi` where `url`='" + url + "'")
                                    // console.log("SELECT count(*) FROM `wasabi` where `url`='"+url+"'")
                                    // console.log(sql)
                                    if (sql[0]['count(*)'] == 0) {
                                        // console.log('================')
                                        // console.log(url, " >> file path")
                                        console.log("INSERT INTO `wasabi`(`url`,  `image`) VALUES ('" + url + "','" + image + "')")
                                        // console.log(image, " >> image")
                                        let sql2 = await database.sql("INSERT INTO `wasabi`(`url`,  `image`) VALUES ('" + url + "','" + image + "')");
                                        wasabi.push(sql2.insertId)
                                    } else {
                                        let sql2 = await database.sql("SELECT id FROM `wasabi` where `url`='" + url + "'")
                                        wasabi.push(sql2[0].id)
                                    }
                                }

                            })
                            Promise.all(promises).then(async function (results) {
                                let sql2 = await database.sql("UPDATE `"+table.main+"` SET wasabi='[" + wasabi + "]' where rid=" + val.rid);
                                // console.log(sql2)
                                if (wasabi.length == 0) {
                                    console.log('not inserted ' + val.rid)
                                } else {
                                    console.log('inserted >> ' + val.rid)
                                }
                                counter++
                                if (counter % delCount === 0) {
                                    console.log('new array')
                                    arr()
                                } else if (ids.length === 0) {
                                    console.log('zero array')
                                    arr()
                                } else {
                                    console.log(ids.length, counter, delCount)
                                }
                            })
                        }
                    })
                } else {
                    let sql2 = await database.sql("UPDATE `"+table.main+"` SET wasabi='[]' where rid=" + val.rid);
                    console.log('noFile')
                    arr()
                }
            } else {
                let sql2 = await database.sql("UPDATE `"+table.main+"` SET wasabi='[]' where rid=" + val.rid);
                console.log('noPath')
                arr()
            }
        }
        // })
        async function arr() {
            if (ids.length === 0) {
                mailCounter++
                if (mailCounter === 1) {
                    console.log('completed')
                }
                console.log(mailCounter)
                return
            }
            ids.splice(0, delCount).map((v, i) => {
                let permaLink =v.permaLink?v.permaLink:''
                run({rid: v.rid, web_url: v.web_url, imageName: v.imageName,permaLink:permaLink});
            })
        }

        arr()

}
table.map(async obj=>{
    main(obj);  console.log(obj)
  // let o= await database.sql("update `"+obj.sub+"` set wasabi = '[]' where wasabi is NULL  OR wasabi = 'noPath' OR wasabi = 'noFile' OR wasabi = 'error'");  console.log(o)
 // let o= await database.sql("SELECT count(*) FROM `"+obj.sub+"` where wasabi = '[]'");  console.log(o[0]['count(*)'])

})


