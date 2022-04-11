const {chromium} = require('playwright');
const database = require('../components/model');
const core = require('../ExtractData/Using_DB_rid/coreDataScrap');
var format = require('../formatDT')
let rid = [];

async function gen(data, webid,extDate=false) {

        let v = await database.sql("SELECT MAX( rid ) FROM `" + data + "`")
        v = v[0]['MAX( rid )'] + 1
        console.log(v)
        for (let i = v; i <= webid; i++) {
            rid.push(i)
        }
        console.log('total', rid.length)
        if (rid.length != 0) {
            let sql = "INSERT INTO `" + data + "`(`rid`) VALUES (" + rid.toString().replace(/,/ig, '),(') + ")"
            console.log(sql)
            let sql2 = await database.sql(sql);
            console.log(sql2)
        } else {
            console.log('not inserted')
        }

        let total = rid.length?rid.length:150
    let split= 1
    let limit = Math.ceil(total/split)

    Array(split).fill(0).map((v,i)=> {
        let data = {
            file: 'filmpersonal.log',
            gotoUrl: 'https://www.ragalahari.com/newadmin/FilmPersonalAddEdit.aspx?fpid=',
            linkDatabase: 'starzone_filmpersonal',
            coreDate: 'filmpersonals',
            limit: limit,
            offset: limit*i,
            array: i+1,
        }
        console.log(data)
        core(data)
    })

}

gen('starzone_filmpersonal', 97533)



