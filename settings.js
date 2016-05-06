/**
 * Created by admin on 2016/3/31.
 */
var uid = require('uid-safe');
var setting = {
    name:'dmblog',
    genid: function (req) {
        return uid.sync(18);
        // use UUIDs for session IDs
        // 这个地方的sessionID，返回的是一个函数，但是需要的是一个字符串
        // 需要进步研究一下这个插件！！！！
        // 一直从session里面无法保存的数据就是有sessionID没有给值。
        //没有传参数的时候默认返回的undefined。
    },
    secret: 'maroro.red',
    resave:false,
    cookie: {maxAge: 160000,secure:false},
    saveUninitialized: true
}
var str = uid(18,getString)
var str2 = uid.sync(18);
//console.log(str2);
function getString(str){
    //console.log(str);
}
module.exports = setting;
