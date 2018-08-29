
const path=require('path');
const xtpl = require('xtpl');
const MongoClient = require('mongodb').MongoClient;
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'szheimaqd21';
// //导入tools
const databasetool=require(path.join(__dirname,"../tools/databasetool.js"))
//console.log(databasetool.findList)


 //模块化，抽离之后的版本
 exports.studentManager=(req,res)=>{
         const keywords=req.query.keywords ||'';
         databasetool.findList('studentInfo',{name:{$regex:keywords}},(err,docs)=>{
           
            xtpl.renderFile(path.join(__dirname, '../statics/views/list.html'), {
                    students: docs,
                    keywords
            }, function (error, content) {
                    res.send(content);
            })

         })

 }
  







//出路登入studentmanger页面,原始版，
// exports.studentManager=(req,res)=>{
     
//          const keywords=req.query.keywords? req.query.keywords:'';
//          MongoClient.connect(url, {
//                 useNewUrlParser: true
//             }, function (err, client) {
//                 const db = client.db(dbName);
//                 //拿到集合
//                 const collection = db.collection('studentInfo');
//                 //查找数据库。这里用的数组
//                 collection.find({name:{$regex:keywords}}).toArray((err, docs) => {
//                         xtpl.renderFile(path.join(__dirname, '../statics/views/list.html'), {
//                                 students: docs,
//                                 keywords
//                         }, function (error, content) {
//                                 res.send(content);
//                         })

//                 })
        
//                 })
        
//             }

    
            














