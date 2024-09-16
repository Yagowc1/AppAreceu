const db = require('../db')

// Receber todos os itens
async function getItens() {
    const response = await db.query('SELECT * FROM Item')
    return response[0]
}

// Receber um item especifico
async function getItem(id) {
    const sql = 'SELECT * FROM Item WHERE id LIKE ?'
    const response = await db.query(sql, id)
    return response[0]
}

async function inserirItem(Item) {
    const sql = 'INSERT INTO Item (matricula, nome, descricao, categoria, status_obj, imagem) VALUES (?, ?, ?, ?, ?, ?)'
    const valores = [Item.matricula, Item.nome, Item.descricao, Item.categoria, Item.status_obj, Item.imagem]
    const response = await db.query(sql, valores)
    return response[0]
}

async function atualizarItem(Item, id) {
    const sql = 'UPDATE Item SET nome = ?, descricao = ?, categoria = ?, status_obj = ?, imagem = ?, matricula = ? WHERE id LIKE ?'
    const valores = [Item.nome, Item.descricao, Item.categoria, Item.status_obj, Item.imagem, Item.matricula, id]
    const response = await db.query(sql, valores)
    return response[0]
}

async function deletarItem(id) {
    const sql = 'DELETE FROM Item WHERE id LIKE ?'
    const response = await db.query(sql, id)
    return response[0]
}

module.exports = {
    getItens,
    getItem,
    inserirItem,
    atualizarItem,
    deletarItem
}