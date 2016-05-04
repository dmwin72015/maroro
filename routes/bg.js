/**
 * Created by Administrator on 2016/1/13.
 */
const express = require('express');
const router = express.Router();
const tools = require('../model/mysqlPool');
const query = tools.baseQuery;
/* 后台 */

router.get('/', (req, res, next) => {
    //TODO 怎么获取应用的根目录
    var url = process.cwd() + '/public' + req.baseUrl + '/index.html';
    fs.exists(url, (exists) => {
        if (exists) {
            res.sendFile(url);
        } else {
            res.status(404);
        }
    })

    //res.redirect(304,'./public/admin/index.html')
    //next();
}).get('/getUserList', (req, res, next) => {
    var user = new User();
    user.findAll(function(f, result) {
        if (f) {
            console.log(result);
            return;
        }
        res.send(result);
        res.end();
    });
}).get('/addEvent', (req, res, next) => {

}).get('/api:id', (req, res, next) => {



}).get('/area', (req, res, next) => {
    res.redirect('area/all');
}).get('/area/:type', (req, res, next) => {
    var type = req.params.type || all;
    console.log(type,staticPath);
    var params = req.body;
    console.log(params);
    var sql = 'SELECT * FROM blog_area_f WHERE code1 = ? OR (code1 IS NULL AND country_code=?) ;';
    var data = ['1011', 1];
    query(sql, data, (rows) => {
        res.render('admin/view_admin_area', {
            path:global.staticPath,
            row: rows
        })
    });
});
router.post('/area',(req, res, next) =>{
    /*
        itemCount   总记录数量
        pageNumber  页码
        pageSize    每页条数
        pageTotal   总页数
    */ 
    var params = req.body;
    console.log(params);
    next();

});
module.exports = router;
