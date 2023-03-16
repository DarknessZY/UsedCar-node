//车标加载
const express = require('express')
    //创建路由对象
const router = express.Router()
    // 导入路由处理函数模块
const logoimgHandler = require('../router_handler/logoimg')
    // 获得车标数据
router.get('/getlogoimg', logoimgHandler.getlogoimg)
    //向外暴露路由
module.exports = router