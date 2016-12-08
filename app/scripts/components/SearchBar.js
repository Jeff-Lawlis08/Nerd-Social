import React from 'react';
import store from '../store';

export default React.createClass({

  render(){
    return(
      <form className="search-form" onSubmit={this.handleSubmit}>
        <input ref="search" type="text" placeholder="Search Games"/>
        <i onClick={this.handleSubmit} className="fa fa-search" aria-hidden="true"></i>
      </form>

    );
  },
  handleSubmit(e){
    e.preventDefault();
    let search = this.refs.search.value;
    store.games.getGames(search);
    // store.users.searchUsers(search);
    this.refs.search.value=''
  },

});
