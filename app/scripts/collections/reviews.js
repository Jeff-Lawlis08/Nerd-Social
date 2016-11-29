import Backbone from 'backbone';
import Review from '../models/review';

export default Backbone.Collection.extend({
  model: Review,
  url: 'https://api.backendless.com/v1/data/reviews',

  addReview({title, body, rating, gameId, ownerId}){
    this.create(
      {title, body, rating, gameId, ownerId: window.localStorage.getItem('ownerId')},
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
  }
});
