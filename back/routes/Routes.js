var routes = require('express').Router()
var { testServerAvailability } = require('../controllers/avalabilityFunction')
var { CeateUser, ReadUsers, DeleteUser, UpdateUser } = require('../controllers/UsersCRUD')
var { CeateServer, ReadServer, UpdateServer, DeleteServer } = require('../controllers/serversCRUD')
var { createTest,readTests,deleteTest } = require('../controllers/testCRUD')
//var { sendEmail } = require('../controllers/sendEMail')
//user routes
routes.get('/IsAvailabal', testServerAvailability)
routes.post('/adduser', CeateUser)
routes.get('/allusers', ReadUsers)
routes.post('/edituser', UpdateUser)
//server routes
routes.post('/deleteuser', DeleteUser)
routes.post('/addserver', CeateServer)
routes.get('/allservers', ReadServer)
routes.post('/editserver', UpdateServer)
routes.post('/deleteserver', DeleteServer)
//tests routes
routes.post('/testing', createTest)
routes.get('/consultingTests', readTests)
routes.post('/deletetest', deleteTest)
//routes.post('/sendemail', sendEmail)





module.exports = routes