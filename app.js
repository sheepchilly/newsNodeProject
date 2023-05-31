var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const UserRouter = require('./routes/admin/UserRouter');
const UserProductRouter = require('./routes/web/UserRouter');
const NewsRouter = require('./routes/admin/NewsRouter');
const webNewsRouter = require('./routes/web/NewsRouter');
const ProductRouter = require('./routes/admin/ProductRouter');
const webProductRouter = require('./routes/web/ProductRouter');
const IndexRouter = require('./routes/admin/indexRouter')
const IndexProductRouter = require('./routes/web/indexRouter')

const JWT = require('./utils/JWT');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//这里是web的路由，因为不用带token发请求，所以不放在if语句后面
app.use(webNewsRouter)
app.use(webProductRouter)
app.use(UserProductRouter)
app.use(IndexProductRouter)


/*
  adminApi/* - 后台系统用的
  webApi/* - 企业官网用的
*/ 
app.use((req,res,next)=>{
  //1.如果授权通过，就next放行
  //2.如果token过期了，返回401错误

  if(req.url==='/adminapi/user/login'){
    next();
    return;
  }

  const token = req.headers["authorization"].split(" ")[1]  //split()以空格分割字符串，取下标为1的字符，0是持票人Bearer，1才是token
  if(token){
    var playload=JWT.verify(token)
    if(playload){
      //重新生成token,因为访问过一次之后，就应该重新计时
      const newToken = JWT.generate({
        _id:playload._id,
        username:playload.username
      },"1d") //1d就是一天的意思
      res.header('Authorization',newToken)
      next()
    }else{
      res.status(401).send({errCode:"-1",errorInfo:"token过期"})
    }
  }else{
    console.log('token不存在');
  }
})

app.use(UserRouter)
app.use(NewsRouter)
app.use(ProductRouter)
app.use(IndexRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
