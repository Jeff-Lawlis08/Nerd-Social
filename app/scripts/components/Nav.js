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
            <Link to={`/user/${window.localStorage.getItem('ownerId')}`} onClick={this.handleUserReset}>
              <span>My Profile</span>
              <i className="fa fa-user" aria-hidden="true"></i>
            </Link>
            <Link to='/search'>
              <span>Search</span>
              <i className="fa fa-search" aria-hidden="true"></i>
            </Link>
            <input onClick={this.handleClick} name="logout" type="button" value="Logout"/>
            <label htmlFor="logout"><i className="fa fa-sign-out" aria-hidden="true"></i></label>
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
    },
    handleUserReset(){
      // store.user.clear();
      store.reviews.reset();
    }
});
// <Link to='/login'>LOGIN</Link>
// <Link to='/register'>REGISTER</Link>
