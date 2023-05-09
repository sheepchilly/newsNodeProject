const express = require('express')
const UserRouter = express.Router()
const UserController = require('../../controllers/web/UserController');


UserRouter.post('/webapi/user/login',UserController.login)
UserRouter.post('/webapi/user/register',UserController.register)

module.exports = UserRouter
