import React from 'react';
import store from '../store';
import {Link} from 'react-router';
import StarRatingComponent from 'react-star-rating-component';

export default React.createClass({
  getInitialState(){
      let authenticated;
      if(window.localStorage.getItem('user-token')){
        return {
          authenticated: true,
          rating: 0
        }
      } else {
      return {
        authenticated: false,
        rating: 0
      }
    }
  },
  render(){
    // const { rating } = this.state;
    // console.log(rating);
    if(this.state.authenticated===true){
    return (
      <form className="review-form" onSubmit={this.handleSubmit}>
        <h5>Write a Review</h5>
        <textarea ref="body" placeholder="What do you think of this game?"/>
        <div>
            <StarRatingComponent
                name="rate1"
                starCount={5}
                value={this.state.rating}
                onStarClick={this.onStarClick}
            />
        </div>
        <input type="submit" value="submit"/>
      </form>
      );
    } else {
      return (
        <span>You must be <Link to='/login'>logged in</Link> to write a review</span>
      )
    }
  },
  onStarClick(nextValue, prevValue, name) {
      this.setState({rating: nextValue});
  },
  handleSubmit(e){
    e.preventDefault();
    console.log(this.state.rating);
    let body=this.refs.body.value;
    let rating = String(this.state.rating)
    console.log(rating);
    let gameId = this.props.game.id;
    let gameName = this.props.game.name;
    let timestamp = new Date();
    // let likes = null;
    // let dislikes = null;
    store.reviews.addReview({body, rating, gameId, gameName, timestamp});
    this.refs.body.value='';
    this.setState({rating: 1});
}
});
