const express = require('express')
    //创建路由对象
const router = express.Router()
    // 导入我的二手车发布模块
const issueHandler = require('../router_handler/user_issue')
    // 获得发布的车的数据
router.get('/getmyissue', issueHandler.getmyissue)
    //下架发布
router.post('/delmyissue', issueHandler.delmyissue)
    //修改发布
router.post('/updatemyissue', issueHandler.updatemyissue)
    //向外暴露路由
module.exports = router