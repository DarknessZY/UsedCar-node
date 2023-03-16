//导入数据库操作模块
const res = require('express/lib/response')
const db = require('../db/index')

//导入腾讯云操作模块
const tx = require('../cos/txcos')

// 获取用户的二手车发布的处理函数
exports.getmyissue = (req, res) => {
        // console.log(req.query)
        let sql = 'SELECT * FROM car WHERE openid=? '
        db.query(sql, req.query.openid, function(err, results) {
            // sql语句成功
            res.send({ status: 0, message: '我的发布！', carinfo: results })
        })
    }
    //下架发布,取消发布
exports.delmyissue = (req, res) => {
    console.log(req.body)
        //这个是删除腾讯云里的图片，没必要
        // for (var i = 0; i < req.body.carimg.length; i++) {
        //     var delimg = req.body.carimg[i].slice(54)
        //     tx.delloadCos(delim g)
        // }
    let sql = 'DELETE FROM car WHERE carid =?'
    db.query(sql, req.body.carid, function(err, results) {
        // sql语句成功
        res.send({ status: 0, message: '下架成功' })
    })

}

//修改发布
exports.updatemyissue = (req, res) => {
    console.log(req.body.str)
    let carinfo = req.body.str
    let sql = 'UPDATE car SET title = ?,carimg = ?,money = ?,newMoney = ?,brandname = ?,carnew = ?,description = ?,ischeck="0" ,address=?,userName=?,phone=?,addressdetail=?,nocheckreason="" WHERE carid = ?'
    db.query(sql, [carinfo.title, carinfo.imgList.join(','), carinfo.money, carinfo.newMoney, carinfo.brandname, carinfo.carnew, carinfo.description, carinfo.addresscarid, carinfo.carid, ], (err, results) => {
        // sql语句成功
        if (err) {
            console.log(err)
        } else {
            res.send({ status: 0, message: '重新发布成功' })
        }

    })
}