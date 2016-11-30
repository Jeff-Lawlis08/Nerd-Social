import React from 'react';
import SearchListItem from './SearchListItem';
import _ from 'underscore';
import ReviewItems from './ReviewItems';

export default React.createClass({
  render(){
    console.log(this.props);
    let allGames;
    if(this.props.games.length>0){
      allGames = this.props.games.map((game, i, arr)=>{
      return (
        <SearchListItem key={i} game={game}/>
      );
    });
  } else {
    allGames = this.props.reviews.map((review, i, arr)=>{
      return (
        <div>
        {review.gameName}
        <ReviewItems key={i} review={review}/>
        </div>
      );
    });
  }
    return (
      <div>
        <ul className="game-list">
        {allGames}
        </ul>
      </div>
    );
  }
});
