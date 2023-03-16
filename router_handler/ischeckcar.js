//导入数据库操作模块
const db = require('../db/index')

// 获取审核的二手车的处理函数
exports.getcheckcar = (req, res) => {
        let sql = 'SELECT * FROM car where ischeck=? '
        db.query(sql, req.query.ischeck, (err, results) => {
            if (err) {
                return err
            }
            res.send({ status: 0, message: '待审核的二手车查询下成功！', carlist: results })
        })
    }
    //改变审核状态
exports.checking = (req, res) => {
        console.log(req.body)
        let sql = 'UPDATE car SET ischeck=? WHERE carid = ? '
        db.query(sql, [req.body.ischeck, req.body.carid], (err, results) => {
            // 执行 SQL 语句失败
            if (err) return res.send({ status: 1, message: err.message })
                // SQL 语句执行成功，但影响行数不为 1
            if (results.affectedRows !== 1) {
                return res.send({ status: 1, message: '审核中出现问题，请稍后再试！' })
            }
            // 审核状态改变成功
            res.send({ status: 0, message: '审核通过！' })
        })
    }
    //管理员上传审核不通过的原因
exports.checkreason = (req, res) => {
    console.log(req.body)

    let sql = 'UPDATE car SET nocheckreason=?,ischeck="2" WHERE carid = ? '
    db.query(sql, [req.body.reason, req.body.carid], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.send({ status: 1, message: err.message })
            // SQL 语句执行成功，但影响行数不为 1
        if (results.affectedRows !== 1) {
            return res.send({ status: 1, message: '请稍后再试！' })
        }
        // 审核状态改变成功
        res.send({ status: 0 })
    })
}