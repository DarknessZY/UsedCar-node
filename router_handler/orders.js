//导入数据库操作模块
const db = require('../db/index')
    //添加一个订单
exports.addorders = (req, res) => {
        console.log(req.body.orders)
        var a = req.body.orders
        const sql = 'insert into orders set ?'
        db.query(sql, { carimg: a.carimg, cartitle: a.cartitle, money: a.money, openid: a.openid, sellopenid: a.sellopenid, jiaoyimoney: a.jiaoyimoney, ordersnumber: a.ordersnumber, createtime: a.createtime, userName: a.userName, address: a.address, addressdetail: a.addressdetail, phone: a.phone }, function(err, results) {
            // 执行 SQL 语句失败
            if (err) return res.send({ status: 1, message: err.message })
                // SQL 语句执行成功，但影响行数不为 1
            if (results.affectedRows !== 1) {
                return res.send({ status: 1, message: '订单发生错误，请稍后再试！' })
            }
            res.send({ status: 0, message: '购买成功！' })
        })
    }
    // 查询所有(根据订单号查订单)
exports.getorders = (req, res) => {
        // console.log(req.query)
        const sql = 'select * from orders where ordersnumber like ' + db.escape('%' + req.query.search + '%')
        db.query(sql, function(err, results) {
            // 执行 SQL 语句失败
            if (err) return res.send({ status: 1, message: err.message })
            res.send({ status: 0, message: '查询成功！', orderslist: results })
        })
    }
    //根据订单状态查询订单
exports.getjiayiorders = (req, res) => {
    // console.log(req.query)
    const sql = 'select * from orders where issend =? or issend=?'
    db.query(sql, [req.query.issend1, req.query.issend2], function(err, results) {
        // 执行 SQL 语句失败
        if (err) return res.send({ status: 1, message: err.message })
        res.send({ status: 0, message: '查询成功！', orderslist: results })
    })
}

//根据时间段来查询订单
exports.createtimeselect = (req, res) => {
        console.log(req.query)
        const sql = 'SELECT *FROM orders WHERE createtime BETWEEN  ? AND ?  AND issend<?'
        db.query(sql, [req.query.createtime1, req.query.createtime2, req.query.issend], function(err, results) {
            // 执行 SQL 语句失败
            if (err) return res.send({ status: 1, message: err.message })
            res.send({ status: 0, message: '查询成功！', orderslist: results })
        })
    }
    //逾期订单或已退款的(订单超过14天)
exports.lateorders = (req, res) => {
    console.log(req.query)
    const sql = 'SELECT * FROM orders WHERE CURDATE()-INTERVAL 14 DAY >createtime  AND issend<2 or issend=3 '
    db.query(sql, function(err, results) {
        if (err) return res.send({ status: 1, message: err.message })
        res.send({ status: 0, message: '查询成功！', orderslist: results })
    })
}