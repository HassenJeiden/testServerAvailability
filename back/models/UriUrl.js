const mongoose =require('mongoose')


const adressSchema= new mongoose.Schema({
    uriurl:String,
    addedBy:String,
    datetime:Date,
    verified:Boolean
})

module.exports=adress=mongoose.model('adress',adressSchema)