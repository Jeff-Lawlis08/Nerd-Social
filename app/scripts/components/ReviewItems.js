import React from 'react';
import {Link} from 'react-router';

import store from '../store';
import ReviewEdit from './ReviewEdit';

import moment from 'moment';
import _ from 'underscore';

export default React.createClass({
  getInitialState(){
    return {
      editing: false,
      owned: false
    }
  },
  componentDidMount(){
    if(window.localStorage.ownerId===this.props.review.ownerId){
      this.setState({owned: true})
  }
},
  render(){
    let user;
    let likes;
    let dislikes;
    console.log(this.props.review.rating);
    let stars = store.reviews.ratingStars(this.props.review.rating);
      if(this.props.review.likes===null){
        likes = 0;
      } else {
        likes = this.props.review.likes;
      }
      if(this.props.review.dislikes===null){
        dislikes=0;
      } else {
        dislikes = this.props.review.dislikes
      }
      if(this.props.users.length>1){
        user = _.find(this.props.users, (user)=>{
        return user.ownerId===this.props.review.ownerId;
      });
    } else {
      user = this.props.users
    }
    if(this.state.editing===false && this.state.owned===false){
          if (user) {return (
      <li className="review-items">
        <h5><Link to={`/user/${user.ownerId}`}>{user.name}</Link></h5>
        <span>Rating: {stars}</span>
        <p>{this.props.review.body}</p>
        <span>{moment(this.props.review.timestamp).format('LLLL')}</span>
        <div className="like-dislike">
          <input ref="likes" name="likes" onChange={this.handleLike} type="checkbox"/>
          <label htmlFor="likes"><i className="fa fa-thumbs-up" aria-hidden="true"></i>:
          {likes}</label>
          <input ref="dislikes" name="dislikes" onChange={this.handleDislike} type="checkbox"/>
          <label htmlFor="dislikes"><i className="fa fa-thumbs-down" aria-hidden="true"></i>:
          {dislikes}</label>
        </div>
      </li>
      );
    } else { return null}
  }
    else if(this.state.editing===false && this.state.owned===true){
    return (
      <li className="review-items">
        <h5><Link to={`/user/${user.ownerId}`}>{user.name}</Link></h5>
        <span>Rating: {this.props.review.rating}</span>
        <p>{this.props.review.body}</p>
        <span>{moment(this.props.review.timestamp).format('LLLL')}</span>
        <div className="like-dislike">
          <span><i className="fa fa-thumbs-up" aria-hidden="true"></i>:
          {likes}</span>
          <span><i className="fa fa-thumbs-down" aria-hidden="true"></i>:
          {dislikes}</span>
        </div>
        <input onClick={this.handleEdit} type="button" value="Edit"/>
        <input onClick={this.handleDelete} type="button" value="Delete"/>
      </li>
    );
  } else if(this.state.editing=true){
      return (
        <div className="modal-background">
          <div className="modal-container">
            <form onSubmit={this.handleSubmit}>
              <span>Edit Your Review</span>
              <textarea ref="body" placeholder={this.props.review.body}/>
              <input type="number" ref="rating" placeholder={this.props.review.rating}/>
              <input type="submit" value="Submit"/>
              <input onClick={this.handleCancel} type="button" value="Cancel"/>
            </form>
          </div>
        </div>
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
    let body = this.refs.body.value;
    let rating = this.refs.rating.value;
    let dateEdited = new Date();
    store.reviews.get(this.props.review.objectId).save({body, rating, dateEdited});
    this.setState({
      editing: false,
    })
  },
  handleCancel(e){
    this.setState({
      editing: false
    })
  },
  handleLike(e){
    if(this.refs.likes.checked===true){
    store.reviews.like(this.props.review.objectId);
    this.refs.dislikes.disabled = true;
  } else {
    store.reviews.unlike(this.props.review.objectId);
    this.refs.dislikes.disabled = false;
  }
  },
  handleDislike(e){
    if(this.refs.dislikes.checked===true){
    store.reviews.dislike(this.props.review.objectId);
    this.refs.likes.disabled = true;
  } else {
    store.reviews.undislike(this.props.review.objectId);
    this.refs.likes.disabled = false;
  }
}
});
