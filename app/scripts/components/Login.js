import React from 'react';
import {Link} from 'react-router';
import store from '../store';

export default React.createClass({
  render(){
    return (
      <form onSubmit={this.handleSubmit} className="login-form">
        <input ref="name" type="text" placeholder="Username"/>
        <input ref="password" type="password" placeholder="password"/>
        <input type="submit" value="Login"/>
        Not a Member? <Link to='/register'>Register Now!</Link>
      </form>
    );
  },
  handleSubmit(e){
    e.preventDefault();
    let name = this.refs.name.value;
    let password = this.refs.password.value;
    store.session.login(name, password);
  }
});
