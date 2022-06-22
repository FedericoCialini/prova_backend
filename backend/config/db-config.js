const mysql = require('mysql2/promise');
require("dotenv").config();

const configurationDb ={
    host : process.env.NODE_ENV==="test" ? process.env.DB_HOST_TEST : process.env.DB_HOST,
    port : process.env.NODE_ENV==="test" ? process.env.DB_PORT_TEST :process.env.DB_PORT
}

const pool = mysql.createPool({
    host : configurationDb.host,
    user : process.env.DB_USER || 'root',
    port : configurationDb.port,
    database : process.env.DB_NAME || 'test',
    waitForConnections : true,
    connectionLimit : 10,
    queueLimit : 0,
    password : process.env.DB_PASS || 'root'
});


module.exports = pool;