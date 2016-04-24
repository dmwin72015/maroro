/*
* 读取xml文件，转换成json对象，适合小文件的读取。
* 下一步，研究大文件的读取。
**/ 
const mysql = require('mysql');
const config = require('../config/database_config')['mysql_dev'];
const pool = mysql.createPool(config);
const fs = require('fs');
const parse = require('xml2js').parseString;
const path = require('path');
const moment = require('moment');

// 无参数
function baseQuery1(sql, cb) {
    pool.getConnection((err, conn) => {
        if (err) throw err.stack;
        conn.query(sql, (err, rows) => {
            cb && cb(err, rows);
            //释放连接
            conn.release();
        })
    });
}
// 需要传参
function baseQuery2(sql, data, cb) {
    pool.getConnection((err, conn) => {
        if (err) throw err.stack;
        conn.query(sql, data, (err, rows) => {
            cb && cb(err, rows);
            //释放连接
            conn.release();
        })
    });
}
// 合并之后优化代码 2016-04-21 10:42 PM
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
// 测试sql语句
baseQuery('SELECT * FROM cn_area_f where code1="1011" and code2="101107"',['a'] ,(res) => {
    console.log(res);
});

function endPool(pool, cb) {
    pool.end((err) => {
        cb(err);
    });
}
// 测试数据库连接
function testConnect() {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log('连接失败。。。。。。');
            console.log(err.stack);
        } else {
            console.log('连接成功。。。。。。');
        }
    });
}
// 向数据库中插入数据
function insertData(arr) {
    if (!arr && !Array.isArray(arr)) {
        console.log('请传入一个数组');
        return;
    }
    if (arr.length > 13) {
        console.log('数组长度超出列数量');
        return;
    }

    if (arr.length < 13) {
        var tmp = [];
        for (var x = 0; x < 13 - arr.length; x++) {
            tmp[tmp.length] = null;
        }
        arr = arr.concat(tmp);
        arr[arr.length - 1] = moment().format("YYYY-MM-DD h:mm:ss SSS");
    }
    var sql = 'INSERT INTO cn_area_f (country,country_code,name1,code1,name2,code2,name3,code3,name4,code4,name5,code5,create_date) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)';
    baseQuery2(sql, arr, (err, res) => {
        if (err) {
            console.log('入库失败.....', err.stack);
            throw err;
        }
        console.log('OK.....' + res.insertId);
    });
}
// 从文件读XML格式数据，转成json格式 
// var json =  parser.parseString（xml）;
function turnToJson(url, cb) {
    var str = '';
    fs.readFile(url, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            str += data;
            // console.log(str);
            parse(str, (err, json) => {
                cb(err, json);
            });
        }
    });
}
var sUrl = path.resolve('./config/LocList.xml');
var jsonBeijign = {};
// console.log(sUrl);
/*
turnToJson(sUrl, (err, json) => {
    if (err) return;
    // 国家数组
    // '$'      {Name:"XXX",Code:"XXX"}
    // 'State'  [[一级地域json],[一级地域json]...]

    // 每一个一级地域 （省）
    // '$'      {Name:'XXX',Code:'XXX'}
    // 'City'   [[二级地域json],[二级地域json]....]

    // 每一个二级地域 （市、直辖市）
    // '$'      {Name:'XXX',Code:'XXX'}
    // 'Region' [[三级地域json],[三级地域json]....]（三级地域不一定有，例如直辖市(与省市同一个级别)只到二级）

    // 每一个三级地域 （县、镇、区）
    // '$'      {Name:'XXX',Code:'XXX'}
    console.log(json['Location']['CountryRegion'][2]['$']);
    console.log(json['Location']['CountryRegion'][2]);
})

baseQuery1('DELETE FROM cn_area_f', function() {
    baseQuery1('ALTER TABLE cn_area_f auto_increment = 1', function() {
        turnToJson(sUrl, (err, json) => {
            if (err) throw err;
            var country = json['Location']['CountryRegion']; //国家数组
            var cn_country = json['Location']['CountryRegion'][0]['$'].Name; //
            var cn_country_id = json['Location']['CountryRegion'][0]['$'].Code; //
            for (var i = 0; i < country.length; i++) {
                var country_name = country[i]['$']['Name'];
                var country_code = country[i]['$']['Code'];
                insertData([country_name, country_code]);
                // 一级地域(省)
                var lev1 = country[i]['State'];
                if (lev1) {
                    for (var y = 0; y < lev1.length; y++) {
                        var lev1_name = lev1[y]['$'] ? lev1[y]['$']['Name'] : null;
                        var lev1_code = lev1[y]['$'] ? lev1[y]['$']['Code'] : null;
                        if (y == lev1.length) return;
                        if (i == 0 && lev1_code) {
                            lev1_code = parseInt(lev1_code) > 9 ? '10' + lev1_code : '100' + lev1_code;
                        }
                        lev1_code ? insertData([country_name, country_code, lev1_name, lev1_code]) : 0;
                        // 二级地域(市)
                        var lev2 = lev1[y]['City'];
                        if (lev2) {
                            for (var m = 0; m < lev2.length; m++) {
                                var lev2_name = lev2[m]['$'] ? lev2[m]['$']['Name'] : null;
                                var lev2_code = lev2[m]['$'] ? lev2[m]['$']['Code'] : null;
                                if (i == 0 && lev2_code) {
                                    lev2_code = lev1_code + (parseInt(lev2_code) > 9 ? lev2_code : '0' + lev2_code);
                                }
                                lev1_code
                                    ? insertData([country_name, country_code, lev1_name, lev1_code, lev2_name, lev2_code]) : insertData([country_name, country_code, lev2_name, lev2_code]);
                                // 三级地域(县)
                                var lev3 = lev2[m]['Region'];
                                if (lev3) {
                                    for (var n = 0; n < lev3.length; n++) {
                                        var lev3_name = lev3[n]['$'] ? lev3[n]['$']['Name'] : null;
                                        var lev3_code = lev3[n]['$'] ? lev3[n]['$']['Code'] : null;
                                        if (i == 0 && lev3_code) {
                                            lev3_code = lev2_code + (parseInt(lev3_code) > 9 ? lev3_code : '0' + lev3_code);
                                        }
                                        lev2_code ?
                                            insertData([country_name, country_code, lev1_name, lev1_code, lev2_name, lev2_code, lev3_name, lev3_code]) : insertData([country_name, country_code, lev2_name, lev2_code, lev3_name, lev3_code]);
                                    }

                                }
                            }
                        }
                    }
                }
            }
        });
    });
});

*/
