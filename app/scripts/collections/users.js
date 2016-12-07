import Backbone from 'backbone';
import User from '../models/user';

export default Backbone.Collection.extend({
  model: User,
  url: 'https://api.backendless.com/v1/data/users',
  parse: (response)=>{
    return response.data;
  },
  searchUsers(name){
    this.fetch();
    this.filter((user, i, arr)=>{
      if(user.name===name){
        return user;
      }
    });
  },
});
