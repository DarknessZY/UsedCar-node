// 导入 mysql 模块
const mysql = require('mysql')
    // 创建数据库连接对象
const db = mysql.createPool({
        // host: '192.168.0.101',

        host: '192.168.0.111',
        user: 'root',
        password: '123',
        database: 'usedcar',
        multipleStatements: true,
    })
    // 向外共享 db 数据库连接对象
module.exports = db