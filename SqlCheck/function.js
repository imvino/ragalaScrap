const database = require('../components/model');

async function f() {
    let ids = await database.sql("SELECT `rid`,`found` FROM `url_log_functions` where `found` is not null")
    let count=null
    ids.map(async  (v, i) => {
        count = await database.sql("SELECT count(*) as chk from `movies_function` WHERE `mvid`='" +v.rid + "'")
        if (parseInt(count[0]['chk']) !== parseInt(v.found)) {
            console.log('err on => '+v.rid)
        }else {
            console.log('ok => '+v.rid)
        }
        if(ids.length === i+1) console.log('completed')
    })
}
async function f3() {
let column=[];
    let mv = await database.sql("SELECT `mvid` FROM `movies_function` GROUP by mvid")
    mv.map((v, i) => {
        column[i] = v.mvid;
    })

    let ids = await database.sql("SELECT `rid`,`found` FROM `url_log_functions` where rid in ("+column.toString()+")")
    let count=null
    ids.map(async  (v, i) => {
        count = await database.sql("SELECT count(*) as chk from `movies_function` WHERE `mvid`='" +v.rid + "'")
        if (parseInt(count[0]['chk']) !== parseInt(v.found)) {
            console.log('err on => '+v.rid)
        }else {
            console.log('ok => '+v.rid)
        }
        if(ids.length === i+1) console.log('completed')
    })
}

f()