const mongoose = require('mongoose')
const URL = 'mongodb+srv://cleitins-troop:appareceu-backend-jorge@appareceu.jbzir.mongodb.net/banco_logs'

mongoose.connect(URL, {}).then(() =>{
    console.log('Conexão feita ao banco de dados MongoDB realizada com sucesso!')
}).catch((error) =>{
    console.log('Houve um erro ao realizar a conexão: ' , error)
})
