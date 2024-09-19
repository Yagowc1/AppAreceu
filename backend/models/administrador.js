const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
    id:String,
    email:String,
    senha:Number,
    adm:Boolean
}, {collection:'administrador'})

const administrador = mongoose.model('administrador', AdminSchema)
module.exports = administrador