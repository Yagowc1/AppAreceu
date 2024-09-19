const mongoose = require('mongoose')

const AlunoSchema = new mongoose.Schema({
    nome:String,
    matricula:String,
    email:String,
    senha:String,
    adm:Boolean
}, {collection:'aluno'})

const aluno = mongoose.model('aluno', AlunoSchema)
module.exports = aluno