const {chromium} = require('playwright');
const database = require('../components/model');
const core2 = require('../ExtractData/Using_DB_rid/coreDataScrap');
const core = require('../rdateExtract/dateCore');
var format = require('../formatDT')
let rid = [];

async function gen(data, dbbid, webid, extDate = false,update=false) {
    let rdate = async () => {
        core({
            gotoUrl: 'https://www.ragalahari.com/newadmin/functionsinfo.aspx',
            editUrl: 'FunctionsNewAddEdit.aspx?fid=',
            linkDatabase: 'movies_function',
            formatDateTime:true
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
        if(!update){
            Array(split).fill(0).map((v, i) => {
                let data = {
                    file: 'functions.log',
                    gotoUrl: 'https://www.ragalahari.com/newadmin/FunctionsNewAddEdit.aspx?fid=',
                    linkDatabase: 'movies_function',
                    coreDate: 'moviesFunction',
                    limit: limit,
                    offset: limit*i,
                    array: i+1,
                }
                console.log(data)
                core2(data)
            })
        }
        if(update){
            let sql3 = await  database.sql("update `" + data + "` SET working = NULL WHERE rid > "+parseInt(dbbid-1))
            if(sql3.affectedRows) {
                Array(split).fill(0).map((v,i)=> {
                    let data = {
                        file: 'functionsUpdate.log',
                        gotoUrl: 'https://www.ragalahari.com/newadmin/Functionsupdatereorder.aspx?fid=',
                        linkDatabase: 'movies_function',
                        coreDate: 'moviesFunctionUpdate',
                        limit: limit,
                        offset: limit*i,
                        array: i+1,
                    }
                    console.log(data)
                    core2(data)
                })}
        }

    }

}

gen('movies_function', 124047,124397,false,true)



