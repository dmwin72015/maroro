var express = require('express');
var router = express.Router();

/* GET blog listing. */
router.get('/', function(req, res, next) {

});


router.get('/area:province', function(req, res, next) {
	var prov = req.params('province');
});
module.exports = router;
