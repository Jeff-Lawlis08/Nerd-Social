import React from 'react';
import store from '../store';
import {browserHistory} from 'react-router';
import _ from 'underscore';

export default React.createClass({
  getInitialState(){
    return {
      users: [],
      games: [],
      loading: false,
    }
  },
  componentDidMount(){
    store.users.fetch();
    store.users.on('update change', this.updateUsersState);
    store.games.on('update change', this.updateGamesState);
  },
  componentWillUnmount(){
    store.users.off('update change', this.updateUsersState);
    store.games.off('update change', this.updateGamesState);

  },
  render(){
    let loadingIcon;
    if(this.state.loading===true){
      loadingIcon = <span>Searching... <i className="fa fa-cog fa-spin" aria-hidden="true"></i></span>
    }
    return(
        <div className="searchbar-container">
          <form className="search-form" onSubmit={this.handleSearch}>
            <input ref="search" type="text" placeholder="Search Games or Users"/>
            <i onClick={this.handleSearch} className="fa fa-search" aria-hidden="true"></i>
          </form>
          {loadingIcon}
        </div>
    );
  },
  updateUsersState(){
    this.setState({users: store.users.toJSON()});
  },
  updateGamesState(){
    this.setState({games: store.games.toJSON(), loading: false})
  },
  handleSearch(e){
    e.preventDefault();
    store.games.reset();
    this.setState({loading: true});
    window.setTimeout(this.updateGamesState, 7000);
    let search = this.refs.search.value;
    let searchedUser = store.users.filter((user, i, arr)=>{
      if(user.get('name').trim().toUpperCase().indexOf(search.trim().toUpperCase())>-1 || user.get('fullName').trim().toUpperCase().indexOf(search.trim().toUpperCase())>-1){
        return user;
      }
    });
    browserHistory.push('/search/?user='+search);
    store.games.getGames(search);
    this.refs.search.value=''
  },
});
