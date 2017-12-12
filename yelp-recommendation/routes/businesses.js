'use strict'

var express = require('express');
var router = express.Router();

var yelp = require('yelp-fusion');

var monk = require('monk');
var db = monk('localhost:27017/yelp');

router.get('/', function(req, res) {
	var collection = db.get('business');
	collection.find({review_count : {$gt : 100}}, function(err, business){
		if (err) throw err;

		res.json(business);
	});
});

router.get('/:city', function(req, res) {
	var collection = db.get('business');
	collection.find({city : req.params.city, review_count : {$gt : 100}}, function(err, business){
		if (err) throw err;
		res.json(business);
	})
});

router.get('/city=:city/categories=:categories/stars=:stars', function(req, res) {
	var collection = db.get('business');
	collection.find({city : req.params.city, review_count : {$gt : 100}}, {limit : 10000}, function(err, business){
		if (err) throw err;
		res.json(business);
	})
});

module.exports = router;