const UserService = require('../../services/web/UserService')

const UserController = {
    login:async (req,res)=>{
        var result = await UserService.login(req.body)

        if(result.length === 0){
            res.send({
                code:'-1',
                error:'用户名和密码不匹配'
            })
            }else{
                res.send({
                    code:'20000',
                    data:result
                })
        }
    },
    //注册应该先查询用户名在数据库中是否已经存在
    register:async(req,res)=>{
        let {username} = req.body
        console.log(username)
        let confirm = await UserService.confirmUsername(username)
        console.log(confirm,'confirm')

        if(confirm.length === 0){
            let result = await UserService.register(req.body)
            if(result.length === 0){
                res.send({
                    code:'-1',
                    error:'网络错误，请稍后重试...'
                })
            }else{
                res.send({
                    code:'20000'
                })
            }
        }else{
            res.send({
                code:'-2',
                data:'用户已存在'
            })
        }


    }
}

module.exports  = UserController