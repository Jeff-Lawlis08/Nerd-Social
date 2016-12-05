import React from 'react';
import store from '../store';
import {Link} from 'react-router';

export default React.createClass({
  getInitialState(){
      let authenticated;
      if(window.localStorage.getItem('user-token')){
        return {authenticated: true}
      } else {
      return {authenticated: false}
    }
  },
  render(){
    if(this.state.authenticated===true){
    return (
      <form className="review-form" onSubmit={this.handleSubmit}>
        <h5>Write a Review</h5>
        <textarea ref="body" placeholder="What do you think of this game?"/>
        <input type="number" max="5" min="1" ref="rating" placeholder="rating"/>
        <input type="submit" value="submit"/>
      </form>
      );
    } else {
      return (
        <span>You must be logged in to write a review<Link to='/login'>Login</Link></span>
      )
    }
  },
  handleSubmit(e){
    e.preventDefault();
    let body=this.refs.body.value;
    let rating;
    if(this.refs.rating.value>5) {
      rating = 5;
    } else if(this.refs.rating.value<1){
      rating = 1;
    } else {
      rating = this.refs.rating.value;
    }
    let gameId = this.props.game.id;
    let gameName = this.props.game.name;
    let timestamp = new Date();
    store.reviews.addReview({body, rating, gameId, gameName, timestamp});
    this.refs.body.value='';
    this.refs.rating.value='';
}
});
