const User = require('../models/users')
const dotenv = require('dotenv').config()
const CryptoJS = require("crypto-js")


const CeateUser = async (req, res) => {
  try {
    const { username, password, usertype } = req.body
    const finduser = await User.findOne({ "username": username })
    if (!finduser) {
      const newUser = await User.create({
        'username': username,
        'password': CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString(), 'usertype': usertype
      })
      const all = await User.find()
      res.status(201).json({ msg: "User created succussfully", newUser, all })
    } else { res.status(500).json({ msg: "User already exist" }) }

  } catch {
    res.status(500).json({ message: "Unable to create Profile" })
  }
}

const ReadUsers = async (req, res) => {
  try {
    const allusers = await User.find()
    res.status(201).json({ message: 'Users Lists following', allusers })
  } catch {
    res.status(500).json({ message: "somthing went wrong", error: error.message })
  }
}

const DeleteUser = async (req, res) => {
  try {
    const { username } = req.body
    const userdelet = await User.findOneAndDelete({ 'username': username })
    res.status(201).json({ messsage: 'user deleted successfuly', userdelet })
  } catch {
    res.status(500).json({ message: 'something went wrong' })
  }
}

const UpdateUser = async (req, res) => {
  try {
    const { username, password, _id, usertype } = req.body
    const useredit = await User.findOneAndUpdate({ '_id': _id },
      {
        'username': username, 'password': CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString(),
        'usertype': usertype
      })
    res.status(201).json({ message: 'update done successffly', useredit })
  } catch {
    res.status(500).json({ message: 'somthing went wrong' })
  }
}

module.exports = { CeateUser, ReadUsers, DeleteUser, UpdateUser }