const express = require('express')
    //创建路由对象
const router = express.Router()
    // 导入用户路由处理函数模块
const userHandler = require('../router_handler/user')
    //根据openid判断用户是否注册了
router.post('/isreguser', userHandler.isregUser)
    // 注册新用户
router.post('/reguser', userHandler.regUser)
    //换取token
router.post('/gettoken', userHandler.gettoken)
    //查找用户
router.get('/userinfo', userHandler.userinfo)
    //绑定手机号
router.post('/bindphone', userHandler.bindphone)
    //管理员登录
router.get('/adminlogin', userHandler.adminlogin)
    //得到所有用户信息
router.get('/getalluser', userHandler.getalluser)
    //配置前后端的推送消息(客服功能)
    // router.get('/checkPushMsg', userHandler.checkPushMsg)
    //向外暴露路由
module.exports = router