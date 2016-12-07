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
    // let likeChecked = false;
    // let likeDisabled = false;
    // let dislikeChecked = false;
    // let dislikeDisabled = false;
    //   if(this.props.review.likes.indexOf(window.localStorage.getItem('ownerId')>-1)){
    //     likeChecked=true;
    //     dislikeDisabled=true;
    //   } else if(this.props.review.dislikes.indexOf(window.localStorage.getItem('ownerId')>-1)){
    //     dislikeChecked=true;
    //     likeDisabled=true;
    //   } else {
    //     likeChecked = false;
    //     likeDisabled = false;
    //     dislikeChecked = false;
    //     dislikeDisabled = false;
    //   }
    // console.log(this.props.review.likes);
      if(this.props.review.likes.length===null){
        likes = 0;
      } else {
        likes = this.props.review.likes.length;
      }
      if(this.props.review.dislikes.length===null){
        dislikes=0;
      } else {
        dislikes = this.props.review.dislikes.length
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
        <span>Rating: {this.props.review.rating}</span>
        <p>{this.props.review.body}</p>
        <span>{moment(this.props.review.timestamp).format('LLLL')}</span>
        <div className="like-dislike">
          <button ref="likes" onClick={this.handleLike} type="button">
          <i className="fa fa-thumbs-up" aria-hidden="true"></i> 
          {likes}</button>
          <button ref="dislikes" onClick={this.handleDislike} type="button">
          <i className="fa fa-thumbs-down" aria-hidden="true"></i>
          {dislikes}</button>
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
    let id = window.localStorage.getItem('ownerId');
    let ids = this.props.review.likes.map((like, i, arr)=>{
      return like.objectId;
    });
    if(ids.indexOf(id)===-1){
    store.reviews.get(this.props.review.objectId).like(id);
    this.refs.dislikes.disabled = true;
  } else {
    store.reviews.get(this.props.review.objectId).unlike(id);
    this.refs.dislikes.disabled = false;
  }
  },
  handleDislike(e){
    let id = window.localStorage.getItem('ownerId');
    let ids = this.props.review.dislikes.map((dislike, i, arr)=>{
      return dislike.objectId;
    });
    if(ids.indexOf(id)<=-1){
    store.reviews.get(this.props.review.objectId).dislike(id);
    this.refs.likes.disabled = true;
  } else {
    store.reviews.get(this.props.review.objectId).undislike(id);
    this.refs.likes.disabled = false;
  }
}
});
