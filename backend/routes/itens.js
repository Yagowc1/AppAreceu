var express = require('express');
var router = express.Router();

const itemService = require('../services/itemService')

// Receber todos os itens
router.get('/itens', async function(req, res, next) {
  const item = await itemService.getItens()
  res.send(item);
});

// Receber um item especifico
router.get('/item/:id', async function(req, res, next) {
  const item = await itemService.getItem(req.params.id)
  res.send(item);
});

// Receber um item por categoria
router.get('/itens/:tipo/:categoria', async function(req, res, next) {
  // console.log(req.params.tipo, req.params.categoria)
  const item = await itemService.getItemCategoria(req.params.tipo, req.params.categoria);
  console.log(item)
  res.send(item);
});

// Enviar um item
router.post('/item', async function(req, res, next) {
  console.log(req.body)
  await itemService.inserirItem(req.body)

  res.sendStatus(200)
})

// Atualizar um item
router.put('/item/:id', async function(req, res) {
  const item = await itemService.atualizarItem(req.body, req.params.id)

  res.send(item)
}) 

// Deletar um item
router.delete('/item/:id', async function(req, res) {
  await itemService.deletarItem(req.params.id)

  res.send(200)
})

module.exports = router;