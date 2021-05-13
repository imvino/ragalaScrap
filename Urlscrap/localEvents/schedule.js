const core2 = require('../core_countWebUrl');

let links = [];
let total = 2136
let split = 2
let offset =2100
let limit = Math.ceil(parseInt(total-offset) / split)

console.log('offset on -> ' + offset)
console.log('limit on -> ' + limit)


let data = {
    file: 'interview.log',
    targetUrl: 'https://www.ragalahari.com/newadmin/LocalEventContentAddEdit.aspx?cntid=',
    linkDatabase: 'local_events_schedule',
}


Array(total).fill(data.targetUrl).map(async (goto, i) => {
    if (offset > i) return
        links.push(`${goto}${i + 1}`);
});

for (let x = 0; x < split; x++) {
    console.log('count' + parseInt(x + 1))
    let gUrl = links.splice(0, limit)
    if (gUrl.length === 0) {
        console.log('breaking in ' + parseInt(x + 1))
        break;
    }
    data['gUrls'] = gUrl
    data['array'] = x + 1
    console.log(data)
    core2(data)
}

