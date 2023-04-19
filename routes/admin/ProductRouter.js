const express = require('express')
const ProductRouter = express();
const ProductController = require('../../controllers/admin/ProductController')
//图片上传
const multer = require('multer');
const upload = multer({dest:'public/productuploads/'})

ProductRouter.post('/adminapi/product/add',upload.single("file"),ProductController.add);
ProductRouter.get('/adminapi/product/list',ProductController.getList);
ProductRouter.post('/adminapi/product/list',upload.single('file'),ProductController.updateList);
ProductRouter.get('/adminapi/product/list/:id',ProductController.getList);
ProductRouter.delete('/adminapi/product/delete/:id',ProductController.delList);

module.exports = ProductRouter
