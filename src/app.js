
//导入安装包
const express=require('express');
 const path=require('path');
 const app=express();
 const bodyParser = require('body-parser');
 const session = require('express-session');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())

 // Use the session middleware
app.use(session({
     secret: 'keyboard cat',
     resave: false, //添加 resave 选项   
      saveUninitialized: true, //添加 saveUninitialized 选项
     cookie: { maxAge: 600000 }}))
     //express 请求拦截,all表示所有的get和post
app.all('/*', function(req, res, next){
        if(req.url.includes('account')){
            next();
            return;
        }else{
          if(req.session.loginName){
                console.log(req.session.loginName)
            next();
          }else{
                res.send(`<script>alert("您还没登录"); location="/account/login"</script>`)
          }
        }






})
//集成路由

     const accountRouter=require(path.join(__dirname,'routers/accountRouter.js'));
     app.use('/account',accountRouter)
     const studentmanager=require(path.join(__dirname,'/routers/studentmanagerRouter.js'));
           //  console.log(studentmanager)
     app.use('/studentmanager',studentmanager);
 






//开启web服务
 app.listen(3000,err=>{
       if(err){
           console.log(err);
       }
       console.log("{status:ok}")
 })