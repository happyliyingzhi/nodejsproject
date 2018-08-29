
const path=require('path');
const xtpl = require('xtpl');
const MongoClient = require('mongodb').MongoClient;
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'szheimaqd21';
//出路登入studentmanger页面
exports.studentManager=(req,res)=>{

        MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
                const db = client.db(dbName);
               //拿到集合
            const collection = db.collection('studentInfo');
             //查找数据库。这里用的数组
            collection.find({}).toArray(function (err,docs) { 
                client.close();
                //这里的模板渲染
                xtpl.renderFile(path.join(__dirname,'../statics/views/list.html'),{
                        students:docs
                },function(error,content){
                   res.send(content);
                })


             })
           
              });


   
 
}













