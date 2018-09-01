const MongoClient = require('mongodb').MongoClient;
//id

exports.ObjectId = require("mongodb").ObjectId;;
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'szheimaqd21';
//studentmanager页面的


//封装函数
function connectDB(callback){
    MongoClient.connect(url,{
        useNewUrlParser: true
    },function (err,client) { 
        console.log('连接成功')   
             if(err){
                 callback(err,null);
                 return;
             }
       callback(err,client)

     })
}

//更新数据
const connectDBL = (collectionName, callback) => {
    MongoClient.connect(
      url,
      { useNewUrlParser: true },
      function(err, client) {
        // 拿到了数据操作的db对象
        const db = client.db(dbName);
  
        // 拿到集合
        const collection = db.collection(collectionName);
  
        // 把结果传递出去
        callback(err, client, collection);
      }
    );
  };







exports.findList = (collectionName, params, callback) => {
   // console.log('4444');
       connectDB(function (err,client) { 
        const db = client.db(dbName);
        //拿到集合
        const collection = db.collection(collectionName);
        //查找数据库。这里用的数组
        collection.find(params).toArray((err, docs) => {
            client.close();
            callback(err, docs);



        })
    })

}





//注册页面的登入,查询的页面
exports.findone=(collectionName,params,callback)=>{
    // connectDBL(collectionName, (err, client, collection) => {
    //     // 根据条件查询一个
    //     collection.findOne(params, (err, doc) => {
    //       client.close();
    //       // 执行 callback 把结果返回给控制器
    //       callback(err, doc);
    //     });
    //   });

    connectDB(function (err,client) { 
        const db = client.db(dbName);
        //拿到集合
        const collection = db.collection(collectionName);
        //查找数据库。这里用的数组
        collection.findOne(params,(err,doc)=>{
            client.close();
            callback(err, doc);
        });



        })
    }

//注册页面插入数据
exports.insertdatabase=(collectionName,params,callback)=>{
    connectDB(function (err,client) { 
            const db = client.db(dbName);
            //拿到集合
            const collection = db.collection(collectionName);
            //插入数据库。这里用的数组
            collection.insertOne(params, (err, doc) => {
                client.close();
                callback(err, doc);
            })



        })
    }



  exports.updatebatebase = (collectionName, condition, params, callback) => {
    connectDBL(collectionName, (err, client, collection) => {
      // 根据条件修改一个
      collection.updateOne(condition, { $set: params }, (err, result) => {
        client.close();
        // 执行 callback 把结果返回给控制器
        callback(err, result);
      });
    });
  };

// exports.updatebatebase=(collectionName,collection,params,callback)=>{
//     connectDB(function (err,client) { 
//         const db = client.db(dbName);
//         //拿到集合
//         const collection = db.collection(collectionName);
//         //插入数据库。这里用的数组
//         collection.updateOne(collection, {$set: params }, (err, docs) => {
//             client.close();
//             callback(err, docs);
//         })



//     })

// }
// exports.updatebatebase=(collectionName,collection,params,callback)=>{
//     MongoClient.connect(url,{ useNewUrlParser: true},function (err,client) { 
//        // 拿到了数据操作的db对象
//         const db = client.db(dbName);
//         // 拿到集合
//         const collection = db.collection(collectionName);
//         collection.updateOne(collection,{ $set: params },(err,docs)=>{
//             client.close();
//             callback(err, docs);
//         })

//      })
// }


//删除
exports.studentDele=(collectionName,params,callback)=>{
    connectDB(function (err,client) { 
            const db = client.db(dbName);
            //拿到集合
            const collection = db.collection(collectionName);
            //插入数据库。这里用的数组
            collection.deleteOne(params, (err, doc) => {
                client.close();
                callback(err, doc);
            })



        })
    }
