module.exports = (req, res, next)=>{
	if(req.url == '/admin/login'){
		next();
		return;
	}
	if(req.session && req.session.user){
		next();		
	}else{
		res.redirect('/admin/login');
	}
}
