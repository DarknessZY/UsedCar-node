// 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用

//导入数据库操作模块
const { request } = require('express')
const db = require('../db/index')
    //导入微信解密加密包
const WXBizDataCrypt = require('../WXBizDataCrypt')
    //导入request
const requesturl = require('request')
const req = require('express/lib/request')
    //根据得到的openid判断用户是否已经注册
exports.isregUser = (req, res) => {
        // console.log(req.body)
        const sql = 'SELECT COUNT(*) AS usernum  FROM USER WHERE openid=?'
        db.query(sql, req.body.openid, function(err, results) {
            console.log(results)
            res.send({ status: 0, message: results })
        })
    }
    // 注册用户的处理函数
exports.regUser = (req, res) => {
    // console.log(req.body)
    const userinfo = req.body
    const sql = 'insert into user set ?'
    db.query(sql, { nickName: userinfo.nickName, avatarUrl: userinfo.avatarUrl, gender: userinfo.gender, openid: userinfo.openid }, function(err, results) {
        // 执行 SQL 语句失败
        if (err) return res.send({ status: 1, message: err.message })
            // SQL 语句执行成功，但影响行数不为 1
        if (results.affectedRows !== 1) {
            return res.send({ status: 1, message: '注册用户失败，请稍后再试！' })
        }
        // 注册成功
        res.send({ status: 0, message: '注册成功！' })
    })
}

//用户登录换取token的处理函数
exports.gettoken = (req, res) => {
        // console.log('login code: ' + req.body.code)
        const wx = {
            appid: 'wx1f70e7731eaea3c2',
            secret: '742684ed0d0746d12dee44c65da7fb4e'
        }
        var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + wx.appid + '&secret=' + wx.secret + '&js_code=' + req.body.code + '&grant_type=authorization_code'
        requesturl(url, (err, wxresult, body) => {
            res.send({
                code: 1,
                msg: '请求数据成功',
                data: body
            })
        })
    }
    //查询用户信息
exports.userinfo = (req, res) => {
    // console.log(req.query)
    const sql = 'select * from user where openid=?'
    db.query(sql, req.query.openid, function(err, results) {
        // sql语句成功
        res.send({ status: 0, message: '用户信息如下：', userinfo: results })
    })
}

//绑定或更改手机号和姓名
exports.bindphone = (req, res) => {
        console.log(req.body)
        const sql = 'update user set phone=?,name=? where openid=? '
        db.query(sql, [req.body.phone, req.body.name, req.body.openid], function(err, results) {
            // 执行 SQL 语句失败
            if (err) return res.send({ status: 1, message: err.message })
                // SQL 语句执行成功，但影响行数不为 1
            if (results.affectedRows !== 1) {
                return res.send({ status: 1, message: '请稍后再试！' })
            }
            // 绑定成功
            res.send({ status: 0, message: '绑定成功！' })
        })
    }
    //管理员登录
exports.adminlogin = (req, res) => {
        console.log(req.query)
        const sql = 'select * from admin where phone=? and password=?'
        db.query(sql, [req.query.phone, req.query.password], function(err, results) {
            // sql语句成功
            if (results.length > 0) {
                res.send({ status: 0, message: '登录成功', admininfo: results })
            } else {
                res.send({ status: 1, message: '账号或密码错误' })
            }
        })

    }
    //得到所有用户信息
exports.getalluser = (req, res) => {
        const sql = 'select * from user'
        db.query(sql, function(err, results) {
            // 执行 SQL 语句失败
            if (err) return res.send({ status: 1, message: err.message })
                // 查询成功
            res.send({ status: 0, message: '用户信息', userinfo: results })
        })
    }
    //客服功能
    // exports.checkPushMsg = (req, res) => {
    //     console.log('接收到了消息，请求体中');
    //     console.log(req.body);
    //     console.log('接收到了消息，请求url中');
    //     console.log(req.query);
    // }