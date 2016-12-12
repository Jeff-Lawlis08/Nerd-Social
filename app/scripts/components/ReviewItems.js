import React from 'react';
import {Link} from 'react-router';

import store from '../store';
import ReviewEdit from './ReviewEdit';

import moment from 'moment';
import _ from 'underscore';
import StarRatingComponent from 'react-star-rating-component';

export default React.createClass({
  getInitialState(){
    return {
      editing: false,
      owned: false,
      rating: 1
    }
  },
  componentWillMount(){
    if(window.localStorage.getItem('ownerId')===this.props.review.ownerId){
      this.setState({owned: true})
    } else {
      this.setState({owned: false})
    }
  },
  componentDidMount(){
    if(window.localStorage.getItem('ownerId')===this.props.review.ownerId){
      this.setState({owned: true})
  } else {
    this.setState({owned: false});
  }
},
  componentWillUnmount(){
      this.setState({owned: false})

},
  render(){
    let user;
    let likes;
    let dislikes;
      if(this.props.review.likes===null || this.props.review.likes===undefined){
        likes = 0;
      } else {
        likes = this.props.review.likes.length;
      }
      if(this.props.review.dislikes===null || this.props.review.dislikes===undefined){
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
      // console.log(this.state.owned);
          if (user) {return (
      <li className="review-items">
        <h5><Link to={`/user/${user.ownerId}`} onClick={this.handleUserReset}>{user.name}</Link></h5>
        <img src={user.pic}/>
        <div>
            <StarRatingComponent
                name="rate3"
                starCount={5}
                editing={false}
                value={Number(this.props.review.rating)}
            />
        </div>
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
        <h5><Link to={`/user/${user.ownerId}`} onClick={this.handleUserReset}>{user.name}</Link></h5>
        <img src={user.pic}/>
        <div>
            <StarRatingComponent
                name="rate2"
                starCount={5}
                editing={false}
                value={Number(this.props.review.rating)}
            />
        </div>
        <p>{this.props.review.body}</p>
        <span>{moment(this.props.review.timestamp).format('LLLL')}</span>
        <div className="like-dislike">
          <span><i className="fa fa-thumbs-up" aria-hidden="true"></i>:
          {likes}</span>
          <span><i className="fa fa-thumbs-down" aria-hidden="true"></i>:
          {dislikes}</span>
        </div>
        <button className="edit-delete" onClick={this.handleEdit}>
          <i className="fa fa-pencil-square" aria-hidden="true"></i>
        </button>
        <button className="edit-delete" onClick={this.handleDelete}>
          <i className="fa fa-trash" aria-hidden="true"></i>
        </button>
      </li>
    );
  } else if(this.state.editing=true){
      return (
            <form className="edit-review" onSubmit={this.handleSubmit}>
              <span>Edit Your Review</span>
              <textarea ref="body" defaultValue={this.props.review.body}/>
              <StarRatingComponent
                  name="rate4"
                  starCount={5}
                  value={Number(this.props.review.rating)}
                  onStarClick={this.onStarClick}
              />
              <input onClick={this.handleCancel} type="button" value="Cancel"/>
              <input type="submit" value="Submit"/>
            </form>

      );
    }
  },
  handleDelete(e){
    store.reviews.get(this.props.review.objectId).deleteReview(this.props.review.objectId);
  },
  handleEdit(e){
    this.setState({
      editing: true,
    });
  },
  handleSubmit(e){
    e.preventDefault();
    let body = this.refs.body.value;
    let rating = String(this.state.rating);
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
    if(window.localStorage.getItem('user-token')){
    if(ids.indexOf(id)===-1){
    store.reviews.get(this.props.review.objectId).like(id);
    this.refs.dislikes.disabled = true;
  } else {
    store.reviews.get(this.props.review.objectId).unlike(id);
    this.refs.dislikes.disabled = false;
    }
  } else {
    alert("You must be logged in to like reviews")
  }
  },
  handleDislike(e){
    let id = window.localStorage.getItem('ownerId');
    let ids = this.props.review.dislikes.map((dislike, i, arr)=>{
      return dislike.objectId;
    });
    if(window.localStorage.getItem('user-token')){
    if(ids.indexOf(id)<=-1){
    store.reviews.get(this.props.review.objectId).dislike(id);
    this.refs.likes.disabled = true;
  } else {
    store.reviews.get(this.props.review.objectId).undislike(id);
    this.refs.likes.disabled = false;
  }
} else {
  alert("You must be logged in to dislike reviews")
}
},
onStarClick(nextValue, prevValue, name){
  this.setState({rating: nextValue});
},
handleUserReset(){
  store.user.clear();
  store.reviews.reset();
}
});
