var express = require('express');
var router = express.Router();

/* GET blog listing. */
router.get('/', function(req, res, next) {

});

module.exports = router;
/*
	菜单	menu
	id    				唯一标识
	menu_name			名称
	menu_level			级别
	menu_parent_level	父级别菜单
	menu_parent_id		父级菜单ID


	文章 article
	id  				唯一标识		
	arti_name			文章名称
	arti_author			文章作者
	create_time			创建时间
	pub_time			发布时间
	arti_content		文章内容
	arti_permission		阅读权限
	arti_category		文章类别
	read_num			阅读
	arti_message		留言
	like_num			喜欢




*/
