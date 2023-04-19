const NewsModule = require('../../models/NewsModel')

const NewsService = {
    add:async({title,content,category,cover,isPublish,editTime})=>{
        return await NewsModule.create({title,content,category,cover,isPublish,editTime})
    },

    updateList:async({title,content,category,cover,isPublish,editTime,_id})=>{
        if(cover){
            return await NewsModule.findByIdAndUpdate(_id,{title,content,category,cover,isPublish,editTime})
        }else{
            return await NewsModule.findByIdAndUpdate(_id,{title,content,category,isPublish,editTime})
        }
    },

    getList:async({_id})=>{
        return _id? await NewsModule.find({_id}) : await NewsModule.find()
    },

    publish:async({_id,isPublish,editTime})=>{
        return await NewsModule.findByIdAndUpdate(_id,{
            isPublish,
            editTime
        })
    },

    delete:async({_id})=>{
        return await NewsModule.deleteOne({_id})
    }
}

module.exports = NewsService