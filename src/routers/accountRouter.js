
//导入安装包
const express=require('express');
const router = express.Router();
const path=require('path');



//使用router处理具体的请求
  //导入登入页面
     const accountCTRL=require(path.join(__dirname,"../controllers/accountController.js"));
   //  console.log(accountCTRL.accountlogin.getLoginPage);
   router.get('/login',accountCTRL.accountlogin.getLoginPage);
  //注册页面
  router.get('/register',accountCTRL.accountlogin.registerPege);
 //验证注册页面
  router.post('/register',accountCTRL.accountlogin.registeryanzheng);
//图片验证
router.get('/vcode',accountCTRL.accountlogin.vcodeimage);
 //最终处理数据
    router.post('/login',accountCTRL.accountlogin.login)

//导出router
     module.exports=router;