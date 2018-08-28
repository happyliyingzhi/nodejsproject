
//导入安装包
const express=require('express');
 const path=require('path');
 const app=express();
 const bodyParser = require('body-parser')
  //发送post设置的头
 app.use(bodyParser.urlencoded({ extended: false })) 
//集成路由
     const accountRouter=require(path.join(__dirname,'routers/accountRouter.js'));
     app.use('/account',accountRouter)
    
 


//开启web服务
 app.listen(3000,err=>{
       if(err){
           console.log(err);
       }
       console.log("{status:ok}")
 })