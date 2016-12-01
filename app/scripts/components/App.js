import React from 'react';
import Nav from './Nav';

export default React.createClass({
render(){
  return(
    <div>
      <header>
        <Nav/>
        <h1>Nerd Social</h1>
        </header>
        {this.props.children}
    </div>
  );
}
});
