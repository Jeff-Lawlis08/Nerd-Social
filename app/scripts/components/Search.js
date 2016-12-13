import React from 'react';
import store from '../store';
import SearchList from './SearchList';
import SearchBar from './SearchBar';
import UserSearchList from './UserSearchList';

export default React.createClass({
  getInitialState(){
    return {
      games: store.games.toJSON(),
      reviews: store.reviews.toJSON(),
      users: store.users.toJSON(),
      viewUsers: false,
    }
  },
  componentDidMount(){
    store.reviews.fetch();
    store.users.fetch();
    store.games.on('update change', this.updateState);
    store.reviews.on('update change', this.updateState);
    store.users.on('update change', this.updateState);
  },
  componentWillUnmount(){
    store.games.off('update change', this.updateState);
    store.reviews.off('update change', this.updateState);
    store.users.off('update change', this.updateState);
  },
  render(){
    let searchedUser;

    let usersSearched = this.state.users.filter((user, i, arr)=>{
      if(this.props.location.query.user){
        searchedUser = this.props.location.query.user;
      if(user.name.trim().toUpperCase().indexOf(searchedUser.trim().toUpperCase())>-1 || user.fullName.trim().toUpperCase().indexOf(searchedUser.trim().toUpperCase())>-1){
        return true;
      }
    }
    });

    let searchList;
    let userClass;
    let gameClass;
    // let userLength;
    // let gameLength;
    // let resultsClass;
    // if(usersSearched.length>0 || this.state.games.length>0){
    //   userLength = usersSearched.length;
    //   gameLength = this.state.games.length;
    //   resultsClass = 'active-results';
    // } else {
    //   resultsClass = 'no-active-results';
    // }
    if(this.state.viewUsers===true){
      userClass = 'active-tab';
      gameClass = 'tab';
      searchList = (
        <main>
          <UserSearchList users={usersSearched}/>
        </main>
      )
      if(usersSearched.length===0){
        searchList = (
                    <main>
                      <h3>Users</h3>
                      <span className="no-results">No Current Users Have Been Searched</span>
                    </main>
                    )
      }
    } else {
      userClass = 'tab';
      gameClass = 'active-tab';
      searchList = <SearchList games={this.state.games} reviews={this.state.reviews} users={this.state.users}/>
      if(this.state.games.length===0 && usersSearched.length>=0){
        searchList = (
            <div>
              <SearchList games={this.state.games} reviews={this.state.reviews} users={this.state.users}/>
            </div>
        )
      }
    }
    // console.log(usersSearched);
    return(
      <div>
        <div className="search-tabs">
          <button className={gameClass} onClick={this.toggleGameTab}>
            Games
            <i className="fa fa-gamepad" aria-hidden="true"></i>
          </button>
          <button className={userClass} onClick={this.toggleUserTab}>
            Users
            <i className="fa fa-users" aria-hidden="true"></i>
          </button>
        </div>
        {searchList}
      </div>
    );
  },
  updateState(){
    this.setState({games: store.games.toJSON(), reviews: store.reviews.toJSON(), users: store.users.toJSON()});
  },
  toggleUserTab(e){
    this.setState({viewUsers: true});
  },
  toggleGameTab(e){
    this.setState({viewUsers: false});
  }
});
