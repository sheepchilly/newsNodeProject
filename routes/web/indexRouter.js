const express = require('express')
const IndexRouter = express.Router()
const IndexController = require('../../controllers/web/IndexController')

IndexRouter.get('/webapi/index/getList',IndexController.getList)


module.exports = IndexRouter