const mysql = require('mysql2');
const { db } = require('../consts');

const pool = mysql.createPool({
    host: db.host,
    user: db.user,
    database: db.database,
    password: db.password
});

module.exports = pool.promise();
