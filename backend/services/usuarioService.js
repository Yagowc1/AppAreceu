const db = require('../db')

async function getAdministrador() {
    const response = await db.query('SELECT * FROM administrador')
    return response[0]
}

module.exports = { getAdministrador }