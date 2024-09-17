const mongoose = require('mongoose')

const urlBanco = 'mongodb+srv://cleitins-troop:appareceu-backend-jorge@appareceu.jbzir.mongodb.net/banco_logs'

var dbMongo = mongoose.connect(urlBanco)
.then(() => {
    console.log("Conexão com o MongoDB realizada")
})
.catch((error) => {
    console.log("Erro ao se conectar mermão: ", error)
})