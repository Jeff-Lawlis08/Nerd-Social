import React from 'react';
import {Link} from 'react-router';
import SearchBar from './SearchBar';

export default React.createClass({
  render(){
    return(
      <div>
        <h2>Page Not Found</h2>
        <Link to="/login">Need to Login?</Link>
        <Link to="/search">Need to search?</Link>
      </div>
    )
  }
});
