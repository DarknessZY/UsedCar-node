const express = require('express')
    //创建路由对象
const router = express.Router()
    // 导入路由处理函数模块
const addressHandler = require('../router_handler/address')
    // 添加二手车自提或面价地址
router.post('/addresscar', addressHandler.addresscar)
    //根据用户openid查询用户二手车面交地址
router.get('/getaddresscar', addressHandler.getaddresscar)
    //设置默认地址和使用这个地址
router.post('/addressdefault', addressHandler.addressdefault)
    //删除地址
router.post('/deladdress', addressHandler.deladdress)
    //得到用户的默认地址
router.get('/getaddressdefault', addressHandler.getaddressdefault)
    //根据addresscarid查询地址
router.get('/getaddressdetail', addressHandler.getaddressdetail)
    //向外暴露路由
module.exports = router