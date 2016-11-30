import React from 'react';
import Nav from './Nav';

export default React.createClass({
render(){
  return(
    <div>
      <header>
        <h1>Nerd Social</h1>
        <Nav/>
        </header>
        {this.props.children}
    </div>
  );
}
});
