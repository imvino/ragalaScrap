const core2 = require('../core_countAdminUrl');

let links = [];
let total = 40000
let split = 5
let offset =30000
let limit = Math.ceil(parseInt(total-offset) / split)

console.log('offset on -> ' + offset)
console.log('limit on -> ' + limit)


let data = {
    file: 'local_events_location.log',
    targetUrl: 'https://www.ragalahari.com/newadmin/LocalLocationsAddEdit.aspx?fid=',
    linkDatabase: 'local_events_location',
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
    data['gUrls'] = gUrl.sort().reverse()
    data['array'] = x + 1
    console.log(data)
    core2(data)
}

