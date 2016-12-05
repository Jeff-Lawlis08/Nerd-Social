import Backbone from 'backbone';
import Review from '../models/review';
import {browserHistory} from 'react-router';
import _ from 'underscore';

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
  like(id){
    let model = this.get(id);
    model.save({likes: model.get('likes')+1});
  },
  dislike(id){
    let model = this.get(id);
    model.save({dislikes: model.get('dislikes')+1});
  },
  ratingStars(rating){
    starRating = rating*'★';
  }
});
