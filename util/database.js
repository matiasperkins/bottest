const mysql = require('mysql2');
const { db_data } = require('../consts');

const pool = mysql.createPool({
    host: db_data.host,
    user: db_data.user,
    database: db_data.database,
    password: db_data.password
});

module.exports = pool.promise();
