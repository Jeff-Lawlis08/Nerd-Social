import React from 'react';
import {Link} from 'react-router';
import store from '../store';

export default React.createClass({
    render(){
      if(window.localStorage.getItem('user-token')){
      return(
        <nav>
          <h1><i className="fa fa-gamepad" aria-hidden="true"></i> Nerd Social</h1>
          <input onClick={this.handleClick} type="button" value="LOGOUT"/>
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
