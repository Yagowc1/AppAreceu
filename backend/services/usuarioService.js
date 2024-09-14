const db = require('../db')

async function getAdministrador() {
    const response = await db.query('SELECT * FROM administrador')
    return response[0]
}

async function getAluno() {
    const response = await db.query('SELECT * FROM aluno')
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

module.exports = { getAdministrador, getAluno, inserirAluno, atualizarAluno, deletarAluno }