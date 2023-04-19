const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductType = {
    title:String,
    introduction:String,
    detail:String, 
    cover:String, 
    editPerson:String,
    editTime:Date, //编辑的时间
}

const ProductModule = mongoose.model('product',new Schema(ProductType))
module.exports =  ProductModule