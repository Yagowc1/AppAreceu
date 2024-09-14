var express = require('express');
var router = express.Router();

const usuarioService = require('../services/usuarioService')

router.get('/administrador', async function(req, res, next) {
  const adm = await usuarioService.getAdministrador()
  res.send(adm);
});

router.get('/aluno', async function(req, res, next) {
  const aluno = await usuarioService.getAluno()
  res.send(aluno);
});

router.post('/aluno', async function(req, res, next) {
  await usuarioService.inserirAluno(req.body)

  res.sendStatus(200)
})

router.put('/aluno/:matricula', async function(req, res) {
  const aluno = await usuarioService.atualizarAluno(req.body, req.params.matricula)

  res.send(aluno)
}) 

router.delete('/aluno/:matricula', async function(req, res) {
  await usuarioService.deletarAluno(req.params.matricula)

  res.send(200)
})

module.exports = router;
