import React from 'react';
import SearchListItem from './SearchListItem';
import _ from 'underscore';
import ReviewItems from './ReviewItems';
import {Link} from 'react-router';

export default React.createClass({
  render(){
    // console.log(this.props);
    let allItems;
    let listTitle;
    if(this.props.games.length>3){
      listTitle = 'Games';
      allItems = this.props.games.map((game, i, arr)=>{
      return (
          <SearchListItem key={i} game={game}/>
      );
    });
  } else {
    listTitle = 'Recent Reviews';
    let maxItems = _.first(this.props.reviews, 10)
    allItems = maxItems.map((review, i, arr)=>{
      return (
        <div key={i} className="recent-reviews">
          <h4><Link to={`/game/${review.gameId}`} onClick={this.handleUserReset}>{review.gameName}</Link></h4>
          <ReviewItems review={review} users={this.props.users}/>
        </div>
      );
    });
  }
    return (
      <main>
        <h3>{listTitle}</h3>
        <ul className="game-list">
        {allItems}
        </ul>
      </main>
    );
  },
  handleUserReset(){
    store.user.clear();
    store.reviews.reset();
  }
});
