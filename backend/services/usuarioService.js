const db = require('../db')

async function getAdministrador() {
    const sql = 'SELECT * FROM administrador'
    const response = await db.query(sql)
    return response[0]
}

async function getAlunos() {
    const response = await db.query('SELECT * FROM aluno')
    return response[0]
}

async function getAluno(matricula) {
    const sql = 'SELECT * FROM aluno WHERE matricula LIKE ?'
    const response = await db.query(sql, matricula)
    return response[0]
}

async function inserirAluno(aluno) {
    const sql = 'INSERT INTO aluno (matricula, nome, email, senha) VALUES (?, ?, ?, ?)'
    const valores = [aluno.matricula, aluno.nome, aluno.email, aluno.senha]
    const response = await db.query(sql, valores)
    return response[0]
}

async function atualizarAluno(aluno, matricula) {
    const sql = 'UPDATE aluno SET nome = ?, email = ?, senha = ? WHERE matricula LIKE ?'
    const valores = [aluno.nome, aluno.email, aluno.senha, matricula]
    const response = await db.query(sql, valores)
    return response[0]
}

async function deletarAluno(matricula) {
    const sql = 'DELETE FROM aluno WHERE matricula LIKE ?'
    const response = await db.query(sql, matricula)
    return response[0]
}

async function fazerLoginAluno(usuario) {
    console.log(usuario.matricula)
    const sql = 'SELECT * FROM aluno WHERE matricula LIKE ?'
    let response = await db.query(sql, usuario.matricula)
    response = response[0]
    
    if (response.length > 0) {
        response = response[0]

        let aluno = {
            matricula: response.matricula,
            nome: response.nome,
            email: response.email,
            senha: response.senha,
            adm: response.adm
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
    const sql = 'SELECT * FROM administrador WHERE email LIKE ?'
    let response = await db.query(sql, usuario.email)
    response = response[0]

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