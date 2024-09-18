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

// Receber o email vinculado ao item
async function getItemEmail(id) {
    const sql = `SELECT aluno.email FROM item JOIN aluno ON item.matricula = aluno.matricula WHERE item.id = ${id}`;
    const response = await db.query(sql)
    return response[0]
}

// Receber um item por categoria
async function getItemCategoria(tipo, categoria) {
    const sql = 'SELECT * FROM Item WHERE categoria = ? AND status_obj = ?';
    const response = await db.query(sql, [categoria, tipo]);
    return response[0];
}


async function inserirItem(Item) {
    const sql = 'INSERT INTO Item (matricula, nome, descricao, categoria, status_obj, imagem) VALUES (?, ?, ?, ?, ?, ?)';
    const valores = [Item.matricula, Item.nome, Item.descricao, Item.categoria, Item.status_obj, Item.imagem];

    // Realiza a inserção no banco de dados
    const response = await db.query(sql, valores);

    // Retorna o objeto da resposta contendo o insertId
    return { insertId: response[0].insertId };
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
    getItemCategoria,
    getItemEmail,
    inserirItem,
    atualizarItem,
    deletarItem
}