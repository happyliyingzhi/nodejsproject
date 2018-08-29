
//导入安装包
const express=require('express');
 const path=require('path');
 const app=express();
 const bodyParser = require('body-parser');
 var session = require('express-session');
  //发送post设置的头
 app.use(bodyParser.urlencoded({ extended: false })) ;
 // Use the session middleware
app.use(session({
     secret: 'keyboard cat',
     resave: false, //添加 resave 选项   
      saveUninitialized: true, //添加 saveUninitialized 选项
     cookie: { maxAge: 600000 }}))
//集成路由
     const accountRouter=require(path.join(__dirname,'routers/accountRouter.js'));
     app.use('/account',accountRouter)
     const studentmanager=require(path.join(__dirname,'/routers/accountRouter.js'));
     app.use('/studentmanager',studentmanager);
 





//开启web服务
 app.listen(3000,err=>{
       if(err){
           console.log(err);
       }
       console.log("{status:ok}")
 })