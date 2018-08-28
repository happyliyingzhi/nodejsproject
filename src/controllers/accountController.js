const express=require('express');
const path=require('path');

//导入连接mongoDB的安装包
const MongoClient = require('mongodb').MongoClient;
//图片的验证码
const captchapng = require('captchapng');
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'szheimaqd21';
//处理具体的业务
//登入页面
const getLoginPage=(req,res)=>{
    res.sendFile(path.join(__dirname,'../statics/views/login.html'));
}

// //注册页面
const  registerPege=(req,res)=>{

    res.sendFile(path.join(__dirname,'../statics/views/register.html'));
}
//验证注册页面
    const registeryanzheng=(req,res)=>{
        //设置默认登入成功的json
        const result = { status: 0, message: "注册成功" };
        //连接数据库
        MongoClient.connect(url, { useNewUrlParser: true },function(err, client) {
          
            // console.log("Connected successfully to server");
            // 拿到了数据操作的db对象
          const db = client.db(dbName);
               // Get the documents collection
           const collection = db.collection('accountinfo');
           //先根据用户名查询
             collection.findOne({username:req.body.username},(err,docs)=>{
                 // console.log(req.body)
                 //{ username: '2222',
 // password: '77c0d7bec8d68c478c922e8072277ccc' }
                       
                if(docs){
                      //表示用户名存在，关闭数据库
                      client.close();
                      result.status=1;
                      result.message="用户名已经存在";
                      res.json(result);
                  }else{
                      //这里是用户名不存在，需要添加数据在数据库里面，同时返回注册成功
                      collection.insertOne(req.body,(err,results)=>{
                        //  console.log(results);
                         client.close();
                          if(results== null){
                               result.status=2;
                               result.message="注册失败"
                               res.json(result);
                          }
                          res.json(result);
                      })
                  }

             })
            
          });



           

    }


 //图片的验证
 

//导出去
     exports.accountlogin={
        getLoginPage,
       registerPege,
       registeryanzheng
}

