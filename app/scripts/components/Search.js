import React from 'react';
import store from '../store';

export default React.createClass({
  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <input ref="search" type="text" placeholder="search"/>
        <input type="submit" value="Search"/>
      </form>
    );
  },
  handleSubmit(e){
    e.preventDefault();
    let search = this.refs.search.value;
    store.games.getGames(search);
    console.log(search);
  }
});
