import React from 'react';
import Nav from './Nav';
import SearchBar from './SearchBar';
import {browserHistory} from 'react-router';
import Header from './Header';
import Footer from './Footer';

export default React.createClass({
render(){
  return(
    <div>
      <Header/>
        {this.props.children}
        <Footer/>
    </div>
  );
}
});
