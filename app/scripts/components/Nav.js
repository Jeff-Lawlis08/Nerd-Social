import React from 'react';
import {Link} from 'react-router';
import store from '../store';

export default React.createClass({
    render(){
      if(window.localStorage.getItem('user-token')){
      return(
        <nav>
          <Link to='/search'>
            <span>SEARCH</span>
          <i className="fa fa-search" aria-hidden="true"></i>
          </Link>
          <input onClick={this.handleClick} type="button" value="LOGOUT"/>
        </nav>

      );
    } else {
      return(
        <nav>
          <Link to='/login'>LOGIN</Link>
          <Link to='/register'>REGISTER</Link>
        </nav>
      );
    }
    },
    handleClick(e){
      store.session.logout();
    }
});
