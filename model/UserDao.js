/**
 * Created by Administrator on 2016/1/13.
 */
var db = require('../database/mysql_data');
var User = function () {

};
function querySql(json) {
    json = json || {};
    if(!json.sql) return;
    db.pool.getConnection(function(err, conn) {
        if (err) {
            json.cb(!0,err);
            return;
        }
        conn.query(json.sql,json.params,function(err, results) {
            if (err) {
                json.cb(!0,err);
                return;
            }
            json.cb(0, results);
        })
    });
}

User.prototype.findById = function(id , cb){
    var sql = 'select * from user where id=?';
    querySql({
        'sql':sql,
        'params':[id],
        'cb':cb
    });
};

User.prototype.findAll = function (cb) {
    var sql = 'select * from user';
    querySql({
        'sql':sql,
        'cb':cb
    });
}

module.exports = User;

//db.pool.getConnection(function(err, connection) {
//    if (err) {
//        callback(true);
//        return;
//    }
//    // 查询
//    connection.query(sql, [id], function(err, results) {
//        if (err) {
//            callback(true);
//            return;
//        }
//        cb(false, results);
//    });
//});