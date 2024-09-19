const db = require('../db')
const item = require('../models/item')

// Receber todos os itens
async function getItens() {
    // const response = await db.query('SELECT * FROM Item')
    const response = await item.find()
    return response[0]
}

// Receber um item especifico
async function getItem(id) {
    // const sql = 'SELECT * FROM Item WHERE id LIKE ?'
    const response = await item.find({"id":`${id}`})
    return response[0]
}

// Receber o email vinculado ao item
async function getItemEmail(id) {
    // const sql = `SELECT aluno.email FROM item JOIN aluno ON item.matricula = aluno.matricula WHERE item.id = ${id}`;
    const itemAluno = await item.aggregate([{
        $lookup:{
            from:"aluno", 
            localField:"matricula",
            foreignField:"matricula",
            as:"email_aluno"
        }
    },
        {$unwind:"$email_aluno"},
    {
        $project:{
            id:1,
            nome:1,
            descricao:1,
            categoria:1,
            matricula:1,
            data:1,
            status:1,
            imagem:1,
            email_aluno:"$email_aluno.email"
        }
    }
    ])
    const response = await item.find({"id":`${id}`})
    return response[0]
}

// Receber um item por categoria
async function getItemCategoria(tipo, categoria) {
    if (tipo == 'todos') {
        // const sql = `SELECT * FROM Item WHERE categoria = ?`;
        const response = await item.find({"categoria":`${categoria}`})
        
        return response[0];        
    }

    // const sql = 'SELECT * FROM Item WHERE categoria = ? AND status_obj = ?';
    const response = await item.find({"categoria":`${categoria}`, "status_obj":`${tipo}`})
    return response[0];
}


async function inserirItem(Item) {
    // const sql = 'INSERT INTO Item (matricula, nome, descricao, categoria, status_obj, imagem) VALUES (?, ?, ?, ?, ?, ?)';
    // const valores = [Item.matricula, Item.nome, Item.descricao, Item.categoria, Item.status_obj, Item.imagem];

    // Realiza a inserção no banco de dados
    const response = await item.insertOne({"matricula":`${Item.matricula}`, "nome":`${Item.nome}`, "descricao":`${Item.descricao}`, "categoria":`${Item.categoria}`, "status_obj":`${Item.status_obj}`, "imagem":`${Item.imagem}`})

    // Retorna o objeto da resposta contendo o insertId
    return { insertId: response[0].insertId };
}


async function atualizarItem(Item, id) {
    // const sql = 'UPDATE Item SET nome = ?, descricao = ?, categoria = ?, status_obj = ?, imagem = ?, matricula = ? WHERE id LIKE ?'
    // const valores = [Item.nome, Item.descricao, Item.categoria, Item.status_obj, Item.imagem, Item.matricula, id]
    const response = await item.updateOne({"id":`${id}`}, {$set:{"nome":`${Item.nome}`}, $set:{"descricao":`${Item.descricao}`}, $set:{"categoria":`${Item.categoria}`}, $set:{"matricula":`${Item.matricula}`}, $set:{"status_obj":`${Item.status_obj}`}, $set:{"imagem":`${Item.imagem}`}})
    return response[0]
}

async function deletarItem(id) {
    // const sql = 'DELETE FROM Item WHERE id LIKE ?'
    const response = await item.deleteOne({"id":`${id}`})
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