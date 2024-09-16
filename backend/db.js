const mysql = require('mysql2/promise')
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '@dmin123',
    database: 'appareceu'
})

module.exports = db