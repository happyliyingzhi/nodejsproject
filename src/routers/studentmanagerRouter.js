const express=require('express');
const studentManagerRouter = express.Router();
const path=require('path');


//导入自定义的安装包
const studentManagerCTR=require(path.join(__dirname,"../controllers/studentmanagerControll.js"))
  //console.log(studentManagerCTR)
 // console.log('111')
//继承路由
studentManagerRouter.get('/list',studentManagerCTR.studentManager);

//新增页面
studentManagerRouter.get('/add',studentManagerCTR.studentAdd);
//新增页面post
studentManagerRouter.post('/add',studentManagerCTR.studentpostadd);
//编辑页面
studentManagerRouter.get('/edit/:studentId',studentManagerCTR.studentgetadit);

//保存编辑的页面
studentManagerRouter.post('/edit/:studentId',studentManagerCTR.studentEdit);
//删除页面
studentManagerRouter.get('/delete/:studentId',studentManagerCTR.studentDelete);
 console.log(studentManagerCTR.studentgetadit)
//console.log('-------')
//导出去
module.exports=studentManagerRouter;

