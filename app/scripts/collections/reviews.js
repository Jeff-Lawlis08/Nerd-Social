import Backbone from 'backbone';
import Review from '../models/review';
import {browserHistory} from 'react-router';
import _ from 'underscore';
import React from 'react';

export default Backbone.Collection.extend({
  model: Review,
  url: 'https://api.backendless.com/v1/data/reviews',
  defaults: {
    likes: 0,
    dislikes: 0
  },
  addReview({body, rating, gameId, gameName, ownerId, timestamp}){
    this.create(
      {body, rating, gameId, gameName, ownerId: window.localStorage.getItem('ownerId'), timestamp},
      {
      success: (response)=>{
        this.add({response});
      }
    });
  },
  parse: (data)=>{
    return data.data;
  },
  getAvg(gameId, reviews){
    let ratings = reviews.filter((review, i, arr)=>{
      if(review.gameId===gameId){
        return review;
      }
    }).map((review, i, arr)=>{
      return Number(review.rating);
    });
    let sum = ratings.reduce(function(a, b){
      return (a+b);
    }, 0);
    let initialAvg = sum/ratings.length;
    let avg = Math.round(initialAvg);
    return avg;
}
});
