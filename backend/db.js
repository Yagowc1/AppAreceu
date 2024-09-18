const mysql = require('mysql2/promise')
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'ifrn.cn',
    database: 'appareceu'
})

module.exports = db