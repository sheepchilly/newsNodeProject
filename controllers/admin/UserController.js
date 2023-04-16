const UserService = require("../../services/admin/UserService")
const JWT = require('../../utils/JWT');

const UserController = {
    login: async (req, res) => {
        var result = await UserService.login(req.body)
        if (result.length === 0) {
            res.send({
                code: '-1',
                error: '用户名密码不匹配'
            })
        } else {
            //生成token并且设置在header里
            const token = JWT.generate({
                _id: result[0]._id,
                username: result[0].username
            }, "1d") //1d是一天的意思

            //往前端传响应头
            res.header("Authorization", token)

            res.send({
                ActionType: "OK",
                data: {
                    username: result[0].username,
                    gender: result[0].gender ? result[0].gender : 0, //性别 0-保密，1-男，2-女
                    introduction: result[0].introduction, //个人简介
                    avatar: result[0].avatar, //头像
                    role: result[0].role //管理员1，编辑2
                }
            })
        }
    },

    upload:async(req,res)=>{
        const {username,introduction,gender} = req.body
        const token = req.headers["authorization"].split(" ")[1]
        const avatar = req.file?`/avataruploads/${req.file.filename}`:""
        var payload = JWT.verify(token)
        console.log(payload._id)

        //调用service模块更新数据
        await UserService.upload({_id:payload._id,username,introduction,gender:Number(gender),avatar})

        if(avatar){
            res.send({
                ActionType:"ok",
                data:{
                    username,introduction,
                    gender:Number(gender),
                    avatar
                }
            })
        }else{
            res.send({
                ActionType:"ok",
                data:{
                    username,introduction,
                    gender:Number(gender)
                }
            })
        }
    },

    add:async(req,res)=>{
        const {username,introduction,gender,password,role} = req.body
        const avatar = req.file?`/avataruploads/${req.file.filename}`:""

        await UserService.add({username,password,role:Number(role),introduction,gender:Number(gender),avatar})

        res.send({
            ActionType:"ok"
        })
    },

    getList:async(req,res)=>{
        const result = await UserService.getList(req.params)

        res.send({
            ActionType:"ok",
            data:{
                result
            }
        })
    },
    
    delList:async(req,res)=>{
        console.log(req.params.id)
        await UserService.delList(req.params.id)

        res.send({
            ActionType:"ok"
        })
    },

    updateList:async(req,res)=>{
        const {_id,username,password,introduction,role} = req.body
        await UserService.updateList({_id,username,password,introduction,role})

        res.send({
            ActionType:"ok"
        })
    }
}

module.exports = UserController