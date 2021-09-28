const core = require('../coreDataScrap');
let total = 33
let split= 1
let limit = Math.round(total/split)
// offset: total+(limit*i),
// offset: limit*i,
Array(split).fill(0).map((v,i)=> {
    let data = {
        file: 'movieReview.log',
        gotoUrl: 'https://www.ragalahari.com/newadmin/moviereviewaddedit.aspx?mrid=',
        linkDatabase: 'movies_reviews',
        coreDate: 'movieReview',
        limit: limit,
        offset: limit*i,
        array: i+1,
    }
    console.log(data)
    core(data)
})
