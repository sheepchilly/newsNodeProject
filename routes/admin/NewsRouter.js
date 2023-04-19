const express = require('express');
const NewsRouter = express();
const NewsController = require('../../controllers/admin/NewsController')
//图片上传
const multer = require('multer');
const upload = multer({dest:'public/newsuploads/'})

//upload中间件->拿到前端传来的file信息存在public文件夹下
NewsRouter.post('/adminapi/news/add',upload.single('file'),NewsController.add)
NewsRouter.get('/adminapi/news/list',NewsController.getList)
NewsRouter.post('/adminapi/news/list',upload.single('file'),NewsController.updateList)
NewsRouter.get('/adminapi/news/list/:id',NewsController.getList)
NewsRouter.put(`/adminapi/news/publish`,NewsController.publish)
NewsRouter.delete(`/adminapi/news/delete/:id`,NewsController.delete)

module.exports = NewsRouter