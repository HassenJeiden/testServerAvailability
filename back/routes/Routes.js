var routes = require('express').Router()
var { testServerAvailability } = require('../controllers/avalabilityFunction')
var { CeateUser, ReadUsers, DeleteUser, UpdateUser } = require('../controllers/UsersCRUD')
var { CeateServer, ReadServer, UpdateServer, DeleteServer } = require('../controllers/serversCRUD')
var { createTest,readTests,deleteTest } = require('../controllers/testCRUD')
const { Home,loging, isLoged,logout } = require('../controllers/login')

//user routes
routes.get('/IsAvailabal',isLoged, testServerAvailability)
routes.post('/adduser',isLoged, CeateUser)
routes.get('/allusers',isLoged, ReadUsers)
routes.post('/edituser',isLoged, UpdateUser)
//server routes
routes.post('/deleteuser',isLoged, DeleteUser)
routes.post('/addserver',isLoged, CeateServer)
routes.get('/allservers',isLoged, ReadServer)
routes.post('/editserver',isLoged, UpdateServer)
routes.post('/deleteserver',isLoged, DeleteServer)
//tests routes
routes.post('/testing',isLoged,createTest)
routes.get('/consultingTests',isLoged, readTests)
routes.post('/deletetest',isLoged, deleteTest)
//loggin
routes.post('/login',loging)
routes.post('/logout',logout)
routes.get('/home',Home)




module.exports = routes