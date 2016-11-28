import React from 'react';
import Nav from './Nav';

export default React.createClass({
render(){
  return(
    <div>
      <h1>Nerd Social</h1>
      <Nav/>
      {this.props.children}
    </div>
  );
}
});
