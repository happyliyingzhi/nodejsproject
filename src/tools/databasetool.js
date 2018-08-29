const MongoClient = require('mongodb').MongoClient;
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
    // MongoClient.connect(url, {
    //     useNewUrlParser: true
    // }, function (err, client) {
    //     const db = client.db(dbName);
    //     //拿到集合
    //     const collection = db.collection(collectionName);
    //     //查找数据库。这里用的数组
    //     collection.find(params).toArray((err, docs) => {
    //         client.close();
    //         callback(err, docs);


    //     })

    // });




//注册页面的登入,查询的页面
exports.findone=(collectionName,params,callback)=>{

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


