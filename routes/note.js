/**
 * Created by Administrator on 2016/1/13.
 */
var express = require('express');
var path = require('path'); 
var router = express.Router();
var User = require('../model/NotesDao.js');
/* 后台 */
router.get('/', function(req, res, next) {
    //TODO 怎么获取应用的根目录
    var sBaseUrl = req.baseUrl;
    var projectBaseUrl = process.cwd();//当前项目的路径
    res.sendFile(projectBaseUrl+'\\public'+sBaseUrl+'\\index.html');
});

router.get('/:name', function(req, res, next) {
    var name = req.params.name;
    res.render('APIdetail', { 
    	title: 'Express', 
    	name: name, 
    	param1:'className',
    	param1_type:'string',

    });
});
router.get('/getwether', function(req, res, next) {
    
});
router.get('/getBingPic',function(req, res, next){
    
})
module.exports = router;
