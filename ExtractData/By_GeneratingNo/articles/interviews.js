const core2 = require('../core_countAdminUrl');

let links = [];
let total = 1665
let split = 1
let offset =1610
let limit = Math.ceil(parseInt(total-offset) / split)

console.log('offset on -> ' + offset)
console.log('limit on -> ' + limit)


let data = {
    file: 'interview.log',
    targetUrl: 'https://www.ragalahari.com/newadmin/InterviewsAddEdit.aspx?intrvid=',
    //targetUrl: 'https://www.ragalahari.com/interviews/',
    linkDatabase: 'articles_interviews',
}


Array(total).fill(data.targetUrl).map(async (goto, i) => {
    if (offset > i) return
        links.push(`${goto}${i + 1}`);
       // links.push(`${goto}${i + 1}/link.aspx`);
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

