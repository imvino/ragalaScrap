const {chromium} = require('playwright');
const database = require('../components/model');
const core2 = require('../ExtractData/Using_DB_rid/coreDataScrap');
const core = require('../rdateExtract/dateCore');
var format = require('../formatDT')
let rid = [];

let rdate = async () => {
    core({
        gotoUrl: 'https://www.ragalahari.com/newadmin/starzoneinfo.aspx',
        editUrl: 'starzonenewaddedit.aspx?szid=',
        linkDatabase: 'starzone_photos',
        formatDateTime:true
    })
}
async function gen(data, dbbid, webid,update=false) {


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
        if(!update){
            let sql3 = await  database.sql("update `" + data + "` SET working = NULL WHERE rid > "+parseInt(dbbid-1))
            if(sql3.affectedRows) {
                Array(split).fill(0).map((v, i) => {
                    let data = {
                        file: 'starPhotos.log',
                        gotoUrl: 'https://www.ragalahari.com/newadmin/starzonenewaddedit.aspx?szid=',
                        linkDatabase: 'starzone_photos',
                        coreDate: 'starPhotos',
                        limit: limit,
                        offset: limit * i,
                        array: i + 1,
                    }
                    console.log(data)
                    core2(data)
                })
            }
        }
        if(update){
            let sql3 = await  database.sql("update `" + data + "` SET working = NULL WHERE rid > "+parseInt(dbbid-1))
            if(sql3.affectedRows) {
                Array(split).fill(0).map((v,i)=> {
                    let data = {
                        file: 'starPhotosUpdate.log',
                        gotoUrl: 'https://www.ragalahari.com/newadmin/starzoneupdatereorder.aspx?szid=',
                        linkDatabase: 'starzone_photos',
                        coreDate: 'starPhotosUpdate',
                        limit: limit,
                        offset: limit*i,
                        array: i+1,
                    }
                    console.log(data)
                    core2(data)
                })}
        }

}


gen('starzone_photos', 170571,170728,true)
//rdate()



