import Backbone from 'backbone';

export default Backbone.Model.extend({
  idAttribute: 'objectId',
  timestamp: new Date(),
  url: 'https://api.backendless.com/v1/data/reviews',
  like(id){
    this.save({
      likes: this.get('likes').concat({
      ___class: 'Users',
      objectId: id
    })
    });
  },
  dislike(id){
    this.save({
      dislikes: this.get('dislikes').concat({
      ___class: 'Users',
      objectId: id
    })
    });
  },
  unlike(id){
    let newLikes = this.get('likes').filter((like, i, arr) => {
    if(like.objectId!==id){
      return true;
    }
  });
    this.save({
      likes: newLikes
    });
  },
  undislike(id){
    let newDislikes = this.get('dislikes').filter((dislike, i, arr)=>{
      if(dislike.objectId!==id){
        return true;
      }
    });
    this.save({
      dislikes: newDislikes
    });
  },
});
