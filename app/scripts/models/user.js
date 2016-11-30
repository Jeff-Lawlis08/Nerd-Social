import $ from 'jquery';
import Backbone from 'backbone';
import {browserHistory} from 'react-router';

export default Backbone.Model.extend({
  initialize(){
    if(window.localStorage.getItem('user-token')){
      this.set({'user-token': window.localStorage.getItem('user-token')});
    }
  },
  url: 'https://api.backendless.com/v1/data/users',
  idAttribute: 'ownerId',
  defaults: {
    fullName: '',
    name: '',
    email: '',
    'user-token': '',
    recent: []
  },
  register(name, fullName, email, password){
    this.save({name, fullName, email, password},
      {
        url: 'https://api.backendless.com/v1/users/register',
        success: () => {
          this.login(name, password);
        }
      });
  },
  login(login, password){
    this.save(
      {login, password},
      {
        url: 'https://api.backendless.com/v1/users/login',
        success: () => {
          this.set({login, password});
          window.localStorage.setItem('user-token', this.get('user-token'));
          window.localStorage.setItem('ownerId', this.get('ownerId'));
          browserHistory.push('/search');
        }
      }
    );
  },
  logout() {
    $.ajax({
      url: 'https://api.backendless.com/v1/users/logout',
      success: () => {
      this.clear();
      window.localStorage.clear();
      browserHistory.push('/login');
      }
    });
  },
  // addRecents(game){
  //   this.save({recent: this.get('recent').concat(game)});
  //   if(this.get('recent').length>5){
  //     this.save({recent: this.get('recent').pop(recent[5])});
  //   }
  //   console.log(this.get('recent'));
  // }
});
