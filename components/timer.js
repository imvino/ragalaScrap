const log = require('log-to-file');
module.exports.endTime = function (start, hrstart, file,array=null) {
    if(array){
        array='B'+array+'=> ';
    }
    let end = new Date() - start,
        hrend = process.hrtime(hrstart)
    //console.info('Execution time: %dms', end)
    //  log('Execution time: ' + end + 'ms', file)
    console.info(array+'Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)
    log(array+'Execution time (hr): ' + hrend[0] + 's ' + hrend[1] / 1000000 + 'ms', file)

}
