const core = require('../core_countList');

let total = 2965
let split= 5
let limit = Math.round(total/split)
Array(split).fill(0).map((v,i)=>{
    let data = {
        file: 'event.log',
        selector: 'select[name="ctl00$MainContent$drp_movie"]',
        gotoUrl: 'https://www.ragalahari.com/newadmin/LocalEventsInfo.aspx',
        editUrl: 'LocalEventsNewAddEdit.aspx?fid=',
        linkDatabase: 'local_events_events',
        logDatabase: 'url_log_local',
        find: 'events',
        limit: limit,
        offset: limit*i,
        array:i
    }
    console.log(data)
    core(data)
})

// function dd() {
//     let list=[];
//     let data ={ editUrl: 'LocalEventsNewAddEdit.aspx?fid=',linkDatabase:'local_events_events'}
//     const link =  document.querySelectorAll('a.btn-info[href]');
//     const dates =  document.querySelectorAll('td:nth-of-type(8)');
//
//     if (link.length !== 0 && dates.length != 0) {
//         Array(link.length).fill(0).map((v, i) => {
//             list[i] = link[i].getAttribute("href")
//             dates[i] = dates[i].innerText
//         });
//         list.map(async (v, i) => {
//             let function_id = v.toString().replace(data.editUrl, '');
//             // console.log(function_id);
//             // console.log(dates[i]);
//             console.log("UPDATE `"+data.linkDatabase+"` SET  `rdate`='" + dates[i] + "' WHERE  `rid`='" + function_id + "'")
//         });
//     }
// } dd()
