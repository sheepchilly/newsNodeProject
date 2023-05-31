const IndexService = require('../../services/admin/IndexService')

const IndexController ={
    add:async(req,res)=>{
        const url = req.file?`/indexuploads/${req.file.filename}`:""
        const {title,subtitle,text,time,rolePerson} = req.body
        let result = await IndexService.add({
            title,
            subtitle,
            text,
            time,
            url,
            rolePerson,
            editTime:new Date()
        })
        res.send({
            ActionType:"OK"
        })
    },
    updateList:async(req,res)=>{
        console.log(req.body)
        const url = req.file?`/indexuploads/${req.file.filename}`:""
        const {_id,title,text,time,rolePerson,subtitle} = req.body
        let result = await IndexService.updateList({
            _id,
            title,
            subtitle,
            text,
            time,
            url,
            rolePerson,
            editTime:new Date()
        })
        res.send({
            ActionType:"OK"
        })
    },
    getList:async(req,res)=>{
        let result = await IndexService.getList({_id:req.params.id})
        console.log(result)
        res.send({
            ActionType:"OK",
            data:result
        })
    },
    
    delete:async(req,res)=>{
        await IndexService.delete({_id:req.params.id})
        res.send({
            ActionType:"OK"
        })
    },
    ispublish:async(req,res)=>{
        const {_id,isPublish} = req.body
        let result = await IndexService.ispublish({_id,isPublish})
        res.send({
            ActionType:"OK"
        })
    }
}

module.exports = IndexController