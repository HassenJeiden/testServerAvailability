const TheUser = require('../models/users')
const dotenv = require('dotenv').config()
const CryptoJS = require("crypto-js")
const env = require('dotenv').config()
const date_ob = new Date



const isLogged = async (req, res) => {
    try {
        const { username, password } = req.body
        var verefie = await TheUser.findOne({ "username": username })
        //console.log(verefie)
        if (verefie) {
            console.log(password)
            const checkPW = CryptoJS.AES.decrypt(verefie.password, process.env.PASS_SEC).toString(CryptoJS.enc.Utf8)
            console.log(checkPW)
            if (checkPW === password) {
                const isConnected = parseInt(date_ob.getHours())
                console.log(isConnected)
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




module.exports = { isLogged }