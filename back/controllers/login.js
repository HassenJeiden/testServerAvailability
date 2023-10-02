const TheUser = require('../models/users')
const dotenv = require('dotenv').config()
const CryptoJS = require("crypto-js")
const env = require('dotenv').config()
const date_ob = new Date



const isReg = async (req, res) => {
    try {
        const { username, password } = req.body
        var verefie = await TheUser.findOne({ "username": username })
        if (verefie) {
            const checkPW = CryptoJS.AES.decrypt(verefie.password, process.env.PASS_SEC).toString(CryptoJS.enc.Utf8)
            console.log(checkPW)
            if (checkPW === password) {
                const isConnected = parseInt(date_ob.getHours())
                const logged = await TheUser.findOneAndUpdate({ "username": username },
                    {
                        'isConnected': isConnected + 2
                    })
                res.status(200).json({ message: 'legged successfully' })
            } else {
                res.status(404).json({ message: 'not fund' })
            }
        }

    } catch {
        res.status(401).json({ message: 'something went wrong' })
    }
}
const isLogged = async (req, res, next) => {
    try {
        const { _id } = req.body
        console.log(_id)
        const thelog = await TheUser.findOne({ '_id': _id })
        console.log(thelog.isConnected)
        if (parseInt(thelog.isConnected) > parseInt(date_ob.getHours().toString())) {
            console.log(date_ob.getHours().toString())
        } else {
            res.send('session expired login again')
        }
        next()
    } catch {
        res.status(500).json({ message: 'somthing went wrong' })
    }
}




module.exports = { isReg, isLogged }