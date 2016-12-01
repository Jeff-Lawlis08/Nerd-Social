import React from 'react';
import {Link} from 'react-router';
import store from '../store';

export default React.createClass({
    render(){
      if(window.localStorage.getItem('user-token')){
      return(
        <nav>
          <Link to='/search'>
            <span>Search</span>
          <i className="fa fa-search" aria-hidden="true"></i>
          </Link>
          <input onClick={this.handleClick} type="button" value="Logout"/>
        </nav>

      );
    } else {
      return(
        <nav>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
        </nav>
      );
    }
    },
    handleClick(e){
      store.session.logout();
    }
});
