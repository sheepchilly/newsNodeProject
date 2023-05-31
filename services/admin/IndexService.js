const IndexModule = require('../../models/IndexModel')

const IndexService = {
    add:async({title,text,time,url,rolePerson,editTime,subtitle})=>{
        return await IndexModule.create({title,text,subtitle,time,url,rolePerson,editTime,isPublish:0})
    },
    getList:async({_id})=>{
        return _id? await IndexModule.find({_id}):await IndexModule.find()
    },
    delete:async({_id})=>{
        return await IndexModule.deleteOne({_id})
    },
    ispublish:async({_id,isPublish})=>{
        return await IndexModule.updateOne({_id},{
            isPublish
        })
    },
    updateList:async({
        _id,
        title,
        subtitle,
        text,
        time,
        url,
        rolePerson,
        editTime})=>{
        if(url){
            return await IndexModule.updateOne({_id},{
                title,
                text,
                subtitle,
                time,
                url,
                rolePerson,
                editTime
            })
        }else{
            return await IndexModule.updateOne({_id},{
                title,
                text,
                subtitle,
                time,
                rolePerson,
                editTime
            })
        }
    }
}

module.exports = IndexService