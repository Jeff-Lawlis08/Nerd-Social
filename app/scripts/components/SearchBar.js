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
    store.users.on('update change', this.updateState);
    store.games.on('update change', this.updateState);
  },
  componentWillUnmount(){
    store.users.off('update change', this.updateState);
    store.games.off('update change', this.updateState);

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
  updateState(){
    this.setState({users: store.users.toJSON(), games: store.games.toJSON(), loading: false});
  },
  handleSearch(e){
    e.preventDefault();
    store.games.reset();
    window.setTimeout(this.updateState, 3000)
    let search = this.refs.search.value;
    let searchedUser = store.users.filter((user, i, arr)=>{
      if(user.get('name').indexOf(search.trim())>-1 || user.get('fullName').trim().toUpperCase().indexOf(search.trim().toUpperCase())>-1){
        return true;
      }
    });
    browserHistory.push('/search/?user='+search);
    store.games.getGames(search);
    this.refs.search.value=''
    if(store.games.models.length===0){
      this.setState({loading: true});
    } else if(store.games.models.length>0){
      this.setState({loading: false});
    }

  },
});
