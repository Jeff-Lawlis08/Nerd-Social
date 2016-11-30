import React from 'react';
import store from '../store';
import _ from 'underscore';
import ReviewItems from './ReviewItems';

export default React.createClass({
  getInitialState(){
    if(store.reviews.length===0){
    return {
      reviews: []
    }
  } else {
    return {reviews: store.reviews.toJSON()}
  }
  },
  componentDidMount(){
    store.reviews.fetch();
    // store.users.fetch();
    // console.log(store.users);
    store.reviews.on('update change', this.updateState);
  },
  componentWillUnmount(){
    store.reviews.off('update change', this.updateState);
  },
  render(){
  let reviewList = this.state.reviews.filter((review, i, arr)=>{
      if(review.gameId===this.props.game.id){
        return review
      }
    }).map((review, i, arr)=>{
      return (
        <ReviewItems key={i} review={review}/>
      )
    });
    return (
      <ul>
        {reviewList}
      </ul>
    );
},
  updateState(){
    this.setState({
      reviews: store.reviews.toJSON(),
      // users: store.users.toJSON()
    });
  }
});
