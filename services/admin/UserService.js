const UserModel = require("../../models/UserModel")


const UserService = {
    login:async({username,password})=>{
        return UserModel .find({
            username,
            password
        })
    },
    
    upload:async ({_id,username,introduction,gender,avatar})=>{
        //如果传了头像就更新头像，如果没传（不修改）就不更新
        if(avatar){
            return UserModel.updateOne({
                _id
            },{
                username,introduction,gender,avatar
            })
        }else{
            return UserModel.updateOne({
                _id
            },{
                username,introduction,gender
            })
        }
        
    },

    add:async ({username,password,role,introduction,gender,avatar})=>{
        return UserModel.create({
            username,password,role,introduction,gender,avatar
        })
    },

    getList:async ({id})=>{ 
        return id?UserModel.find({_id:id},['username','role','password','introduction']):UserModel.find({},['username','role','avatar','introduction','gender','password'])
    },

    delList:async(_id)=>{
        return UserModel.deleteOne({_id})
    },
    
    updateList:async({_id,username,password,introduction,role})=>{
        return UserModel.findByIdAndUpdate({_id},{
            username,password,introduction,role
        })
    },

}

module.exports = UserService