const express=require('express');
const studentManagerRouter = express.Router();
const path=require('path');


//导入自定义的安装包
const studentManagerCTR=require(path.join(__dirname,"../controllers/studentmanagerControll.js"))
  console.log(studentManagerCTR)
//继承路由
studentManagerRouter.get('/list',studentManagerCTR.studentManager);
//导出去
module.exports=studentManagerRouter;


