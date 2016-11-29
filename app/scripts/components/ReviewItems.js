import React from 'react';

export default React.createClass({
  render(){
    console.log(this.props);
    return (
      <li>
        <h6>{this.props.review.title}</h6>
        <p>{this.props.review.body}</p>
        <span>{this.props.review.rating}</span>
      </li>
    );
  }
});
