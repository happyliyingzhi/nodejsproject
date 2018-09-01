
const path=require('path');
const xtpl = require('xtpl');
const MongoClient = require('mongodb').MongoClient;
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'szheimaqd21';
// //导入tools
const databasetool=require(path.join(__dirname, "../tools/databasetool.js"));

 //模块化，抽离之后的版本
 exports.studentManager=(req,res)=>{
         const keywords=req.query.keywords ||'';
        //  console.log(req.session.loginName);
         databasetool.findList('studentInfo',{name:{$regex:keywords}},(err,docs)=>{
           
            xtpl.renderFile(path.join(__dirname, '../statics/views/list.html'), {
                    students: docs,
                    keywords,
                    loginName:req.session.loginName
            }, function (error, content) {
                    res.send(content);
            })

         })

 }
  
//登入增加的页面
exports.studentAdd=(req,res)=>{

        xtpl.renderFile(path.join(__dirname, '../statics/views/add.html'), {
                loginName:req.session.loginName
              
        }, function (error, content) {
                res.send(content);
        })

}

//登入页面新增的post
exports.studentpostadd=(req,res)=>{
        databasetool.insertdatabase('studentInfo',req.body,(err,doc)=>{
             if(doc==null){
                     res.send(`<script> alert("新增失败")</script>`);

             }else{
                res.send(`<script>  window.location.href="/studentmanager/list"</script>`);  
             }



        })
}



//编辑页面的登入
exports.studentgetadit = (req, res)=> {
       // console.log(req.params.studentId);
       // console.log(databasetool);
        databasetool.findone("studentInfo", { _id: databasetool.ObjectId(req.params.studentId)},(err, doc) => {
                        xtpl.renderFile(
                                path.join(__dirname, "../statics/views/edit.html"), {
                                        student: doc,
                                        loginName:req.session.loginName
                                },
                                function (error, content) {
                                        res.send(content);
                                }
                        );
                }
        );
};




//保存编辑的页面
exports.studentEdit = (req, res) => {
        // console.log(req.params.studentId)
        databasetool.updatebatebase(
          "studentInfo",
          { _id: databasetool.ObjectId(req.params.studentId) },
          req.body,
          (err, docs) => {
                console.log(docs)  
            if (docs == null) {
              // 修改失败
              res.send(`<script>alert("修改失败!");</script>`);
          
            } else {
              //修改成功
              res.send(
                `<script>window.location.href="/studentmanager/list"</script>`
              );
            }
          }
        );
      };

//删除
exports.studentDelete=(req,res)=>{
        databasetool.studentDele("studentInfo",{_id:databasetool.ObjectId(req.params.studentId)},(err, doc)=>{
                 if(doc==null){
                        res.send(`<script>alert("删除失败")</script>`)
                 }else{
                        res.send(`<script> location="/studentmanager/list"</script>`)  
                 }

        })
}










    
            














