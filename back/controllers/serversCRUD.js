const { now } = require('mongoose')
const Server = require('../models/UriUrl')
var date_ob = new Date()


const CeateServer = async (req, res) => {
    try {
        const { uriurl, addedBy, sendTo } = req.body
        
        const findServer = await Server.findOne({ "uriurl": uriurl })
        console.log(sendTo)
        if (!findServer) {
            const newServer = await Server.create({
                "uriurl": uriurl,
                'addedBy': addedBy,
                'datetime': date_ob,
                'sendTo': sendTo
            })
            const all = await Server.find()
            res.status(201).json({ msg: "Server created succussfully", newServer, all })
        } else { res.status(500).json({ msg: "newServer already exist" }) }

    } catch {
        res.status(500).json({ message: "Unable to create newServer" })
    }
}

const ReadServer = async (req, res) => {
    try {
        const all = await Server.find()
        res.status(201).json({ message: 'Server Lists following', all })
    } catch {
        res.status(500).json({ message: "somthing went wrong" })
    }
}

const DeleteServer = async (req, res) => {
    try {
        const { uriurl } = req.body
        const serverDeleted = await Server.findOneAndDelete({ 'uriurl': uriurl })
        res.status(201).json({ messsage: 'Server deleted successfuly', serverDeleted })
    } catch {
        res.status(500).json({ message: 'something went wrong' })
    }
}

const UpdateServer = async (req, res) => {
    try {
        const { uriurl, addedBy, sendTo, _id } = req.body
        const useredit = await Server.findOneAndUpdate({ '_id': _id },
            {
                'uriurl': uriurl, 'addedBy': addedBy, 'sendTo': sendTo,'datetime':date_ob
            })
        res.status(201).json({ message: 'update done successffly', useredit })
    } catch {
        res.status(500).json({ message: 'somthing went wrong' })
    }
}

module.exports = { CeateServer, ReadServer, UpdateServer, DeleteServer }
