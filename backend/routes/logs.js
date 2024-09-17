var express = require('express')
var router = express.Router()
const Log = require('../models/log')

router.get('/', async function(req, res){
    try {
        const logs_cadastrados = await Log.find()
        res.status(200).json({logs:logs_cadastrados})

    } catch (error) {
        res.status(500).json({error:error})
    }
})

router.post('/post-log', async function (req, res) {
    let {item, tipo_chamado, responsavel} = req.body
    
    date = new Date()
    datetime = `${date.getDate()}-${(date.getMonth()+1)}-${date.getFullYear()} às ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

    let new_log = {
        item, tipo_chamado, responsavel, datetime
    }

    try {
        await Log.create(new_log)
        res.send('Novo log inserido')
    } catch (error) {
        res.status(500).json({error:error})
    }
})

module.exports = router

/**
 *      + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds()
 */