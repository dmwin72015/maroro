var fs = require("fs");
var http = require("http");
var https = require("https");
var urlUtil = require("url");
var pathUtil = require("path");
// var url = "https://www.baidu.com/";
// https.get(url, (res) => {
//     res.on('data', (d) => {
//         //读取的内容，object
//         console.log(typeof d);

//     });
// });
var PaChong = {};
var option = {
    host: "cn.bing.com",
    port:80,
    path: "",
    filepath:'E:\\myPath\\a.html'
};
var fsPath = 'E:\\myPath\\a.html';

PaChong.getData = function(url, fn) {
    // url = url || 'http://cn.bing.com/';
    var req = http.request(option, function(res) {
        res.on("data", function(data) {
            fs.exists(option.filepath, (exists) => {
                if (exists) {
                    fs.appendFile(fsPath, data, 'utf8', (err) => {
                        if (err) throw err;
                    });
                } else {
                    fs.writeFile(fsPath, data, 'utf8', (err) => {
                        if (err) throw err;
                    });
                }
            });
        });
    }).on("error", function(e) {
        console.log(e.message);
    }).on("end",()=>{
        console.log('over.......');
    });
    // req.end();
};

function writeDate(data, fn) {
    fs.exists('./a.html', (exists) => {
        if (exists) {
            fs.appendFile('./a.html', d, 'utf8', (err) => {
                console.log('ok.......');
            });
        }
    });
}
PaChong.getData();
module.exports = PaChong;
