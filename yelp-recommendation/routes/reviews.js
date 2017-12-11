var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/yelp');

router.get('/', function(req, res) {
	var collection = db.get('reviews');
	collection.find({}, {limit : 10000}, function(err, reviews) {
		if (err) throw err;
		res.json(reviews);
	});
});

router.get('/:user_id', function(req, res) {
	var collection = db.get('reviews');
	collection.find({user_id : req.params.user_id}, function(err, reviews) {
		if (err) throw err;
		res.json(reviews);
	});
});

module.exports = router;