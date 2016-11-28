import Backbone from 'backbone';
import Review from '../models/review';

export default Backbone.Collection.extend({
  model: Review,
  url: 'https://api.backendless.com/v1/data/reviews',

  addReview({title, body, rating, gameId}){
    this.create(
      {title, body, rating},
      {
      success: ()=>{
        console.log('added review');
      }
    });
  }
});
