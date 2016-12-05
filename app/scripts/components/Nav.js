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
            <input onClick={this.handleClick} type="button" value="LOGOUT"/>
          </div>
        </nav>

      );
    } else {
      return(
        <nav>
          <h1><i className="fa fa-gamepad" aria-hidden="true"></i> Nerd Social</h1>
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
