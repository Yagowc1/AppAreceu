const mongoose = require('mongoose')

const LogSchema = new mongoose.Schema({
    'item':String,
    'tipo_chamado':String,
    'responsavel':String,
    'datetime':String
}, {collection:'logs'})

const Log = mongoose.model('log', LogSchema)
module.exports = Log