import React from 'react';
import store from '../store';
import ReviewEdit from './ReviewEdit';
import moment from 'moment';

export default React.createClass({
  getInitialState(){
    return {
      editing: false,
    }
  },
  render(){
    if(this.state.editing===false){
    return (
      <li>
        <h6>{this.props.review.title}</h6>
        <p>{this.props.review.body}</p>
        <span>{this.props.review.rating}</span>
        <span>`${moment(this.props.review.timestamp).format('LLLL')}`</span>
        <input onClick={this.handleEdit} type="button" value="edit"/>
        <input onClick={this.handleDelete} type="button" value="Delete"/>
      </li>
    );
  } else if(this.state){
      return (
        <form onSubmit={this.handleSubmit}>
          <span>Edit your review</span>
          <input type="text" ref="title" placeholder={this.props.review.title}/>
          <textarea ref="body" placeholder={this.props.review.body}/>
          <input type="number" ref="rating" placeholder={this.props.review.rating}/>
          <input type="submit" value="submit"/>
        </form>
      );
    }
  },
  handleDelete(e){
    store.reviews.get(this.props.review.objectId).destroy();
  },
  handleEdit(e){
    this.setState({
      editing: true,
    });
  },
  handleSubmit(e){
    e.preventDefault();
    let title = this.refs.title.value;
    let body = this.refs.body.value;
    let rating = this.refs.rating.value;
    let dateEdited = new Date();
    store.reviews.get(this.props.review.objectId).save({title, body, rating, dateEdited});
    this.setState({
      editing: false,
    })
  }
});
