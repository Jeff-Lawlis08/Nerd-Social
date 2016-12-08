import React from 'react';
import store from '../store';
import {Link} from 'react-router';

export default React.createClass({
  render(){
    return (
      <form onSubmit={this.handleSubmit} className="register-form">
        <input ref="fullName" type="text" placeholder="Full Name"/>
        <input ref="name" type="text" placeholder="Username"/>
        <input ref="email" type="email" placeholder="Email"/>
        <input ref="password" type="password" placeholder="password"/>
        <input type="submit" value="Register"/>
        Already a Member? <Link to='/login'>Login Here!</Link>
      </form>
    );
  },
  handleSubmit(e){
    e.preventDefault();
    let fullName = this.refs.fullName.value;
    let name = this.refs.name.value;
    let email = this.refs.email.value;
    let password = this.refs.password.value;
    store.session.register(name, fullName, email, password)
  }
});
