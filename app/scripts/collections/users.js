import Backbone from 'backbone';
import User from '../models/user';

export default Backbone.Collection.extend({
  model: User,
  url: 'https://api.backendless.com/v1/data/users',
  parse: (response)=>{
    return response.data;
  },
  searchUsers(name){
    this.filter((user, i, arr)=>{
      if(user.get('name').indexOf(name)>-1){
        console.log(user);
        return user;
      }
    });
  },
});
