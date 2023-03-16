const express = require('express')
    //创建路由对象
const router = express.Router()
    // 导入路由处理函数模块
const mycarHandler = require('../router_handler/mycar')
    // 加入收藏
router.post('/mycollocet', mycarHandler.mycollocet)
    // 判断是否被收藏
router.post('/iscollocet', mycarHandler.iscollocet)
    // 取消收藏
router.post('/quitcollocet', mycarHandler.quitcollocet)
    //根据myopenid查收藏的
router.get('/selectcollocet', mycarHandler.selectcollocet)
    //用户查看自己的购买的车
router.get('/getbuycar', mycarHandler.getbuycar)
    //用户查看自己的卖的车
router.get('/getsellcar', mycarHandler.getsellcar)
    //更改订单状态
router.post('/updateorders', mycarHandler.updateorders)
    //管理员给用户的消息提示
router.post('/gomessage', mycarHandler.gomessage)
    //判断该用户有没有被管理员提示信息
router.get('/getmessage', mycarHandler.getmessage)
    //这个消息不再提示
router.post('/delmessage', mycarHandler.delmessage)
    //向外暴露路由
module.exports = router