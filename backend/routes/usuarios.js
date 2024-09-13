var express = require('express');
var router = express.Router();

const usuarioService = require('../services/usuarioService')

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/administrador', async function(req, res, next) {
  const usuario = await usuarioService.getAdministrador()
  res.send(usuario);
});

module.exports = router;
