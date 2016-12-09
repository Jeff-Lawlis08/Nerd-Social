import React from 'react';
import {Link} from 'react-router';
import store from '../store';

export default React.createClass({
    render(){
      if(window.localStorage.getItem('user-token')){
      return(
        <nav>
          <h1><i className="fa fa-gamepad" aria-hidden="true"></i> Nerd Social</h1>
          <div className="nav-buttons">
            <Link to={`/user/${window.localStorage.getItem('ownerId')}`}>
              <span>My Profile </span>
              <i className="fa fa-user" aria-hidden="true"></i>
            </Link>
            <Link to='/search'>Search</Link>
            <input onClick={this.handleClick} type="button" value="LOGOUT"/>
            <i className="fa fa-sign-out" aria-hidden="true"></i>
          </div>
        </nav>

      );
    } else {
      return(
        <nav>
          <h1><i className="fa fa-gamepad" aria-hidden="true"></i> Nerd Social</h1>
          <div className="nav-buttons">
            <Link to='/login'>
              Login
            </Link>
            <Link to='/register'>
              Register
            </Link>
          </div>
        </nav>
      );
    }
    },
    handleClick(e){
      store.session.logout();
    }
});
// <Link to='/login'>LOGIN</Link>
// <Link to='/register'>REGISTER</Link>
