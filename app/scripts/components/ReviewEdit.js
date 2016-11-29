import React from 'react';

export default React.createClass({
  render(){
    return (
      <form>
        <input type="text" ref="title" value={this.props.review.title}/>
        <textarea ref="body" value={this.props.review.body}/>
        <input type="number" ref="rating" value={this.props.review.rating}/>
        <input type="submit" value="submit"/>
      </form>
    );
  }
});
