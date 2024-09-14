var express = require('express')
var router = express.Router()
const Log = require('../models/log')

// router.get('/', async function(req, res){
//     res.render('logs', {title:'Logs'})
// })

router.post('/post-log', async function (req, res) {
    let {item, tipo_chamado, responsavel} = req.body
    
    let new_log = {
        item, tipo_chamado, responsavel
    }

    try {
        await Log.create(new_log)
        res.send('Novo log inserido')
    } catch (error) {
        res.status(500).json({error:error})
    }
})

module.exports = router