import React from 'react';
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
    let user = _.find(this.props.users, (user)=>{
      return user.ownerId===this.props.review.ownerId;
    })
    // console.log(user, user.name);

    if(this.state.editing===false && this.state.owned===false){
          if (user) {return (
      <li className="review-items">
        <h5>{user.name}</h5>
        <span>Rating: {this.props.review.rating}</span>
        <p>{this.props.review.body}</p>
        <span>{moment(this.props.review.timestamp).format('LLLL')}</span>
      </li>
      );
    } else { return null}
  }
    else if(this.state.editing===false && this.state.owned===true){
    return (
      <li className="review-items">
        <h5>{user.name}</h5>
        <span>Rating: {this.props.review.rating}</span>
        <p>{this.props.review.body}</p>
        <span>{moment(this.props.review.timestamp).format('LLLL')}</span>
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
  }
});
