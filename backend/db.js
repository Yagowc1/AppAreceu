const mongoose = require('mongoose')
const URL_MONGO = 'mongodb+srv://cleitins-troop:opt-jorge@banco-mongo.vpd5u.mongodb.net/banco-mongo'

mongoose.connect(URL_MONGO, {}).then(() =>{
    console.log('Conexão realizada!')
}).catch((error)=>{
    console.log('Houve um erro: ', error)
})