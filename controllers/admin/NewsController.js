const NewsService = require('../../services/admin/NewsService')

const NewsController = {
    add:async(req,res)=>{
        const cover = req.file?`/newsuploads/${req.file.filename}`:""
        const {title,content,category,isPublish} = req.body

        await NewsService.add({
            title,
            content,
            category:Number(category),
            cover,
            isPublish:Number(isPublish),
            editTime:new Date()
        })

        res.send({
            ActionType:'ok'
        })
    },

    updateList:async(req,res)=>{
        const cover = req.file?`/newsuploads/${req.file.filename}`:""
        const {title,content,category,isPublish,_id} = req.body

        await NewsService.updateList({
            _id,
            title,
            content,
            category:Number(category),
            cover,
            isPublish:Number(isPublish),
            editTime:new Date()
        })

        res.send({
            ActionType:'ok'
        })
    },

    getList:async(req,res)=>{
        const data = await NewsService.getList({_id:req.params.id})

        res.send({
            ActionType:"ok",
            data
        })
    },

    publish:async(req,res)=>{
        const {_id,isPublish,editTime} = req.body
        await NewsService.publish({
            _id,
            isPublish,
            editTime:new Date()
        })

        res.send({
            ActionType:"ok"
        })
    },

    delete:async(req,res)=>{
        await NewsService.delete({_id:req.params.id})

        res.send({
            ActionType:"ok"
        })
    }
}

module.exports = NewsController