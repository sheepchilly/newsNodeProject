const NewsModule = require("../../models/NewsModel")

const NewsService = {
        getList:async ({_id})=>{
            return _id? await NewsModule.find({_id,isPublish:1}):await NewsModule.find({isPublish:1}).sort({editTime:-1})
        },

        getTopList:async({limit})=>{
            return NewsModule.find({isPublish:1}).sort({editTime:-1}).limit(limit)
        }

}

module.exports = NewsService