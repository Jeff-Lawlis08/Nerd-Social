import React from 'react';
import {Link} from 'react-router';
import SearchBar from './SearchBar';

export default React.createClass({
  render(){
    return(
      <div>
        <h2>Page Not Found</h2>
        <h4><Link to="/login">Need to Login?</Link></h4>
        <h4><Link to="/search">Need to Search?</Link></h4>
      </div>
    )
  }
});
