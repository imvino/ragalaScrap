const databaseCms = require('../../components/model');
const urlSlug = require('url-slug');
let db = ['starzone_photos', 'movies_function', 'movies_photos', 'movies_poster', 'local_events_events', 'movies_names_title',
    'starzone_filmpersonal', 'local_events_location', 'movies_reviews', 'articles_press_releases', 'articles_editorial'
    ,'articles_interviews','articles_news']

async function newUrlGen(db) {
    let actor = [10, 11, 12, 13, 14, 15, 17, 21, 25, 26, 27, 28, 30, 31, 33, 34, 35, 36, 37, 38, 39, 49, 55, 58, 60, 62]
    let actress = [16, 20, 22, 23, 24, 29, 32, 40, 41, 42, 43, 44, 45, 46, 47, 48, 50, 51, 52, 53, 54, 56, 57, 59, 61, 63]
    if (db == 'starzone_photos') {
        let r1 = await databaseCms.sql("SELECT  `rid`,`catgen`,`permaLink`,`gender` FROM `starzone_photos` WHERE `nurl` IS NULL order by `rid` desc");
        if (r1.length == 0) console.log(db + ' over')
        r1.map((v, i) => {
            let rid = v.rid
            let gallery = urlSlug(v.permaLink)
            let d = JSON.parse('[' + v['catgen'] + ']')
            let male = actor.filter(element => d.includes(element)).length;
            let female = actress.filter(element => d.includes(element)).length;
            let url = '', gender = '0'
            if (male) url = `/starzone/actor/${rid}/${gallery}`, gender = 0
            if (female) url = `/starzone/actress/${rid}/${gallery}`, gender = 1
            //console.log(url, gender) , `gender` = '"+gender+"'
            if (url == '') {
                if (v.gender == '0') url = `/starzone/actor/${rid}/${gallery}`
                if (v.gender == '1') url = `/starzone/actress/${rid}/${gallery}`
            }
            if (url != '') {
                let up = "UPDATE `starzone_photos` SET `nurl` = '" + url + "' where rid=" + rid;
                console.log(up)
                databaseCms.sql(up)
            }
            if (i == r1.length - 1) console.log('done')
        })
    }
    if (db == 'movies_function' || db == 'movies_photos' || db == 'movies_poster') {
        let sub = {'movies_function': 'functions', 'movies_photos': 'photos', 'movies_poster': 'poster-designs'}
        let newtbl = db == 'movies_photos' ? ", `fileLocation` " : ''
        let r1 = await databaseCms.sql("SELECT  `title`,`rid`,`permaLink` " + newtbl + " FROM `" + db + "` WHERE `nurl` IS NULL order by `rid` desc");
        if (r1.length == 0) console.log(db + ' over')
        r1.map((v, i) => {
            let rid = v.rid
            let gallery = v.permaLink ? urlSlug(v.permaLink) : urlSlug(v.title)
            if (db == 'movies_photos') {
                //  console.log(v.fileLocation,v.fileLocation.includes('/includes/working/') )
                sub[db] = v.fileLocation.includes('/includes/working/') ? 'working-stills' : 'photos'
            }
            let url = `/movies/${sub[db]}/${rid}/${gallery}`
            if (url != '') {
                let up = "UPDATE `" + db + "` SET `nurl` = '" + url + "' where rid=" + rid;
                console.log(up)
                databaseCms.sql(up)
            }
            if (i == r1.length - 1) console.log('done')
        });
    }
    if (db == 'local_events_events') {
        let r1 = await databaseCms.sql("SELECT  `rid`,`permaLink`  FROM `" + db + "` WHERE `nurl` IS  NULL and working='200' order by `rid` desc ");
        if (r1.length == 0) console.log(db + ' over')
        r1.map((v, i) => {
            let rid = v.rid
            let gallery = urlSlug(v.permaLink)
            let url = `/events/local-events/${rid}/${gallery}`
            if (url != '') {
                let up = "UPDATE `" + db + "` SET `nurl` = '" + url + "' where rid=" + rid;
                console.log(up)
                databaseCms.sql(up)
            }
            if (i == r1.length - 1) console.log('done')
        })
    }
    if (db == 'movies_names_title') {
        let r1 = await databaseCms.sql("SELECT  `movieName`,`rid`,`permaLink`  FROM `" + db + "` WHERE `nurl` IS NULL and working='200' order by `rid` desc");
        if (r1.length == 0) console.log(db + ' over')
        r1.map((v, i) => {
            let rid = v.rid
            let gallery = v.permaLink?urlSlug(v.permaLink):`${urlSlug(v.movieName)}-telugucinema-cast-crew`
            let url = `/movies/${rid}/${gallery}`
            if (url != '') {
                let up = "UPDATE `" + db + "` SET `nurl` = '" + url + "' where rid=" + rid;
                console.log(up)
                databaseCms.sql(up)
            }
            if (i == r1.length - 1) console.log('done')
        })
    }
    if (db == 'movies_reviews' || db == 'articles_editorial' || db == 'articles_interviews') {
        let r1 = await databaseCms.sql("SELECT  `rid`,`permaLink`,`title`  FROM `" + db + "` WHERE `nurl` IS NULL and working='200' order by `rid` desc");
        if (r1.length == 0) console.log(db + ' over')
        r1.map((v, i) => {
            let rid = v.rid
            let gallery = v.permaLink ? urlSlug(v.permaLink) : urlSlug(v.title)
            let url_tbl = db == 'movies_reviews' ? `movie-reviews` : db == 'articles_editorial' ? `editorial` : `interviews`;
            let url = `/articles/${url_tbl}/${rid}/${gallery}`
            if (url != '') {
                let up = "UPDATE `" + db + "` SET `nurl` = '" + url + "' where rid=" + rid;
                console.log(up)
                databaseCms.sql(up)
            }
            if (i == r1.length - 1) console.log('done')
        })
    }
    if (db == 'articles_press_releases' || db == 'articles_news') {
        let r1 = await databaseCms.sql("SELECT  `rid`,`permaLink`,`heading`  FROM `" + db + "` WHERE `nurl` IS NULL and working='200' order by `rid` desc");
        if (r1.length == 0) console.log(db + ' over')
        r1.map((v, i) => {
            let rid = v.rid
            let gallery = v.permaLink ? urlSlug(v.permaLink) : urlSlug(v.heading)
            let url_tbl = db == 'articles_press_releases' ?'press-releases' : 'news'
            let url = `/articles/${url_tbl}/${rid}/${gallery}`
            if (url != '') {
                let up = "UPDATE `" + db + "` SET `nurl` = '" + url + "' where rid=" + rid;
                console.log(up)
                databaseCms.sql(up)
            }
            if (i == r1.length - 1) console.log('done')
        })
    }
    if (db == 'starzone_filmpersonal') {
        let r1 = await databaseCms.sql("SELECT  `rid`,`permaLink`  FROM `" + db + "` WHERE `nurl` IS NULL and working='200' order by `rid` desc");
        if (r1.length == 0) console.log(db + ' over')
        r1.map((v, i) => {
            let rid = v.rid
            let gallery = urlSlug(v.permaLink)
            let url = `/starzone/profile/${rid}/${gallery}`
            if (url != '') {
                let up = "UPDATE `" + db + "` SET `nurl` = '" + url + "' where rid=" + rid;
                console.log(up)
                databaseCms.sql(up)
            }
            if (i == r1.length - 1) console.log('done')
        })
    }
    if (db == 'local_events_location') {
        let r1 = await databaseCms.sql("SELECT  `rid`,`locationName`  FROM `" + db + "` WHERE `nurl` IS  NULL and working='200' order by `rid` desc");
        if (r1.length == 0) console.log(db + ' over')
        r1.map((v, i) => {
            let rid = v.rid
            let gallery = urlSlug(v.locationName)
            let url = `/events/info/${rid}/${gallery}`
            if (url != '') {
                let up = "UPDATE `" + db + "` SET `nurl` = '" + url + "' where rid=" + rid;
                console.log(up)
                databaseCms.sql(up)
            }
            if (i == r1.length - 1) console.log('done')
        })
    }

}


db.map(v=>{
    newUrlGen(v)
})
