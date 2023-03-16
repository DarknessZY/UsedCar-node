//导入数据库操作模块
const db = require('../db/index')

// 获取logo的处理函数
exports.getlogoimg = (req, res) => {
    let sql = 'SELECT * FROM carbrand'
        // const promise = new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
            if (err) {
                // reject(err) 
                return
            }
            // sql语句成功
            res.send({ status: 0, message: '车标成功！', logoimglist: results })
        })
        // })
        // return promise
}