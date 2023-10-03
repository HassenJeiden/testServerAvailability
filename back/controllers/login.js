const TheUser = require('../models/users')
const dotenv = require('dotenv').config()
const CryptoJS = require("crypto-js")
const env = require('dotenv').config()
const date_ob = new Date
const H = date_ob.getHours().toString()
const D = date_ob.getUTCDate().toString()
const isConnected = D + H



const loging = async (req, res) => {
    try {
        const { username, password } = req.body
        var verefie = await TheUser.findOne({ "username": username })
        if (verefie) {
            const checkPW = CryptoJS.AES.decrypt(verefie.password, process.env.PASS_SEC).toString(CryptoJS.enc.Utf8)
            if (checkPW === password) {
                const lg = parseInt(isConnected)
                const lgg =lg +2
                const logged = await TheUser.findOneAndUpdate({ "username": username },
                    {
                        'isConnected': lgg.toString()
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
const isLoged = async (req, res, next) => {
    try {
        const { _id } = req.body
        const thelog = await TheUser.findOne({ '_id': _id })
        if (parseInt(thelog.isConnected) > parseInt(isConnected)) {
            next()
        } else {
            res.redirect('http://localhost:5000/api/home')
            console.log('redirect to login')
        }

    } catch {
        res.status(500).json({ message: 'somthing went wrong' })
    }
}
const logout = async (req, res) => {
    try {
        const { _id } = req.body
        const userOut = await TheUser.findOneAndUpdate({ '_id': _id }, { 'isConnected': '00' })
        res.status(200).json({ message: 'logged out', userOut })
    } catch {
        res.status(500).json({ message: 'somthing went wrong' })
    }
}
const Home = async (req, res) => {
    res.send('go to login page')
}


module.exports = { loging, isLoged, logout, Home }