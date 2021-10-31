const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'test',
    database: 'bot-test',
    password: '1234'
});

module.exports = pool.promise();