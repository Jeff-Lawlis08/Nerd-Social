import Backbone from 'backbone';
import Review from '../models/review';
import {browserHistory} from 'react-router';
import _ from 'underscore';

export default Backbone.Collection.extend({
  model: Review,
  url: 'https://api.backendless.com/v1/data/reviews',

  addReview({title, body, rating, gameId, gameName, ownerId, timestamp}){
    this.create(
      {title, body, rating, gameId, gameName, ownerId: window.localStorage.getItem('ownerId'), timestamp},
      {
      success: (response)=>{
        this.add({response});
      }
    });
  },
  parse: (data)=>{
    return data.data;
  },
});
