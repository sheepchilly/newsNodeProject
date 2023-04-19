const NewsService = require('../../services/web/NewsService.js')

const NewsController = {
    getList:async (req,res)=>{
        console.log(req.body.id)
        const result = await NewsService.getList({_id:req.params.id})

        res.send({
            ActionType:"ok",
            data:result
        })
    },

    getTopList:async (req,res)=>{
        const data = await NewsService.getTopList({limit:req.query.limit})

        res.send({
            ActionType:"ok",
            data
        })
    }
}

module.exports = NewsController