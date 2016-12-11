import React from 'react';
import {Link} from 'react-router';
import store from '../store';

import ReviewItems from './ReviewItems';

export default React.createClass({
  render(){
    // console.log(this.props.reviews);
    let allReviews = this.props.reviews.map((review, i, arr)=>{
      return (
        <div key={i}>
          <h4><Link onClick={this.handleUserReset} to={`/game/${review.gameId}`}>{review.gameName}</Link></h4>
          <ReviewItems key={i} review={review} users={this.props.user}/>
        </div>
      );
    });
    return (
      <ul className="profile-review-list">
        {allReviews}
      </ul>
    )
  },
  handleUserReset(){
    store.user.clear();
    store.reviews.reset();
  }
});
