const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { Int32 } = require('mongodb')

const usersSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true
        },
        password: String,
        usertype: String,
        isConnected:String
    }
)




module.exports = users = mongoose.model('users', usersSchema)