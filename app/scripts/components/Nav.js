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
              <span className="nav-titles">My Profile</span>
              <i className="fa fa-user" aria-hidden="true"></i>
            </Link>
            <Link to='/search' onClick={this.handleUserReset}>
              <span className="nav-titles">Search</span>
              <i className="fa fa-search" aria-hidden="true"></i>
            </Link>
            <button onClick={this.handleClick}>
              <span className="nav-titles">Logout</span>
              <i className="fa fa-sign-out" aria-hidden="true"></i>
            </button>
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
            <Link to='/search'>
              <span className="nav-titles">Search</span>
              <i className="fa fa-search" aria-hidden="true"></i>
            </Link>
          </div>
        </nav>
      );
    }
    },
    handleClick(e){
      store.session.logout();
      store.reviews.reset();
    },
    handleUserReset(){
      store.games.reset();
      store.reviews.reset();
    }
});
// <Link to='/login'>LOGIN</Link>
// <Link to='/register'>REGISTER</Link>
