/**
 * Created by Administrator on 2016/1/13.
 */
var pool = require('../database/mysql_data').pool;
var Notes = function () {

};
function querySql(json) {
    json = json || {};
    if(!json.sql) return;
    pool.getConnection(function(err, conn) {
        if (err) {
            json.cb(err);
            return;
        }
        conn.query(json.sql,json.params,function(err, results) {
            if (err) {
                json.cb(err);
                return;
            }
            json.cb(err, results);
        })
    });
}

Notes.prototype.findById = function(id , cb){
    var sql = 'select * from user where id=?';
    querySql({
        'sql':sql,
        'params':[id],
        'cb':cb
    });
};

Notes.prototype.findByName = function (name,cb) {
    var sql_1 = 'select * from notes where name=?';
    var sql_2 = 'SELECT * FROM params;'
    querySql({
        'sql':sql,
        'cb':cb
    });
}
Notes.prototype.findAll = function (cb) {
    var sql = 'select * from user';
    querySql({
        'sql':sql,
        'cb':cb
    });
}
module.exports = Notes;