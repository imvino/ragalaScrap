const core = require('../coreDataScrap');

let data  = {
    file: 'filmpersonal.log',
    gotoUrl: 'https://www.ragalahari.com/newadmin/FilmPersonalAddEdit.aspx?fpid=',
    linkDatabase: 'starzone_filmpersonal',
    limit: 5,
    offset: 0,
    array: 1,
}
console.log(data)
core(data)
