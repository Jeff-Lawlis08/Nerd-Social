import React from 'react';
import store from '../store';
// import Backbone from 'backbone';
import _ from 'underscore';
import ReviewItems from './ReviewItems';
import ReviewEdit from './ReviewEdit';

export default React.createClass({
  getInitialState(){
    return {
      reviews: store.reviews.toJSON()
    }
  },
  componentDidMount(){
    store.reviews.fetch();
    store.reviews.on('update change', this.updateState);
  },
  componentWillUnmount(){
    store.reviews.off('update change', this.updateState);
  },
  render(){
  let reviewList = this.state.reviews.filter((review, i, arr)=>{
      if(review.gameId===this.props.game.id){
        console.log(review);
        return review
      }
    }).map((review, i, arr)=>{
      return (
        <ReviewItems key={i} review={review}/>
      )
    });
    // if(reviewList.refs.edit.unchecked){
    return (
      <ul>
        {reviewList}
      </ul>
    );
  // } else {
  //   return (
  //     <ReviewEdit/>
  //   );
  // }
},
  updateState(){
    this.setState({reviews: store.reviews.toJSON()})
  }
});
