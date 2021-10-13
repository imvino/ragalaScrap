const core = require('../coreDataScrap');
let total = 50
let split= 1
let limit = Math.round(total/split)
// offset: total+(limit*i),
// offset: limit*i,
Array(split).fill(0).map((v,i)=> {
    let data = {
        file: 'interview.log',
        gotoUrl: 'https://www.ragalahari.com/newadmin/InterviewsAddEdit.aspx?intrvid=',
        linkDatabase: 'articles_interviews',
        coreDate: 'interview',
        limit: limit,
        offset: limit*i,
        array: i+1,
    }
    console.log(data)
    core(data)
})
