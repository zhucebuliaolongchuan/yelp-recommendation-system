# Yelp Recommendation System Based on User Classification and Review Emotion analysis

[![Travis](https://img.shields.io/travis/rust-lang/rust.svg)]()
### Demo

[Yelp4u](http://45.55.164.248:3000)

***

### Tech Stack
* **Machine Learning**: K-Means, NLP  
* **Web Development**: MongoDB, Express, Angular.js, Node.js, Bootstrap

***

### Dataset

We use the data from [yelp](https://www.yelp.com/dataset). Mainly focused on the user, the business and also the review text datasets.

***


### Introduction


Yelp’s recommendation system is mostly based on location, rating, popularity and sponsor from the restaurants and it cannot identify a user’s preferences and identify other similar users’ and/or restaurants that match his/her preference. Users do not have time to scroll through the reviews of all restaurants before they make a decision so they evaluate a restaurant based on rating however this is the part that gets tricky. Different users have different ways of rating on a given scale. A user may never give a restaurant a 5 unless its excellent and another user may give a 5 if its satisfactory to his standards hence user bias comes in play and that makes it hard to determine the actual rating of a restaurant.


In our yelp recommendation system, we improve the recommendation in two major ways:
    
* **User classification** – we use k-means algorithm to classify the users into five categories according to their user information in the user data. Then we use the friends’ information to find the friends of the user who are from the same classification, because the friends of the user of the same category may have very similar tast and write similar reviews, then we do the recommendation based on the clustering of the users and rating of the business.   
 
* **Review text mining** - we analyze the emotion score of each word using the given dataset as the training set, get the score of top frequent words with bias, then we apply the emotion score to the reviews to correct the previous scores, after the corrections we use the corrected review scores to the restaurants and get the new restaurant score.

***

### Features

* User Personalized Recommendation
* Auto fill UserID, city, category, etc.
