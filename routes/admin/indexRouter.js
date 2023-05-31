const express = require('express')
const IndexRouter = express.Router()
const IndexController = require('../../controllers/admin/IndexController')
//图片上传
const multer = require('multer')
const upload = multer({dest:'public/indexuploads/'})

IndexRouter.post('/adminapi/index/add',upload.single('file'),IndexController.add)
IndexRouter.get('/adminapi/index/getList',IndexController.getList)
IndexRouter.get('/adminapi/index/getList/:id',IndexController.getList)
IndexRouter.post('/adminapi/index/getList',upload.single('file'),IndexController.updateList)
IndexRouter.delete('/adminapi/index/delete/:id',IndexController.delete)
IndexRouter.post('/adminapi/index/ispublish',IndexController.ispublish)
IndexRouter.post('/adminapi/index/updateList',upload.single('file'),IndexController.updateList)


module.exports = IndexRouter