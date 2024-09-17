const mongoose = require('mongoose')

const logsSchema = new mongoose.Schema({
        item: Number,
        tipo_chamado: String,
        responsavel: String,
        datetime: { type: Date, default: Date.now }
}, { collection: 'logs' });

const Logs = mongoose.model('logs', logsSchema)

module.exports = Logs;