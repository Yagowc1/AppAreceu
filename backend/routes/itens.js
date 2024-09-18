var express = require('express');
var router = express.Router();

const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  }
})

const upload = multer({ storage });

const Logs = require('../models/Logs')


const itemService = require('../services/itemService')

// Receber todos os itens
router.get('/itens', async function (req, res, next) {
  const item = await itemService.getItens()
  res.send(item);
});

// Receber um item especifico
router.get('/item/:id', async function (req, res, next) {
  const item = await itemService.getItem(req.params.id)
  res.send(item);
});

// Receber um item por categoria
router.get('/itens/:tipo/:categoria', async function (req, res, next) {
  // console.log(req.params.tipo, req.params.categoria)
  const item = await itemService.getItemCategoria(req.params.tipo, req.params.categoria);
  console.log(item)
  res.send(item);
});

// Receber o email vinculado ao item
router.get('/item/email/:id', async function (req, res, next) {
  const item = await itemService.getItemEmail(req.params.id)
  console.log(item)
  res.send(item);
});

// Inserir novo item
router.post('/item', async function (req, res, next) {
  try {
    console.log(req.body);

    // Insere o item e captura o ID gerado
    const resultado = await itemService.inserirItem(req.body);

    // Retorna o ID gerado
    res.status(200).json({ id: resultado.insertId });
  } catch (error) {
    next(error); // Tratamento de erro
  }
});

// Atualizar um item
router.put('/item/:id', async function (req, res) {
  const item = await itemService.atualizarItem(req.body, req.params.id)

  res.send(item)
})

// Deletar um item
router.delete('/item/:id', async function (req, res) {
  await itemService.deletarItem(req.params.id)

  res.send(200)
})


router.post('/upload', upload.single("img"), function(req, res) {
  res.send(req.file.filename)

// Pegar os logs
router.get('/logs', async (req, res, next) => {
  try {
    const logsData = await Logs.find()
    res.status(200).json(logsData)
  } catch (error) {
    res.status(500).json({ error: error })
  }
});

// Inserir novo log
router.post('/logs/novo', async (req, res) => {
  // Pega os dados do corpo da requisição
  let logsNovo = {
    item: req.body.item,
    tipo_chamado: req.body.tipo_chamado,
    responsavel: req.body.responsavel,
    datetime: req.body.datetime || Date.now()
  }

  try {
    await Logs.create(logsNovo)
    res.status(201).send("Log cadastrado com sucesso")
  } catch (error) {
    res.status(500).json({ error: error })
  }

})

module.exports = router;