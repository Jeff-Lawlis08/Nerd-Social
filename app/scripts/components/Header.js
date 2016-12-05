import React from 'react';
import Nav from './Nav';
import SearchBar from './SearchBar';

export default React.createClass({
  render(){
    if(window.localStorage.getItem('user-token')){
    return(
      <header>
        <Nav/>
        <div className="bg-container">
          <SearchBar/>
        </div>
      </header>
    );
  } else {
    return(
      <header>
        <Nav/>
        <div className="bg-container">
        </div>
      </header>
    );
  }
}
});
