const express = require('express')
    //创建路由对象
const router = express.Router()
    // 导入路由处理函数模块
const carHandler = require('../router_handler/car')
    // 添加二手车的信息
router.post('/addcar', carHandler.addcar)
    //查这一车系的所有车
router.get('/showbrandnamecar', carHandler.showbrandnamecar)
    //车的详情
router.get('/cardetail', carHandler.cardetail)
    //随机查6条车数据
router.get('/randcarinfo', carHandler.randcarinfo)
    //搜索(根据车标题模糊查询)
router.post('/searchinfo', carHandler.searchinfo)
    //图片上传腾讯云
router.post('/upload', carHandler.upload)
    //筛选
router.get('/filterinfo', carHandler.filterinfo)

//向外暴露路由
module.exports = router