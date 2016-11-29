import Backbone from 'backbone';

export default Backbone.Model.extend({
  idAttribute: 'objectId',
  timestamp: new Date(),

  // editReview({title, body, rating, gameId, ownerId, id}){
  //   this.save({});
  // }
});
