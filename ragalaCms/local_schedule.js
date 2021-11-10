const {chromium} = require('playwright');
const database = require('../components/model');
const core = require('../ExtractData/Using_DB_rid/coreDataScrap');
const rcore = require('../rdateExtract/dateCore');
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
        let split = 1
        let limit = Math.round(total / split)
// offset: total+(limit*i),
// offset: limit*i,
        Array(split).fill(0).map((v, i) => {
            let data = {
                file: 'localSchedule.log',
                gotoUrl: 'https://www.ragalahari.com/newadmin/LocalEventContentAddEdit.aspx?cntid=',
                linkDatabase: 'local_events_schedule',
                coreDate: 'localSchedule',
                limit: limit,
                offset: limit*i,
                array: i+1,
            }
            console.log(data)
            core(data)
        })
}
function rdate(){
    rcore({
        file: 'event.log',
        selector: 'select[name="ctl00$MainContent$drp_movie"]',
        gotoUrl: 'https://www.ragalahari.com/newadmin/LocalEventsInfo.aspx',
        editUrl: 'LocalEventsNewAddEdit.aspx?fid=',
        linkDatabase: 'local_events_events',
        logDatabase: 'url_log_local',
        find: 'events',
        selectorId: 1360,
        formatDateTime: true
    })
}

gen('local_events_schedule', 2192,true)



