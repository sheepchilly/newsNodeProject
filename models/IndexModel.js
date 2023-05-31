const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IndexType = {
    url:String,
    time:String,
    title:String,
    subtitle:String,
    text:String,
    isPublish:Number,
    editTime:Date,
    rolePerson:String
}

const IndexModule = mongoose.model('indexproduct',new Schema(IndexType))
module.exports = IndexModule