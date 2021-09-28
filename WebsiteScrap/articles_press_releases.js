const core = require('./core_extractDate');
let total = 232
let split = 3
let limit = Math.round(total / split)
Array(split).fill(0).map((v, i) => {
    let data = {
        gotoUrl: 'article',
        linkDatabase: 'articles_press_releases',
        limit: limit,
        offset: limit * i,
    }
    core(data)
})
