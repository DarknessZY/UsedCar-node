const express = require('express')
const router = express.Router()
    // 导入路由处理函数模块
const ordersHandler = require('../router_handler/orders')
    //添加订单
router.post('/addorders', ordersHandler.addorders)
    //查询所有订单(根据订单编号查)
router.get('/getorders', ordersHandler.getorders)
    //根据订单状态查询订单
router.get('/getjiaoyiorders', ordersHandler.getjiayiorders)
    //根据时间段查询
router.get('/createtimeselect', ordersHandler.createtimeselect)
    //逾期订单
router.get('/lateorders', ordersHandler.lateorders)
module.exports = router