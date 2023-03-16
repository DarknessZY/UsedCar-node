// 在这里定义car相关的路由处理函数
//导入数据库操作模块
const db = require('../db/index')

//导入腾讯云操作模块
const tx = require('../cos/txcos')


//静态文件资源管理
const multiparty = require('multiparty');
const { request } = require('express');
// const { JSONParser } = require('formidable/parsers');
//导入中间件
const { json } = require('body-parser'); 

//图片处理
exports.upload = (req, res) => {
        let form = new multiparty.Form();
        form.encoding = "utf-8";
        // form.uploadDir = "./public/allcar";
        form.parse(req, function(err, fields, files) {
            //其中fields表示你提交的表单数据对象，files表示你提交的文件对象
            // console.log(files.file[0])
            let inputFile = files.file[0].path; //本地图片所在的地址
            var filename = files.file[0].originalFilename //要给文件起的名

            const p = tx.uploadCos(inputFile, 'allcar/' + filename)
            p.then(results => {
                // console.log(results)
                res.send({ data: "上传成功！", img: results });
            }).catch(err => {
                console.log(err)
                res.send({ err: "上传失败！" });
            })
        })
    }
    // 二手车发布的处理函数(添加二手车)
exports.addcar = (req, res) => {
        console.log(req.body)
        const carinfo = req.body.str
        console.log(carinfo.imgList.join(','))
        const sql = 'insert into car set ?'
        db.query(sql, { title: carinfo.title, carimg: carinfo.imgList.join(','), money: carinfo.money, newMoney: carinfo.newMoney, brandname: carinfo.brandname, carnew: carinfo.carnew, openid: carinfo.openid, description: carinfo.description, ischeck: 0, address: carinfo.address, userName: carinfo.userName, phone: carinfo.phone, addressdetail: carinfo.addressdetail }, function(err, results) {
            // 执行 SQL 语句失败
            if (err) { return res.send({ status: 1, message: err.message }) }
            // SQL 语句执行成功，但影响行数不为 1
            if (results.affectedRows !== 1) {
                return res.send({ status: 1, message: '二手车发布失败，请稍后再试！' })
            }
            // 发布成功！
            res.send({ status: 0, message: '发布成功！' })
        })
    }
    // 根据车系查车
exports.showbrandnamecar = (req, res) => {
        console.log(req.query)
        const sql = 'SELECT * FROM car,user WHERE  car.`openid`=user.`openid` and brandname=? and ischeck="1"'
        db.query(sql, req.query.brandname, function(err, results) {
            // sql语句成功
            console.log(results)
            res.send({ status: 0, message: '查询成功！', carlist: results })
        })
    }
    //根据carid查这个车的所有信息
exports.cardetail = (req, res) => {
        console.log(req.query)
        const sql = 'SELECT * FROM car WHERE carid=?  '
        db.query(sql, req.query.carid, function(err, results) {
            // sql语句成功
            res.send({ status: 0, message: '查询成功！', carlist: results })
                // console.log(results)
        })
    }
    //随机得到6条车数据的处理函数
exports.randcarinfo = (req, res) => {
        const sql = 'SELECT * FROM car,user where ischeck="1" AND car.`openid`=user.`openid` ORDER BY RAND() LIMIT 6'
        db.query(sql, (err, results) => {
            res.send({ status: 0, message: '查询成功！', carlist: results })
        })
    }
    //搜索(根据车标题模糊查询)
exports.searchinfo = (req, res) => {
        console.log(req.body)
        const sql = 'SELECT * FROM car WHERE ischeck="1" and title LIKE' + db.escape('%' + req.body.searchtext + '%')

        db.query(sql, (err, results) => {
            console.log(results)
            res.send({ status: 0, message: '搜索成功！', carlist: results })
        })
    }
    //筛选
exports.filterinfo = (req, res) => {
    var filterResult = JSON.parse(req.query.Fresult)
    console.log(filterResult)
    console.log(filterResult.brandname[0] == undefined)
    if (filterResult.brandname[0] == undefined) {
        var brandnameall = ['宝马', '本田', '大众', '五菱宏光', '奥迪', '比亚迪', '别克', '日产', '奔驰', '其他车系']
        var brandnameselect = "'" + brandnameall.join("','") + "'"
    } else {
        var brandnameselect = "'" + filterResult.brandname.join("','") + "'"
    }
    if (filterResult.carnew[0] == undefined) {
        var carnewall = ['全新', '9新', '8新', '7新', '6新']
        var carnewselect = "'" + carnewall.join("','") + "'"
    } else {
        var carnewselect = "'" + filterResult.carnew.join("','") + "'"
    }
    if (filterResult.money == '') {
        var money0 = 0
        var money1 = 9999999999
    } else {
        var money0 = filterResult.money[0]
        var money1 = filterResult.money[1]
    }
    if (filterResult.sort == '') {
        var sort = 'asc'
    } else {
        var sort = filterResult.sort
    }
    console.log(brandnameselect)
    console.log(carnewselect)
    console.log(money0)
    console.log(sort)
    const sql = 'SELECT * FROM car WHERE brandname  in (' + brandnameselect + ') and money BETWEEN  " ' + money0 + '" AND "' + money1 + '" and carnew in(' + carnewselect + ') order by  money ' + sort + ' '
    db.query(sql, (err, results) => {
        console.log(results)
        res.send({ status: 0, message: '筛选成功！', carlist: results })
    })
}