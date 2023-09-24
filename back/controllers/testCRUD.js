const axios = require('axios')
const Tests = require('../models/test')
var date_ob = new Date()




const createTest = async (req, res) => {
    try {
        const { SERVER_URL, user } = req.body
        const response = await axios.get(SERVER_URL);
        axios.get(SERVER_URL).then(response => {  console.log(response.statusText) })
        if (response.status === 200) {
            const goodTest = await Tests.create({
                'server': SERVER_URL,
                'user': user,
                'datetime': response.headers.date,
                'resMessage': response.status + ':' + ' ' + response.statusText
            })
            res.status(200).json({ message: 'Server is available.', goodTest })
        } else { console.log(response.statusText) }
    } catch {
        const { SERVER_URL, user } = req.body
        const badTest = await Tests.create({
            'server': SERVER_URL,
            'user': user,
            'datetime': date_ob.toString(),
            'resMessage': '404: Not Found'
        })
        res.status(500).json({ message: 'Server Not found 404', badTest })
    }
}
const readTests = async (req, res) => {
    try {
        const allTest = await Tests.find()
        res.status(200).json({ message: 'All operation done are following', allTest })
    } catch {
        res.status(500).json({ message: 'Somthing went wrong' })
    }
}
const deleteTest = async (req, res) => {
    try {
        const { _id } = req.body
        const theTest = await Tests.findOneAndDelete({ '_id': _id })
        res.status(200).json({ message: 'Test deleted successfully', theTest })
    } catch {
        res.status(500).json({ message: 'Somthing went wrong before delete Operation' })
    }
}



module.exports = { createTest, readTests, deleteTest }