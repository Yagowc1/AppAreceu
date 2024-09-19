const db = require('../db')
const aluno = require('../models/aluno')
const administrador = require('../models/administrador')


async function getAdministrador() {
    const response = await administrador.find()
    return response
}

async function getAlunos() {
    const response = await aluno.find()
    return response
}

async function getAluno(matricula) {
    const response = await aluno.find({"matricula":`${matricula}`})
    return response[0]
}

async function inserirAluno(alunoParam) {
    const response = await aluno.create({"matricula":`${alunoParam.matricula}`, "nome":`${alunoParam.nome}`, "email":`${alunoParam.email}`, "senha":`${alunoParam.senha}`, "adm":'0'})
    return response[0]
}

async function atualizarAluno(alunoParam, matricula) {
    // const sql = 'UPDATE aluno SET nome = ?, email = ?, senha = ? WHERE matricula LIKE ?'
    // const valores = [aluno.nome, aluno.email, aluno.senha, matricula]
    const response = await aluno.updateOne({"matricula":`${matricula}`}, 
        {$set:{nome:`${alunoParam.nome}`, 
        email:`${alunoParam.email}`, 
        senha:`${alunoParam.senha}`}})

    return response[0]
}

async function deletarAluno(matricula) {
    // const sql = 'DELETE FROM aluno WHERE matricula LIKE ?'
    const response = await aluno.deleteOne({"matricula":`${matricula}`})
    return response[0]
}

async function fazerLoginAluno(usuario) {
    console.log(usuario.matricula)
    // const sql = 'SELECT * FROM aluno WHERE matricula LIKE ?'
    let response = await aluno.find({"matricula":`${usuario.matricula}`})
    
    if (response.length > 0) {
        response = response[0]

        let aluno = {
            matricula: response.matricula,
            nome: response.nome,
            email: response.email,
            senha: response.senha,
            adm: 0
        }

        console.log(usuario.senha, aluno)

        if (usuario.senha == aluno.senha) {
            return aluno
        } else {
            return null
        }
    }

    return null
}

async function fazerLoginAdm(usuario) {
    // const sql = 'SELECT * FROM administrador WHERE email LIKE ?'
    let response = await administrador.find({"email":`${usuario.email}`})

    if (response.length > 0) {
        response = response[0]

        let administrador = {
            email: response.email,
            senha: response.senha,
            adm: response.adm
        }

        if (usuario.senha == administrador.senha) {
            return administrador
        } else {
            return null
        }
    }

    return null
}

module.exports = { 
    getAdministrador, 
    getAlunos, 
    getAluno, 
    inserirAluno, 
    atualizarAluno, 
    deletarAluno,
    fazerLoginAluno,
    fazerLoginAdm
 }