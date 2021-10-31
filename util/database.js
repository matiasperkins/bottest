const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'test',
    database: 'bottest',
    password: '1234'
});

module.exports = pool.promise();
