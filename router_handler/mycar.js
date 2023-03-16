//导入数据库操作模块
const express = require('express')
const res = require('express/lib/response')
const db = require('../db/index')

// 加入收藏的处理函数
exports.mycollocet = (req, res) => {

        const collectlist = req.body.collectlist
        console.log(collectlist)
        let sql = 'insert into mycollectcar set ?'
        db.query(sql, { carid: collectlist.carid, sellavatarUrl: collectlist.sellavatarUrl, sellnickname: collectlist.sellnickname, cartitle: collectlist.cartitle, carimg: collectlist.carimg, money: collectlist.money, sellopenid: collectlist.sellopenid, myopenid: collectlist.myopenid }, (err, results) => {
            // 执行 SQL 语句失败
            if (err) return res.send({ status: 1, message: err.message })
                // SQL 语句执行成功，但影响行数不为 1
            if (results.affectedRows !== 1) {
                return res.send({ status: 1, message: '收藏失败，请稍后再试！' })
            }
            // sql语句成功
            res.send({ status: 0, message: '收藏成功' })
        })
    }
    //判断是否被收藏的处理函数
exports.iscollocet = (req, res) => {
        console.log(req.body)
        let sql = 'SELECT * FROM mycollectcar WHERE carid=? and myopenid=?'
        db.query(sql, [req.body.carid, req.body.myopenid], (err, results) => {
            //执行 SQL 语句失败
            if (err) return res.send({ status: 1, message: err.message })

            console.log(results.length)
            res.send({ status: 0, results: results.length })
        })
    }
    //取消收藏的处理函数

exports.quitcollocet = (req, res) => {
    console.log(req.body)
    let sql = 'DELETE FROM mycollectcar  WHERE carid=? and myopenid=?'
    db.query(sql, [req.body.carid, req.body.myopenid], (err, results) => {
        //执行 SQL 语句失败
        if (err) return res.send({ status: 1, message: err.message })
        res.send({ status: 0, message: '您取消了收藏' })
    })
}

//根据myopenid查收藏的
exports.selectcollocet = (req, res) => {
        console.log(req.query)
        let sql = 'SELECT * FROM mycollectcar WHERE myopenid=?'
        db.query(sql, req.query.myopenid, (err, results) => {
            //执行 SQL 语句失败
            if (err) return res.send({ status: 1, message: err.message })
            res.send({ status: 0, collectlist: results })
        })
    }
    //用户买的车
exports.getbuycar = (req, res) => {
    // console.log(req.query)
    let sql = 'select * from orders where openid=?'
    db.query(sql, req.query.openid, (err, results) => {
        //执行 SQL 语句失败
        if (err) {
            return res.send({ status: 1, message: err.message })
        } else {
            res.send({ status: 0, mybuycar: results })
        }

    })
}

//查询用户卖的车
exports.getsellcar = (req, res) => {
        console.log(req.query)
        let sql = 'select * from orders where sellopenid=?'
        db.query(sql, req.query.openid, (err, results) => {
            //执行 SQL 语句失败
            if (err) {
                return res.send({ status: 1, message: err.message })
            } else {
                console.log(results)
                res.send({ status: 0, mysellcar: results })
            }

        })
    }
    //更改订单状态
exports.updateorders = (req, res) => {
        console.log(req.body)
        let sql = 'update orders set issend=? where ordersid=?'
        db.query(sql, [req.body.issend, req.body.ordersid], (err, results) => {
            //执行 SQL 语句失败
            if (err) {
                return res.send({ status: 1, message: err.message })
            } else {
                res.send({ status: 0, message: '订单状态改变成功' })
            }

        })

    }
    //管理员给用户的消息提示
exports.gomessage = (req, res) => {
        console.log(req.body)
        let sql = 'insert into message set ?'
        db.query(sql, { openid: req.body.openid, cartitle: req.body.cartitle, isidentity: req.body.isidentity }, (err, results) => {
            // 执行 SQL 语句失败
            if (err) return res.send({ status: 1, message: err.message })
                // SQL 语句执行成功，但影响行数不为 1
            if (results.affectedRows !== 1) {
                return res.send({ status: 1, message: '失败，请稍后再试！' })
            }
            // sql语句成功
            res.send({ status: 0, message: '消息已发送给用户' })
        })
    }
    //判断该用户有没有被管理员提示信息
exports.getmessage = (req, res) => {
        console.log(req.query)
        let sql = 'select * from message where openid=?'
        db.query(sql, req.query.openid, (err, results) => {
            //执行 SQL 语句失败
            if (err) {
                return res.send({ status: 1, message: err.message })
            } else {
                res.send({ status: 0, message: results })
            }

        })
    }
    //用户查看了消息以后删除消息提示
exports.delmessage = (req, res) => {
    console.log(req.body)
    let sql = 'DELETE FROM message WHERE openid=?'
    db.query(sql, req.body.openid, (err, results) => {
        //执行 SQL 语句失败
        if (err) {
            return res.send({ status: 1, message: err.message })
        } else {
            res.send({ status: 0, message: '消息已阅' })
        }

    })
}