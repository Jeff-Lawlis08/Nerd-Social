import React from 'react';
import store from '../store';

export default React.createClass({
  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <span>Edit your review</span>
        <input type="text" ref="title" placeholder={this.props.review.title}/>
        <textarea ref="body" placeholder={this.props.review.body}/>
        <input type="number" ref="rating" placeholder={this.props.review.rating}/>
        <input type="submit" value="submit"/>
      </form>
    );
  },
  handleSubmit(e){
    e.preventDefault();
    let title = this.refs.title.value;
    let body = this.refs.body.value;
    let rating = this.refs.rating.value;
    store.reviews.get(this.props.review.objectId).save({title, body, rating});
  }
});
