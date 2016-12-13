import React from 'react';
import store from '../store';
import _ from 'underscore';
import ReviewItems from './ReviewItems';
import StarRatingComponent from 'react-star-rating-component';
import ReviewForm from './ReviewForm';


export default React.createClass({
  getInitialState(){
    if(store.reviews.length<=0){
    return {
      reviews: [],
      users: [],
    }
  } else {
    return {reviews: store.reviews.toJSON(), users: store.users.toJSON()}
  }
  },
  componentDidMount(){
    store.reviews.fetch();
    store.users.fetch();
    // console.log(store.users);
    store.reviews.on('update change', this.updateState);
    store.users.on('update change', this.updateState);
  },
  componentWillUnmount(){
    store.reviews.off('update change', this.updateState);
    store.users.off('update change', this.updateState);
  },
  render(){
    console.log(this.state.reviews);
    let avgRating = store.reviews.getAvg(this.props.game.id, this.state.reviews);
    let reviewList = this.state.reviews.filter((review, i, arr)=>{
      if(review.gameId===Number(this.props.game.id)){
        return review
      }
    }).map((review, i, arr)=>{
      return (
        <ReviewItems key={i} review={review} users={this.state.users}/>
      )
    });
    return (
      <div className="avg-rating-container">
        <div>
            <span>Average Users Rating</span>
            <StarRatingComponent
                name="rate5"
                starCount={5}
                editing={false}
                value={avgRating}
            />
        </div>
        <ReviewForm game={this.props.game}/>
        <h4>Reviews</h4>
        <ul className="user-reviews">
          {reviewList}
        </ul>
      </div>
    );
},
  updateState(){
    this.setState({
      reviews: store.reviews.toJSON(),
      users: store.users.toJSON(),
    });
  }
});
