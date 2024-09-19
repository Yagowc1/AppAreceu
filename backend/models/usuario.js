const mongoose = require('mongoose')

const UsuarioSchema = new mongoose.Schema({
    email:String,
    senha:Number,
    adm:Boolean
})

const usuario = mongoose.model('usuario', UsuarioSchema)
module.exports = usuario