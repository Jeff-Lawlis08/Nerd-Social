import React from 'react';
import store from '../store';

export default React.createClass({
  render(){
    console.log(this.props);
    return (
      <li>
        <h6>{this.props.review.title}</h6>
        <p>{this.props.review.body}</p>
        <span>{this.props.review.rating}</span>
        <input onClick={this.handleDelete} type="button" value="Delete"/>
      </li>
    );
},
  handleDelete(e){
    store.reviews.get(this.props.review.objectId).destroy();
  },
});
