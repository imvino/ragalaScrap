const log = require('log-to-file');
module.exports.endTime = function (start, hrstart, file) {
    let end = new Date() - start,
        hrend = process.hrtime(hrstart)
    //console.info('Execution time: %dms', end)
    //  log('Execution time: ' + end + 'ms', file)
    console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)
    log('Execution time (hr): ' + hrend[0] + 's ' + hrend[1] / 1000000 + 'ms', file)

}
