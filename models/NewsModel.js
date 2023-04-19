const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsType = {
    title:String,
    content:String,
    category:Number, 
    cover:String, 
    isPublish:Number,
    role:Number,
    editTime:Date, //编辑的时间
}

const NewsModel = mongoose.model('news',new Schema(NewsType))

module.exports = NewsModel