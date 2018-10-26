'use strict'

var express = require('express');
var router = express.Router();

var yelp = require('yelp-fusion');

var monk = require('monk');
var db = monk('localhost:27017/yelp');

router.get('/', function(req, res) {
	var collection = db.get('new_business');
	collection.find({review_count : {$gt : 50}}, function(err, business){
		if (err) throw err;
		res.json(business);
	})
});

router.get('/business_id=:business_id', function(req, res) {
	var collection = db.get('new_business');
	collection.find({business_id : req.params.business_id}, function(err, business){
		if (err) throw err;
		res.json(business);
	})
});

router.get('/user_id=:user_id', function(req, res){
	var collection = db.get('user_recommendation');
	collection.find({user_id : req.params.user_id}, function(err, rs){
		if (err) throw err;
		res.json(rs);
	})
});

router.get('/city=:city/categories=:categories/stars=:stars', function(req, res) {
	var collection = db.get('new_business');
	collection.find({city : req.params.city, review_count : {$gt : 50}}, {limit : 10000}, function(err, business){
		if (err) throw err;
		res.json(business);
	})
});

module.exports = router;