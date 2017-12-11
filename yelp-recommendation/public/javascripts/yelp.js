'use strict'

var app = angular.module('Yelp', ['ngResource', 'ngRoute', 'angucomplete']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: 'playaround/home.html',
        controller: 'HomeCtrl'
    })
    .when('/reviews-results/:user_id', {
        templateUrl: 'playaround/reviews-results.html',
        controller: 'ReviewSearchCtrl'
    })
    .when('/businesses-results/city=:city/categories=:categories/stars=:stars', {
        templateUrl: 'playaround/businesses-results.html',
        controller: 'BusinessSearchCtrl'
    })
    .otherwise({
        redirectTo: '/'
    });
}]);

app.controller('HomeCtrl', ['$scope', '$resource', '$location', 
    function($scope, $resource, $location){
    	var Reviews = $resource('/api/reviews');

        Reviews.query(function(rs){

            $scope.categories = rs;

            $scope.search = function(city, categories, stars) {
                if (stars != null && city != null && categories != null)
                    $location.path('/businesses-results/city=' + city + '/categories=' + categories + '/stars=' + stars);
                else
                    alert("Please provide enough information!")
            };

        });



        
            // $scope.search = function(star, user_id) {
            //     $location.path('/reviews-results/' + user_id);
            // }

            

    		// $scope.search = function(star, user_id) {

    		// 	var start_time = new Date().getMilliseconds();
    		// 	if (star != null)
    		// 		limit = star;
    		// 	else
    		// 		limit = 0;

    		// 	function check(review) {
      //               if (user_id != null)
	    	// 		    return review.stars == limit && review.user_id == user_id;
      //               else
      //                   return review.stars == limit;
    		// 	};

    		// 	$scope.reviews = rs.filter(check);
    		// 	$scope.length = $scope.reviews.length;

    		// 	var end_time = new Date().getMilliseconds();
    		// 	$scope.time = end_time - start_time;
    		// };
    		


    }]);


app.controller('ReviewSearchCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams) {
        var Reviews = $resource('api/reviews/:user_id');
        // Reviews.query(function(rs) {
        //     console.log(rs);
        //     $scope.reviews = rs;
        //     $scope.length = rs.length;
        // });

        Reviews.query({user_id: $routeParams.user_id}, function(rs){
            $scope.length = rs.length;
            $scope.reviews = rs;
            console.log(rs.length);
        });

    }]);

app.controller('BusinessSearchCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams) {
        var Businesses = $resource('api/businesses/city=:city/categories=:categories/stars=:stars');
        
        Businesses.query({city : $routeParams.city, categories : $routeParams.categories, stars : {$gt : 3.0}}, function(bs){

            $scope.length = bs.length;
            $scope.businesses = bs.filter(function(business){
                return business.stars >= $routeParams.stars & business.categories.includes($routeParams.categories);
            }).sort(function(a, b){
                var x = a.review_count > b.review_count? -1 : 1;
                return x
            }).slice(0, 100);

        });
    }]);