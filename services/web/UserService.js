const UserModel = require('../../models/UserModel')

const UserService = {
    login:async({username,password})=>{
        return UserModel.find({
            username,
            password
        })
    },

    confirmUsername:async(username)=>{
        console.log('service',username)
        return UserModel.find({username})
    },

    register:async({username,password})=>{
        return UserModel.create({
            username,
            password,
            role:3
        })
    }
}

module.exports = UserService