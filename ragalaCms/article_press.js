const {chromium} = require('playwright');
const database = require('../components/model');
const core2 = require('../ExtractData/Using_DB_rid/coreDataScrap');
const core = require('../rdateExtract/dateCore');
var format = require('../formatDT')
let rid = [];

async function gen(data, webid, extDate = false) {
    let rdate = async () => {
        core({
            file: 'press.log',
            selector: 'select[name="ctl00$MainContent$drp_movieexact"]',
            gotoUrl: 'https://www.ragalahari.com/newadmin/PressreleasesInfo.aspx',
            editUrl: 'PressReleasesAddEdit.aspx?relid=',
            linkDatabase: 'articles_press_releases',
            logDatabase: 'url_log_articles',
            find: 'press',
            selectorId: 1,
            selector2: 'td:nth-of-type(7)',
            formatDate: true
        })
    }

    if (extDate) {
        rdate()
    } else {
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

        let total = rid.length ? rid.length : 150
        let split = 1
        let limit = Math.round(total / split)
        Array(split).fill(0).map((v, i) => {
            let data = {
                file: 'pressRelease.log',
                gotoUrl: 'https://www.ragalahari.com/newadmin/PressReleasesAddEdit.aspx?relid=',
                linkDatabase: 'articles_press_releases',
                coreDate: 'pressRelease',
                limit: limit,
                offset: limit * i,
                array: i + 1,
            }
            console.log(data)
            core2(data)
        })
    }

}

gen('articles_press_releases', 43079, true)



