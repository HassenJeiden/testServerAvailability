const mongoose =require('mongoose')


const adressSchema= new mongoose.Schema({
    uriurl:String,
    addedBy:String,
    datetime:Date,
    sendTo:[]
})

module.exports=adress=mongoose.model('adress',adressSchema)