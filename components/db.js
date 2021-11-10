const mysql = require('mysql2');
// create the connection to database
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'vino',
//     password: '@1528Eashanidhi',
//     database: 'ragalacms',
//     port: 43306,
//     charset : 'utf8mb4'
// });
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ragalacms',
});

module.exports = connection;
