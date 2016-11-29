import Backbone from 'backbone';
import Review from '../models/review';
import {browserHistory} from 'react-router';

export default Backbone.Collection.extend({
  model: Review,
  url: 'https://api.backendless.com/v1/data/reviews',

  addReview({title, body, rating, gameId, ownerId, timestamp}){
    this.create(
      {title, body, rating, gameId, ownerId: window.localStorage.getItem('ownerId'), timestamp},
      {
      success: (response)=>{
        // console.log(response);
        this.add({response});
      }
    });
  },
  parse: (data)=>{
    // console.log(data.data);
    return data.data;
  },

});
