//导入数据库操作模块
const req = require('express/lib/request')
const res = require('express/lib/response')
const db = require('../db/index')

// 添加二手车自提地址的处理函数
exports.addresscar = (req, res) => {
        console.log(req.body.address)
        const addresssinfo = req.body.address
        let sql = 'insert into addresscar set ?'
        db.query(sql, { userName: addresssinfo.userName, phone: addresssinfo.phone, address: addresssinfo.address, addressdetail: addresssinfo.addressdetail, openid: addresssinfo.openid, isdefault: 0 }, function(err, results) {
            // 执行 SQL 语句失败
            if (err) return res.send({ status: 1, message: err.message })
                // SQL 语句执行成功，但影响行数不为 1
            if (results.affectedRows !== 1) {
                return res.send({ status: 1, message: '二手车交易地址添加失败，请稍后再试！' })
            }
            // 成功
            res.send({ status: 0, message: '添加成功' })
        })
    }
    //根据用户openid查询用户二手车面交地址
exports.getaddresscar = (req, res) => {
        // console.log(req.query)
        let sql = 'select * from addresscar where openid=?'
        db.query(sql, req.query.openid, function(err, results) {
            // 执行 SQL 语句失败
            if (err) return res.send({ status: 1, message: err.message })
                // 成功
            res.send({ status: 0, message: '该用户地址如下', addresslist: results })
        })
    }
    //设置默认地址
exports.addressdefault = (req, res) => {
        // console.log(req.body)
        let sql = 'UPDATE  addresscar SET isdefault=? WHERE addresscarid = ?;UPDATE  addresscar SET isdefault="0" WHERE addresscarid = ? '

        db.query(sql, [req.body.isdefault, req.body.addresscarid, req.body.defaultaddresscarid], function(err, results) {
            // 执行 SQL 语句失败
            if (err) return res.send({ status: 1, message: err.message })
                // 成功
            res.send({ status: 0, message: '用户默认地址设置成功' })
        })
    }
    //删除这个地址
exports.deladdress = (req, res) => {
        // console.log(req.body)
        let sql = 'DELETE FROM addresscar WHERE addresscarid =?'

        db.query(sql, req.body.addresscarid, function(err, results) {
            // 执行 SQL 语句失败
            if (err) return res.send({ status: 1, message: err.message })
                // 成功
            res.send({ status: 0, message: '删除地址成功' })
        })
    }
    //得到用户的默认的使用地址
exports.getaddressdefault = (req, res) => {
        // console.log(req.query)
        let sql = 'select * from addresscar where openid=? and isdefault="1" '
        db.query(sql, req.query.openid, function(err, results) {
            // 执行 SQL 语句失败
            if (err) return res.send({ status: 1, message: err.message })
                // 成功
            res.send({ status: 0, addresslist: results, message: '默认使用该地址' })
        })
    }
    //根据addresscarid查询地址
exports.getaddressdetail = (req, res) => {
    console.log(req.query)
    let sql = 'select * from addresscar where addresscarid=?'
    db.query(sql, req.query.addresscarid, function(err, results) {
        // 执行 SQL 语句失败
        if (err) return res.send({ status: 1, message: err.message })
            // 成功
        res.send({ status: 0, addresslist: results, message: '原来的用户设置的地址' })
    })
}