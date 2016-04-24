/**
 * Created by admin on 2016/4/6.
 * 数据链接测试
 */
var tools = require('../model/mysql-pool');
var findByID = tools.findByID,
    findByName = tools.findByName,
    query = tools.query,
    queryBlur = tools.queryBlur;

findByID('1',function(err,rows){
    if(err) return;

});