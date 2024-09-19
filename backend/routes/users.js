var express = require('express');
var router = express.Router();

const usuarioService = require('../services/usuarioService')

// Retorna todos os adms
router.get('/adm', async function(req, res, next) {
  const adm = await usuarioService.getAdministrador()
  res.send(adm);
});

// Retorna todos os alunos
router.get('/aluno', async function(req, res, next) {
  console.log('opa')
  const aluno = await usuarioService.getAlunos()
  res.send(aluno);
});

router.get('/aluno/:matricula', async function(req, res, next) {
  const aluno = await usuarioService.getAluno(req.params.matricula)
  res.send(aluno);
});

router.post('/aluno', async function(req, res, next) {
  console.log(req.body)
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

router.post('/aluno/login', async function(req, res) {
  console.log(req.body)
  const aluno = await usuarioService.fazerLoginAluno(req.body)

  if (aluno) {
    res.send(aluno)
  } else {
    res.send(false)
  }
}) 

router.post('/adm/login', async function(req, res) {
  console.log(req.body)
  const adm = await usuarioService.fazerLoginAdm(req.body)

  if (adm) {
    res.send(adm)
  } else {
    res.send(false)
  }
}) 

module.exports = router;
