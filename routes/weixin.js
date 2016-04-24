var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var tools = require('../model/mysqlPool.js')
var wechat = require('wechat');
const https = require('https');
const fs = require('fs');
router.get('/validateToken', function(req, res, next) {
    var data = req.query;
    var signature = data['signature'];
    var timestamp = data['timestamp'];
    var nonce = data['nonce'];
    var echostr = data['echostr'];
    var sToken = 'maroro_token';
    var arr = [sToken, timestamp, nonce].sort();
    var oSha1 = crypto.createHash('sha1');
    oSha1.update(arr.join(''));
    var sSha1 = oSha1.digest('hex');
    console.log(signature);
    console.log(timestamp);
    console.log(echostr);
    console.log(sSha1);
    if (sSha1 == signature) {
        res.end(echostr)
    } else {
        res.end(false)
    };
});
router.get('/', function(req, res, next) {
    res.render('weixin',{
        title:'测试页面'
    });
});

function sha1(obj) {
    var oSha1 = crypto.createHash('sha1');
    oSha1.update(obj);
}

function getAccess_token(cb) {
    https.get(url, res => {
        console.log('statusCode: ', res.statusCode);
        console.log('headers: ', res.headers);
        res.on('data', (d) => {
            cb(d);
        });
    }).on('error', (e) => {
        console.log(e);
    });
}

function saveAccess_token(token) {

}
module.exports = router;
