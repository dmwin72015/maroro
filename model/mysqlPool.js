/**
 * Created by admin on 2016/4/6.
 */
var mysql = require('mysql');
var config = require('../config/database_config')['mysql_dev'];
// var config = require('../config/database_config')['mysql_pro'];
var pool = mysql.createPool(config);

//创建数据库链接
//function baseQuery(sql, data, cb) {
//    var len = arguments.length;
//    pool.getConnection(function (err, conn) {
//        if (err) throw err.stack;
//        console.log(conn);
//        len > 2 ?baseQuery2(sql, data, cb):baseQuery1(sql, cb);
//    });
//}
function baseQuery1(sql, cb) {
    pool.getConnection(function (err, conn) {
        if (err) throw err.stack;
        conn.query(sql, data, function (err, rows) {
            cb && cb(err, rows);
            //释放连接
            conn.release();
        })
    });
}
function baseQuery2(sql,data, cb) {
    pool.getConnection(function (err, conn) {
        if (err) throw err.stack;
        conn.query(sql, data, function (err, rows) {
            cb && cb(err, rows);
            //释放连接
            conn.release();
        })
    });
}
// 优化之后 基础执行sql语句
function baseQuery(sql, data, cb) {
    pool.getConnection((err, conn) => {
        if (err) throw err;
        cb ? !0 : (cb = data, data = []);
        conn.query(sql, data, (err, rows) => {
            if (err) throw err;
            cb(rows);
            conn.release();
        })
    });
}

//所有连接关闭
function endPool(pool,cb){
    pool.end(function (err) {
        cb(err);
    });
}
//事件监听
pool.on('connection',function(conn){
    console.log(conn.threadId+'连接池连接成功...');
});

pool.on('enqueue',function(conn){
    console.log(conn.threadId+'连接池连接成功...');
});
//暴露方法
var tools = {
    findByID: function (id, cb) {
        var sql = 'select * from dtest where id=?';
        baseQuery(sql,[id],cb);
    },
    findByName:function (name, cb) {
        var sql = 'select * from dtest where name=?';
        baseQuery(sql,[name],cb);
    },
    query:baseQuery1,
    queryBlur:baseQuery2
};
module.exports  = tools;