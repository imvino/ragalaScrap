const con = require('./db')
module.exports.sql = async (condition) => {
    const result = await con.promise().query(condition)
        .then(([rows, fields]) => {
            return rows;
        })
        .catch(console.log)
    // .then( () => con.end());
    return result
};

