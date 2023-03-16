// 导入 express 模块
const express = require('express')
    // 创建 express 的服务器实例
const app = express()
    // 导入 中间件,解析表单格式
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))
    //设置跨域请求
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

//用户模块
const userRouter = require('./router/user')
    //车标模块
const logoimgRouter = require('./router/logoimg')
    //二手车模块
const carRouter = require('./router/car')
    //用户的发布模块
const user_issueRouter = require('./router/user_issue')
    //二手车审核模块
const ischeckcarRouter = require('./router/ischeckcar')
    //收藏二手车,卖出，卖得二手车模块
const mycarRouter = require('./router/mycar')
    //二手车地址(面交，自提)模块
const addressRouter = require('./router/address')
    //订单模块
const ordersRouter = require('./router/orders')
    // 注册用户路由模块
app.use('/yao', userRouter)
    // 注册车标路由模块
app.use('/yao', logoimgRouter)
    //注册二手车模块
app.use('/yao', carRouter)
    //注册用户的发布模块
app.use('/yao', user_issueRouter)
    //注册二手车审核模块
app.use('/yao', ischeckcarRouter)
    //注册收藏二手车,卖出，卖得二手车模块
app.use('/yao', mycarRouter)
    //注册二手车地址(面交，自提)模块
app.use('/yao', addressRouter)
    //注册二手车模块
app.use('/yao', ordersRouter)
    // 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(3007, function() {
    console.log('api server running at http://192.168.0.101:3007')
})