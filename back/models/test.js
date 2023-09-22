const mongoose = require('mongoose')

const testsSchema = new mongoose.Schema({
    user:String,
    server:String,
    datetime: String,
    resMessage:String
})



module.exports=testes=mongoose.model('testes',testsSchema)