import React from 'react';
import SearchListItem from './SearchListItem';
import _ from 'underscore';
import ReviewItems from './ReviewItems';
import {Link} from 'react-router';

export default React.createClass({
  render(){
    // console.log(this.props);
    let allItems;
    if(this.props.games.length>0){
      allItems = this.props.games.map((game, i, arr)=>{
      return (
        <SearchListItem key={i} game={game}/>
      );
    });
  }
  else {
    let maxItems = _.first(this.props.reviews, 5)
    allItems = maxItems.map((review, i, arr)=>{
      return (
        <div key={i} className="recent-reviews">
          <Link to={`/game/${review.gameId}`}>
            <h4>{review.gameName}</h4>
          </Link>
          <ReviewItems review={review} users={this.props.users}/>
        </div>
      );
    });
  }
    return (
      <div>
        <ul className="game-list">
        {allItems}
        </ul>
      </div>
    );
  }
});
