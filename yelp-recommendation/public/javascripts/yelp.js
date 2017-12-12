'use strict'

var app = angular.module('Yelp', ['ngResource', 'ngRoute', 'angucomplete', 'ngTouch']);

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
        
        Businesses.query({city : $routeParams.city, categories : $routeParams.categories, stars : {$gt : 1.0}}, function(bs){

            var new_bs = bs.filter(function(business){
                console.log($routeParams.categories);
                return business.stars >= $routeParams.stars & business.categories.includes($routeParams.categories);
            }).sort(function(a, b){
                var x = a.review_count > b.review_count? -1 : 1;
                return x
            });

            $scope.length = new_bs.length;

            $scope.businesses = new_bs.slice(0, 100);

        });
    }]);

app.controller('HomeCtrl', ['$scope', '$resource', '$location', 
    function($scope, $resource, $location){
        var Reviews = $resource('/api/reviews');

        Reviews.query(function(rs){

            $scope.selectedCities = [{"city":"Las Vegas"},{"city":"Phoenix"},{"city":"Toronto"},{"city":"Charlotte"},{"city":"Scottsdale"},{"city":"Pittsburgh"},{"city":"Montr\u00e9al"},{"city":"Mesa"},{"city":"Henderson"},{"city":"Tempe"},{"city":"Chandler"},{"city":"Edinburgh"},{"city":"Cleveland"},{"city":"Madison"},{"city":"Glendale"},{"city":"Gilbert"},{"city":"Mississauga"},{"city":"Stuttgart"},{"city":"Peoria"},{"city":"Markham"},{"city":"North Las Vegas"},{"city":"Champaign"},{"city":"North York"},{"city":"Surprise"},{"city":"Scarborough"},{"city":"Richmond Hill"},{"city":"Concord"},{"city":"Goodyear"},{"city":"Brampton"},{"city":"Vaughan"},{"city":"Etobicoke"},{"city":"Matthews"},{"city":"Avondale"},{"city":"Oakville"},{"city":"Huntersville"}];

            $scope.selectedCategories = [{"name":"Restaurants"},{"name":"Shopping"},{"name":"Food"},{"name":"Beauty & Spas"},{"name":"Home Services"},{"name":"Health & Medical"},{"name":"Nightlife"},{"name":"Bars"},{"name":"Automotive"},{"name":"Local Services"},{"name":"Event Planning & Services"},{"name":"Active Life"},{"name":"Fashion"},{"name":"Sandwiches"},{"name":"Fast Food"},{"name":"American (Traditional)"},{"name":"Pizza"},{"name":"Coffee & Tea"},{"name":"Hair Salons"},{"name":"Hotels & Travel"},{"name":"Arts & Entertainment"},{"name":"Home & Garden"},{"name":"Auto Repair"},{"name":"Italian"},{"name":"Burgers"},{"name":"Doctors"},{"name":"Breakfast & Brunch"},{"name":"Mexican"},{"name":"Nail Salons"},{"name":"Professional Services"},{"name":"American (New)"},{"name":"Chinese"},{"name":"Real Estate"},{"name":"Specialty Food"},{"name":"Fitness & Instruction"},{"name":"Pets"},{"name":"Grocery"},{"name":"Bakeries"},{"name":"Cafes"},{"name":"Hair Removal"},{"name":"Dentists"},{"name":"Hotels"},{"name":"Desserts"},{"name":"Skin Care"},{"name":"Women's Clothing"},{"name":"Education"},{"name":"Japanese"},{"name":"Ice Cream & Frozen Yogurt"},{"name":"Pet Services"},{"name":"Day Spas"},{"name":"Massage"},{"name":"General Dentistry"},{"name":"Financial Services"},{"name":"Pubs"},{"name":"Chicken Wings"},{"name":"Seafood"},{"name":"Contractors"},{"name":"Salad"},{"name":"Gyms"},{"name":"Sushi Bars"},{"name":"Sports Bars"},{"name":"Apartments"},{"name":"Caterers"},{"name":"Flowers & Gifts"},{"name":"Sporting Goods"},{"name":"Wine & Spirits"},{"name":"Beer"},{"name":"Cosmetics & Beauty Supply"},{"name":"Oil Change Stations"},{"name":"Tires"},{"name":"Accessories"},{"name":"Venues & Event Spaces"},{"name":"Delis"},{"name":"Hair Stylists"},{"name":"Asian Fusion"},{"name":"Barbers"},{"name":"Waxing"},{"name":"Mediterranean"},{"name":"Auto Parts & Supplies"},{"name":"Trainers"},{"name":"Furniture Stores"},{"name":"Car Dealers"},{"name":"Home Decor"},{"name":"Cosmetic Dentists"},{"name":"Drugstores"},{"name":"Barbeque"},{"name":"Department Stores"},{"name":"Men's Clothing"},{"name":"Canadian (New)"},{"name":"Lounges"},{"name":"Arts & Crafts"},{"name":"Jewelry"},{"name":"Convenience Stores"},{"name":"Steakhouses"},{"name":"Thai"},{"name":"Indian"},{"name":"Juice Bars & Smoothies"},{"name":"Eyelash Service"},{"name":"Medical Centers"},{"name":"Massage Therapy"},{"name":"Mags"},{"name":"Music & Video"},{"name":"Books"},{"name":"Pet Groomers"},{"name":"Diners"},{"name":"Heating & Air Conditioning\/HVAC"},{"name":"Electronics"},{"name":"Public Services & Government"},{"name":"Dry Cleaning & Laundry"},{"name":"Laundry Services"},{"name":"Shoe Stores"},{"name":"Gas Stations"},{"name":"Specialty Schools"},{"name":"IT Services & Computer Repair"},{"name":"Veterinarians"},{"name":"Chiropractors"},{"name":"Party & Event Planning"},{"name":"Real Estate Services"},{"name":"Wine Bars"},{"name":"Optometrists"},{"name":"Middle Eastern"},{"name":"Mobile Phones"},{"name":"Pet Boarding\/Pet Sitting"},{"name":"Greek"},{"name":"French"},{"name":"Banks & Credit Unions"},{"name":"Plumbing"},{"name":"Vietnamese"},{"name":"Yoga"},{"name":"Pet Stores"},{"name":"Cocktail Bars"},{"name":"Vegetarian"},{"name":"Makeup Artists"},{"name":"Performing Arts"},{"name":"Home Cleaning"},{"name":"Music Venues"},{"name":"Eyewear & Opticians"},{"name":"Medical Spas"},{"name":"Body Shops"},{"name":"Car Wash"},{"name":"Transportation"},{"name":"Printing Services"},{"name":"Local Flavor"},{"name":"Parks"},{"name":"Florists"},{"name":"Dance Clubs"},{"name":"Hair Extensions"},{"name":"Ethnic Food"},{"name":"Movers"},{"name":"Landscaping"},{"name":"Real Estate Agents"},{"name":"Buffets"},{"name":"Tanning"},{"name":"Discount Store"},{"name":"Auto Detailing"},{"name":"Photographers"},{"name":"Tobacco Shops"},{"name":"Physical Therapy"},{"name":"Car Rental"},{"name":"Korean"},{"name":"Self Storage"},{"name":"Food Delivery Services"},{"name":"Property Management"},{"name":"Carpet Cleaning"},{"name":"Sewing & Alterations"},{"name":"Orthodontists"},{"name":"Tattoo"},{"name":"Lawyers"},{"name":"Tex-Mex"},{"name":"Soup"},{"name":"Food Trucks"},{"name":"Auto Glass Services"},{"name":"Hobby Shops"},{"name":"Appliances & Repair"},{"name":"Shipping Centers"},{"name":"Hot Dogs"},{"name":"Gluten-Free"},{"name":"Donuts"},{"name":"Appliances"},{"name":"Kitchen & Bath"},{"name":"Used"},{"name":"Vintage & Consignment"},{"name":"Insurance"},{"name":"Art Galleries"},{"name":"Hardware Stores"},{"name":"Comfort Food"},{"name":"Building Supplies"},{"name":"Vegan"},{"name":"Sports Wear"},{"name":"Wedding Planning"},{"name":"Flooring"},{"name":"Health Markets"},{"name":"Mattresses"},{"name":"Family Practice"},{"name":"Gift Shops"},{"name":"Thrift Stores"},{"name":"Bagels"},{"name":"Dive Bars"},{"name":"Men's Hair Salons"},{"name":"Oral Surgeons"},{"name":"Tours"},{"name":"Weight Loss Centers"},{"name":"Caribbean"},{"name":"German"},{"name":"Gastropubs"},{"name":"Mobile Phone Repair"},{"name":"Acupuncture"}];

            $scope.search = function(city, categories, stars) {
                if (stars != null && city != null && categories != null)
                    $location.path('/businesses-results/city=' + city + '/categories=' + categories + '/stars=' + stars);
                else
                    alert("Please provide enough information!");
            };

        });

    }]);