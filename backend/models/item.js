const mongoose = require('mongoose')
const { collection } = require('./usuario')

const ItemSchema = new mongoose.Schema({
    id:String,
    nome:String,
    descricao:String,
    categoria:String,
    matricula:String,
    data:String,
    status_obj:String,
    imagem:String
}, {collection:'item'})

const item = mongoose.model('item', ItemSchema)
module.exports = item