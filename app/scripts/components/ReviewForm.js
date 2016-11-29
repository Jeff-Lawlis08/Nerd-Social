import React from 'react';
import store from '../store';

export default React.createClass({
  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" ref="title" placeholder="Title"/>
        <textarea ref="body" placeholder="Body"/>
        <input type="number" ref="rating" placeholder="rating"/>
        <input type="submit" value="submit"/>
      </form>
    );
  },
  handleSubmit(e){
    e.preventDefault();
    let title=this.refs.title.value;
    let body=this.refs.body.value;
    let rating=this.refs.rating.value;
    let gameId = this.props.game.id;
    let timestamp = new Date();
    store.reviews.addReview({title, body, rating, gameId, timestamp});
  }
});
