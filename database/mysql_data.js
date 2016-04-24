/**
 * Created by Dongmin on 2016/1/13.
 */
var mysql = require('mysql');
var config = require('../config/database_config')['mysql_dev'];
// var config = require('../config/database_config')['mysql_pro'];
var pool = mysql.createPool(config);
exports.pool = pool;