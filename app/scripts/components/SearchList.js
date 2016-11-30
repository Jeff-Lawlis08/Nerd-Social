import React from 'react';
import SearchListItem from './SearchListItem';
import _ from 'underscore';
import ReviewItems from './ReviewItems';

export default React.createClass({
  render(){
    console.log(this.props);
    let allItems;
    if(this.props.games.length>0){
      allItems = this.props.games.map((game, i, arr)=>{
      return (
        <SearchListItem key={i} game={game}/>
      );
    });
  }
  else {
    allItems = this.props.reviews.map((review, i, arr)=>{
      return (
        <div key={i} className="recent-reviews">
          <h4>{review.gameName}</h4>
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
