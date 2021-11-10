module.exports.formatDateTime =  function (d) {
    if(!d) return ''
    return new Date(d).toISOString().split('T')[0] +' '+ new Date(d).toTimeString().split(' ')[0];
}

module.exports.formatDate =  function (date) {
    if(!date) return ''
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
}
