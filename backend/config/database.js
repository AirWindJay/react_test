const mysql = require('mysql');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 10,
});

const getConnection = (callback) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection:', err);
            return callback(err);
        }
        callback(null, connection);
    });
};

module.exports = { getConnection };
