const express=require('express');
const path=require('path');

//导入连接mongoDB的安装包
const MongoClient = require('mongodb').MongoClient;
//图片的验证码
const captchapng = require('captchapng');
// // Connection URL
// const url = 'mongodb://localhost:27017';
// // Database Name
// const dbName = 'szheimaqd21';
//处理具体的业务
//导入注册页面的数据库
  const findones=require(path.join(__dirname,"../tools/databasetool.js"))
 
//登入页面
const getLoginPage=(req,res)=>{
    res.sendFile(path.join(__dirname,'../statics/views/login.html'));
}

// //注册页面
const  registerPege=(req,res)=>{

    res.sendFile(path.join(__dirname,'../statics/views/register.html'));
}

//验证注册页面
    const registeryanzheng = (req, res) => {
            //设置默认登入成功的json
            const result = {
                status: 0,
                message: "注册成功"
            };
            //连接数据库
            findones.findone('accountinfo', {
                username: req.body.username
            }, (err, doc) => {
                if (doc) {
                    result.status = 1;
                    result.message = "用户名已经存在";
                    res.json(result);
                } else {
                    findones.insertdatabase('accountinfo', req.body, (err, doc) => {
                        if (doc == null) {
                            result.status = 2;
                            result.message = "注册失败";
                            res.json(result);
                        }
                        res.json(result);
                    })
                }
            })



//         MongoClient.connect(url, { useNewUrlParser: true },function(err, client) {
          
//             // console.log("Connected successfully to server");
//             // 拿到了数据操作的db对象
//           const db = client.db(dbName);
//                // Get the documents collection
//            const collection = db.collection('accountinfo');
//            //先根据用户名查询
//              collection.findOne({username:req.body.username},(err,docs)=>{
//                  // console.log(req.body)
//                  //{ username: '2222',
//  // password: '77c0d7bec8d68c478c922e8072277ccc' }
                       
//                 if(docs){
//                       //表示用户名存在，关闭数据库
//                       client.close();
//                       result.status=1;
//                       result.message="用户名已经存在";
//                       res.json(result);
//                   }else{
//                       //这里是用户名不存在，需要添加数据在数据库里面，同时返回注册成功
//                       collection.insertOne(req.body,(err,results)=>{
//                         //  console.log(results);
//                          client.close();
//                           if(results== null){
//                                result.status=2;
//                                result.message="注册失败"
//                                res.json(result);
//                           }
//                           res.json(result);
//                       })
//                   }

//              })
            
//           });



           

    }


 //图片的验证
     const vcodeimage=(req,res)=>{
        const vcode = parseInt(Math.random() * 9000 + 1000);
        
       // 把刚刚随机生成的验证码，存储到session中
        req.session.vcode = vcode;
        var p = new captchapng(80,30,vcode); // width,height,numeric captcha
        p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
        p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
 
        var img = p.getBase64();
        var imgbase64 = new Buffer(img,'base64');
        res.writeHead(200, {
            'Content-Type': 'image/png'
        });
        res.end(imgbase64);


     }
   //登入页面的验证
   const login=(req,res)=>{
    
    const result = { status: 0, message: "登录成功" };
    if(req.body.vcode!= req.session.vcode){
           result.status=1;
           result.message="验证码不对";
           res.json(result);
           return;
    }

     // 去数据库中，使用username & password 去校验
     findones.findone('accountinfo', { username: req.body.username, password: req.body.password },(err,doc)=>{
        console.log(doc)
         if(doc==null){
             result.status=2;
             result.message="用户名或者密码错误";
             res.json(result);
         }else{
            req.session.loginName= req.body.username;
             
         }
         res.json(result);

     })
              


//      MongoClient.connect(
//     url,
//     { useNewUrlParser: true },
//     function(err, client) {
//       // 获取db对象
//       const db = client.db(dbName);

//       // 拿着要操作的集合
//       const collection = db.collection("accountinfo");

//       collection.findOne(
//         { username: req.body.username, password: req.body.password },
//         (err, doc) => {
//           // 关闭掉数据库连接
//           client.close();
//           if (doc == null) {
//             result.status = 2;
//             result.message = "用户名或密码错误";
//           }

//           res.json(result);
//         }
//       );
//     }
//   );

   }

//导出去
     exports.accountlogin={
        getLoginPage,
       registerPege,
       registeryanzheng,
       vcodeimage,
       login
}

