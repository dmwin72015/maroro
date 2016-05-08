/**
 * Created by Administrator on 2016/1/13.
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');
var baseQuery = require('../model/mysqlPool').baseQuery;
var basePath = global.staticPath;
/* 后台 */

router.get('/', function(req, res, next) {
    res.redirect('login');
    //res.redirect(304,'./public/admin/index.html')
    //next();
});
router.get('/area', (req, res, next) => {
    res.redirect('area/all');
});
router.get('/area/:type', function(req, res, next) {
    var type = req.params.type;
    console.log(type);
    var sql = 'SELECT * from blog_area_f WHERE country_code=? AND code1 =? OR code1=?;'
    baseQuery(sql, [1, 1011, 1012], function(rows) {
        res.render('admin/view_admin_area', {
            path: basePath,
            row: rows
        });
    });
});

router.get('/login', (req, res, next) => {
    res.render('admin/view_index', {
        path: basePath
    });
});
router.post('/login', (req, res, next) => {
    var params = req.body;
    var name = params.username;
    var pass = params.password;
    req.session.user = {
        name: name,
        pass: pass
    };
    if (name == 'sss' && pass == 'sss') {
        res.redirect('area/all');
    } else {
        res.render('admin/view_index', {
            path: basePath,
            error: {
                msg: '用户名密码错误'
            }
        });
    }
})
router.post('/blog/add', (req, res, next) => {
    
});
router.get('/blog/:action', (req, res, next) => {
    var action = req.params.action;
    console.log(action);
    switch (action) {
        case 'add':
            var data = req.body;
            res.render('admin/view_blog_add',{
                path: basePath
            });
            break;
        case 'delete':
            break;
        case 'list':
            break;
    }
});
module.exports = router;
