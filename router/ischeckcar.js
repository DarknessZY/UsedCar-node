const express = require('express')
    //创建路由对象
const router = express.Router()
    // 导入路由处理函数模块
const ischeckcarHandler = require('../router_handler/ischeckcar')
    // 获得待审核的车的数据
router.get('/getcheckcar', ischeckcarHandler.getcheckcar)
    //改变审核状态
router.post('/checking', ischeckcarHandler.checking)
    //审核不通过原因
router.post('/checkreason', ischeckcarHandler.checkreason)
    //向外暴露路由
module.exports = router