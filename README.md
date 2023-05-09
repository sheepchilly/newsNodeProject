# 1.login接口

服务器返回500错误的解决办法 => 在拦截器的失败回调中打印 error.response 的错误信息

## 1.创建数据模型

1.安装mongoose，然后引入mongoose和Schema

```js
const mongoose = requrie('mongoose');
const Schema = mongoose.Schema;
```

2.什么是Schema？

> 每个schema都映射到MongoDB集合，并定义该集合中文档的结构。

## 2.编写接口

1.在routes文件夹下的admin里面新建UserRouter.js，定义接口/adminapi/user/login，回调函数定义在controllers文件夹下，用module exports导出，login()回调中的方法定义在Services文件夹下

2.整体流程：在UserRouter.js中匹配到了接口，首先到UserController.js中进行处理，然后再UserService.js中接收到传过来的req.body，就可以对用户名和密码进行处理了。

```js
//UserRouter.js
UserRouter.post('/adminapi/user/login',UserController.login)

//UserController.js
const UserController = {
    login:async(req,res)=>{
        await UserService.login(req.body)
    }
}

//UserService.js
const UserService = {
    login:async({username,password})=>{
        return UserModel .find({
            username,
            password
        })
    }
}

//app.js
const UserRouter = require('./routes/admin/UserRouter')
app.use(UserRouter)
```

3.在config里的db.config.js配置数据库连接

4.在bin的www（整个文件的入口中引入）引入数据库  =>require("../config/db.config")

5.users数据库中需要一个管理员账号来分配用户，直接在robot3T中新建用户admin

## 3.生成JWT

1.下载JWT =>  npm i  jsonwebtoken ，新建utils文件夹，引入JWT，封装生成token的generate()和验证token的verify()函数

2.在UserController.js中生成token并给前端传递响应头

```js
//生成token并且设置在header里
const token = JWT.generate({
    _id:result[0]._id,
    username:result[0].username
},"10s")

//往前端传响应头
res.header("Authorization",token)
```

3.验证前端传回来的token（放在app.js中）

- 逻辑：再次访问新的接口，如果不是login接口，就先取出token，有token的情况下，校验token，生成新token给前端返回新token（因为访问过一次之后，就应该重新计时）。否则给前端返回401

## 4.返回用户信息

在前端登陆成功之后把用户信息返回给前端，前端存在vuex中

# 2.upload接口

**描述：**该接口用于接收用户上传的资料修改

1.express无法处理form格式的数据，所以要依赖工具 [multer] 当作中间件

```js
 npm install --save multer
 
 //在UserRouter中使用
 //图片上传
const multer = require('multer');
const upload = multer({dest:'public/avataruploads/'}) //文件存在public/avataruploads文件夹下
UserRouter.post('/adminapi/user/upload',upload.single('file'),UserController.upload)
```

2.在UserController中，只要一收到上传的数据，就先把{username，introduction，gender}解构出来，然后再把头像信息拼接好，接着调用UserService.upload把数据传递过去通知它更新数据

3.在UserService中，使用mongoDB的updateOne方法，根据_id来更新满足条件的数据

# 3.role接口

## 1.新增用户

1.前端传来post请求，调用UserRouter中的接口 /aminapi/user/add

2.在UserController中向UserService.js中提交数据通知修改数据库，然后res.send给用户发送成功的响应

3.在UserService中使用mongoDB的create方法往数据库中新增数据

## 2.查询用户

1.在UserRouter中新增get接口，然后朝UserController中调用方法，然后在UserService中调用模型去取数据

2.password这个字段没有必要返回，可以在UserService的参数中不传password，也就是find的第二个参数数组中就是你想要查询的数据

```js
    getList:async ()=>{ 
        return UserModel.find({},['username','role','avatar','introduction','gender'])
    }
```

# 4.用户列表的增删改查

1.UserRouter.delete('/adminapi/user/list/:id',UserController.delList)，删除注意接口是list！/:id是params占位符

2.在controller中用 req.params.id 接收到路径当中的id值，然后把id传给UserService删除id匹配的模型数据

# 5.新闻部分的接口

1.创建新闻数据模型 -> NewsModule.js

2.创建新闻路由 -> NewsRouter.js

3.路由调用方法进行增删改查 -> NewsController.js

4.方法把数据提交给Service对数据库进行增删改查 ->NewsService.js

5.然后在app.js中进行接口注册 -> app.use(NewsRouter)
