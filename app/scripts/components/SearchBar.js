import React from 'react';
import store from '../store';
import {browserHistory} from 'react-router';
import _ from 'underscore';

export default React.createClass({
  getInitialState(){
    return {
      users: [],
    }
  },
  componentDidMount(){
    store.users.fetch();
    store.users.on('update change', this.updateState);
  },
  componentWillUnmount(){
    store.users.off('update change', this.updateState);
  },
  render(){

    return(
        <form className="search-form" onSubmit={this.handleSearch}>
          <input ref="search" type="text" placeholder="Search Games or Users"/>
          <i onClick={this.handleSearch} className="fa fa-search" aria-hidden="true"></i>
        </form>
    );
  },
  updateState(){
    this.setState({users: store.users.toJSON()});
  },
  handleSearch(e){
    e.preventDefault();
    let search = this.refs.search.value;
    let searchedUser = store.users.filter((user, i, arr)=>{
      if(user.get('name').indexOf(search.trim())>-1){
        return true;
      }
    });
    browserHistory.push('/search/?user='+search);
    store.games.getGames(search);
    this.refs.search.value=''

  },
});
